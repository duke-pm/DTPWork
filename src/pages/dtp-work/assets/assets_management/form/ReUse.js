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
/** COMMON */
import {numberFormat} from "utils/Utils";
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

function ReUseForm(props) {
  const {t} = useTranslation();
  const {
    show,
    history,
    commonState,
    authState,
    updateItem,
    onClose,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [loading, setLoading] = useState({
    main: false,
    reuse: false,
  });
  const [error, setError] = useState({
    cost: null,
  });
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

  const onSetFormDataDetails = data => {
    console.log('[LOG] === onSetFormDataDetails ===> ', data);
    setDataItem({
      id: data.assetID,
      code: data.assetCode,
      name: data.assetName,
      group: data.groupName,
      description: data.descr
        ? data.descr
        : "-",
      purchaseDate: data.purchaseDate
        ? moment(data.purchaseDate).format("DD/MM/YYYY")
        : "-",
      originPrice: data.originalPrice
        ? numberFormat(data.originalPrice)
        : "-",
      statusID: data.statusID,
      status: data.statusName,

      employee: data.empCode || "",
      department: data.deptCodeManager || "",
      region: data.regionCode || "",
      position: data.jobTitle || "",
    });
  };

  const onFormSubmit = () => {
    setError({cost: null});
    if (!formData.repairCost) {
      return setError({cost: {message: t("validate:empty")}});
    }

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
    console.log('[LOG] === onFormSubmit ===> ', params);
    dispatch(Actions.fFetchReuseAssets(params, history));
  };

  const onSuccess = type => {
    setLoading({main: false, reuse: false});
    if (type === "Reuse") {
      onResetData();
      onClose(true, t("success:reuse_assets"));
    }
  };

  const onError = (type, error) => {
    console.log('[LOG] === onError ===> ', error);
    setLoading({main: false, reuse: false});
    if (type === "Reuse") {
      onResetData();
      onClose(false, error);
    }
  };

  /**
   ** LIFE CYCLE 
   */
  useEffect(() => {
    if (updateItem && show) {
      onResetData();
      onSetFormDataDetails(updateItem);
    }
  }, [
    show,
    updateItem
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

  /**
   ** RENDER 
   */
   const {errors, register, handleSubmit} = useForm();
   const disabled = loading.main || loading.reuse;
 
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
              <BlockTitle tag="h3">{t("reuse_assets:title")}</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li className="nk-block-tools-opt">
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
                </li>
                <li className="nk-block-tools-opt">
                  <Button
                    className="toggle btn-icon d-md-none"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {loading.reuse && (
                      <div className="spinner-border spinner-border-sm text-white" role="status" />
                    )}
                    {!loading.reuse && <Icon name="save"></Icon>}
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {loading.reuse && (
                      <div className="spinner-border spinner-border-sm text-white mr-2" role="status" />
                    )}
                    {!loading.reuse && <Icon name="save"></Icon>}
                    <span>{t("common:save")}</span>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <div className="nk-divider divider md"></div>

        <Block>
          <BlockHead>
            <BlockTitle tag="h6">{t("reuse_assets:information")}</BlockTitle>
          </BlockHead>
          <div className="profile-ud-list">
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("reuse_assets:code")}</span>
                <span className="profile-ud-value text-primary">{dataItem.code}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("reuse_assets:name")}</span>
                <span className="profile-ud-value">{dataItem.name}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("reuse_assets:group")}</span>
                <span className="profile-ud-value">{dataItem.group}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("reuse_assets:purchase_date")}</span>
                <span className="profile-ud-value">{dataItem.purchaseDate}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("reuse_assets:origin_price")}</span>
                <span className="profile-ud-value">{dataItem.originPrice}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("reuse_assets:status")}</span>
                <span className="profile-ud-value">
                  <span
                    className={`dot bg-${
                      dataItem.statusID === 1
                        ? "gray"
                        : dataItem.statusID === 2
                          ? "success"
                          : dataItem.statusID === 3
                            ? "warning"
                            : (dataItem.statusID === 4 || dataItem.statusID === 5)
                              ? "danger"
                              : "primary"
                    } d-mb-none`}
                  ></span>
                  <span
                    className={`badge badge-sm badge-dot has-bg badge-${
                      dataItem.statusID === 1
                        ? "gray"
                        : dataItem.statusID === 2
                          ? "success"
                          : dataItem.statusID === 3
                            ? "warning"
                            : (dataItem.statusID === 4 || dataItem.statusID === 5)
                              ? "danger"
                              : "primary"
                    } d-none d-mb-inline-flex`}
                  >
                    {dataItem.status}
                  </span>
                </span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("reuse_assets:description")}</span>
                <span className="profile-ud-value">{dataItem.description}</span>
              </div>
            </div>
          </div>

          <div className="nk-divider divider md"></div>

          <BlockHead>
            <BlockTitle tag="h6">{t("reuse_assets:information_repair")}</BlockTitle>
          </BlockHead>
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
                <div className="form-control-wrap">
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
              </FormGroup>
            </Col>
          </Row>

          <div className="nk-divider divider md"></div>

          <BlockHead>
            <BlockTitle tag="h6">{t("reuse_assets:information_reuse")}</BlockTitle>
          </BlockHead>
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
        </Block>
      </Form>
    </SimpleBar>
  );
};

export default ReUseForm;
