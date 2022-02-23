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
  BlockTitle,
  Icon,
  Button,
  BlockBetween,
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
  const [sm, updateSm] = useState(false);
  const [view, setView] = useState({
    add: false,
    update: false,
    approved: false,
    recall: false,
    repair: false,
    liquidation: false,
    reuse: false,
  });
  const [searchText, setSearchText] = useState("");
  const [filterTab, setFilterTab] = useState(0);
  const [updateItem, setUpdateItem] = useState(null);

  /**
   ** FUNCTIONS
   */
  const toogleView = type => {
    setView({
      add: type === "add" ? true : false,
      update: type === "update" ? true : false,
      approved: type === "approved" ? true : false,
      recall: type === "recall" ? true : false,
      repair: type === "repair" ? true : false,
      liquidation: type === "liquidation" ? true : false,
      reuse: type === "reuse" ? true : false,
    });
    if (!type && updateItem) setUpdateItem(null);
  };

  const toggleSm = () => updateSm(!sm);

  const onChangeSearch = (e) => setSearchText(e.target.value.trim());

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
    ev.preventDefault();
    setLoading({...loading, search: true});
    // Update active page of tab
    let tmpTabs = [...tabs];
    tmpTabs[idxTab].page = 1;
    tmpTabs[idxTab].search = searchText;
    setTabs(tmpTabs);
    // Call api
    onStartGetData(
      filterTab,
      tmpTabs[idxTab].id,
      1,
      searchText,
    );
  };

  const onChangeTab = (ev, idxTab) => {
    ev.preventDefault();
    setLoading({...loading, main: true});
    // Update active tab
    let tmpTabs = [...tabs];
    tmpTabs[idxTab].page = 1;
    setTabs(tmpTabs);
    setSearchText(tmpTabs[idxTab].search);
    setFilterTab(idxTab);
    // Call api
    onStartGetData(
      idxTab,
      tmpTabs[idxTab].id,
      1,
      tmpTabs[idxTab].search,
    );
  };

  const onChangePage = (idxTab, newPage) => {
    setLoading({...loading, main: true});
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
  };

  const onUpdateItem = item => {
    toogleView("update");
    setUpdateItem(item);
  };

  const onApprovedRecallItem = (type, item) => {
    toogleView(type);
    setUpdateItem(item);
  };

  const onRepairItem = item => {
    toogleView("repair");
    setUpdateItem(item);
  };

  const onLiquidationItem = item => {
    toogleView("liquidation");
    setUpdateItem(item);
  };

  const onReuseItem = item => {
    toogleView("reuse");
    setUpdateItem(item);
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
    let tmpTabs = [...tabs];
    // Update count item on every tab
    for (let tab of tmpTabs) {
      tab.count = approvedState[tab.typeCount];
      tab.countDamage = approvedState[tab.typeCountDamage];
      tab.countLost = approvedState[tab.typeCountLost];
    }

    // Update data item on active tab
    tmpTabs[filterTab].data = approvedState[tmpTabs[filterTab].type];
    
    setTabs(tmpTabs);
    setLoading({main: false, search: false, getData: false});
  };

  const onCloseAddEditForm = (isSuccess, message) => {
    toogleView();
    if (isSuccess) {
      toast(message, {type: "success", autoClose: 2000});
    } else {
      toast(message || t("error:title"), {type: "error", autoClose: 2000});
    }
    dispatch(Actions.fResetCreateAssets());
    setLoading({...loading, main: true});
    // Call api
    isSuccess && onStartGetData(
      filterTab,
      tabs[filterTab].id,
      tabs[filterTab].page,
      tabs[filterTab].search,
    );
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
    if (authState["successSignIn"]) {
      onStartGetData();
    }
  }, [
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

  return (
    <React.Fragment>
      <Head title={t("assets:title")}></Head>

      <Content>
        {/** Header table */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                {t("assets:assets_management")}
              </BlockTitle>
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
                          color="primary"
                          onClick={onGetEmployee}
                        >
                          <Icon name="reload-alt"></Icon>
                        </Button>
                        <Button
                          className="toggle d-none d-md-inline-flex"
                          color="primary"
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
                          onClick={() => toogleView("add")}
                        >
                          <Icon name="plus"></Icon>
                        </Button>
                        <Button
                          className="toggle d-none d-md-inline-flex"
                          color="primary"
                          onClick={() => toogleView("add")}
                        >
                          <Icon name="plus"></Icon>
                          <span>{t("common:add_new")}</span>
                        </Button>
                      </li>
                    )}
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
                  label={`${item.label} (${item.count !== undefined
                    ? item.count
                    : item.countDamage + " - " + item.countLost
                  })`}
                  onChange={onChangeTab}
                />
              )
            })}
          </ul>
          <div className="tab-content">
            <div className={`tab-pane ${filterTab === 0 && "active"}`} id="tabAll">
              {!loading.main && !loading.search && (
                <TableAssets
                  history={history}
                  commonState={commonState}
                  authState={authState}
                  idxTab={filterTab}
                  curPage={tabs[0].page}
                  countItem={tabs[0].count}
                  dataAssets={tabs[0].data}
                  onChangePage={onChangePage}
                />
              )}
              {(loading.main || loading.search) && (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border text-primary" role="status" />
                </div>
              )}
            </div>
            <div className={`tab-pane ${filterTab === 1 && "active"}`} id="tabNotUsed">
              <TableAssets
                history={history}
                commonState={commonState}
                authState={authState}
                idxTab={filterTab}
                curPage={tabs[1].page}
                countItem={tabs[1].count}
                dataAssets={tabs[1].data}
                onChangePage={onChangePage}
                onUpdateItem={onUpdateItem}
                onApprovedRecallItem={onApprovedRecallItem}
              />
            </div>
            <div className={`tab-pane ${filterTab === 2 && "active"}`} id="tabUsing">
              <TableAssets
                history={history}
                commonState={commonState}
                authState={authState}
                idxTab={filterTab}
                curPage={tabs[2].page}
                countItem={tabs[2].count}
                dataAssets={tabs[2].data}
                onChangePage={onChangePage}
                onApprovedRecallItem={onApprovedRecallItem}
                onRepairItem={onRepairItem}
              />
            </div>
            <div className={`tab-pane ${filterTab === 3 && "active"}`} id="tabRepairInsurance">
              <TableAssets
                history={history}
                commonState={commonState}
                authState={authState}
                idxTab={filterTab}
                curPage={tabs[3].page}
                countItem={tabs[3].count}
                dataAssets={tabs[3].data}
                onChangePage={onChangePage}
                onLiquidationItem={onLiquidationItem}
                onReuseItem={onReuseItem}
              />
            </div>
            <div className={`tab-pane ${filterTab === 4 && "active"}`} id="tabDamageLost">
              <TableAssets
                history={history}
                commonState={commonState}
                authState={authState}
                idxTab={filterTab}
                curPage={tabs[4].page}
                countItem={tabs[4].countDamage + tabs[4].countLost}
                dataAssets={tabs[4].data}
                onChangePage={onChangePage}
                onLiquidationItem={onLiquidationItem}
                onRepairItem={onRepairItem}
              />
            </div>
            <div className={`tab-pane ${filterTab === 5 && "active"}`} id="tabLiquidation">
              <TableAssets
                history={history}
                commonState={commonState}
                authState={authState}
                idxTab={filterTab}
                curPage={tabs[5].page}
                countItem={tabs[5].count}
                dataAssets={tabs[5].data}
                onChangePage={onChangePage}
              />
            </div>
          </div>
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

        <ApprovedForm
          show={view.approved || view.recall}
          isApproved={view.approved}
          isRecall={view.recall}
          history={history}
          commonState={commonState}
          authState={authState}
          updateItem={updateItem}
          onClose={onCloseAddEditForm}
        />

        <RepairForm
          show={view.repair}
          history={history}
          commonState={commonState}
          authState={authState}
          updateItem={updateItem}
          onClose={onCloseAddEditForm}
        />

        <LiquidationForm
          show={view.liquidation}
          history={history}
          commonState={commonState}
          authState={authState}
          updateItem={updateItem}
          onClose={onCloseAddEditForm}
        />

        <ReUseForm
          show={view.reuse}
          history={history}
          commonState={commonState}
          authState={authState}
          updateItem={updateItem}
          onClose={onCloseAddEditForm}
        />

        {view.add && <div className="toggle-overlay" onClick={toogleView}></div>}
        {view.update && <div className="toggle-overlay" onClick={toogleView}></div>}
        {view.approved && <div className="toggle-overlay" onClick={toogleView}></div>}
        {view.recall && <div className="toggle-overlay" onClick={toogleView}></div>}
        {view.repair && <div className="toggle-overlay" onClick={toogleView}></div>}
        {view.liquidation && <div className="toggle-overlay" onClick={toogleView}></div>}
        {view.reuse && <div className="toggle-overlay" onClick={toogleView}></div>}
      </Content>
    </React.Fragment>
  );
};

export default AssetsManagement;
