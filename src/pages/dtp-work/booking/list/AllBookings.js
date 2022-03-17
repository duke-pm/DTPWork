import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import DatePicker from "react-datepicker";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Spinner,
  Badge,
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
  BlockBetween,
  TooltipComponent,
} from "components/Component";
import TableBookings from "../table/Bookings";
import CalendarBooking from "../calendar";
import AddEditBookingForm from "../form/AddEditBooking";
/** COMMON */
import Configs from "configs";
import Routes from "route/routes";
import Constants from "utils/constants";
import {getLocalStorage, setLocalStorage, log} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";

function AllBookings(props) {
  const {t} = useTranslation();
  const history = useHistory();

  /** Use redux */
  const dispatch = useDispatch();
  const authState = useSelector(({auth}) => auth);
  const commonState = useSelector(({common}) => common);
  const masterState = useSelector(({master}) => master);
  const bookingState = useSelector(({booking}) => booking);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    search: false,
    remove: false,
    calendar: false,
  });
  const [sm, updateSm] = useState(false);
  const [isWrite, setIsWrite] = useState(false);
  const [isCalendar, setIsCalendar] = useState(false);
  const [view, setView] = useState({
    search: false,
    add: false,
    update: false,
    confirm: false,
  });
  const [dataSelect, setDataSelect] = useState({
    resources: [],
  });
  const [formData, setFormData] = useState({
    rangeStart: new Date(moment().startOf('month').format("YYYY/MM/DD")),
    rangeEnd: new Date(moment().endOf('month').format("YYYY/MM/DD")),
    page: 1,
    search: "",
    resources: "",
    isMyBooking: false,
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

  const onChangeDate = (type, date) => setFormData({...formData, [type]: date});

  const onChangeSelect = e => setFormData({...formData, resources: e.value});

  const onChangeMyBooking = () => setFormData({...formData, isMyBooking: !formData.isMyBooking});

  const onChangeView = () => {
    if (isCalendar) {
      setLoading({...loading, search: true});
      setLocalStorage(Constants.LS_VIEW_BOOKING, "list");
      onGetDataList();
    } else {
      setLocalStorage(Constants.LS_VIEW_BOOKING, "calendar");
    }
    setIsCalendar(!isCalendar);
  };

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
    if (pageNumber !== formData.page) {
      setFormData({...formData, page: pageNumber});
      onChangePage(pageNumber);
    }
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "BKResource,Users",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onChangeCalendar = info => {
    setLoading({...loading, search: true});
    let parseStart = moment(info.start).format("YYYY/MM/DD");
    let parseEnd = moment(info.end).subtract(1, "days").format("YYYY/MM/DD");
    setFormData({
      ...formData,
      rangeStart: moment(info.start).format("YYYY/MM/DD"),
      rangeEnd: moment(info.end).subtract(1, "days").format("YYYY/MM/DD"),
    });
    onStartGetData(parseStart, parseEnd);
  };
 
  const onUpdate = bk => {
    setUpdateItem(bk);
    toggleView("update");
  };

  const onRemove = bk => {
    setUpdateItem(bk);
    toggleView("confirm");
  };

  const onStartGetData = (
    fromDate = moment().startOf('month').format("YYYY/MM/DD"),
    toDate = moment().endOf('month').format("YYYY/MM/DD"),
    search = "",
    page = 1,
  ) => {
    let resources = null;
    if (formData.resources && formData.resources.length > 0) {
      resources = formData.resources.map(item => {
        return item.value;
      });
      resources = resources.join();
    }

    let params = {
      FromDate: fromDate,
      ToDate: toDate,
      ResourceID: resources,
      Search: search,
      IsMyBooking: formData.isMyBooking,
      PageNum: page,
      PageSize: Configs.perPage,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchAllBooking(params, history));
  };

  // const onResetFilter = () => {
  //   let fFromToDate = getLocalStorage(Constants.LS_FROM_TO_ALL_BOOKINGS);
  //   setFormData({
  //     ...formData,
  //     resources: "",
  //     rangeStart: new Date(fFromToDate
  //       ? fFromToDate.start
  //       : moment().startOf('month').format("YYYY/MM/DD")),
  //     rangeEnd: new Date(fFromToDate
  //       ? fFromToDate.end
  //       : moment().endOf('month').format("YYYY/MM/DD")),
  //   });
  // };

  const onCheckLocal = () => {
    onGetMasterData();
    let fView = localStorage.getItem(Constants.LS_VIEW_BOOKING);

    if (fView) {
      if (fView === "list") {
        onGetDataList();
      } else {
        setLoading({...loading, main: false});
        setIsCalendar(true);
      }
    } else {
      setLocalStorage(Constants.LS_VIEW_BOOKING, "list");
      onGetDataList();
    }
  };

  const onGetDataList = () => {
    let fFromToDate = getLocalStorage(Constants.LS_FROM_TO_ALL_BOOKINGS);
    if (fFromToDate) {
      setFormData({
        ...formData,
        rangeStart: new Date(fFromToDate.start),
        rangeEnd: new Date(fFromToDate.end),
      });
      onStartGetData(
        fFromToDate.start,
        fFromToDate.end,
      );
    } else {
      onStartGetData();
    }
  };

  const onChangePage = newPage => {
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Update params
      let tmpFormData = {...formData};
      tmpFormData.page = newPage;
      setFormData(tmpFormData);
      // Call api
      onStartGetData(
        formData.rangeStart,
        formData.rangeEnd,
        formData.search,
        newPage,
      );
    }
  };

  const onSearch = (ev) => {
    ev && ev.preventDefault();
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Update params
      let tmpFormData = {...formData};
      tmpFormData.page = 1;
      setFormData(tmpFormData);
      // Call api
      onStartGetData(
        formData.rangeStart,
        formData.rangeEnd,
        formData.search,
        1,
      );
    }
  };

  const onSearchFilter = () => {
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Update params
      let tmpFormData = {...formData};
      tmpFormData.page = 1;
      setFormData(tmpFormData);
      // Save to local storage
      setLocalStorage(Constants.LS_FROM_TO_ALL_BOOKINGS, {
        start: moment(formData.rangeStart).format("YYYY/MM/DD"),
        end: moment(formData.rangeEnd).format("YYYY/MM/DD"),
      });
      // Call api
      onStartGetData(
        formData.rangeStart,
        formData.rangeEnd,
        formData.search,
        1,
      );
    }
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      dispatch(Actions.resetMasterData());
      let tmpDataResources = masterState["bkReSource"].map(item => {
        return {value: item.resourceID, label: item.resourceName};
      });
      setDataSelect({
        resources: [...dataSelect.resources, ...tmpDataResources],
      });
    } else {
      dispatch(Actions.resetBooking());
      if (type === "Remove") {
        toast(t("success:remove_booking"), {type: "success"});
        setView({...view, confirm: false});
        if (!isCalendar) {
          setLoading({...loading, remove: false, search: true});
          // Call api
          onStartGetData(
            formData.rangeStart,
            formData.rangeEnd,
            formData.search,
            formData.page,
          );
        }
      } else {
        let tmpData = {...data};
        tmpData.list = bookingState["allBookings"];
        tmpData.count = bookingState["numAllBookings"];
        setData(tmpData);
        setLoading({main: false, search: false});
      }
    }
  };

  const onError = error => {
    dispatch(Actions.resetBooking());
    log('[LOG] === onError ===> ', error);
    toast(error, {type: "error"});
    setLoading({main: false, search: false});
  };

  const onCloseForm = type => {
    dispatch(Actions.resetBooking());
    toggleView();
    if (type === "Create") {
      setLoading({...loading, search: true});
      // Call api
      onStartGetData(
        formData.rangeStart,
        formData.rangeEnd,
        formData.search,
        formData.page,
      );
    }
  };

  const onConfirmRemove = () => {
    setLoading({...loading, remove: true});
    let params = {
      BookID: updateItem ? updateItem.bookID : "0",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchRemoveBooking(params, history));
    if (isCalendar) toggleView();
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
            fMenuRequest = item.subMenu.find(f => f.link === Routes.allBookings);
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
    if (!masterState["submittingGetAll"]) {
      if (masterState["successGetAll"] && !masterState["errorGetAll"]) {
        return onSuccess("MasterData");
      }
      if (!masterState["successGetAll"] && masterState["errorGetAll"]) {
        return onError(masterState["errorHelperGetAll"]);
      }
    }
  }, [
    masterState["submittingGetAll"],
    masterState["successGetAll"],
    masterState["errorGetAll"],
  ]);

  useEffect(() => {
    if (loading.main || loading.search) {
      if (!bookingState["submittingAll"]) {
        if (bookingState["successAll"] && !bookingState["errorAll"]) {
          return onSuccess("List");
        }
        if (!bookingState["successAll"] && bookingState["errorAll"]) {
          return onError(bookingState["errorHelperAll"]);
        }
      }
    }
  }, [
    loading.main,
    loading.search,
    bookingState["submittingAll"],
    bookingState["successAll"],
    bookingState["errorAll"],
  ]);

  useEffect(() => {
    if (loading.remove) {
      if (!bookingState["submittingRemoveBooking"]) {
        if (bookingState["successRemoveBooking"] && !bookingState["errorRemoveBooking"]) {
          if (!isCalendar) {
            return onSuccess("Remove");
          } else {
            return setLoading({...loading, remove: false});
          }
        }
        if (!bookingState["successRemoveBooking"] && bookingState["errorRemoveBooking"]) {
          if (!isCalendar) {
            setView({...view, confirm: false});
            return onError(bookingState["errorHelperRemoveBooking"]);
          } else {
            return setLoading({...loading, remove: false});
          }
        }
      }
    }
  }, [
    isCalendar,
    loading.remove,
    bookingState["submittingRemoveBooking"],
    bookingState["successRemoveBooking"],
    bookingState["errorRemoveBooking"],
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
              <BlockTitle tag="h4">{t("all_booking:title")}</BlockTitle>
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
            {/** Filter table */}
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools">
                  <ul className="list-status">
                    <li>
                      <Badge className="badge badge-dim badge-pill" color="warning">
                        {`${bookingState["headerBooking"].countPending} ${t("all_booking:not_happen_status")}`}
                      </Badge>
                    </li>
                    <li>
                      <Badge className="badge badge-dim badge-pill" color="success">
                        {`${bookingState["headerBooking"].countHappening} ${t("all_booking:happening_status")}`}
                      </Badge>
                    </li>
                    <li>
                      <Badge className="badge badge-dim badge-pill" color="primary">
                        {`${bookingState["headerBooking"].countHappened} ${t("all_booking:happened_status")}`}
                      </Badge>
                    </li>
                  </ul>
                </div>
                <div className="card-tools mr-n1">
                  <ul className="btn-toolbar gx-1">
                    {!isCalendar && (
                      <>
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
                      </>
                    )}
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
                                      {t("all_booking:filter_bookings").toUpperCase()}
                                    </h6>
                                  </div>
                                  <div className="dropdown-body dropdown-body-rg">
                                    <Row className="gx-6 gy-3">
                                      {!isCalendar && (
                                        <Col md="6">
                                          <FormGroup className="form-group" style={{zIndex: 10000}}>
                                            <label className="overline-title overline-title-alt">
                                              {t("common:from_date")}
                                            </label>
                                            <DatePicker
                                              className="form-control"
                                              wrapperClassName="start-m"
                                              selected={formData.rangeStart}
                                              dateFormat="dd/MM/yyyy"
                                              startDate={formData.rangeStart}
                                              endDate={formData.rangeEnd}
                                              disabled={disabled}
                                              selectsStart
                                              onChange={date => onChangeDate("rangeStart", date)}
                                            />
                                          </FormGroup>
                                        </Col>
                                      )}
                                      {!isCalendar && (
                                        <Col md="6">
                                          <FormGroup className="form-group" style={{zIndex: 10000}}>
                                            <label className="overline-title overline-title-alt">
                                              {t("common:to_date")}
                                            </label>
                                            <DatePicker
                                              className="form-control"
                                              wrapperClassName="end-m"
                                              selected={formData.rangeEnd}
                                              dateFormat="dd/MM/yyyy"
                                              startDate={formData.rangeStart}
                                              endDate={formData.rangeEnd}
                                              minDate={formData.rangeStart}
                                              disabled={disabled}
                                              selectsEnd
                                              onChange={date => onChangeDate("rangeEnd", date)}
                                            />
                                          </FormGroup>
                                        </Col>
                                      )}
                                      <Col size="12">
                                        <FormGroup className="form-group">
                                          <label className="overline-title overline-title-alt">
                                            {t("all_booking:resource")}
                                          </label>
                                          <RSelect
                                            name="resources"
                                            isMulti={true}
                                            isDisabled={disabled}
                                            options={dataSelect.resources}
                                            value={formData.resources}
                                            placeholder={t("all_booking:resource")}
                                            onChange={e => onChangeSelect({key: "resources", value: e})}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col size="12">
                                        <div className="form-control-wrap">
                                          <div className="custom-control custom-control-sm custom-checkbox">
                                            <input
                                              className="custom-control-input form-control"
                                              id="isMyBooking"
                                              name="isMyBooking"
                                              type="checkbox"
                                              disabled={disabled}
                                              checked={formData.isMyBooking}
                                              onChange={onChangeMyBooking}
                                            />
                                            <label className="custom-control-label" htmlFor="isMyBooking">
                                              {t("all_booking:is_my_booking")}
                                            </label>
                                          </div>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="dropdown-foot between">
                                    <Button color="primary" disabled={disabled} onClick={onSearchFilter}>
                                      <Icon name="filter"></Icon>
                                      <span>{t("common:filter")}</span>
                                    </Button>
                                    {/* <Button className="btn-dim" disabled={disabled} color="secondary" onClick={onResetFilter}>
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
                    <li className="btn-toolbar-sep"></li>
                    <li onClick={(!isCalendar && !disabled)
                      ? onChangeView
                      : undefined}>
                      <TooltipComponent
                        tag="a"
                        containerClassName={`btn btn-trigger btn-icon ${isCalendar && "active"}`}
                        id="calendar"
                        icon="calendar"
                        direction="top"
                        text={t("all_booking:calendar_view")}
                      />
                    </li>
                    <li onClick={(isCalendar && !disabled)
                      ? onChangeView
                      : undefined}>
                      <TooltipComponent
                        tag="a"
                        containerClassName={`btn btn-trigger btn-icon ${!isCalendar && "active"}`}
                        id="list-ol"
                        icon="list-ol"
                        direction="top"
                        text={t("all_booking:list_view")}
                      />
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
                      value={formData.search}
                      placeholder={t("common:search")}
                      onKeyDown={ev => {
                        if (ev.code === "Enter") onSearch(ev);
                      }}
                      onChange={onChangeSearch}
                    />
                    <Button
                      className="search-submit btn-icon"
                      disabled={disabled}
                      onClick={onSearch}
                    >
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {!isCalendar && (
              <>
                {/** Data table */}
                <TableBookings
                  isWrite={isWrite}
                  disabled={disabled}
                  dataBookings={data.list}
                  onUpdate={onUpdate}
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
                        itemPerPage={Configs.perPage}
                        totalItems={data.count}
                        currentPage={formData.page}
                        paginate={paginate}
                      />
                    ) : (
                      <div className="text-center">
                        <span className="text-silent">{t("common:no_data")}</span>
                      </div>
                    )
                  } 
                </PreviewAltCard>
              </>
            )}
            {isCalendar && (
              <PreviewAltCard>
                <CalendarBooking
                  language={commonState["language"]}
                  isWrite={isWrite}
                  disabled={disabled}
                  loadingRemove={loading.remove}
                  loadingCalendar={loading.calendar}
                  resources={formData.resources}
                  isMyBooking={formData.isMyBooking}
                  dataBookings={data.list}
                  onChangeCalendar={onChangeCalendar}
                  onUpdate={onUpdate}
                  onRemove={onRemove}
                />
              </PreviewAltCard>
            )}
          </DataTable>
        </Block>

        {/** Forms */}
        <AddEditBookingForm
          show={view.add || view.update}
          history={history}
          isUpdate={view.update}
          authState={authState}
          commonState={commonState}
          masterState={masterState}
          updateItem={updateItem}
          onClose={onCloseForm}
        />

        <AlertConfirm
          loading={loading.remove}
          show={view.confirm}
          title={t("all_booking:confirm_remove_booking_title")}
          content={
            <>
              {t("all_booking:confirm_remove_booking_des_1")}
              <span className="fw-bold"> #{updateItem?.bookID} </span>
              {t("all_booking:confirm_remove_booking_des_2")}
            </>
          }
          onConfirm={onConfirmRemove}
          onClose={toggleView}
        />

        {view.add && <div className="toggle-overlay" onClick={toggleView}></div>}
        {view.update && <div className="toggle-overlay" onClick={toggleView}></div>}
      </Content>
    </React.Fragment>
  );
};

export default AllBookings;
