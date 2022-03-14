import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useHistory, useParams} from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  FormGroup,
  Spinner,
} from "reactstrap";
import {toast} from "react-toastify";
import moment from "moment";
/** COMPONENTS */
import Content from "layout/content/Content";
import Head from "layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockBetween,
  BlockTitle,
  DataTable,
  PaginationComponent,
  PreviewAltCard,
  Icon,
  Button,
  Row,
  Col,
  RSelect,
  AlertConfirm,
} from "components/Component";
import TableTask from "../table/Task";
import AddEditTaskForm from "../form/AddEditTask";
/** COMMON */
import Configs from "configs";
import Routes from "route/routes";
import Constants from "utils/constants";
import {getLocalStorage, log, setLocalStorage} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";

function ListTasks(props) {
  const {t} = useTranslation();
  const history = useHistory();
  const {projectID = null} = useParams();

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);
  const masterState = useSelector(({master}) => master);
  const projectState = useSelector(({project}) => project);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    search: false,
    remove: false,
  });
  const [sm, updateSm] = useState(false);
  const [isWrite, setIsWrite] = useState(false);
  const [view, setView] = useState({
    search: false,
    add: false,
    update: false,
    confirm: false,
    clone: false,
  });
  const [dataSelect, setDataSelect] = useState({
    employees: [],
    status: [],
    sector: [],
  });
  const [formData, setFormData] = useState({
    statusID: null,
    ownerID: null,
    sectorID: null,
    page: 1,
    search: "",
  });
  const [data, setData] = useState({
    list: [],
    count: 0,
  });
  const [updateItem, setUpdateItem] = useState(null);
  const [createType, setCreateType] = useState(null);

  /**
   ** FUNCTIONS
   */
  const toggleSm = () => updateSm(!sm);

  const onChangeSearch = e => setFormData({...formData, search: e.target.value});

  const onChangeSelect = e => setFormData({...formData, [e.key]: e.value});

  const toggleView = type => {
    if (type === "search" && view.search) {
      setView({...view, search: false});
    } else {
      setView({
        search: type === "search" ? true : false,
        add: type === "add" ? true : false,
        update: type === "update" ? true : false,
        confirm: type === "confirm" ? true : false,
        clone: type === "clone" ? true : false,
      });
      if (!type && updateItem) setUpdateItem(null);
      if (!type && createType) setCreateType(null);
    }
  };

  const paginate = pageNumber => {
    if (pageNumber !== formData.page) {
      let tmpData = {...formData};
      tmpData.page = pageNumber;
      setFormData(tmpData);
      onChangePage(pageNumber);
    }
  };

  const onCheckLocal = () => {
    onGetMasterData();
    let fFilter = getLocalStorage(Constants.LS_FILTER_TASKS);
    if (fFilter) {
      setFormData({
        ...formData,
        statusID: fFilter.statusID,
        ownerID: fFilter.ownerID,
        sectorID: fFilter.sectorID,
      });
      onStartGetData(
        fFilter.statusID,
        fFilter.ownerID,
        fFilter.sectorID,
      );
    } else {
      let filter = {statusID: null, ownerID: null, sectorID: null};
      setLocalStorage(Constants.LS_FILTER_TASKS, JSON.stringify(filter));
      onStartGetData();
    }
  };

  const onSearch = () => {
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Change params
      let tmpFormData = {...formData};
      tmpFormData.page = 1;
      setFormData(tmpFormData);
      // Call api
      onStartGetData(
        moment(formData.year).format("YYYY"),
        formData.statusID,
        formData.ownerID,
        formData.sectorID,
        formData.search,
        1,
      );
    }
  };

  const onChangePage = newPage => {
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Change params
      let tmpFormData = {...formData};
      tmpFormData.page = newPage;
      setFormData(tmpFormData);
      // Call api
      onStartGetData(
        moment(formData.year).format("YYYY"),
        formData.statusID,
        formData.ownerID,
        formData.sectorID,
        formData.search,
        newPage,
      );
    }
  };

  const onSearchFilter = () => {
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Save local
      let filter = {
        statusID: formData.statusID,
        ownerID: formData.ownerID,
        sectorID: formData.sectorID,
      };
      setLocalStorage(Constants.LS_FILTER_TASKS, JSON.stringify(filter));
      // Change params
      let tmpFormData = {...formData};
      tmpFormData.page = 1;
      tmpFormData.search = "";
      setFormData(tmpFormData);
      // Call api
      onStartGetData();
    }
  };

  const onCreate = type => {
    setCreateType(type);
    toggleView("add");
  };

  const onOverview = tk => {
    setUpdateItem(tk);
  };

  const onUpdate = tk => {
    setUpdateItem(tk);
    toggleView("update");
  };

  const onClone = tk => {
    setUpdateItem(tk);
    toggleView("clone");
  };

  const onRemove = tk => {
    setUpdateItem(tk);
    toggleView("confirm");
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "Users,PrjSector,PrjStatus",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onStartGetData = (
    statusID = formData.statusID,
    ownerID = formData.ownerID,
    sectorID = formData.sectorID,
    search = "",
    page = 1,
  ) => {
    let params = {
      PrjID: projectID,
      StatusID: statusID,
      OwnerID: ownerID,
      SectorID: sectorID,
      Search: search,
      PageNum: page,
      PageSize: Configs.perPageProject,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchListTask(params, history));
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      dispatch(Actions.resetMasterData());
      let tmpPrjStatus = masterState["projectStatus"].map(item => {
        return {value: item.statusID, label: item.statusName};
      });
      let tmpUsers = masterState["users"].map(item => {
        return {value: item.empID, label: item.empName};
      });
      let tmpPrjSector = masterState["projectSector"].map(item => {
        return {value: item.sectorID, label: item.sectorName};
      });
      setDataSelect({
        status: [...dataSelect.status, ...tmpPrjStatus],
        employees: [...dataSelect.employees, ...tmpUsers],
        sector: [...dataSelect.sector, ...tmpPrjSector],
      });
    } else {
      dispatch(Actions.resetTask());
      let tmpData = {...data};
      tmpData.list = projectState["tasks"];
      tmpData.count = projectState["numTasks"];
      setData(tmpData);
      setLoading({main: false, search: false});
    }
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    toast(error, {type: "error"});
    setLoading({main: false, search: false});
  };

  const onCloseForm = type => {
    dispatch(Actions.resetTask());
    toggleView();
    if (type === "Create" || type === "Update" || type === "Clone") {
      setLoading({...loading, search: true});
      // Call api
      onStartGetData(
        formData.statusID,
        formData.ownerID,
        formData.sectorID,
        formData.search,
        formData.page,
      );
    }
  };

  const onConfirmRemove = () => {
    setLoading({...loading, remove: true});
    let params = {
      TaskID: updateItem?.taskID || "0",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchRemoveTask(params, history));
  };

  /**
   ** LIFE CYCLE
   */
   useEffect(() => {
    if (loading.main && authState["successSignIn"] && authState["menu"]) {
      let fMenuRequest = null;
      if (authState["menu"].length > 0) {
        for (let item of authState["menu"]) {
          if (item.subMenu && item.subMenu.length > 0) {
            fMenuRequest = item.subMenu.find(f => f.link === Routes.projects);
            if (fMenuRequest) {
              setIsWrite(fMenuRequest.isWrite);
              return onCheckLocal();
            }
          }
        }
      }
      if (!fMenuRequest) onCheckLocal();
    }
  }, [
    loading.main,
    authState["successSignIn"],
    authState["menu"],
  ]);

  useEffect(() => {
    if (loading.main) {
      if (!masterState["submittingGetAll"]) {
        if (masterState["successGetAll"] && !masterState["errorGetAll"]) {
          return onSuccess("MasterData");
        }
        if (!masterState["successGetAll"] && masterState["errorGetAll"]) {
          return onError(masterState["errorHelperGetAll"]);
        }
      }
    }
  }, [
    loading.main,
    masterState["submittingGetAll"],
    masterState["successGetAll"],
    masterState["errorGetAll"],
  ]);

  useEffect(() => {
    if (loading.main || loading.search) {
      if (!projectState["submittingListTask"]) {
        if (projectState["successListTask"] && !projectState["errorListTask"]) {
          return onSuccess("List");
        }
        if (!projectState["successListTask"] && projectState["errorListTask"]) {
          return onError(projectState["errorHelperListTask"]);
        }
      }
    }
  }, [
    loading.main,
    loading.search,
    projectState["submittingListTask"],
    projectState["successListTask"],
    projectState["errorListTask"],
  ]);

  /**
   ** RENDER
   */
  const disabled = loading.main || loading.search;
  return (
    <React.Fragment>
      <Head title={t("project:main_title")} />

      <Content>
        {/** Header table */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h4">{t("task:title")}</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                {isWrite && (
                  <ul className="nk-block-tools g-3">
                    <UncontrolledDropdown direction="left">
                      <DropdownToggle className="toggle btn-action d-md-none" color="primary">
                        <Icon name="plus"></Icon>
                      </DropdownToggle>
                      <DropdownToggle className="btn-action toggle d-none d-md-inline-flex" color="primary">
                        <Icon name="plus"></Icon>
                        <span>{t("common:add_new")}</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <ul className="link-list-opt">
                          <li>
                            <DropdownItem tag="a" href="#milestone" onClick={(ev) => {
                              ev.preventDefault();
                              onCreate(3);
                            }}>
                              <span className="fw-bold" style={{color: Constants.TYPE_TASK_COLOR["MILESTONE"]}}>
                                {t("task:milestone").toUpperCase()}
                              </span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem tag="a" href="#phase"  onClick={(ev) => {
                              ev.preventDefault();
                              onCreate(1);
                            }}>
                              <span className="fw-bold" style={{color: Constants.TYPE_TASK_COLOR["PHASE"]}}>
                                {t("task:phase").toUpperCase()}
                              </span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem tag="a" href="#task"  onClick={(ev) => {
                              ev.preventDefault();
                              onCreate(2);
                            }}>
                              <span className="fw-bold" style={{color: Constants.TYPE_TASK_COLOR["TASK"]}}>
                                {t("task:task").toUpperCase()}
                              </span>
                            </DropdownItem>
                          </li>
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </ul>
                )}
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools"></div>
                <div className="card-tools mr-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <a
                        href="#search"
                        onClick={(ev) => {
                          ev.preventDefault();
                          !disabled && toggleView("search");
                        }}
                        className="btn btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </a>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                    <li>
                      <div className="toggle-wrap">
                        <Button
                          className={`btn-icon btn-trigger toggle ${sm ? "active" : ""}`}
                          disabled={disabled}
                          onClick={toggleSm}
                        >
                          <Icon name="menu-right"></Icon>
                        </Button>
                        <div className={`toggle-content ${sm ? "content-active" : ""}`}>
                          <ul className="btn-toolbar gx-1">
                            <li className="toggle-close">
                              <Button className="btn-icon btn-trigger toggle" disabled={disabled} onClick={toggleSm}>
                                <Icon name="arrow-left"></Icon>
                              </Button>
                            </li>
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <div className="dot dot-primary"></div>
                                  <Icon name="filter-alt"></Icon>
                                </DropdownToggle>
                                <DropdownMenu
                                  right
                                  className="filter-wg dropdown-menu-xl"
                                  style={{ overflow: "visible" }}
                                >
                                  <div className="dropdown-head">
                                    <h6>
                                      {t("task:filter_task").toUpperCase()}
                                    </h6>
                                  </div>
                                  <div className="dropdown-body dropdown-body-rg">
                                    <Row className="gx-6 gy-3">
                                      <Col size="12">
                                        <FormGroup className="form-group">
                                          <label className="overline-title overline-title-alt">
                                            {t("task:status")}
                                          </label>
                                          <RSelect
                                            name="status"
                                            isMulti={false}
                                            isDisabled={disabled}
                                            options={dataSelect.status}
                                            value={formData.statusID}
                                            placeholder={t("task:holder_status")}
                                            onChange={e => onChangeSelect({key: "statusID", value: e})}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col size="12">
                                        <FormGroup className="form-group">
                                          <label className="overline-title overline-title-alt">
                                            {t("task:assign")}
                                          </label>
                                          <RSelect
                                            name="owner"
                                            isMulti={false}
                                            isDisabled={disabled}
                                            options={dataSelect.employees}
                                            value={formData.ownerID}
                                            placeholder={t("task:holder_assign")}
                                            onChange={e => onChangeSelect({key: "ownerID", value: e})}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col size="12">
                                        <FormGroup className="form-group">
                                          <label className="overline-title overline-title-alt">
                                            {t("task:sector")}
                                          </label>
                                          <RSelect
                                            name="sector"
                                            isMulti={false}
                                            isDisabled={disabled}
                                            options={dataSelect.sector}
                                            value={formData.sectorID}
                                            placeholder={t("task:holder_sector")}
                                            onChange={e => onChangeSelect({key: "sectorID", value: e})}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="dropdown-foot between">
                                    <Button color="primary" disabled={disabled} onClick={onSearchFilter}>
                                      <Icon name="filter"></Icon>
                                      <span>{t("common:filter")}</span>
                                    </Button>
                                    {/* <Button className="btn-dim" color="secondary" disabled={disabled} onClick={onResetFilter}>
                                      <Icon name="undo"></Icon>
                                      <span>{t("common:reset")}</span>
                                    </Button> */}
                                  </div>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className={`card-search search-wrap ${view.search && "active"}`}>
                <div className="card-body">
                  <div className="search-content">
                    <Button
                      className="search-back btn-icon toggle-search active"
                      onClick={ev => {
                        ev.preventDefault();
                        toggleView("search");
                      }}
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      disabled={disabled}
                      value={formData.search}
                      placeholder={t("common:search")}
                      onKeyDown={ev => {
                        if (ev.key === "Enter") onSearch();
                      }}
                      onChange={onChangeSearch}
                    />
                    <Button
                      className="search-submit btn-icon"
                      onClick={ev => {
                        ev.preventDefault();
                        onSearch();
                      }}
                    >
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/** Data table */}
            <TableTask
              isWrite={isWrite}
              disabled={disabled}
              dataTasks={data.list}
              onOverview={onOverview}
              onUpdate={onUpdate}
              onClone={onClone}
              onRemove={onRemove}
            />

            {/** Paging table */}
            <PreviewAltCard>
              {disabled ? (
                <div className="text-center">
                  <Spinner size="sm" color="primary" />
                </div>
              ) : 
              data.list.length > 0 ? (
                <PaginationComponent
                  itemPerPage={Configs.perPageProject}
                  totalItems={data.count}
                  currentPage={formData.page}
                  paginate={paginate}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">{t("common:no_data")}</span>
                </div>
              )}
            </PreviewAltCard>
          </DataTable>
        </Block>

        {/** Forms */}
        <AddEditTaskForm
          show={view.add || view.update || view.clone}
          history={history}
          createType={createType}
          prjID={projectID}
          isUpdate={view.update}
          isClone={view.clone}
          authState={authState}
          commonState={commonState}
          masterState={masterState}
          updateItem={updateItem}
          onClose={onCloseForm}
        />

        <AlertConfirm
          loading={loading.remove}
          show={view.confirm}
          title={t("project:confirm_remove_task_title")}
          content={
            <>
              {t("project:confirm_remove_task_des_1")}
              <span className="fw-bold"> #{updateItem?.taskID} </span>
              {t("project:confirm_remove_task_des_2")}
            </>
          }
          onConfirm={onConfirmRemove}
          onClose={toggleView}
        />

        {view.add && <div className="toggle-overlay" onClick={toggleView}></div>}
        {view.update && <div className="toggle-overlay" onClick={toggleView}></div>}
        {view.clone && <div className="toggle-overlay" onClick={toggleView}></div>}
      </Content>
    </React.Fragment>
  );
};

export default ListTasks;
