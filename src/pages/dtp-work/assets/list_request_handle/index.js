import React, {useState, useEffect} from "react";
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
import TableRequestHandle from "./table";
import ApprovedForm from "./modal/Approved";
import ProcessModal from "./modal/Process";
/** COMMON */
import Configs from "configs";
import {getLocalStorage, setLocalStorage} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";
import Constants from "utils/constants";

function RequestAssetsHandle(props) {
  const {t} = useTranslation();
  const history = useHistory();

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
  const [view, setView] = useState({
    approved: false,
    process: false,
  });
  const [formData, setFormData] = useState({
    page: 1,
    type: 0,
    status: 0,
    search: "",
    rangeStart: new Date(moment().startOf('month').format('YYYY/MM/DD')),
    rangeEnd: new Date(moment().endOf('month').format('YYYY/MM/DD')),
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

  const onChangeSearch = (e) => setFormData({...formData, search: e.target.value});

  const onChangeDate = (type, date) => setFormData({...formData, [type]: date});

  const toogleView = type => {
    setView({
      approved: type === "approved" ? true : false,
      process: type === "process" ? true : false,
    });
    if (!type && updateItem) {
      setUpdateItem(null);
      setDetailsItem([]);
    }
  };

  const onSearch = (ev) => {
    ev.preventDefault();
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

  const onSearchByDate = () => {
    if (!loading.search) {
      setLoading({...loading, search: true});
      // Update params
      let tmpFormData = {...formData};
      tmpFormData.page = 1;
      setFormData(tmpFormData);
      // Save to local storage
      setLocalStorage(Constants.LS_FROM_TO_REQUEST_HANDLE, {
        start: moment(formData.rangeStart).format('YYYY/MM/DD'),
        end: moment(formData.rangeEnd).format('YYYY/MM/DD'),
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
    toogleView("approved");
    setUpdateItem(dataRequest);
  };

  const onProcess = dataRequest => {
    toogleView("process");
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
    fromDate = moment().startOf('month').format('YYYY/MM/DD'),
    toDate = moment().endOf('month').format('YYYY/MM/DD'),
    search = "",
    type = 0,
    status = "1,2,3,4",
    page = 1,
  ) => {
    let params = {
      Search: search,
      StatusID: status,
      PageSize: Configs.perPage,
      PageNum: page,
      FromDate: fromDate,
      ToDate: toDate,
      RequestTypeID: type,
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
    toogleView();
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
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h4">{t("request_handle:title")}</BlockTitle>
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
                            selected={formData.rangeStart}
                            onChange={date => onChangeDate("rangeStart", date)}
                            dateFormat="dd/MM/yyyy"
                            selectsStart
                            startDate={formData.rangeStart}
                            endDate={formData.rangeEnd}
                            disabled={disabled}
                            />{" "}
                          <div className="input-group-addon fw-bold">{t("common:to")}</div>
                          <DatePicker
                            className="form-control"
                            wrapperClassName="end-m"
                            selected={formData.rangeEnd}
                            onChange={date => onChangeDate("rangeEnd", date)}
                            dateFormat="dd/MM/yyyy"
                            startDate={formData.rangeStart}
                            endDate={formData.rangeEnd}
                            selectsEnd
                            minDate={formData.rangeStart}
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
                          onClick={onSearch}>
                          <Icon name="search"></Icon>
                        </a>
                        <input
                          type="text"
                          className="form-control"
                          id="default-04"
                          disabled={disabled}
                          value={formData.search}
                          placeholder={t("common:search")}
                          onChange={onChangeSearch}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        {/** Content table */}
        <Block>
          <TableRequestHandle
            loading={loading.main || loading.search}
            curPage={formData.page}
            countItem={data.count}
            dataRequest={data.requests}
            onChangePage={onChangePage}
            onApproved={onApproved}
            onProcess={onProcess}
          />
        </Block>

        <ApprovedForm
          show={view.approved}
          history={history}
          commonState={commonState}
          authState={authState}
          updateItem={updateItem}
          dataDetails={detailsItem}
          onClose={onCloseAddEditForm}
        />

        <ProcessModal
          show={view.process}
          dataRequest={updateItem}
          onClose={toogleView}
        />
      </Content>
    </React.Fragment>
  )
};

export default RequestAssetsHandle;
