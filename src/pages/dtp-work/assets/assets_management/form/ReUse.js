import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import SimpleBar from "simplebar-react";
import {Form, FormGroup, Label, Spinner} from "reactstrap";
import NumberFormat from 'react-number-format';
import moment from "moment";
/** COMMON */
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  BlockBetween,
  Row,
  Col,
} from "../../../../../components/Component";
import AssetInformations from "../components/AssetInformations";
/** COMMON */
import Configs from "../../../../../configs";
import {log} from "../../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../../redux/actions";

const CustomDateInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-left">
      <Icon name="calendar"></Icon>
    </div>
    <input
      className="form-control date-picker"
      type="text"
      value={moment(value).format("DD/MM/YYYY")}
      onChange={onChange}
    />
  </div>
));

function ReUseForm(props) {
  const {t} = useTranslation();
  const {errors, register, clearErrors, handleSubmit} = useForm();
  const {
    show,
    history,
    commonState,
    authState,
    updateItem,
    updateHistory,
    onClose,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [loading, setLoading] = useState({
    main: false,
    reuse: false,
    history: false,
  });
  const [error, setError] = useState({
    cost: null,
  });
  const [isRemoveFile, setRemoveFile] = useState(false);
  const [dataItem, setDataItem] = useState({
    id: "",
    code: "",
    name: "",
    group: "",
    description: "",
    purchaseDate: "",
    originPrice: "",
    statusID: 0,
    status: "",

    employee: "",
    department: "",
    region: "",
    position: "",
  });
  const [formData, setFormData] = useState({
    repairDate: new Date(),
    repairName: "",
    repairCost: "",
    file: "",
    resueDate: new Date(),
    reason: "",
  });

  /**
   ** FUNCTIONS 
   */
   const onChangeInput = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onChangeFile = e => {
    setFormData({...formData, file: e.target.files[0]});
    if (formData.file && e.target.files[0].name !== formData.file.name) {
      setRemoveFile(true);
    }
  };

  const onChangeDate = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const onResetData = () => {
    setFormData({
      repairDate: new Date(),
      repairName: "",
      repairCost: "",
      file: "",
      resueDate: new Date(),
      reason: "",
    });
  };

  const onSetFormDataDetails = (data, dataH) => {
    log('[LOG] === onSetFormDataDetails ===> ', data);
    if (!dataH) {
      setDataItem({
        id: data.assetID,
        code: data.assetCode,
        name: data.assetName,
        group: data.groupName,
        description: data.descr || "-",
        purchaseDate: data.purchaseDate,
        originPrice: data.originalPrice,
        statusID: data.statusID,
        status: data.statusName,

        employee: data.empCode || "",
        department: data.deptCodeManager || "",
        region: data.regionCode || "",
        position: data.jobTitle || "",
      });
    } else {
      setDataItem({
        id: data.assetID,
        code: data.assetCode,
        name: data.assetName,
        group: data.groupName,
        description: data.descr || "-",
        purchaseDate: data.purchaseDate,
        originPrice: data.originalPrice,
        statusID: data.statusID,
        status: data.statusName,

        employee: dataH.empCode || "",
        department: dataH.deptCode || "",
        region: dataH.regionCode || "",
        position: dataH.jobTitle || "",
      });
      setFormData({
        ...formData,
        repairName: dataH.supplierRepair || "",
        repairCost: dataH.actCost,
        repairDate: dataH.endRepairDate 
          ? new Date(
            moment(dataH.endRepairDate).year(),
            moment(dataH.endRepairDate).month(),
            moment(dataH.endRepairDate).date()
          )
          : new Date(),
        resueDate: dataH.transDate 
        ? new Date(
          moment(dataH.transDate).year(),
          moment(dataH.transDate).month(),
          moment(dataH.transDate).date()
        )
        : new Date(),
        reason: dataH.reasons,
        file: dataH.attachFiles ? {id: "history", name: dataH.attachFiles} : "",
      });
    }
  };

  const onFormSubmit = () => {
    setError({cost: null});
    if (!formData.repairCost) {
      return setError({cost: {message: t("validate:empty")}});
    }

    if (!updateHistory) {
      setLoading({...loading, reuse: true});
      let params = {
        AssetID: dataItem.id,
        EmpCode: dataItem.employee,
        DeptCode: dataItem.department,
        RegionCode: dataItem.region,
        JobTitle: dataItem.position,
        Reasons: formData.reason.trim(),
        FileUpload: formData.file,
        TransDate: moment(formData.resueDate).format("YYYY-MM-DD"),
        EndRepairDate: moment(formData.repairDate).format("YYYY-MM-DD"),
        SupplierRepair: formData.repairName.trim(),
        ActCost: formData.repairCost,
        
        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      log('[LOG] === onFormSubmit ===> ', params);
      dispatch(Actions.fFetchReuseAssets(params, history));
    }
    if (updateHistory) {
      setLoading({...loading, history: true});
      let params = {
        LineNum: updateHistory.lineNum,
        AssetID: dataItem.id,
        IsRemovedFile: isRemoveFile,
        TypeUpdate: "Reuse",
        Reasons: formData.reason.trim(),
        FileUpload: formData.file?.id === "history" ? "" : formData.file,
        EndRepairDate: moment(formData.repairDate).format("YYYY-MM-DD"),
        TransDate: moment(formData.resueDate).format("YYYY-MM-DD"),
        SupplierRepair: formData.repairName.trim(),
        ActCost: formData.repairCost,

        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      log('[LOG] === onFormSubmit ===> ', params);
      dispatch(Actions.fFetchUpdateProcess(params, history));
    }
  };

  const onSuccess = type => {
    if (type === "Reuse") {
      onResetData();
      onClose(true, t("success:reuse_assets"));
    }
    if (type === "History") {
      onResetData();
      onClose(true, t("success:update_history_assets"), "reuse", true);
    }
    setRemoveFile(false);
    setLoading({main: false, reuse: false, history: false});
  };

  const onError = (type, error) => {
    log('[LOG] === onError ===> ', error);
    if (type === "Reuse") {
      onResetData();
      onClose(false, error);
    }
    if (type === "History") {
      onResetData();
      onClose(false, error);
    }
    setRemoveFile(false);
    setLoading({main: false, reuse: false});
  };

  const onDownloadAttachFile = () => {
    window.open(`${Configs.hostAPI}/${formData.file.name}`, "_blank");
  };

  /**
   ** LIFE CYCLE 
   */
  useEffect(() => {
    if (show) {
      clearErrors();
    }
  }, [show]);

  useEffect(() => {
    if (!updateHistory && updateItem && show) {
      onSetFormDataDetails(updateItem);
    }
  }, [
    show,
    updateItem,
    updateHistory,
  ]);

  useEffect(() => {
    if (updateHistory && show) {
      onSetFormDataDetails(updateItem, updateHistory);
    }
  }, [
    show,
    updateHistory,
  ]);

  useEffect(() => {
    if (loading.reuse && show) {
      if (!approvedState["submittingReuseAssets"]) {
        if (approvedState["successReuseAssets"] && !approvedState["errorReuseAssets"]) {
          return onSuccess("Reuse");
        }
        if (!approvedState["successReuseAssets"] && approvedState["errorReuseAssets"]) {
          return onError("Reuse", approvedState["errorHelperReuseAssets"]);
        }
      }
    }
  }, [
    show,
    loading.reuse,
    approvedState["submittingReuseAssets"],
    approvedState["successReuseAssets"],
    approvedState["errorReuseAssets"],
  ]);

  useEffect(() => {
    if (loading.history && show) {
      if (!approvedState["submittingUpdateProcess"]) {
        if (approvedState["successUpdateProcess"] && !approvedState["errorUpdateProcess"]) {
          return onSuccess("History");
        }
        if (!approvedState["successUpdateProcess"] && approvedState["errorUpdateProcess"]) {
          return onError("History", approvedState["errorHelperUpdateProcess"]);
        }
      }
    }
  }, [
    show,
    loading.history,
    approvedState["submittingUpdateProcess"],
    approvedState["successUpdateProcess"],
    approvedState["errorUpdateProcess"],
  ]);

  /**
   ** RENDER 
   */
  const disabled = loading.main || loading.reuse || loading.history;
  return (
    <SimpleBar
      className={`nk-add-assets toggle-slide toggle-slide-right toggle-screen-any ${
        show ? "content-active" : ""
      }`}
    >
      <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
      <BlockHead>
          <BlockBetween>
            <BlockHeadContent>
              {!updateHistory && (
                <BlockTitle tag="h4">{t("reuse_assets:title")}</BlockTitle>
              )}
              {updateHistory && (
                <BlockTitle tag="h4">{t("reuse_assets:history_title")}</BlockTitle>
              )}
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                {/* <li className="nk-block-tools-opt">
                  <Button
                    className="toggle btn-icon d-md-none"
                    color="gray"
                    type="button"
                    disabled={disabled}
                    onClick={onResetData}
                  >
                    <Icon name="undo"></Icon>
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="gray"
                    type="button"
                    disabled={disabled}
                    onClick={onResetData}
                  >
                    <Icon name="undo"></Icon>
                    <span>{t("common:reset")}</span>
                  </Button>
                </li> */}
                <li className="nk-block-tools-opt">
                  <Button
                    className="toggle btn-icon d-md-none"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {(loading.reuse || loading.history) && (
                      <Spinner size="sm" color="light" />
                    )}
                    {!loading.reuse && !loading.history && <Icon name="save"></Icon>}
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {(loading.reuse || loading.history) && (
                      <Spinner className="mr-2" size="sm" color="light" />
                    )}
                    {!loading.reuse && !loading.history && <Icon name="save"></Icon>}
                    <span>{t("common:save")}</span>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <AssetInformations data={dataItem} />

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("reuse_assets:information_repair")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="repairDate">
                      {t("reuse_assets:repair_date")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="calendar"></Icon>
                    </div>
                    <DatePicker
                      selected={formData.repairDate}
                      className="form-control date-picker"
                      disabled={disabled}
                      value={formData.repairDate}
                      onChange={date => onChangeDate("repairDate", date)}
                      customInput={<CustomDateInput />}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="repairName">
                      {t("reuse_assets:repair_name")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: t("validate:empty") })}
                      className="form-control"
                      type="text"
                      id="repairName"
                      name="repairName"
                      disabled={disabled}
                      value={formData.repairName}
                      placeholder={t("reuse_assets:holder_repair_name")}
                      onChange={onChangeInput}
                    />
                    {errors.repairName && (
                      <span className="invalid">{errors.repairName.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="repairCost">
                      {t("reuse_assets:repair_cost")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <NumberFormat
                      className="form-control"
                      name="repairCost"
                      value={formData.repairCost}
                      placeholder={t("reuse_assets:holder_repair_cost") || ' '}
                      thousandSeparator
                      prefix="đ "
                      onValueChange={val =>
                        onChangeInput({target: {name: "repairCost", value: val.floatValue}})}
                    />
                    {error.cost && (
                      <span className="invalid">{error.cost.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="file">
                      {t("reuse_assets:file")}
                    </label>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className={`form-control-wrap flex-fill ${updateHistory && formData.file?.id === "history" && "mr-3"}`}>
                      <div className="custom-file">
                        <input
                          className="custom-file-input form-control"
                          id="file"
                          type="file"
                          multiple={false}
                          disabled={disabled}
                          onChange={onChangeFile}
                        />
                        <Label className="custom-file-label" htmlFor="file">
                          {!formData.file ? t("common:choose_file") : formData.file.name}
                        </Label>
                      </div>
                    </div>
                    {updateHistory && formData.file?.id === "history" && (
                      <Button
                        color="primary"
                        type="button"
                        disabled={disabled}
                        onClick={onDownloadAttachFile}
                      >
                        <Icon name="download"></Icon>
                        <span>{t("common:download")}</span>
                      </Button>
                    )}
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Block>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("reuse_assets:information_reuse")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="resueDate">
                      {t("reuse_assets:reuse_date")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="calendar"></Icon>
                    </div>
                    <DatePicker
                      selected={formData.resueDate}
                      className="form-control date-picker"
                      disabled={disabled}
                      value={formData.resueDate}
                      onChange={date => onChangeDate("resueDate", date)}
                      customInput={<CustomDateInput />}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="reason">
                      {t("reuse_assets:reuse_reason")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <textarea
                      className="no-resize form-control"
                      type="text"
                      id="reason"
                      name="reason"
                      disabled={disabled}
                      value={formData.reason}
                      placeholder={t("reuse_assets:holder_reuse_reason")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Block>
      </Form>
    </SimpleBar>
  );
};

export default ReUseForm;
