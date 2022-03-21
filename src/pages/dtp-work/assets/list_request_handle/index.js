import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Spinner,
} from "reactstrap";
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
} from "../../../../components/Component";
import TableRequestHandle from "./table";
import ApprovedForm from "./modal/Approved";
import ProcessModal from "./modal/Process";
/** COMMON */
import Configs from "../../../../configs";
import Routes from "../../../../route/routes";
import Constants from "../../../../utils/constants";
import {
  getLocalStorage,
  setLocalStorage,
  log,
  checkIsWrite,
} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

function RequestAssetsHandle({history}) {
  const {t} = useTranslation();

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    search: false,
  });
  const [sm, updateSm] = useState(false);
  const [isWrite, setIsWrite] = useState(false);
  const [view, setView] = useState({
    search: false,
    approved: false,
    process: false,
  });
  const [formData, setFormData] = useState({
    page: 1,
    type: [1, 2, 3],
    status: [1, 2, 3, 4],
    search: "",
    rangeStart: new Date(moment().startOf('month').format("YYYY/MM/DD")),
    rangeEnd: new Date(moment().endOf('month').format("YYYY/MM/DD")),
  });
  const [data, setData] = useState({
    requests: [],
    count: 0,
  });
  const [updateItem, setUpdateItem] = useState(null);
  const [detailsItem, setDetailsItem] = useState([]);

  /**
   ** FUNCTIONS
   */
  const toggleSm = () => updateSm(!sm);

  const onChangeSearch = e => setFormData({...formData, search: e.target.value});

  const onChangeDate = (type, date) => setFormData({...formData, [type]: date});

  const onChangeType = e => {
    let tmpFormData = {...formData};
    if (e.target.name === "allowType") {
      if (tmpFormData.type.includes(1))
        tmpFormData.type = tmpFormData.type.filter(f => f !== 1);
      else tmpFormData.type.push(1);
    }
    if (e.target.name === "damageType") {
      if (tmpFormData.type.includes(2))
        tmpFormData.type = tmpFormData.type.filter(f => f !== 2);
      else tmpFormData.type.push(2);
    }
    if (e.target.name === "lostType") {
      if (tmpFormData.type.includes(3))
        tmpFormData.type = tmpFormData.type.filter(f => f !== 3);
      else tmpFormData.type.push(3);
    }
    setFormData(tmpFormData);
  };

  const paginate = pageNumber => {
    if (pageNumber !== formData.page) {
      setFormData({...formData, page: pageNumber});
      onChangePage(pageNumber);
    }
  };

  const toggleView = type => {
    if (type === "search" && view.search) {
      setView({...view, search: false});
    } else {
      setView({
        search: type === "search" ? true : false,
        approved: type === "approved" ? true : false,
        process: type === "process" ? true : false,
      });
      if (!type && updateItem) {
        setUpdateItem(null);
        setDetailsItem([]);
      }
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
        formData.type,
        formData.status,
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
      setLocalStorage(Constants.LS_FROM_TO_REQUEST_HANDLE, {
        start: moment(formData.rangeStart).format("YYYY/MM/DD"),
        end: moment(formData.rangeEnd).format("YYYY/MM/DD"),
      });
      // Call api
      onStartGetData(
        formData.rangeStart,
        formData.rangeEnd,
        formData.search,
        formData.type,
        formData.status,
        1,
      );
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
        formData.type,
        formData.status,
        newPage,
      );
    }
  };

  const onApproved = dataRequest => {
    toggleView("approved");
    setUpdateItem(dataRequest);
  };

  const onProcess = dataRequest => {
    toggleView("process");
    setUpdateItem(dataRequest);
    if (dataRequest.requestTypeID === 1) {
      let fDetails = approvedState["listDetailsApproved"].filter(f =>
        f.requestID === dataRequest.requestID);
      setDetailsItem(fDetails);
    } else {
      setDetailsItem([]);
    }
  };

  const onCheckLocal = () => {
    let fFromToDate = getLocalStorage(Constants.LS_FROM_TO_REQUEST_HANDLE);
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

  const onStartGetData = (
    fromDate = moment().startOf('month').format("YYYY/MM/DD"),
    toDate = moment().endOf('month').format("YYYY/MM/DD"),
    search = "",
    type = [1, 2, 3],
    status = [1, 2, 3, 4],
    page = 1,
  ) => {
    let params = {
      Search: search,
      StatusID: status.join(),
      PageSize: Configs.perPage,
      PageNum: page,
      FromDate: fromDate,
      ToDate: toDate,
      RequestTypeID: type.length !== 0 ? type.join() : "4",
      IsResolveRequest: true,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchListRequestHandle(params, history));
  };

  const onPrepareData = () => {
    // Update data
    setData({
      requests: approvedState["listRequestHandle"],
      count: approvedState["numRequestHandle"],
    });
    setLoading({main: false, search: false});
  };

  const onCloseAddEditForm = (isSuccess, showToast, message) => {
    dispatch(Actions.fResetApprovedRequest());
    toggleView();
    if (isSuccess) {
      toast(message, {type: "success"});
      setLoading({...loading, main: true});
      onStartGetData(
        formData.rangeStart,
        formData.rangeEnd,
        formData.search,
        formData.type,
        formData.status,
        formData.page,
      );
    } else {
      showToast && toast(message || t("error:title"), {type: "error"});
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
      let menu = checkIsWrite(authState["menu"], Routes.requestsApprovedHandle);
      if (menu) setIsWrite(menu.isWrite);
      return onCheckLocal();
    }
  }, [
    loading.main,
    authState["successSignIn"],
    authState["menu"]
  ]);

  useEffect(() => {
    if (loading.main || loading.search) {
      if (!approvedState["submittingListRequestHandle"]) {
        if (approvedState["successListRequestHandle"] && !approvedState["errorListRequestHandle"]) {
          return onPrepareData();
        }

        if (!approvedState["successListRequestHandle"] && approvedState["errorListRequestHandle"]) {
          return onError(approvedState["errorHelperListRequestHandle"]);
        }
      }
    }
  }, [
    loading.main,
    loading.search,
    approvedState["submittingListRequestHandle"],
    approvedState["successListRequestHandle"],
    approvedState["errorListRequestHandle"]
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
          <BlockHeadContent>
            <BlockTitle tag="h4">{t("request_handle:title")}</BlockTitle>
          </BlockHeadContent>
        </BlockHead>

        {/** Content table */}
        <Block>
          <DataTable className="card-stretch">
            {/** Filter table */}
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
                                      {t("request_handle:filter_request").toUpperCase()}
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
                                      <Col size="12">
                                        <FormGroup className="form-group">
                                          <label className="overline-title overline-title-alt">
                                            {t("request_handle:type_request")}
                                          </label>
                                          <ul className="custom-control-group g-3 align-center">
                                            <li>
                                              <div className="custom-control custom-control-sm custom-checkbox">
                                                <input
                                                  className="custom-control-input form-control"
                                                  id="allowType"
                                                  name="allowType"
                                                  type="checkbox"
                                                  disabled={disabled}
                                                  value={1}
                                                  checked={formData.type.includes(1)}
                                                  onChange={onChangeType}
                                                />
                                                <label className="custom-control-label" htmlFor="allowType">
                                                  {t("request_handle:allow")}
                                                </label>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="custom-control custom-control-sm custom-checkbox">
                                                <input
                                                  className="custom-control-input form-control"
                                                  id="damageType"
                                                  name="damageType"
                                                  type="checkbox"
                                                  disabled={disabled}
                                                  value={2}
                                                  checked={formData.type.includes(2)}
                                                  onChange={onChangeType}
                                                />
                                                <label className="custom-control-label " htmlFor="damageType">
                                                  {t("request_handle:damage")}
                                                </label>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="custom-control custom-control-sm custom-checkbox">
                                                <input
                                                  className="custom-control-input form-control"
                                                  id="lostType"
                                                  name="lostType"
                                                  type="checkbox"
                                                  disabled={disabled}
                                                  value={3}
                                                  checked={formData.type.includes(3)}
                                                  onChange={onChangeType}
                                                />
                                                <label className="custom-control-label" htmlFor="lostType">
                                                  {t("request_handle:lost")}
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
            
            {/** Data table */}
            <TableRequestHandle
              isWrite={isWrite}
              dataRequest={data.requests}
              onApproved={onApproved}
              onProcess={onProcess}
            />

            {/** Paging table */}
            <PreviewAltCard>
              {disabled ? (
                <div className="text-center">
                  <Spinner size="sm" color="primary" />
                </div>
              ) : 
                data.requests.length > 0 ? (
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
          </DataTable>
        </Block>

        {/** Forms */}
        <ApprovedForm
          show={view.approved}
          history={history}
          commonState={commonState}
          authState={authState}
          isWrite={isWrite}
          updateItem={updateItem}
          dataDetails={detailsItem}
          onClose={onCloseAddEditForm}
        />

        <ProcessModal
          show={view.process}
          dataRequest={updateItem}
          onClose={toggleView}
        />
      </Content>
    </React.Fragment>
  )
};

export default RequestAssetsHandle;
