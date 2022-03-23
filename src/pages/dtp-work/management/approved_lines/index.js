import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {Spinner, Modal, ModalBody} from "reactstrap";
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
  AlertConfirm,
} from "../../../../components/Component";
import TableApprovedLines from "./table";
import AddEditForm from "./form/AddEdit";
/** COMMON */
import Configs from "../../../../configs";
import Routes from "../../../../route/routes";
import {checkIsWrite, log} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

function ApprovedLines({history}) {
  const {t} = useTranslation();

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);
  const managementState = useSelector(({management}) => management);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    search: false,
    remove: false,
  });
  const [isWrite, setIsWrite] = useState(false);
  const [view, setView] = useState({
    search: false,
    add: false,
    update: false,
    confirm: false,
  });
  const [updateItem, setUpdateItem] = useState(null);
  const [textSearch, setTextSearch] = useState("");
  const [data, setData] = useState({
    list: [],
    count: 0,
    page: 1,
  });

  /**
   ** FUNCTIONS
   */
  const onChangeSearch = e => setTextSearch(e.target.value);

  const toggleView = type => {
    if (type === "search" && view.search) {
      setView({...view, search: false});
    } else {
      setView({
        search: type === "search" ? true : false,
        add: type === "add" ? true : false,
        update: type === "update" ? true : false,
        confirm: type === "confirm" ? true : false,
      });
      if (!type && updateItem) setUpdateItem(null);
    }
  };

  const paginate = pageNumber => {
    if (pageNumber !== data.page) {
      let tmpData = {...data};
      tmpData.page = pageNumber;
      setData(tmpData);
      onChangePage(pageNumber);
    }
  };

  const onChangePage = newPage => {
    if (!loading.search && newPage !== data.page) {
      setLoading({...loading, search: true});
      // Update params
      let tmpData = {...data};
      tmpData.page = newPage;
      setData(tmpData);
      // Call api
      onStartGetData(
        textSearch,
        newPage,
      );
    }
  };

  const onSearch = e => {
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Update params
      let tmpData = {...data};
      tmpData.page = 1;
      setData(tmpData);
      // Call api
      onStartGetData(
        textSearch,
        1,
      );
    }
  };

  const onUpdateLines = line => {
    setUpdateItem(line);
    toggleView("update");
  };

  const onRemoveLines = line => {
    setUpdateItem(line);
    toggleView("confirm");
  };

  const onStartGetData = (
    search = textSearch,
    page = data.page,
  ) => {
    let params = {
      Search: search,
      PageNum: page,
      PageSize: Configs.perPage,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchApprovedLines(params, history));
  };

  const onSuccess = type => {
    dispatch(Actions.resetApprovedLines());
    if (type === "Remove") {
      setView({...view, confirm: false});
      toast(t("success:remove_approved_lines"), {type: "success"});
    }
    let tmpData = {...data};
    tmpData.list = managementState["approvedLines"];
    tmpData.count = managementState["numApprovedLines"];
    setData(tmpData);
    setLoading({main: false, search: false});
  };

  const onError = error => {
    dispatch(Actions.resetApprovedLines());
    log('[LOG] === onError ===> ', error);
    toast(error, {type: "error"});
    setLoading({main: false, search: false});
  };

  const onCloseForm = type => {
    dispatch(Actions.resetApprovedLines());
    toggleView();
    if (type === "Create") {
      setLoading({...loading, search: true});
      // Call api
      onStartGetData(
        textSearch,
        data.page,
      );
    }
  };

  const onConfirmRemove = () => {
    setLoading({...loading, remove: true});
    let params = {
      RoleID: updateItem ? updateItem.roleID : "0",
    };
    dispatch(Actions.fFetchRemoveApprovedLines(params, history));
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (loading.main && authState["successSignIn"] && authState["menu"]) {
      let menu = checkIsWrite(authState["menu"], Routes.approvedLines);
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
      if (!managementState["submittingApprovedLines"]) {
        if (managementState["successApprovedLines"] && !managementState["errorApprovedLines"]) {
          return onSuccess();
        }
        if (!managementState["successApprovedLines"] && managementState["errorApprovedLines"]) {
          return onError(managementState["errorHelperApprovedLines"]);
        }
      }
    }
  }, [
    loading.main,
    loading.search,
    managementState["submittingApprovedLines"],
    managementState["successApprovedLines"],
    managementState["errorApprovedLines"],
  ]);

  useEffect(() => {
    if (loading.remove) {
      if (!managementState["submittingRemoveApprovedLines"]) {
        if (managementState["successRemoveApprovedLines"] && !managementState["errorRemoveApprovedLines"]) {
          return onSuccess("Remove");
        }
        if (!managementState["successRemoveApprovedLines"] && managementState["errorRemoveApprovedLines"]) {
          setView({...view, confirm: false});
          return onError(managementState["errorHelperRemoveApprovedLines"]);
        }
      }
    }
  }, [
    loading.remove,
    managementState["submittingRemoveApprovedLines"],
    managementState["successRemoveApprovedLines"],
    managementState["errorRemoveApprovedLines"],
  ]);

  /**
   ** RENDER
   */
  const disabled = loading.main || loading.search;
  return (
    <React.Fragment>
      <Head title={t("management:title")} />
      
      <Content>
        {/** Header table */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h4">{t("management:approved_line")}</BlockTitle>
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
                  </ul>
                </div>
              </div>
              
              <div className={`card-search search-wrap ${view.search && "active"}`}>
                <div className="card-body">
                  <div className="search-content">
                    <Button
                      className="search-back btn-icon toggle-search active"
                      disabled={loading.search}
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
                      value={textSearch}
                      disabled={disabled}
                      placeholder={t("common:search")}
                      onKeyDown={ev => {
                        if (ev.code === "Enter") onSearch();
                      }}
                      onChange={onChangeSearch}
                    />
                    <Button
                      className="search-submit btn-icon"
                      disabled={loading.search}
                      onClick={onSearch}
                    >
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/** Data table */}
            <TableApprovedLines
              isWrite={isWrite}
              history={history}
              commonState={commonState}
              authState={authState}
              dataLines={data.list}
              onUpdate={onUpdateLines}
              onRemove={onRemoveLines}
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
                  itemPerPage={Configs.perPage}
                  totalItems={data.count}
                  currentPage={data.page}
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
      </Content>

      {/** Forms */}
      <AddEditForm
        show={view.add || view.update}
        history={history}
        isUpdate={view.update}
        authState={authState}
        commonState={commonState}
        updateItem={updateItem}
        onClose={onCloseForm}
      />

      <AlertConfirm
        loading={loading.remove}
        show={view.confirm}
        title={t("management:confirm_remove_line_title")}
        content={
          <>
            {t("management:confirm_remove_line_des_1")}
            <span className="fw-bold"> #{updateItem?.roleCode} </span>
            {t("management:confirm_remove_line_des_2")}
          </>
        }
        onConfirm={onConfirmRemove}
        onClose={toggleView}
      />
      {view.add && <div className="toggle-overlay" onClick={toggleView}></div>}
      {view.update && <div className="toggle-overlay" onClick={toggleView}></div>}
    </React.Fragment>
  );
};

export default ApprovedLines;
