import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
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
/** COMMON */
import Configs from "configs";
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

const AssetsManagement = ({ ...props }) => {
  const {t} = useTranslation();

  /** Use redux */
  const dispatch = useDispatch();
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
  });
  const [sm, updateSm] = useState(false);
  const [onSearchText, setSearchText] = useState("");
  const [filterTab, setFilterTab] = useState(0);

  /**
   ** FUNCTIONS
   */
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
    };
    dispatch(Actions.fFetchListAssets(tabActive.type, params));
  };

  const onChangeTab = (ev, idxTab) => {
    ev.preventDefault();
    setLoading({main: true});
    // Update active tab
    setFilterTab(idxTab);
    let tmpTabs = [...tabs];
    tmpTabs[idxTab].page = 1;
    setTabs(tmpTabs);
    // Call api
    onStartGetData(
      idxTab,
      tmpTabs[idxTab].id,
      1,
      tmpTabs[idxTab].search,
    );
  };

  // onChange function for searching name
  const onFilterChange = (e) => setSearchText(e.target.value);

  const onChangePage = (idxTab, newPage) => {
    setLoading({main: true});
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
    if (tmpTabs[filterTab].data.length > 0) {
      let newData;
      newData = tmpTabs[filterTab].data.map(item => {
        item.check = false;
        return item;
      });
      tmpTabs[filterTab].data = newData;
    }
    
    setTabs(tmpTabs);
    setLoading({main: false});
  };

  const onError = error => {
    console.log('[LOG] === onError ===> ', error);
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
    if (loading.main) {
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
    approvedState["submittingListAssets"],
    approvedState["successListAssets"],
    approvedState["errorListAssets"]
  ]);

  /** 
   ** RENDER
   */
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
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          placeholder={t("common:search")}
                          onChange={(e) => onFilterChange(e)}
                        />
                      </div>
                    </li>
                    <li>
                      <Button color="light" outline className="btn-white">
                        <Icon name="download-cloud"></Icon>
                        <span>{t("common:export")}</span>
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {

                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {

                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>{t("common:add_new")}</span>
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
                  label={`${item.label} (${
                    item.count 
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
              <TableAssets
                idxTab={filterTab}
                curPage={tabs[0].page}
                countItem={tabs[0].count}
                dataAssets={tabs[0].data}
                onChangePage={onChangePage}
              />
            </div>
            <div className={`tab-pane ${filterTab === 1 && "active"}`} id="tabNotUsed">
              <TableAssets
                idxTab={filterTab}
                curPage={tabs[1].page}
                countItem={tabs[1].count}
                dataAssets={tabs[1].data}
                onChangePage={onChangePage}
              />
            </div>
            <div className={`tab-pane ${filterTab === 2 && "active"}`} id="tabUsing">
              <TableAssets
                idxTab={filterTab}
                curPage={tabs[2].page}
                countItem={tabs[2].count}
                dataAssets={tabs[2].data}
                onChangePage={onChangePage}
              />
            </div>
            <div className={`tab-pane ${filterTab === 3 && "active"}`} id="tabRepairInsurance">
              <TableAssets
                idxTab={filterTab}
                curPage={tabs[3].page}
                countItem={tabs[3].count}
                dataAssets={tabs[3].data}
                onChangePage={onChangePage}
              />
            </div>
            <div className={`tab-pane ${filterTab === 4 && "active"}`} id="tabDamageLost">
              <TableAssets
                idxTab={filterTab}
                curPage={tabs[4].page}
                countItem={tabs[4].count}
                dataAssets={tabs[4].data}
                onChangePage={onChangePage}
              />
            </div>
            <div className={`tab-pane ${filterTab === 5 && "active"}`} id="tabLiquidation">
              <TableAssets
                idxTab={filterTab}
                curPage={tabs[5].page}
                countItem={tabs[5].count}
                dataAssets={tabs[5].data}
                onChangePage={onChangePage}
              />
            </div>
          </div>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default AssetsManagement;
