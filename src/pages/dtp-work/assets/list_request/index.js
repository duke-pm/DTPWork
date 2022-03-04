import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
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
} from "components/Component";
import TableRequest from "./table";
import ProcessModal from "../list_request_handle/modal/Process";
import DetailsModal from "./modal/Details";
import AddAllowForm from "./form/AddAllow";
import AddDamLosForm from "./form/AddDamLos";
/** COMMON */
import Configs from "configs";
import Routes from "route/routes";
import Constants from "utils/constants";
import {getLocalStorage, setLocalStorage, log} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";

const TabItem = ({
  index = 0,
  tab = "1",
  curTab = 0,
  label = "",
  disabled = false,
  onChange = () => null,
}) => {
  return (
    <li className={`${index === curTab && "active"}`}>
      <a href={index !== curTab ? `#tab_${tab}` : undefined}
        onClick={(ev) => !disabled && onChange(ev, index)}>
        <span className={`sub-text ${index === curTab && "text-primary"}`}>{label}</span>
      </a>
    </li>
  )
}

function RequestAssets(props) {
  const {t} = useTranslation();
  const history = useHistory();

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [tabs, setTabs] = useState([
    {
      id: "assets",
      label: t("request_approved:assets_title"),
      type: "listAssetsApproved",
      typeCount: "numAssetsApproved",
      typeRequest: 1,
      statusRequest: [1, 2, 3, 4],
      page: 1,
      search: "",
      data: [],
      count: 0,
    },
    {
      id: "damage",
      label: t("request_approved:damage_title"),
      type: "listAssetsDamaged",
      typeCount: "numAssetsDamaged",
      typeRequest: 2,
      statusRequest: [1, 2, 3, 4],
      page: 1,
      search: "",
      data: [],
      count: 0,
    },
    {
      id: "lost",
      label: t("request_approved:lost_title"),
      type: "listAssetsLosted",
      typeCount: "numAssetsLosted",
      typeRequest: 3,
      statusRequest: [1, 2, 3, 4],
      page: 1,
      search: "",
      data: [],
      count: 0,
    },
  ]);
  const [isWrite, setIsWrite] = useState(false);
  const [loading, setLoading] = useState({
    main: true,
    search: false,
  });
  const [sm, updateSm] = useState(false);
  const [view, setView] = useState({
    search: false,
    addAllow: false,
    addDamLos: false,
    details: false,
    process: false,
  });
  const [rangeDate, setRangeDate] = useState({
    start: new Date(moment().startOf('month').format('YYYY/MM/DD')),
    end: new Date(moment().endOf('month').format('YYYY/MM/DD')),
  });
  const [filterTab, setFilterTab] = useState(0);
  const [updateItem, setUpdateItem] = useState(null);
  const [detailsItem, setDetailsItem] = useState([]);

  /**
   ** FUNCTIONS
   */
  const toggleSm = () => updateSm(!sm);

  const onChangeSearch = (e) => {
    let tmpTabs = [...tabs];
    tmpTabs[filterTab].search = e.target.value.trim();
    setTabs(tmpTabs);
  };

  const onChangeDate = (type, date) => {
    setRangeDate({...rangeDate, [type]: date});
  }

  const onChangeStatus = e => {
    let tmpTabs = [...tabs];
    let tmpFormData = {...tmpTabs[filterTab]};
    if (e.target.name === "wait") {
      if (tmpFormData.statusRequest.includes(1))
        tmpFormData.statusRequest = tmpFormData.statusRequest.filter(f => f !== 1);
      else tmpFormData.statusRequest.push(1);
    }
    if (e.target.name === "approved") {
      if (tmpFormData.statusRequest.includes(2))
        tmpFormData.statusRequest = tmpFormData.statusRequest.filter(f => (f !== 2 && f !== 3));
      else {
        tmpFormData.statusRequest.push(2);
        tmpFormData.statusRequest.push(3);
      }
    }
    if (e.target.name === "reject") {
      if (tmpFormData.statusRequest.includes(4))
        tmpFormData.statusRequest = tmpFormData.statusRequest.filter(f => f !== 4);
      else tmpFormData.statusRequest.push(4);
    }
    tmpTabs[filterTab] = tmpFormData;
    setTabs(tmpTabs);
  };

  const toggleView = type => {
    if (type === "search" && view.search) {
      setView({...view, search: false});
      if (tabs[filterTab].search === "") {
        onSearch(null, filterTab);
      }
    } else {
      setView({
        search: type === "search" ? true : false,
        addAllow: type === "addAllow" ? true : false,
        addDamLos: type === "addDamLos" ? true : false,
        details: type === "details" ? true : false,
        process: type === "process" ? true : false,
      });
      if (!type && updateItem) {
        setUpdateItem(null);
        setDetailsItem([]);
      } 
    }
  };

  const onToggleAdd = () => {
    if (filterTab === 0) {
      toggleView("addAllow");
    } else {
      toggleView("addDamLos");
    }
  };

  const paginate = pageNumber => {
    if (pageNumber !== tabs[filterTab].page) {
      let tmpTabs = [...tabs];
      tmpTabs[filterTab].page = pageNumber;
      setTabs(tmpTabs);
      onChangePage(pageNumber);
    }
  };

  const onResetFilter = () => {
    let tmpTabs = [...tabs];
    let tmpFormData = tmpTabs[filterTab];
    tmpFormData = {
      ...tmpFormData,
      statusRequest: [1, 2, 3, 4],
    };
    tmpTabs[filterTab] = tmpFormData;
    setTabs(tmpTabs);
    setRangeDate({
      start: new Date(moment().startOf('month').format('YYYY/MM/DD')),
      end: new Date(moment().endOf('month').format('YYYY/MM/DD')),
    });
  };

  const onProcess = dataRequest => {
    toggleView("process");
    setUpdateItem(dataRequest);
  };

  const onDetails = dataRequest => {
    toggleView("details");
    setUpdateItem(dataRequest);
    if (filterTab === 0) {
      let fDetails = approvedState["listDetailsApproved"].filter(f =>
        f.requestID === dataRequest.requestID);
      setDetailsItem(fDetails);
    } else {
      setDetailsItem([]);
    }
  };

  const onCheckLocal = () => {
    let fFromToDate = getLocalStorage(Constants.LS_FROM_TO_REQUEST);
    if (fFromToDate) {
      setRangeDate({
        start: new Date(fFromToDate.start),
        end: new Date(fFromToDate.end),
      });
      onStartGetData(
        fFromToDate.start,
        fFromToDate.end,
        filterTab,
        tabs[filterTab].search,
        tabs[filterTab].typeRequest,
      );
    } else {
      onStartGetData();
    }
  };

  const onStartGetData = (
    fromDate = moment(rangeDate.start).format("YYYY-MM-DD"),
    toDate = moment(rangeDate.end).format("YYYY-MM-DD"),
    idxActive = 0,
    search = "",
    type = 1,
    status = [1, 2, 3, 4],
    page = 1,
  ) => {
    let tabActive = tabs[idxActive];
    let params = {
      FromDate: fromDate,
      ToDate: toDate,
      Search: search,
      StatusID: status.join(),
      RequestTypeID: type + "",
      IsResolveRequest: false,
      PageSize: Configs.perPage,
      PageNum: page,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchListRequest(tabActive.type, params, history));
  };

  const onChangeTab = (ev, idxTab) => {
    ev.preventDefault();
    if (!loading.main && filterTab !== idxTab) {
      setLoading({...loading, search: true});
      // Update active tab
      let tmpTabs = [...tabs];
      tmpTabs[idxTab].page = 1;
      setTabs(tmpTabs);
      setFilterTab(idxTab);
      // Call api
      onStartGetData(
        undefined,
        undefined,
        idxTab,
        tmpTabs[idxTab].search,
        tmpTabs[idxTab].typeRequest,
        tmpTabs[idxTab].statusRequest,
        1,
      );
    }
  };

  const onChangePage = (idxTab, newPage) => {
    if (!loading.main) {
      setLoading({...loading, search: true});
      // Update active page of tab
      let tmpTabs = [...tabs];
      tmpTabs[idxTab].page = newPage;
      setTabs(tmpTabs);
      // Call api
      onStartGetData(
        undefined,
        undefined,
        idxTab,
        tmpTabs[idxTab].search,
        tmpTabs[idxTab].typeRequest,
        tmpTabs[idxTab].statusRequest,
        newPage,
      );
    }
  };

  const onSearch = (ev, idxTab) => {
    ev && ev.preventDefault();
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Update active page of tab
      let tmpTabs = [...tabs];
      tmpTabs[idxTab].page = 1;
      setTabs(tmpTabs);
      // Call api
      onStartGetData(
        undefined,
        undefined,
        idxTab,
        tmpTabs[idxTab].search,
        tmpTabs[idxTab].typeRequest,
        tmpTabs[idxTab].statusRequest,
        1,
      );
    }
  };

  const onSearchFilter = () => {
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Update active page of tab
      let tmpTabs = [...tabs];
      tmpTabs[filterTab].page = 1;
      setTabs(tmpTabs);
      // Save to local storage
      setLocalStorage(Constants.LS_FROM_TO_REQUEST, {
        start: moment(rangeDate.start).format('YYYY/MM/DD'),
        end: moment(rangeDate.end).format('YYYY/MM/DD'),
      });
      // Call api
      onStartGetData(
        undefined,
        undefined,
        filterTab,
        tabs[filterTab].search,
        tabs[filterTab].typeRequest,
        tabs[filterTab].statusRequest,
        1,
      );
    }
  };

  const onPrepareData = () => {
    let tmpTabs = [...tabs],
      tabItem = null;
    // Update count item on every tab
    for (tabItem of tmpTabs) {
      tabItem.count = approvedState[tabItem.typeCount];
    }
    // Update data item on active tab
    tmpTabs[filterTab].data = approvedState[tmpTabs[filterTab].type];
    
    setTabs(tmpTabs);
    setLoading({main: false, search: false});
  };

  const onCloseAddForm = (isSuccess, message) => {
    dispatch(Actions.fResetApprovedRequest());
    toggleView();
    if (isSuccess) {
      toast(message, {type: "success"});
    } else {
      toast(message || t("error:title"), {type: "error"});
    }
    // If success => call api to get new data
    if (isSuccess) {
      setLoading({...loading, main: true});
    }
  };

  const onError = error => {
    log('[LOG] === Error ===> ', error);
    setLoading({main: false, search: false});
    toast(error, {type: "error"});
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
            fMenuRequest = item.subMenu.find(f => f.link === Routes.requestsApproved);
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
    if (loading.main || loading.search) {
      if (!approvedState["submittingListRequest"]) {
        if (approvedState["successListRequest"] && !approvedState["errorListRequest"]) {
          return onPrepareData();
        }

        if (!approvedState["successListRequest"] && approvedState["errorListRequest"]) {
          return onError(approvedState["errorHelperListRequest"]);
        }
      }
    }
  }, [
    loading.main,
    loading.search,
    approvedState["submittingListRequest"],
    approvedState["successListRequest"],
    approvedState["errorListRequest"]
  ]);

  /**
   ** RENDER
   */
  const disabled = loading.main || loading.search;
  return (
    <React.Fragment>
      <Head title={t("assets:title")}></Head>
      <Content>
        {/** Header table */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h4">{t("request_approved:title")}</BlockTitle>
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
                        onClick={onToggleAdd}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        disabled={disabled}
                        onClick={onToggleAdd}
                      >
                        <Icon name="plus"></Icon>
                        {filterTab === 0 && (
                          <span>{t("request_approved:add_assets")}</span>
                        )}
                        {filterTab === 1 && (
                          <span>{t("request_approved:add_damage")}</span>
                        )}
                        {filterTab === 2 && (
                          <span>{t("request_approved:add_lost")}</span>
                        )}
                      </Button>
                    </li>
                  </ul>
                )}
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        {/** Content table */}
        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools">
                  <ul className="card-tools-nav">
                    {tabs.map((item, index) => {
                      return (
                        <TabItem
                          key={item.id + "_tab_" + index}
                          index={index}
                          tab={item.id}
                          curTab={filterTab}
                          disabled={disabled}
                          label={`${item.label} (${item.count})`}
                          onChange={onChangeTab}
                        />
                      )
                    })}
                  </ul>
                </div>
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
                                      {t("request_approved:filter_request").toUpperCase()}
                                    </h6>
                                  </div>
                                  <div className="dropdown-body dropdown-body-rg">
                                    <Row className="gx-6 gy-3">
                                      <Col md="6">
                                        <FormGroup className="form-group" style={{zIndex: 10000}}>
                                          <label className="overline-title overline-title-alt">
                                            {t("common:from_date")}
                                          </label>
                                          <DatePicker
                                            className="form-control"
                                            wrapperClassName="start-m"
                                            selected={rangeDate.start}
                                            dateFormat="dd/MM/yyyy"
                                            startDate={rangeDate.start}
                                            endDate={rangeDate.end}
                                            disabled={disabled}
                                            selectsStart
                                            onChange={date => onChangeDate("start", date)}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col md="6">
                                        <FormGroup className="form-group" style={{zIndex: 10000}}>
                                          <label className="overline-title overline-title-alt">
                                            {t("common:to_date")}
                                          </label>
                                          <DatePicker
                                            className="form-control"
                                            wrapperClassName="end-m"
                                            selected={rangeDate.end}
                                            dateFormat="dd/MM/yyyy"
                                            startDate={rangeDate.start}
                                            endDate={rangeDate.end}
                                            minDate={rangeDate.start}
                                            disabled={disabled}
                                            selectsEnd
                                            onChange={date => onChangeDate("end", date)}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col size="12">
                                        <FormGroup className="form-group">
                                          <label className="overline-title overline-title-alt">
                                            {t("request_approved:status_request")}
                                          </label>
                                          <ul className="custom-control-group g-3 align-center">
                                            <li>
                                              <div className="custom-control custom-control-sm custom-checkbox">
                                                <input
                                                  className="custom-control-input form-control"
                                                  id="wait"
                                                  name="wait"
                                                  type="checkbox"
                                                  disabled={disabled}
                                                  value={1}
                                                  checked={tabs[filterTab].statusRequest.includes(1)}
                                                  onChange={onChangeStatus}
                                                />
                                                <label className="custom-control-label" htmlFor="wait">
                                                  {t("request_approved:wait")}
                                                </label>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="custom-control custom-control-sm custom-checkbox">
                                                <input
                                                  className="custom-control-input form-control"
                                                  id="approved"
                                                  name="approved"
                                                  type="checkbox"
                                                  disabled={disabled}
                                                  value={2}
                                                  checked={tabs[filterTab].statusRequest.includes(2)}
                                                  onChange={onChangeStatus}
                                                />
                                                <label className="custom-control-label " htmlFor="approved">
                                                  {t("request_approved:approved")}
                                                </label>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="custom-control custom-control-sm custom-checkbox">
                                                <input
                                                  className="custom-control-input form-control"
                                                  id="reject"
                                                  name="reject"
                                                  type="checkbox"
                                                  value={4}
                                                  checked={tabs[filterTab].statusRequest.includes(4)}
                                                  onChange={onChangeStatus}
                                                />
                                                <label className="custom-control-label" htmlFor="reject">
                                                  {t("request_approved:reject")}
                                                </label>
                                              </div>
                                            </li>
                                          </ul>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="dropdown-foot between">
                                    <Button color="primary" disabled={disabled} onClick={onSearchFilter}>
                                      <Icon name="filter"></Icon>
                                      <span>{t("common:filter")}</span>
                                    </Button>
                                    <Button className="btn-dim" color="secondary" disabled={disabled} onClick={onResetFilter}>
                                      <Icon name="undo"></Icon>
                                      <span>{t("common:reset")}</span>
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
                      onClick={(ev) => {
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
                      value={tabs[filterTab].search}
                      placeholder={t("common:search")}
                      onKeyDown={ev => {
                        if (ev.key === "Enter") onSearch(ev, filterTab);
                      }}
                      onChange={onChangeSearch}
                    />
                    <Button
                      className="search-submit btn-icon"
                      onClick={ev => onSearch(ev, filterTab)}
                    >
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/** Data table */}
            <div className="tab-content">
              {tabs.map((itemT, indexT) => {
                return (
                  <div className={`tab-pane ${filterTab === indexT && "active"}`}
                    key={"tab_" + itemT.id + indexT}>
                    {!loading.main && !loading.search && (
                      <TableRequest
                        typeRequest={itemT.typeRequest}
                        dataRequest={itemT.data}
                        onProcess={onProcess}
                        onDetails={onDetails}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/** Paging table */}
            <PreviewAltCard className={`${tabs[filterTab].count > 0 && "border-top"}`}>
              {disabled ? (
                <div className="text-center">
                  <Spinner size="sm" color="primary" />
                </div>
              ) : 
              tabs[filterTab].data.length > 0 ? (
                <PaginationComponent
                  itemPerPage={Configs.perPage}
                  totalItems={tabs[filterTab].count}
                  currentPage={tabs[filterTab].page}
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

        <ProcessModal
          show={view.process}
          dataRequest={updateItem}
          onClose={toggleView}
        />

        <DetailsModal
          show={view.details}
          typeRequest={updateItem?.requestTypeID}
          dataRequest={updateItem}
          dataDetails={detailsItem}
          onClose={toggleView}
        />

        <AddAllowForm
          show={view.addAllow}
          history={history}
          commonState={commonState}
          authState={authState}
          onClose={onCloseAddForm}
        />

        <AddDamLosForm
          show={view.addDamLos}
          typeRequest={filterTab === 1
            ? "damage"
            : filterTab === 2
              ? "lost"
              : "allow"}
          history={history}
          commonState={commonState}
          authState={authState}
          onClose={onCloseAddForm}
        />

        {view.addAllow && <div className="toggle-overlay" onClick={toggleView}></div>}
        {view.addDamLos && <div className="toggle-overlay" onClick={toggleView}></div>}
      </Content>
    </React.Fragment>
  );
};

export default RequestAssets;
