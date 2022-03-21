import React, {useMemo, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {Spinner, TabContent, TabPane} from "reactstrap";
import {toast} from "react-toastify";
/** COMPONENTS */
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
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
} from "../../../../components/Component";
import TableAssets from "./table";
import AddEditForm from "./form/AddEdit";
import ApprovedForm from "./form/Approved";
import RepairForm from "./form/Repair";
import LiquidationForm from "./form/Liquidation";
import ReUseForm from "./form/ReUse";
/** COMMON */
import Configs from "../../../../configs";
import RoutesApi from "../../../../services/routesApi";
import Routes from "../../../../route/routes";
import {checkIsWrite, getCookies, log} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

let callbackF = null;

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
      <a href={index !== curTab ? `${Routes.assetsManagement}?tabIdx=${tab}` : undefined}
        onClick={(ev) => !disabled && onChange(ev, index)}>
        <span className={`sub-text ${index === curTab && "text-primary"}`}>
          {label}
        </span>
      </a>
    </li>
  )
};

function useQuery() {
  const {search} = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

function AssetsManagement({history, params}) {
  const {t} = useTranslation();
  const query = useQuery();
  let tabIdx = query.get("tabIdx");

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [tabs, setTabs] = useState([
    {
      ibTab: "0",
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
      ibTab: "1",
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
      ibTab: "2",
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
      ibTab: "3",
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
      ibTab: "4",
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
      ibTab: "5",
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
  const [isWrite, setIsWrite] = useState(false);
  const [filterTab, setFilterTab] = useState(Number(query.get("tabIdx")));
  const [updateItem, setUpdateItem] = useState(null);
  const [updateHistory, setUpdateHistory] = useState(null);

  /**
   ** FUNCTIONS
   */
  const onChangeSearch = (e) => {
    let tmpTabs = [...tabs];
    tmpTabs[filterTab].search = e.target.value;
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
    idxActive = filterTab,
    statusID = tabs[filterTab].id,
    page = tabs[filterTab].page,
    search = tabs[filterTab].search,
  ) => {
    let tabActive = tabs[idxActive];
    let params = {
      StatusID: statusID,
      Search: search,
      SortColumn: "",
      SortDirection: "desc",
      PageNum: page,
      PageSize: Configs.perPage,
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
    ev && ev.preventDefault();
    if (!loading.search && filterTab !== idxTab) {
      history.replace(`${Routes.assetsManagement}?tabIdx=${idxTab}`);
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
        RoutesApi.APPROVED.EXPORT_ASSETS
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
    log('[LOG] === Error ===> ', error);
    setLoading({main: false, search: false, getData: false});
    toast(error, {type: "error"});
  };

  /** 
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (!tabIdx || tabIdx > 5) {
      let tmp = Number(tabIdx);
      if (typeof tmp === "number") {
        setFilterTab(tmp);
        history.replace(`${Routes.assetsManagement}?tabIdx=${tmp}`);
      } else {
        setFilterTab(0);
        history.replace(`${Routes.assetsManagement}?tabIdx=0`);
      }
    }
  }, []);

  useEffect(() => {
    if (loading.main && authState["successSignIn"] && authState["menu"]) {
      let menu = checkIsWrite(authState["menu"], Routes.assetsManagement);
      if (menu) setIsWrite(menu.isWrite);
      return onStartGetData();
    }
  }, [
    loading.main,
    authState["successSignIn"],
    authState["menu"],
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
  const showGetData = ["1", "6"].includes(authState["data"].groupID);
  const disabled = loading.main || loading.search;
  return (
    <React.Fragment>
      <Head title={t("assets:title")}></Head>
      
      {!loading.main && (
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
                          disabled={disabled}
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
                          disabled={disabled}
                          onClick={onGetEmployee}
                        >
                          <Icon name="reload-alt"></Icon>
                        </Button>
                        <Button
                          className="toggle d-none d-md-inline-flex"
                          color="secondary"
                          disabled={disabled}
                          onClick={onGetEmployee}
                        >
                          {loading.getData && <Spinner color="light" size="sm" />}
                          {!loading.getData && <Icon name="reload-alt"></Icon>}
                          <span>{t("assets:get_data")}</span>
                        </Button>
                      </li>
                    )}
                    {filterTab === 0 && isWrite && (
                      <li className="nk-block-tools-opt">
                        <Button
                          className="toggle btn-icon d-md-none"
                          color="primary"
                          disabled={disabled}
                          onClick={() => toggleView("add")}
                        >
                          <Icon name="plus"></Icon>
                        </Button>
                        <Button
                          className="toggle d-none d-md-inline-flex"
                          color="primary"
                          disabled={disabled}
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
                            tab={item.ibTab}
                            curTab={filterTab}
                            disabled={disabled}
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
                            !disabled && toggleView("search", null);
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
                        disabled={disabled}
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
                        autoFocus={true}
                        onKeyDown={ev => {
                          if (ev.code === "Enter" && !disabled) {
                            onSearch(ev, filterTab);
                          }
                        }}
                        onChange={onChangeSearch}
                      />
                      <Button
                        className="search-submit"
                        disabled={disabled}
                        onClick={ev => onSearch(ev, filterTab)}
                      >
                        <Icon name="search"></Icon>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/** Data table */}
              {/* <div className="tab-content">
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
              </div> */}
              <TabContent activeTab={filterTab + ""}>
                {tabs.map((itemT, indexT) => {
                  return (
                    <TabPane key={`tab_${itemT.id}_${indexT}`} tabId={itemT.ibTab}>
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
                    </TabPane>
                  )
                })}
              </TabContent>

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

          {/** Forms */}
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
      )}
    </React.Fragment>
  );
};

export default AssetsManagement;
