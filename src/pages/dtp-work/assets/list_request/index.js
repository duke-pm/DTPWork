import React, {useState, useEffect, createContext} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
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
  BlockTitle,
  Icon,
  Button,
  BlockBetween,
} from "components/Component";
import TableRequest from "./table";
import ProcessModal from "../list_request_handle/modal/Process";
import DetailsModal from "./modal/Details";
/** COMMON */
import Configs from "configs";
/** REDUX */
import * as Actions from "redux/actions";
import Constants from "utils/constants";
import { getLocalStorage, setLocalStorage } from "utils/Utils";
import AddAllowForm from "./form/AddAllow";
import AddDamLosForm from "./form/AddDamLos";

const TabItem = ({
  index = 0,
  tab = "1",
  curTab = 0,
  label = "",
  onChange = () => null,
}) => {
  return (
    <li className="nav-item">
      <a
        className={`nav-link ${index === curTab && "active"}`}
        data-toggle="tab"
        href={`#tab${tab}`}
        onClick={(ev) => onChange(ev, index)}
      >
        {label}
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
      statusRequest: "1,2,3,4",
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
      statusRequest: "1,2,3,4",
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
      statusRequest: "1,2,3,4",
      page: 1,
      search: "",
      data: [],
      count: 0,
    },
  ]);
  const [loading, setLoading] = useState({
    main: true,
    search: false,
  });
  const [sm, updateSm] = useState(false);
  const [view, setView] = useState({
    addAllow: false,
    addDamLos: false,
    details: false,
    process: false,
  });
  const [searchText, setSearchText] = useState("");
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

  const onChangeSearch = (e) => setSearchText(e.target.value.trim());

  const onChangeDate = (type, date) => {
    setRangeDate({...rangeDate, [type]: date});
    if (type === "end") onSearchByDate();
  }

  const toggleView = type => {
    setView({
      addAllow: type === "addAllow" ? true : false,
      addDamLos: type === "addDamLos" ? true : false,
      details: type === "details" ? true : false,
      process: type === "process" ? true : false,
    });
    if (!type && updateItem) {
      setUpdateItem(null);
      setDetailsItem([]);
    }
  };

  const onToggleAdd = () => {
    if (filterTab === 0) {
      toggleView("addAllow");
    } else {
      toggleView("addDamLos");
    }
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
    type = "1",
    status = "1,2,3,4",
    page = 1,
  ) => {
    let tabActive = tabs[idxActive];
    let params = {
      FromDate: fromDate,
      ToDate: toDate,
      Search: search,
      StatusID: status,
      RequestTypeID: type,
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
    if (!loading.main) {
      setLoading({...loading, search: true});
      // Update active tab
      let tmpTabs = [...tabs];
      tmpTabs[idxTab].page = 1;
      setTabs(tmpTabs);
      setSearchText(tmpTabs[idxTab].search);
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
    ev.preventDefault();
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Update active page of tab
      let tmpTabs = [...tabs];
      tmpTabs[idxTab].page = 1;
      tmpTabs[idxTab].search = searchText;
      setTabs(tmpTabs);
      // Call api
      onStartGetData(
        undefined,
        undefined,
        idxTab,
        searchText,
        tmpTabs[idxTab].typeRequest,
        tmpTabs[idxTab].statusRequest,
        1,
      );
    }
  };

  const onSearchByDate = () => {
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
    console.log('[LOG] === Error ===> ', error);
    setLoading({main: false, search: false});
    toast(error, {type: "error"});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (loading.main && authState["successSignIn"]) {
      onCheckLocal();
    }
  }, [
    loading.main,
    authState["successSignIn"]
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
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={toggleSm}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="input-daterange date-picker-range input-group justify-content-end">
                          <DatePicker
                            className="form-control"
                            wrapperClassName="start-m"
                            selected={rangeDate.start}
                            onChange={date => onChangeDate("start", date)}
                            dateFormat="dd/MM/yyyy"
                            selectsStart
                            startDate={rangeDate.start}
                            endDate={rangeDate.end}
                            disabled={disabled}
                          />{" "}
                          <div className="input-group-addon fw-bold">{t("common:to")}</div>
                          <DatePicker
                            className="form-control"
                            wrapperClassName="end-m"
                            selected={rangeDate.end}
                            onChange={date => onChangeDate("end", date)}
                            dateFormat="dd/MM/yyyy"
                            startDate={rangeDate.start}
                            endDate={rangeDate.end}
                            selectsEnd
                            minDate={rangeDate.start}
                            disabled={disabled}
                          />
                          <div className="input-group-addon pl-4">
                            <a className="form-icon form-icon-right"
                              href="#searchDate"
                              onClick={onSearchByDate}>
                              <Icon name="search"></Icon>
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="form-control-wrap">
                        <a className="form-icon form-icon-right"
                          href="#search"
                          onClick={ev => onSearch(ev, filterTab)}>
                          <Icon name="search"></Icon>
                        </a>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          value={searchText}
                          placeholder={t("common:search")}
                          onChange={onChangeSearch}
                        />
                      </div>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={onToggleAdd}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
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
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        {/** Content table */}
        <Block>
          <ul className="nav nav-tabs">
            {tabs.map((item, index) => {
              return (
                <TabItem
                  key={item.id + "_tab_" + index}
                  index={index}
                  tab={item.id}
                  curTab={filterTab}
                  label={`${item.label} (${item.count})`}
                  onChange={onChangeTab}
                />
              )
            })}
          </ul>
          <div className="tab-content">
            <div className={`tab-pane ${filterTab === 0 && "active"}`} id="tabAssets">
              {!loading.main && !loading.search && (
                <TableRequest
                  loadingTable={disabled}
                  idxTab={filterTab}
                  curPage={tabs[filterTab].page}
                  countItem={tabs[filterTab].count}
                  dataRequest={tabs[filterTab].data}
                  onChangePage={onChangePage}
                  onProcess={onProcess}
                  onDetails={onDetails}
                />
              )}
            </div>
            <div className={`tab-pane ${filterTab === 1 && "active"}`} id="tabDamaged">
              {!loading.main && !loading.search && (
                <TableRequest
                  loadingTable={disabled}
                  idxTab={filterTab}
                  curPage={tabs[filterTab].page}
                  countItem={tabs[filterTab].count}
                  dataRequest={tabs[filterTab].data}
                  onChangePage={onChangePage}
                  onProcess={onProcess}
                  onDetails={onDetails}
                />
              )}
            </div>
            <div className={`tab-pane ${filterTab === 2 && "active"}`} id="tabLosted">
              {!loading.main && !loading.search && (
                <TableRequest
                  loadingTable={disabled}
                  idxTab={filterTab}
                  curPage={tabs[filterTab].page}
                  countItem={tabs[filterTab].count}
                  dataRequest={tabs[filterTab].data}
                  onChangePage={onChangePage}
                  onProcess={onProcess}
                  onDetails={onDetails}
                />
              )}
            </div>
            {disabled && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" />
              </div>
            )}
          </div>
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
