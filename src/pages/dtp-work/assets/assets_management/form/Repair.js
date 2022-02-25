import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import SimpleBar from "simplebar-react";
import {Form, FormGroup, Label} from "reactstrap";
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
} from "components/Component";
import AssetInformations from "../components/AssetInformations";
/** COMMON */
import Configs from "configs";
/** REDUX */
import * as Actions from "redux/actions";

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

function RepairForm(props) {
  const {t} = useTranslation();
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
    repair: false,
    history: false,
  });
  const [error, setError] = useState({
    cost: false,
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
    repairName: "",
    repairCost: "",
    repairDate: new Date(),
    reason: "",
    file: "",
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

  const onChangeDate = value => {
    setFormData({...formData, repairDate: value});
  };

  const onResetData = () => {
    setFormData({
      repairName: "",
      repairCost: "",
      repairDate: new Date(),
      reason: "",
      file: "",
    });
  };

  const onSetFormDataDetails = (data, dataH) => {
    console.log('[LOG] === onSetFormDataDetails ===> ', data);
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

        employee: data.empCode,
        department: data.deptCodeManager,
        region: data.regionCode,
        position: data.jobTitle,
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

        employee: dataH.empCode,
        department: dataH.deptCode,
        region: dataH.regionCode,
        position: dataH.jobTitle,
      });
      setFormData({
        ...formData,
        repairName: dataH.supplierRepair,
        repairCost: dataH.expCost,
        repairDate: dataH.repairDate 
          ? new Date(
            moment(dataH.repairDate).year(),
            moment(dataH.repairDate).month(),
            moment(dataH.repairDate).date()
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
      setLoading({...loading, repair: true});
      let params = {
        AssetID: dataItem.id,
        EmpCode: dataItem.employee,
        DeptCode: dataItem.department,
        RegionCode: dataItem.region,
        JobTitle: dataItem.position,
        Reasons: formData.reason.trim(),
        FileUpload: formData.file,
        RepairDate: moment(formData.repairDate).format("YYYY-MM-DD"),
        SupplierRepair: formData.repairName.trim(),
        ExpCost: formData.repairCost,

        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      console.log('[LOG] === onFormSubmit ===> ', params);
      dispatch(Actions.fFetchRepairAssets(params, history));
    }
    if (updateHistory) {
      setLoading({...loading, history: true});
      let params = {
        LineNum: updateHistory.lineNum,
        AssetID: dataItem.id,
        IsRemovedFile: isRemoveFile,
        TypeUpdate: "Repair",
        Reasons: formData.reason.trim(),
        FileUpload: formData.file?.id === "history" ? "" : formData.file,
        RepairDate: moment(formData.repairDate).format("YYYY-MM-DD"),
        TransDate: moment().format("YYYY-MM-DD"),
        SupplierRepair: formData.repairName.trim(),
        ExpCost: formData.repairCost,

        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      console.log('[LOG] === onFormSubmit ===> ', params);
      dispatch(Actions.fFetchUpdateProcess(params, history));
    }
  };

  const onSuccess = type => {
    if (type === "Repair") {
      onResetData();
      onClose(true, t("success:repair_assets"));
    }
    if (type === "History") {
      onResetData();
      onClose(true, t("success:update_history_assets"), "repair", true);
    }
    setRemoveFile(false);
    setLoading({repair: false, history: false});
  };

  const onError = (type, error) => {
    console.log('[LOG] === onError ===> ', error);
    if (type === "Repair") {
      onResetData();
      onClose(false, error);
    }
    if (type === "History") {
      onResetData();
      onClose(false, error);
    }
    setRemoveFile(false);
    setLoading({repair: false, history: false});
  };

  const onDownloadAttachFile = () => {
    window.open(`${Configs.hostAPI}/${formData.file.name}`, "_blank");
  };

  /**
   ** LIFE CYCLE 
   */
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
    if (loading.repair && show) {
      if (!approvedState["submittingRepairAssets"]) {
        if (approvedState["successRepairAssets"] && !approvedState["errorRepairAssets"]) {
          return onSuccess("Repair");
        }
        if (!approvedState["successRepairAssets"] && approvedState["errorRepairAssets"]) {
          return onError("Repair", approvedState["errorHelperRepairAssets"]);
        }
      }
    }
  }, [
    show,
    loading.repair,
    approvedState["submittingRepairAssets"],
    approvedState["successRepairAssets"],
    approvedState["errorRepairAssets"],
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
  const {errors, register, handleSubmit} = useForm();
  const disabled = loading.repair || loading.history;

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
                <BlockTitle tag="h4">{t("repair_assets:title")}</BlockTitle>
              )}
              {updateHistory && (
                <BlockTitle tag="h4">{t("repair_assets:history_title")}</BlockTitle>
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
                    {disabled && (
                      <div className="spinner-border spinner-border-sm text-white" role="status" />
                    )}
                    {!loading.repair && !loading.history && <Icon name="save"></Icon>}
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {disabled && (
                      <div className="spinner-border spinner-border-sm text-white mr-2" role="status" />
                    )}
                    {!loading.repair && !loading.history && <Icon name="save"></Icon>}
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
            <h6 className="overline-title">{t("repair_assets:information_repair")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="approvedDate">
                      {t("repair_assets:repair_date")}
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
                      onChange={onChangeDate}
                      customInput={<CustomDateInput />}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="repairName">
                      {t("repair_assets:repair_name")} <span className="text-danger">*</span>
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
                      placeholder={t("repair_assets:holder_repair_name")}
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
                      {t("repair_assets:repair_cost")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <NumberFormat
                      className="form-control"
                      name="repairCost"
                      value={formData.repairCost}
                      placeholder={t("repair_assets:holder_repair_cost") || ' '}
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
                      {t("repair_assets:file")}
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
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="reason">
                      {t("repair_assets:repair_reason")}
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
                      placeholder={t("repair_assets:holder_repair_reason")}
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

export default RepairForm;
