import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import SimpleBar from "simplebar-react";
import {Form, FormGroup, Label} from "reactstrap";
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

function LiquidationForm(props) {
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
  const masterState = useSelector(({master}) => master);
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    liquidation: false,
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
    liquidationEmployee: "",
    liquidationDepartment: "",
    liquidationRegion: "",
    liquidationDate: new Date(),
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
  };

  const onChangeDate = value => {
    setFormData({...formData, liquidationDate: value});
  };

  const onResetData = () => {
    setFormData({
      ...formData,
      liquidationDate: new Date(),
      reason: "",
      file: "",
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

      employee: data.empName || "",
      department: data.deptNameManager || "",
      region: data.regionName || "",
      position: data.jobTitle || "",
    });
    setFormData({
      ...formData,
      liquidationEmployee: data.empCode,
      liquidationDepartment: data.deptCodeManager,
      liquidationRegion: data.regionCode,
    });
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "Region,Department,Employee",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onFormSubmit = () => {
    setLoading({...loading, liquidation: true});
    let params = {
      AssetID: dataItem.id,
      EmpCode: formData.liquidationEmployee,
      DeptCode: formData.liquidationDepartment,
      RegionCode: formData.liquidationRegion,
      JobTitle: dataItem.position,
      Reasons: formData.reason,
      FileUpload: formData.file,
      TransDate: moment(formData.liquidationDate).format("YYYY-MM-DD"),
      
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    console.log('[LOG] === onFormSubmit ===> ', params);
    dispatch(Actions.fFetchLiquidationAssets(params, history));
  };

  const onSuccess = type => {
    setLoading({main: false, liquidation: false});
    if (type === "Liquidation") {
      onResetData();
      onClose(true, t("success:liquidation_assets"));
    }
  };

  const onError = (type, error) => {
    console.log('[LOG] === onError ===> ', error);
    setLoading({main: false, liquidation: false});
    if (type === "Liquidation") {
      onResetData();
      onClose(false, error);
    }
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
    authState["successSignIn"]
  ]);

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
    if (loading.main && show) {
      if (!masterState["submittingGetAll"]) {
        if (masterState["successGetAll"] && !masterState["errorGetAll"]) {
          return onSuccess("MasterData");
        }
        if (!masterState["successGetAll"] && masterState["errorGetAll"]) {
          return onError("MasterData", masterState["errorHelperGetAll"]);
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
    if (loading.liquidation && show) {
      if (!approvedState["submittingLiquidationAssets"]) {
        if (approvedState["successLiquidationAssets"] && !approvedState["errorLiquidationAssets"]) {
          return onSuccess("Liquidation");
        }
        if (!approvedState["successLiquidationAssets"] && approvedState["errorLiquidationAssets"]) {
          return onError("Liquidation", approvedState["errorHelperLiquidationAssets"]);
        }
      }
    }
  }, [
    show,
    loading.liquidation,
    approvedState["submittingLiquidationAssets"],
    approvedState["successLiquidationAssets"],
    approvedState["errorLiquidationAssets"],
  ]);

  /**
   ** RENDER 
   */
  const {errors, register, handleSubmit} = useForm();
  const disabled = loading.main || loading.liquidation;

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
              <BlockTitle tag="h3">{t("liquidation_assets:title")}</BlockTitle>
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
                    {loading.liquidation && (
                      <div className="spinner-border spinner-border-sm text-white" role="status" />
                    )}
                    {!loading.liquidation && <Icon name="save"></Icon>}
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {loading.liquidation && (
                      <div className="spinner-border spinner-border-sm text-white mr-2" role="status" />
                    )}
                    {!loading.liquidation && <Icon name="save"></Icon>}
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
            <BlockTitle tag="h6">{t("liquidation_assets:information")}</BlockTitle>
          </BlockHead>
          <div className="profile-ud-list">
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("liquidation_assets:code")}</span>
                <span className="profile-ud-value">{dataItem.code}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("liquidation_assets:name")}</span>
                <span className="profile-ud-value">{dataItem.name}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("liquidation_assets:group")}</span>
                <span className="profile-ud-value">{dataItem.group}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("liquidation_assets:purchase_date")}</span>
                <span className="profile-ud-value">{dataItem.purchaseDate}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("liquidation_assets:origin_price")}</span>
                <span className="profile-ud-value">{dataItem.originPrice}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("liquidation_assets:status")}</span>
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
                <span className="profile-ud-label">{t("liquidation_assets:description")}</span>
                <span className="profile-ud-value">{dataItem.description}</span>
              </div>
            </div>
          </div>

          <div className="nk-divider divider md"></div>

          <BlockHead>
            <BlockTitle tag="h6">{t("liquidation_assets:information_employee")}</BlockTitle>
          </BlockHead>
          <div className="profile-ud-list">
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("liquidation_assets:employee")}</span>
                <span className="profile-ud-value">{dataItem.employee}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("liquidation_assets:position")}</span>
                <span className="profile-ud-value">{dataItem.position}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("liquidation_assets:department")}</span>
                <span className="profile-ud-value">{dataItem.department}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("liquidation_assets:region")}</span>
                <span className="profile-ud-value">{dataItem.region}</span>
              </div>
            </div>
          </div>

          <div className="nk-divider divider md"></div>

          <BlockHead>
            <BlockTitle tag="h6">{t("liquidation_assets:information_liquidation")}</BlockTitle>
          </BlockHead>
          <Row className="g-3">
            <Col md="6">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="liquidationDate">
                    {t("liquidation_assets:liquidation_date")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-left">
                    <Icon name="calendar"></Icon>
                  </div>
                  <DatePicker
                    selected={formData.liquidationDate}
                    className="form-control date-picker"
                    disabled={disabled}
                    value={formData.liquidationDate}
                    onChange={onChangeDate}
                    customInput={<CustomDateInput />}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="file">
                    {t("liquidation_assets:file")}
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
            <Col size="12">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="reason">
                    {t("liquidation_assets:liquidation_reason")}
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
                    placeholder={t("liquidation_assets:holder_liquidation_reason")}
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

export default LiquidationForm;
