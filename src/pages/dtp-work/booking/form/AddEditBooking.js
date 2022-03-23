import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Form, FormGroup, Spinner} from "reactstrap";
import SimpleBar from "simplebar-react";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";
import moment from "moment";
/** COMPONENTS */
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockBetween,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  RSelect,
} from "../../../../components/Component";
/** COMMON */
import Constants from "../../../../utils/constants";
import {log} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

const CustomDateInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-left">
      <Icon name="calendar" />
    </div>
    <input
      className="form-control date-picker"
      type="text"
      value={moment(value).format("DD/MM/YYYY")}
      onChange={onChange}
    />
  </div>
));

function AddEditBookingForm(props) {
  const {t} = useTranslation();
  const {errors, register, clearErrors, handleSubmit} = useForm();
  const {
    show,
    history,
    isUpdate,
    authState,
    commonState,
    masterState,
    updateItem,
    onClose,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const bookingState = useSelector(({booking}) => booking);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [error, setError] = useState({
    resource: null,
    start: null,
    end: null,
  });
  const [dataSelect, setDataSelect] = useState({
    resources: [],
    employees: [],
    times: Constants.DATA_TIME_BOOKING,
  });
  const [formData, setFormData] = useState({
    id: -1,
    purpose: "",
    notes: "",
    resource: "",
    employees: "",
    start: {
      date: new Date(moment().format("YYYY/MM/DD")),
      time: "",
    },
    end: {
      date: new Date(moment().format("YYYY/MM/DD")),
      time: "",
    },
  });

  /**
   ** FUNCTIONS
   */
  const onChangeInput = e =>
   setFormData({...formData, [e.target.name]: e.target.value});

  const onChangeSelect = e => {
    if (error[e.key]) setError({...error, [e.key]: null});
    setFormData({...formData, [e.key]: e.value});
  };

  const onChangeSelectTime = e => {
    if (error[e.key]) setError({...error, [e.key]: null});
    setFormData({
      ...formData,
      [e.key]: {
        ...formData[e.key],
        time: e.value,
      },
    });
  };

  const onChangeDate = (type, value) => {
    setFormData({
      ...formData,
      [type]: {
        ...formData[type],
        date: value,
      },
    });
  };

  const onResetData = () => {
    setFormData({
      id: -1,
      purpose: "",
      notes: "",
      resource: "",
      employees: "",
      start: {
        date: new Date(moment().format("YYYY/MM/DD")),
        time: "",
      },
      end: {
        date: new Date(moment().format("YYYY/MM/DD")),
        time: "",
      },
    });
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "BKResource,Users",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onSetDataDetails = bk => {
    let fStartTime = Constants.DATA_TIME_BOOKING.find(f =>
      f.value === bk.strStartTime);
    let fEndTime = Constants.DATA_TIME_BOOKING.find(f =>
      f.value === bk.strEndTime);
    let fResrc = dataSelect.resources.find(f =>
      f.value === bk.resourceID);
    let fEmployees = [],
      i = null,
      fEmp = null;
    if (bk.lstUserJoined.length > 0) {
      for (i of bk.lstUserJoined) {
        fEmp = dataSelect.employees.find(f => f.value === i.userID);
        if (fEmp) fEmployees.push(fEmp);
      }
    }

    setFormData({
      id: bk.bookID,
      purpose: bk.purpose,
      notes: bk.remarks,
      resource: fResrc,
      employees: fEmployees.length > 0 ? fEmployees : "",
      start: {
        date: new Date(moment(bk.startDate.split("T")[0]).format("YYYY/MM/DD")),
        time: fStartTime || Constants.DATA_TIME_BOOKING[0],
      },
      end: {
        date: new Date(moment(bk.endDate.split("T")[0]).format("YYYY/MM/DD")),
        time: fEndTime || Constants.DATA_TIME_BOOKING[0],
      },
    });
  };

  const onValidate = () => {
    let isError = false,
      tmpError = {
        resource: null,
        start: null,
        end: null,
      };
    if (!formData.resource) {
      isError = true;
      tmpError.resource = {};
      tmpError.resource.message = t("validate:empty");
    }
    if (!formData.start.time) {
      isError = true;
      tmpError.start = {};
      tmpError.start.message = t("validate:empty");
    }
    if (!formData.end.time) {
      isError = true;
      tmpError.end = {};
      tmpError.end.message = t("validate:empty");
    }
    if (formData.start.time && formData.end.time) {
      if (moment(formData.start.date).diff(moment(formData.end.date), "days") > 0) {
        isError = true;
        tmpError.start = {};
        tmpError.start.message = t("validate:from_large_than_to");
      } else if (moment(formData.start.date).diff(moment(formData.end.date), "days") === 0) {
        let numberStart = Number(formData.start.time.value.replace(":", ""));
        let numberEnd = Number(formData.end.time.value.replace(":", ""));
        if (numberStart > numberEnd) {
          isError = true;
          tmpError.start = {};
          tmpError.start.message = t("validate:from_large_than_to");
        }
        if (numberStart === numberEnd) {
          isError = true;
          tmpError.start = {};
          tmpError.start.message = t("validate:minimum_time_is_30");
        }
      }
    }
    setError(tmpError);
    return isError;
  };

  const onFormSubmit = () => {
    let isError = onValidate();
    if (!isError) {
      setLoading({...loading, submit: true});
      let tmpEmps = "";
      if (formData.employees && formData.employees.length > 0) {
        tmpEmps = formData.employees.map(item => item.value);
        tmpEmps = tmpEmps.join();
      }

      let params = {
        BookID: !isUpdate ? "0" : formData.id,
        ResourceID: formData.resource.value,
        Purpose: formData.purpose.trim(),
        Remarks: formData.notes.trim(),
        IsOneTimeBooking: false,
        StartDate: moment(formData.start.date).format("YYYY/MM/DD"),
        EndDate: moment(formData.end.date).format("YYYY/MM/DD"),
        StartTime: Number(formData.start.time.value.replace(":", "")),
        EndTime: Number(formData.end.time.value.replace(":", "")),
        ListParticipant: tmpEmps || null,
        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      log('[LOG] === onFormSubmit ===> ', params);
      if (!isUpdate) {
        dispatch(Actions.fFetchCreateBooking(params, history));
      } else {
        dispatch(Actions.fFetchUpdateBooking(params, history));
      }
    }
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      dispatch(Actions.resetMasterData());
      let tmpDataUsers = masterState["users"].map(item => {
        return {value: item.empID, label: item.empName};
      });
      let tmpDataResources = masterState["bkReSource"].map(item => {
        return {value: item.resourceID, label: item.resourceName};
      });
      setDataSelect({
        resources: [...dataSelect.resources, ...tmpDataResources],
        employees: [...dataSelect.employees, ...tmpDataUsers],
      });
      setLoading({main: false, submit: false});
    } else {
      dispatch(Actions.resetBooking());
      let message = "success:create_booking";
      if (type === "Update") message = "success:update_booking";
      toast(t(message), {type: "success"});
      onResetData();
      onClose(type);
      setLoading({main: false, submit: false});
    }
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    dispatch(Actions.resetMasterData());
    dispatch(Actions.resetBooking());
    toast(error, {type: "error"});
    setLoading({main: false, submit: false});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (loading.main && authState["successSignIn"] && show) {
      onGetMasterData();
    }
  }, [
    show,
    loading.main,
    authState["successSignIn"],
  ]);

  useEffect(() => {
    if (!loading.main && isUpdate && show) {
      onSetDataDetails(updateItem);
    }
    if (!show) {
      onResetData();
      clearErrors();
    }
  }, [
    show,
    loading.main,
    isUpdate,
  ]);

  useEffect(() => {
    if (loading.main && show) {
      if (!masterState["submittingGetAll"]) {
        if (masterState["successGetAll"] && !masterState["errorGetAll"]) {
          return onSuccess("MasterData");
        }
        if (!masterState["successGetAll"] && masterState["errorGetAll"]) {
          return onError(masterState["errorHelperGetAll"]);
        }
      }
    }
  }, [
    show,
    loading.main,
    masterState["submittingGetAll"],
    masterState["successGetAll"],
    masterState["errorGetAll"],
  ]);

  useEffect(() => {
    if (loading.submit && !isUpdate) {
      if (!bookingState["submittingCreateBooking"]) {
        if (bookingState["successCreateBooking"] && !bookingState["errorCreateBooking"]) {
          return onSuccess("Create");
        }
        if (!bookingState["successCreateBooking"] && bookingState["errorCreateBooking"]) {
          return onError(bookingState["errorHelperCreateBooking"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    bookingState["submittingCreateBooking"],
    bookingState["successCreateBooking"],
    bookingState["errorCreateBooking"],
  ]);

  useEffect(() => {
    if (loading.submit && isUpdate) {
      if (!bookingState["submittingUpdateBooking"]) {
        if (bookingState["successUpdateBooking"] && !bookingState["errorUpdateBooking"]) {
          return onSuccess("Update");
        }
        if (!bookingState["successUpdateBooking"] && bookingState["errorUpdateBooking"]) {
          return onError(bookingState["errorHelperUpdateBooking"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    bookingState["submittingUpdateBooking"],
    bookingState["successUpdateBooking"],
    bookingState["errorUpdateBooking"],
  ]);

  /**
   ** RENDER
   */
  const disabled = loading.main || loading.submit;
  return (
    <SimpleBar
      className={`nk-add-assets toggle-slide toggle-slide-right toggle-screen-any ${
        show ? "content-active" : ""
      }`}>
      <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
        <BlockHead>
          <BlockBetween>
            <BlockHeadContent>
              {!isUpdate && (
                <BlockTitle tag="h4">{t("all_booking:add_booking")}</BlockTitle>
              )}
              {isUpdate && (
                <BlockTitle tag="h4">{t("all_booking:update_booking")}</BlockTitle>
              )}
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li className="nk-block-tools-opt">
                  <Button
                    className="toggle btn-icon d-md-none"
                    color="primary"
                    type="submit"
                    disabled={disabled}>
                    {disabled && <Spinner size="sm" color="light" />}
                    {!disabled && <Icon name="save" />}
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                    disabled={disabled}>
                    {disabled && <Spinner size="sm" color="light" />}
                    {!disabled && <Icon name="save" />}
                    <span>{t("common:save")}</span>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("all_booking:informations_basic")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="purpose">
                      {t("all_booking:purpose_use")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="chat-circle" />
                    </div>
                    <input
                      ref={register({required: t("validate:empty")})}
                      className="form-control"
                      type="text"
                      id="purpose"
                      name="purpose"
                      disabled={disabled}
                      value={formData.purpose}
                      placeholder={t("all_booking:holder_purpose_use")}
                      onChange={onChangeInput}
                    />
                    {errors.purpose && (
                      <span className="invalid">{errors.purpose.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="resource">
                      {t("all_booking:resource_use")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="resource"
                      isMulti={false}
                      isDisabled={disabled}
                      error={error.resource}
                      options={dataSelect.resources}
                      value={formData.resource}
                      placeholder={t("all_booking:holder_resource_use")}
                      onChange={e => onChangeSelect({key: "resource", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="notes">
                      {t("all_booking:notes")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <textarea
                      className="no-resize form-control"
                      type="text"
                      id="notes"
                      name="notes"
                      disabled={disabled}
                      value={formData.notes}
                      placeholder={t("all_booking:holder_notes")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="employees">
                      {t("all_booking:employee_join")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="employees"
                      isMulti={true}
                      isDisabled={disabled}
                      options={dataSelect.employees}
                      value={formData.employees}
                      placeholder={t("all_booking:holder_employee_join")}
                      onChange={e => onChangeSelect({key: "employees", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Block>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("all_booking:informations_time")}</h6>
          </div>
          <div className="mt-3">
            <div className="form-label-group">
              <label className="form-label" htmlFor="times">
                {t("all_booking:time_use")} <span className="text-danger">*</span>
              </label>
            </div>
            <Row className="g-3">
              <Col md="5">
                <div className="form-control-wrap">
                  <Row className="g-3">
                    <Col size="6">
                      <>
                        <div className="form-icon form-icon-left">
                          <Icon name="calendar"></Icon>
                        </div>
                        <DatePicker
                          selected={formData.start.date}
                          className="form-control date-picker"
                          disabled={disabled}
                          value={formData.start.date}
                          onChange={value => onChangeDate("start", value)}
                          customInput={<CustomDateInput />}
                        />
                      </>
                    </Col>
                    <Col size="6">
                      <RSelect
                        name="start"
                        isMulti={false}
                        isDisabled={disabled}
                        error={error.start}
                        options={Constants.DATA_TIME_BOOKING}
                        value={formData.start.time}
                        placeholder={t("all_booking:from_time")}
                        onChange={e => onChangeSelectTime({key: "start", value: e})}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col sm="12" md="2" className="d-flex justify-content-center align-items-center">
                <Icon name="arrow-right" className="text-primary" />
              </Col>
              <Col md="5">
                <div className="form-control-wrap">
                  <Row className="g-3">
                    <Col size="6">
                      <>
                        <div className="form-icon form-icon-left">
                          <Icon name="calendar"></Icon>
                        </div>
                        <DatePicker
                          selected={formData.end.date}
                          className="form-control date-picker"
                          disabled={disabled}
                          value={formData.end.date}
                          onChange={value => onChangeDate("end", value)}
                          customInput={<CustomDateInput />}
                        />
                      </>
                    </Col>
                    <Col size="6">
                      <RSelect
                        name="end"
                        isMulti={false}
                        isDisabled={disabled}
                        error={error.end}
                        options={Constants.DATA_TIME_BOOKING}
                        value={formData.end.time}
                        placeholder={t("all_booking:from_time")}
                        onChange={e => onChangeSelectTime({key: "end", value: e})}
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Block>
      </Form>
    </SimpleBar>
  );
};

export default AddEditBookingForm;
