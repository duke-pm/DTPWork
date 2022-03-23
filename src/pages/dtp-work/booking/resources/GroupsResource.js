import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {Spinner} from "reactstrap";
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
  Loading,
} from "../../../../components/Component";
import TableGroupResource from "../table/GroupsResource";
import AddEditGroupResrcForm from "../form/AddEditGroupResrc";
/** COMMON */
import Configs from "../../../../configs";
import Routes from "../../../../route/routes";
import {checkIsWrite, log} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

function GroupsResource({history}) {
  const {t} = useTranslation();

  /** Use redux */
  const dispatch = useDispatch();
  const authState = useSelector(({auth}) => auth);
  const commonState = useSelector(({common}) => common);
  const bookingState = useSelector(({booking}) => booking);

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
  const [textSearch, setTextSearch] = useState("");
  const [data, setData] = useState({
    list: [],
    count: 0,
    page: 1,
  });
  const [updateItem, setUpdateItem] = useState(null);

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

  const onUpdateGroup = group => {
    setUpdateItem(group);
    toggleView("update");
  };

  const onRemoveGroup = group => {
    setUpdateItem(group);
    toggleView("confirm");
  };

  const onStartGetData = (
    search = "",
    page = 1,
  ) => {
    let params = {
      Search: search,
      PageNum: page,
      PageSize: Configs.perPage,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchGroupResource(params, history));
  };

  const onSuccess = type => {
    dispatch(Actions.resetResource());
    if (type === "Remove") {
      setView({...view, confirm: false});
      toast(t("success:remove_group_resource"), {type: "success"});
    }
    let tmpData = {...data};
    tmpData.list = bookingState["groupResrc"];
    tmpData.count = bookingState["numGroupResrc"];
    setData(tmpData);
    setLoading({main: false, search: false});
  };

  const onError = error => {
    dispatch(Actions.resetResource());
    log('[LOG] === onError ===> ', error);
    toast(error, {type: "error"});
    setLoading({main: false, search: false});
  };

  const onCloseForm = type => {
    dispatch(Actions.resetResource());
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
      GroupID: updateItem ? updateItem.groupID : "0",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchRemoveGroupResource(params, history));
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (loading.main && authState["successSignIn"] && authState["menu"]) {
      let menu = checkIsWrite(authState["menu"], Routes.groupResources);
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
      if (!bookingState["submittingGroupResrc"]) {
        if (bookingState["successGroupResrc"] && !bookingState["errorGroupResrc"]) {
          return onSuccess();
        }
        if (!bookingState["successGroupResrc"] && bookingState["errorGroupResrc"]) {
          return onError(bookingState["errorHelperGroupResrc"]);
        }
      }
    }
  }, [
    loading.main,
    loading.search,
    bookingState["submittingGroupResrc"],
    bookingState["successGroupResrc"],
    bookingState["errorGroupResrc"],
  ]);

  useEffect(() => {
    if (loading.remove) {
      if (!bookingState["submittingRemoveGroupResrc"]) {
        if (bookingState["successRemoveGroupResrc"] && !bookingState["errorRemoveGroupResrc"]) {
          return onSuccess("Remove");
        }
        if (!bookingState["successRemoveGroupResrc"] && bookingState["errorRemoveGroupResrc"]) {
          setView({...view, confirm: false});
          return onError(bookingState["errorHelperRemoveGroupResrc"]);
        }
      }
    }
  }, [
    loading.remove,
    bookingState["submittingRemoveGroupResrc"],
    bookingState["successRemoveGroupResrc"],
    bookingState["errorRemoveGroupResrc"],
  ]);

  /**
   ** RENDER
   */
  const disabled = loading.main || loading.search || loading.remove;
  return (
    <React.Fragment>
      <Head title={t("all_booking:main_title")} />

      <Content>
        {/** Header table */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h4">{t("group_resources:title")}</BlockTitle>
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
                        onClick={() => toggleView("add")}>
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        disabled={disabled}
                        onClick={() => toggleView("add")}>
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
                        className="btn btn-icon search-toggle toggle-search cursor-pointer"
                        onClick={(ev) => {
                          ev.preventDefault();
                          !disabled && toggleView("search");
                        }}>
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
                      }}>
                      <Icon name="arrow-left" />
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
                      onClick={onSearch}>
                      <Icon name="search" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/** Data table */}
            <TableGroupResource
              loading={disabled}
              isWrite={isWrite}
              dataGroups={data.list}
              onUpdate={onUpdateGroup}
              onRemove={onRemoveGroup}
            />

            {/** Paging table */}
            <PreviewAltCard>
            {!disabled ? (
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
      <AddEditGroupResrcForm
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
        title={t("group_resources:confirm_remove_gres_title")}
        content={
          <>
            {t("group_resources:confirm_remove_gres_des_1")}
            <span className="fw-bold"> #{updateItem?.groupID} </span>
            {t("group_resources:confirm_remove_gres_des_2")}
          </>
        }
        onConfirm={onConfirmRemove}
        onClose={toggleView}
      />

      {view.add && <div className="toggle-overlay" onClick={toggleView}></div>}
      {view.update && <div className="toggle-overlay" onClick={toggleView}></div>}
      <Loading show={loading.main || loading.remove} />
    </React.Fragment>
  );
};

export default GroupsResource;
