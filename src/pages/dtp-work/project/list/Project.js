import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Spinner,
} from "reactstrap";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";
import moment from "moment";
/** COMPONENTS */
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  DataTable,
  PaginationComponent,
  PreviewAltCard,
  Icon,
  Button,
  Row,
  Col,
  RSelect,
  BlockBetween,
  AlertConfirm,
  Loading,
} from "../../../../components/Component";
import TableProject from "../table/Project";
import AddEditProjectForm from "../form/AddEditProject";
/** COMMON */
import Configs from "../../../../configs";
import Routes from "../../../../route/routes";
import Constants from "../../../../utils/constants";
import {
  checkIsWrite,
  getLocalStorage,
  log,
  setLocalStorage,
} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";
import RowSelectStatus from "../components/RowSelectStatus";

function ListProjects({history}) {
  const {t} = useTranslation();

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
    clone: false,
    confirm: false,
  });
  const [dataSelect, setDataSelect] = useState({
    employees: [],
    status: [],
  });
  const [formData, setFormData] = useState({
    year: new Date(),
    statusID: null,
    ownerID: null,
    page: 1,
    search: "",
  });
  const [data, setData] = useState({
    list: [],
    count: 0,
  });
  const [updateItem, setUpdateItem] = useState(null);

  /**
   ** FUNCTIONS
   */
  const toggleSm = () => updateSm(!sm);

  const onChangeSearch = e => setFormData({...formData, search: e.target.value});

  const onChangeYear = e => setFormData({...formData, year: e});

  const onChangeSelect = e => setFormData({...formData, [e.key]: e.value});

  const toggleView = type => {
    if (type === "search" && view.search) {
      setView({...view, search: false});
    } else {
      setView({
        search: type === "search" ? true : false,
        add: type === "add" ? true : false,
        update: type === "update" ? true : false,
        clone: type === "clone" ? true : false,
        confirm: type === "confirm" ? true : false,
      });
      if (!type && updateItem) setUpdateItem(null);
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
    let fFilter = getLocalStorage(Constants.LS_FILTER_PROJECTS);
    if (fFilter) {
      setFormData({
        ...formData,
        year: new Date(fFilter.year + ""),
        statusID: fFilter.statusID,
        ownerID: fFilter.ownerID,
      });
      onStartGetData(
        fFilter.year,
        fFilter.statusID,
        fFilter.ownerID,
      );
    } else {
      let filter = {year: moment().year(), statusID: null, ownerID: null};
      setLocalStorage(Constants.LS_FILTER_PROJECTS, JSON.stringify(filter));
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
        year: moment(formData.year).year(),
        statusID: formData.statusID,
        ownerID: formData.ownerID,
      };
      setLocalStorage(Constants.LS_FILTER_PROJECTS, JSON.stringify(filter));
      // Change params
      let tmpFormData = {...formData};
      tmpFormData.page = 1;
      tmpFormData.search = "";
      setFormData(tmpFormData);
      // Call api
      onStartGetData();
    }
  };

  const onDetails = pjID => {
    history.push(`${process.env.PUBLIC_URL}${Routes.tasks}/${pjID}`);
  };

  const onUpdate = pj => {
    setUpdateItem(pj);
    toggleView("update");
  };

  const onClone = pj => {
    setUpdateItem(pj);
    toggleView("clone");
  };

  const onRemove = pj => {
    setUpdateItem(pj);
    toggleView("confirm");
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "PrjStatus",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchUsersByLogin(params, history));
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onStartGetData = (
    year = moment(formData.year).format("YYYY"),
    statusID = formData.statusID,
    ownerID = formData.ownerID,
    search = "",
    page = 1,
  ) => {
    let params = {
      Year: year,
      OwnerID: ownerID,
      StatusID: statusID,
      Search: search,
      PageNum: page,
      PageSize: Configs.perPageProject,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchListProject(params, history));
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      dispatch(Actions.resetMasterData());
      let tmpUsers = masterState["usersByLogin"].map(item => {
        return {value: item.empID, label: item.empName};
      });
      let tmpPrjStatus = masterState["projectStatus"].map(item => {
        return {value: item.statusID, label: item.statusName};
      });
      setDataSelect({
        employees: [...dataSelect.employees, ...tmpUsers],
        status: [...dataSelect.status, ...tmpPrjStatus],
      });
    } else {
      dispatch(Actions.resetProject());
      if (type === "Remove") {
        toggleView();
        toast(t("success:remove_project"), {type: "success"});
        // Update list
        setLoading({...loading, remove: false, search: true});
        // Call api
        onStartGetData(
          formData.year,
          formData.statusID,
          formData.ownerID,
          formData.search,
          formData.page,
        );
        } else {
          let tmpData = {...data};
          tmpData.list = projectState["projects"];
          tmpData.count = projectState["numProjects"];
          setData(tmpData);
          setLoading({main: false, search: false, remove: false});
        } 
    }
  };

  const onError = error => {
    dispatch(Actions.resetProject());
    log('[LOG] === onError ===> ', error);
    toast(error, {type: "error"});
    setLoading({main: false, search: false, remove: false});
  };

  const onCloseForm = type => {
    dispatch(Actions.resetProject());
    toggleView();
    if (type === "Create" || type === "Update" || type === "Clone") {
      setLoading({...loading, search: true});
      // Call api
      onStartGetData(
        formData.year,
        formData.statusID,
        formData.ownerID,
        formData.search,
        formData.page,
      );
    }
  };

  const onConfirmRemove = () => {
    setLoading({...loading, remove: true});
    let params = {
      PrjID: updateItem?.prjID || "0",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchRemoveProject(params, history));
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (loading.main && authState["successSignIn"] && authState["menu"]) {
      let menu = checkIsWrite(authState["menu"], Routes.projects);
      if (menu) setIsWrite(menu.isWrite);
      return onCheckLocal();
    }
  }, [
    loading.main,
    authState["successSignIn"],
    authState["menu"],
  ]);

  useEffect(() => {
    if (loading.main) {
      if (!masterState["submittingGetAll"] && !masterState["submittingUsersByLogin"]) {
        if (masterState["successGetAll"] && !masterState["errorGetAll"] &&
          masterState["successUsersByLogin"] && !masterState["errorUsersByLogin"]) {
          return onSuccess("MasterData");
        }
        if (!masterState["successGetAll"] && masterState["errorGetAll"] &&
          !masterState["successUsersByLogin"] && masterState["errorUsersByLogin"]) {
          return onError(masterState["errorHelperGetAll"]);
        }
      }
    }
  }, [
    loading.main,
    masterState["submittingGetAll"],
    masterState["submittingUsersByLogin"],
    masterState["successGetAll"],
    masterState["successUsersByLogin"],
    masterState["errorGetAll"],
    masterState["errorUsersByLogin"],
  ]);

  useEffect(() => {
    if (loading.main || loading.search) {
      if (!projectState["submittingListProject"]) {
        if (projectState["successListProject"] && !projectState["errorListProject"]) {
          return onSuccess("List");
        }
        if (!projectState["successListProject"] && projectState["errorListProject"]) {
          return onError(projectState["errorHelperListProject"]);
        }
      }
    }
  }, [
    loading.main,
    loading.search,
    projectState["submittingListProject"],
    projectState["successListProject"],
    projectState["errorListProject"],
  ]);

  useEffect(() => {
    if (loading.remove) {
      if (!projectState["submittingRemoveProject"]) {
        if (projectState["successRemoveProject"] && !projectState["errorRemoveProject"]) {
          return onSuccess("Remove");
        }
        if (!projectState["successRemoveProject"] && projectState["errorRemoveProject"]) {
          toggleView();
          return onError(projectState["errorHelperRemoveProject"]);
        }
      }
    }
  }, [
    loading.remove,
    projectState["submittingRemoveProject"],
    projectState["successRemoveProject"],
    projectState["errorRemoveProject"],
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
              <BlockTitle tag="h4">{t("project:title")}</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                {isWrite && (
                  <ul className="nk-block-tools g-3">
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        disabled={disabled}
                        onClick={() => toggleView("add")}
                      >
                        <Icon name="plus"/>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        disabled={disabled}
                        onClick={() => toggleView("add")}
                      >
                        <Icon name="plus"/>
                        <span>{t("common:add_new")}</span>
                      </Button>
                    </li>
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
                        onClick={(ev) => {
                          ev.preventDefault();
                          !disabled && toggleView("search");
                        }}
                        className="btn btn-icon search-toggle toggle-search cursor-pointer"
                      >
                        <Icon name="search"/>
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
                          <Icon name="menu-right"/>
                        </Button>
                        <div className={`toggle-content ${sm ? "content-active" : ""}`}>
                          <ul className="btn-toolbar gx-1">
                            <li className="toggle-close">
                              <Button className="btn-icon btn-trigger toggle" disabled={disabled} onClick={toggleSm}>
                                <Icon name="arrow-left"/>
                              </Button>
                            </li>
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <div className="dot dot-primary"></div>
                                  <Icon name="filter-alt"/>
                                </DropdownToggle>
                                <DropdownMenu
                                  right
                                  className="filter-wg dropdown-menu-xl"
                                  style={{overflow: "visible"}}>
                                  <div className="dropdown-head">
                                    <h6>{t("project:filter_project")}</h6>
                                  </div>
                                  <div className="dropdown-body dropdown-body-rg">
                                    <Row className="gx-6 gy-3">
                                      <Col size="12">
                                        <FormGroup className="form-group" style={{zIndex: 10000}}>
                                          <label className="overline-title overline-title-alt">
                                            {t("project:year")}
                                          </label>
                                          <DatePicker
                                            className="form-control"
                                            disabled={disabled}
                                            dateFormat="yyyy"
                                            showYearPicker
                                            selected={formData.year}
                                            onChange={onChangeYear}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col size="12">
                                        <FormGroup className="form-group">
                                          <label className="overline-title overline-title-alt">
                                            {t("project:status")}
                                          </label>
                                          <RSelect
                                            name="status"
                                            isMulti={false}
                                            isDisabled={disabled}
                                            options={dataSelect.status}
                                            value={formData.statusID}
                                            placeholder={t("project:holder_status")}
                                            formatOptionLabel={RowSelectStatus}
                                            onChange={e => onChangeSelect({key: "statusID", value: e})}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col size="12">
                                        <FormGroup className="form-group">
                                          <label className="overline-title overline-title-alt">
                                            {t("project:owner")}
                                          </label>
                                          <RSelect
                                            name="owner"
                                            isMulti={false}
                                            isDisabled={disabled}
                                            options={dataSelect.employees}
                                            value={formData.ownerID}
                                            placeholder={t("project:holder_owner")}
                                            onChange={e => onChangeSelect({key: "ownerID", value: e})}
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="dropdown-foot between">
                                    <Button color="primary" disabled={disabled} onClick={onSearchFilter}>
                                      {loading.search && <Spinner size="sm" color="light" />}
                                      {!loading.search && <Icon name="filter"/>}
                                      <span>{t("common:filter")}</span>
                                    </Button>
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
                      <Icon name="arrow-left"/>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      disabled={disabled}
                      value={formData.search}
                      placeholder={t("common:search")}
                      onKeyDown={ev => {
                        if (ev.code === "Enter") onSearch();
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
                      <Icon name="search"/>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/** Data table */}
            <TableProject
              loading={disabled}
              isWrite={isWrite}
              disabled={disabled}
              dataProjects={data.list}
              onDetails={onDetails}
              onUpdate={onUpdate}
              onClone={onClone}
              onRemove={onRemove}
            />

            {/** Paging table */}
            <PreviewAltCard>
            {!disabled ? (
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
              )) : (
              <div className="text-center">
                <Spinner size="sm" color="primary" />
              </div>
            )}
            </PreviewAltCard>
          </DataTable>
        </Block>
      </Content>

      {/** Forms */}
      <AddEditProjectForm
        show={view.add || view.update || view.clone}
        history={history}
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
        title={t("project:confirm_remove_prj_title")}
        content={
          <>
            {t("project:confirm_remove_prj_des_1")}
            <span className="fw-bold"> #{updateItem?.prjID} </span>
            {t("project:confirm_remove_prj_des_2")}
          </>
        }
        onConfirm={onConfirmRemove}
        onClose={toggleView}
      />

      {view.add && <div className="toggle-overlay" onClick={toggleView}></div>}
      {view.update && <div className="toggle-overlay" onClick={toggleView}></div>}
      {view.clone && <div className="toggle-overlay" onClick={toggleView}></div>}
      <Loading show={disabled} />
    </React.Fragment>
  );
};

export default ListProjects;
