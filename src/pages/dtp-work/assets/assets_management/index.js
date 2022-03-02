import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
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
} from "components/Component";
import TableAssets from "./table";
import AddEditForm from "./form/AddEdit";
import ApprovedForm from "./form/Approved";
import RepairForm from "./form/Repair";
import LiquidationForm from "./form/Liquidation";
import ReUseForm from "./form/ReUse";
/** COMMON */
import Configs from "configs";
import Routes from "services/routesApi";
import {getCookies} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";

const TabItem = ({
  index = 0,
  tab = "1",
  curTab = 0,
  label = "",
  onChange = () => null,
}) => {
  return (
    <li className={`${index === curTab && "active"}`}>
      <a href={index !== curTab ? `#tab_${tab}` : undefined}
        onClick={(ev) => onChange(ev, index)}>
        <span className={`sub-text ${index === curTab && "text-primary"}`}>
          {label}
        </span>
      </a>
    </li>
  )
}

let callbackF = null;

function AssetsManagement(props) {
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
      id: "0",
      label: t("assets:all"),
      type: "listAssetsAll",
      typeCount: "numAssetsAll",
      page: 1,
      search: "",
      data: [],
      count: 0,
    },
    {
      id: "1",
      label: t("assets:not_use"),
      type: "listAssetsNotUse",
      typeCount: "numAssetsNotUse",
      page: 1,
      search: "",
      data: [],
      count: 0,
    },
    {
      id: "2",
      label: t("assets:using"),
      type: "listAssetsUsing",
      typeCount: "numAssetsUsing",
      page: 1,
      search: "",
      data: [],
      count: 0,
    },
    {
      id: "3",
      label: t("assets:repair_insurance"),
      type: "listAssetsRepair",
      typeCount: "numAssetsRepair",
      page: 1,
      search: "",
      data: [],
      count: 0,
    },
    {
      id: "4",
      label: t("assets:damage_lost"),
      type: "listAssetsDamageLost",
      typeCountDamage: "numAssetsDamage",
      typeCountLost: "numAssetsLost",
      page: 1,
      search: "",
      data: [],
      countDamage: 0,
      countLost: 0
    },
    {
      id: "6",
      label: t("assets:liquidation"),
      type: "listAssetsLiquidation",
      typeCount: "numAssetsLiquidation",
      page: 1,
      search: "",
      data: [],
      count: 0,
    },
  ]);
  const [loading, setLoading] = useState({
    main: true,
    search: false,
    getData: false,
  });
  const [view, setView] = useState({
    search: false,
    add: false,
    update: false,
    approved: false,
    recall: false,
    repair: false,
    liquidation: false,
    reuse: false,
  });
  const [filterTab, setFilterTab] = useState(0);
  const [updateItem, setUpdateItem] = useState(null);
  const [updateHistory, setUpdateHistory] = useState(null);

  /**
   ** FUNCTIONS
   */
  const onChangeSearch = (e) => {
    let tmpTabs = [...tabs];
    tmpTabs[filterTab].search = e.target.value.trim();
    setTabs(tmpTabs);
  };

  const paginate = pageNumber => {
    if (pageNumber !== tabs[filterTab].page) {
      let tmpTabs = [...tabs];
      tmpTabs[filterTab].page = pageNumber;
      setTabs(tmpTabs);
      onChangePage(filterTab, pageNumber);
    }
  };

  const toggleView = (type, callback) => {
    if (type === "search" && view.search) {
      setView({...view, search: false});
      if (tabs[filterTab].search === "") {
        onSearch(null, filterTab);
      }
    } else {
      if ((type === "update" || type === "approved" ||
      type === "recall" || type === "repair" ||
      type === "liquidation" || type === "reuse")
      && callback && callbackF) {
        callbackF();
      }
      setView({
        search: type === "search" ? true : false,
        add: type === "add" ? true : false,
        update: (type === "update" && !callback) ? true : false,
        approved: (type === "approved" && !callback) ? true : false,
        recall: (type === "recall" && !callback) ? true : false,
        repair: (type === "repair" && !callback) ? true : false,
        liquidation: (type === "liquidation" && !callback) ? true : false,
        reuse: (type === "reuse" && !callback) ? true : false,
      });
      if (!type && updateItem) setUpdateItem(null);
    }
  };

  const onStartGetData = (
    idxActive = 0,
    statusID = "0",
    page = 1,
    search = "",
  ) => {
    let tabActive = tabs[idxActive];
    let params = {
      StatusID: statusID,
      PageSize: Configs.perPage,
      PageNum: page,
      Search: search,
      SortColumn: "",
      SortDirection: "desc",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchListAssets(tabActive.type, params, history));
  };

  const onSearch = (ev, idxTab) => {
    ev && ev.preventDefault();
    if (!loading.search) {}
      setLoading({...loading, search: true});
      // Update active page of tab
      let tmpTabs = [...tabs];
      tmpTabs[idxTab].page = 1;
      setTabs(tmpTabs);
      // Call api
      onStartGetData(
        filterTab,
        tmpTabs[idxTab].id,
        1,
        tmpTabs[idxTab].search,
    );
  };

  const onChangeTab = (ev, idxTab) => {
    ev.preventDefault();
    if (!loading.search && filterTab !== idxTab) {
      setLoading({...loading, search: true});
      // Update active tab
      let tmpTabs = [...tabs];
      tmpTabs[idxTab].page = 1;
      setTabs(tmpTabs);
      setFilterTab(idxTab);
      // Call api
      onStartGetData(
        idxTab,
        tmpTabs[idxTab].id,
        1,
        tmpTabs[idxTab].search,
      );
    }
  };

  const onChangePage = (idxTab, newPage) => {
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Update active page of tab
      let tmpTabs = [...tabs];
      tmpTabs[idxTab].page = newPage;
      setTabs(tmpTabs);
      // Call api
      onStartGetData(
        filterTab,
        tmpTabs[idxTab].id,
        newPage,
        tmpTabs[idxTab].search,
      );
    }
  };

  const onUpdateHistory = (dataAsset, itemHistory, callbackFunc) => {
    let typeUpdate = "";
    switch (itemHistory.transStatus) {
      case 2:
        typeUpdate = "approved";
        break;
      case 3:
        typeUpdate = "repair";
        break;
      case 6:
        typeUpdate = "liquidation";
        break;
      case 7:
        typeUpdate = "recall";
        break;
      case 8:
        typeUpdate = "reuse";
        break;
    }
    if (typeUpdate !== "") {
      callbackF = callbackFunc;
      setUpdateHistory(itemHistory);
      setUpdateItem(dataAsset);
      toggleView(typeUpdate);
    } else {
      callbackF = null;
      setUpdateHistory(null);
    }
  };

  const onUpdateItem = (item, callbackFunc) => {
    callbackF = callbackFunc;
    setUpdateItem(item);
    toggleView("update");
  };

  const onApprovedRecallItem = (type, item) => {
    callbackF = null;
    setUpdateHistory(null);
    setUpdateItem(item);
    toggleView(type);
  };

  const onRepairItem = item => {
    callbackF = null;
    setUpdateHistory(null);
    setUpdateItem(item);
    toggleView("repair");
  };

  const onLiquidationItem = item => {
    callbackF = null;
    setUpdateHistory(null);
    setUpdateItem(item);
    toggleView("liquidation");
  };

  const onReuseItem = item => {
    callbackF = null;
    setUpdateHistory(null);
    setUpdateItem(item);
    toggleView("reuse");
  };

  const onGetEmployee = () => {
    setLoading({...loading, getData: true});
    let params = {
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchDataEmployee(params, history));
  };

  const onExportData = () => {
    let tmpAccessToken = getCookies("access_token");
    if (tmpAccessToken) {
      let params = {
        UserToken: tmpAccessToken
      }
      window.location = `${Configs.hostAPI}/${Configs.prefixAPI}${
        Routes.APPROVED.EXPORT_ASSETS
      }?value=${JSON.stringify(params)}`;
    }
  };

  const onPrepareData = () => {
    let tmpTabs = [...tabs],
      tabItem = null;
    // Update count item on every tab
    for (tabItem of tmpTabs) {
      tabItem.count = approvedState[tabItem.typeCount];
      tabItem.countDamage = approvedState[tabItem.typeCountDamage];
      tabItem.countLost = approvedState[tabItem.typeCountLost];
    }

    // Update data item on active tab
    tmpTabs[filterTab].data = approvedState[tmpTabs[filterTab].type];
    
    setTabs(tmpTabs);
    setLoading({main: false, search: false, getData: false});
  };

  const onCloseAddEditForm = (isSuccess, message, type = null, isHistory = false) => {
    dispatch(Actions.fResetCreateAssets());
    toggleView(type, isHistory);
    if (isSuccess) {
      toast(message, {type: "success"});
    } else {
      toast(message || t("error:title"), {type: "error"});
    }
    // If success => call fetch to get new data
    if (!isHistory && isSuccess) {
      setLoading({...loading, main: true});
      onStartGetData(
        filterTab,
        tabs[filterTab].id,
        tabs[filterTab].page,
        tabs[filterTab].search,
      );
    }
  };

  const onSuccess = type => {
    let tmphelper = "";
    if (type === "GetData") {
      tmphelper = "success:get_data";
    }
    setLoading({main: false, search: false, getData: false});
    tmphelper!== "" && toast(tmphelper, {type: "success"});
  };

  const onError = error => {
    console.log('[LOG] === Error ===> ', error);
    setLoading({main: false, search: false, getData: false});
    toast(error, {type: "error"});
  };

  /** 
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (loading.main && authState["successSignIn"]) {
      onStartGetData();
    }
  }, [
    loading.main,
    authState["successSignIn"]
  ]);

  useEffect(() => {
    if (loading.main || loading.search) {
      if (!approvedState["submittingListAssets"]) {
        if (approvedState["successListAssets"] && !approvedState["errorListAssets"]) {
          return onPrepareData();
        }

        if (!approvedState["successListAssets"] && approvedState["errorListAssets"]) {
          return onError(approvedState["errorHelperListAssets"]);
        }
      }
    }
  }, [
    loading.main,
    loading.search,
    approvedState["submittingListAssets"],
    approvedState["successListAssets"],
    approvedState["errorListAssets"]
  ]);

  useEffect(() => {
    if (loading.getData) {
      if (!approvedState["submittingDataEmployee"]) {
        if (approvedState["successDataEmployee"] && !approvedState["errorDataEmployee"]) {
          return onSuccess("GetData");
        }

        if (!approvedState["successDataEmployee"] && approvedState["errorDataEmployee"]) {
          return onError(approvedState["errorHelperDataEmployee"]);
        }
      }
    }
  }, [
    loading.getData,
    approvedState["submittingDataEmployee"],
    approvedState["successDataEmployee"],
    approvedState["errorDataEmployee"],
  ]);

  /** 
   ** RENDER
   */
  const showGetData = authState["data"].groupID === "1" ||
    authState["data"].groupID === "6";
  const disabled = loading.main || loading.search;
  return (
    <React.Fragment>
      <Head title={t("assets:title")}></Head>
      <Content>
        {/** Header table */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h4">{t("assets:assets_management")}</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <ul className="nk-block-tools g-3">
                  {filterTab === 0 && (
                    <li>
                      <Button
                        color="light"
                        outline
                        className="btn-white"
                        onClick={onExportData}>
                        <Icon name="download-cloud"></Icon>
                        <span>{t("common:export")}</span>
                      </Button>
                    </li>
                  )}
                  {showGetData && (
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="secondary"
                        onClick={onGetEmployee}
                      >
                        <Icon name="reload-alt"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="secondary"
                        onClick={onGetEmployee}
                      >
                        {loading.getData && (
                          <div className="spinner-border spinner-border-sm text-white mr-2" role="status" />
                        )}
                        {!loading.getData && <Icon className="mr-1" name="reload-alt"></Icon>}
                        <span>{t("assets:get_data")}</span>
                      </Button>
                    </li>
                  )}
                  {filterTab === 0 && (
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => toggleView("add")}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => toggleView("add")}
                      >
                        <Icon name="plus"></Icon>
                        <span>{t("common:add_new")}</span>
                      </Button>
                    </li>
                  )}
                </ul>
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
                          label={`${item.label} (${item.count !== undefined
                            ? item.count
                            : item.countDamage + " - " + item.countLost
                          })`}
                          onChange={onChangeTab}
                        />
                      )
                    })}
                  </ul>
                </div>
                <div className="card-tools">
                  <ul className="btn-toolbar">
                    <li>
                      <a
                        href="#search"
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggleView("search", null);
                        }}
                        className="btn btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </a>
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
                      value={tabs[filterTab].search}
                      placeholder={t("common:search")}
                      onChange={onChangeSearch}
                    />
                    <Button
                      className="search-submit"
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
                    key={`tab_${itemT.id}_${indexT}`}>
                    {!loading.main && !loading.search && (
                      <TableAssets
                        history={history}
                        commonState={commonState}
                        authState={authState}
                        idxTab={indexT}
                        dataAssets={itemT.data}
                        onChangePage={onChangePage}
                        onUpdateItem={onUpdateItem}
                        onUpdateHistory={onUpdateHistory}
                        onApprovedRecallItem={onApprovedRecallItem}
                        onRepairItem={onRepairItem}
                        onLiquidationItem={onLiquidationItem}
                        onReuseItem={onReuseItem}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/** Paging table */}
            <PreviewAltCard className={`${tabs[filterTab].count > 0 && "border-top"}`}>
              {disabled ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" />
                </div>
              ) : 
              tabs[filterTab].data.length > 0 ? (
                <PaginationComponent
                  itemPerPage={Configs.perPage}
                  totalItems={filterTab !== 4
                    ? tabs[filterTab].count
                    : (tabs[filterTab].countDamage + tabs[filterTab].countLost)}
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

        <AddEditForm
          show={view.add || view.update}
          isAdd={view.add}
          isUpdate={view.update}
          history={history}
          commonState={commonState}
          authState={authState}
          updateItem={updateItem}
          onClose={onCloseAddEditForm}
        />

        {(view.approved || view.recall) && (
          <ApprovedForm
            show={view.approved || view.recall}
            isApproved={view.approved}
            isRecall={view.recall}
            history={history}
            commonState={commonState}
            authState={authState}
            updateItem={updateItem}
            updateHistory={updateHistory}
            onClose={onCloseAddEditForm}
          />
        )}

        {view.repair && (
          <RepairForm
            show={view.repair}
            history={history}
            commonState={commonState}
            authState={authState}
            updateItem={updateItem}
            updateHistory={updateHistory}
            onClose={onCloseAddEditForm}
          />
        )}

        {view.liquidation && (
          <LiquidationForm
            show={view.liquidation}
            history={history}
            commonState={commonState}
            authState={authState}
            updateItem={updateItem}
            updateHistory={updateHistory}
            onClose={onCloseAddEditForm}
          />
        )}

        {view.reuse && (
          <ReUseForm
            show={view.reuse}
            history={history}
            commonState={commonState}
            authState={authState}
            updateItem={updateItem}
            updateHistory={updateHistory}
            onClose={onCloseAddEditForm}
          />
        )}

        {view.add && <div className="toggle-overlay" onClick={toggleView}></div>}
        {view.update && <div className="toggle-overlay" onClick={() => toggleView("update", true)}></div>}
        {view.approved && <div className="toggle-overlay" onClick={() => toggleView("approved", true)}></div>}
        {view.recall && <div className="toggle-overlay" onClick={() => toggleView("recall", true)}></div>}
        {view.repair && <div className="toggle-overlay" onClick={() => toggleView("repair", true)}></div>}
        {view.liquidation && <div className="toggle-overlay" onClick={() => toggleView("liquidation", true)}></div>}
        {view.reuse && <div className="toggle-overlay" onClick={() => toggleView("reuse", true)}></div>}
      </Content>
    </React.Fragment>
  );
};

export default AssetsManagement;
