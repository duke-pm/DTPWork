import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import SimpleBar from "simplebar-react";
import {Form, FormGroup, Label, Spinner} from "reactstrap";
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
import EmployeeInformations from "../components/EmployeeInformations";
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

function LiquidationForm(props) {
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
    liquidation: false,
    history: false,
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

    employeeCode: "",
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
    if (formData.file && e.target.files[0].name !== formData.file.name) {
      setRemoveFile(true);
    }
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

  const onSetFormDataDetails = (data, dataH) => {
    log('[LOG] === onSetFormDataDetails ===> ', data);
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
      employeeCode: data.empCode || "",
      employee: data.empName || "",
      department: data.deptNameManager || "",
      region: data.regionName || "",
      position: data.jobTitle || "",
    });
    if (!dataH) {
      setFormData({
        liquidationEmployee: data.empCode,
        liquidationDepartment: data.deptCodeManager,
        liquidationRegion: data.regionCode,
        liquidationDate: new Date(),
        reason: "",
        file: "",
      });
    } else {
      setFormData({
        liquidationEmployee: dataH.empCode,
        liquidationDepartment: dataH.deptCode,
        liquidationRegion: dataH.regionCode,
        liquidationDate: dataH.transDate 
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
    if (!updateHistory) {
      setLoading({...loading, liquidation: true});
      let params = {
        AssetID: dataItem.id,
        EmpCode: formData.liquidationEmployee,
        DeptCode: formData.liquidationDepartment,
        RegionCode: formData.liquidationRegion,
        JobTitle: dataItem.position,
        Reasons: formData.reason.trim(),
        FileUpload: formData.file,
        TransDate: moment(formData.liquidationDate).format("YYYY-MM-DD"),
        
        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      log('[LOG] === onFormSubmit ===> ', params);
      dispatch(Actions.fFetchLiquidationAssets(params, history));
    }
    if (updateHistory) {
      setLoading({...loading, history: true});
      let params = {
        LineNum: updateHistory.lineNum,
        AssetID: dataItem.id,
        IsRemovedFile: isRemoveFile,
        TypeUpdate: "Liquidate",
        Reasons: formData.reason.trim(),
        FileUpload: formData.file?.id === "history" ? "" : formData.file,
        TransDate: moment(formData.liquidationDate).format("YYYY-MM-DD"),

        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      log('[LOG] === onFormSubmit ===> ', params);
      dispatch(Actions.fFetchUpdateProcess(params, history));
    }
  };

  const onSuccess = type => {
    if (type === "Liquidation") {
      onResetData();
      onClose(true, t("success:liquidation_assets"));
    }
    if (type === "History") {
      onResetData();
      onClose(true, t("success:update_history_assets"), "liquidation", true);
    }
    setRemoveFile(false);
    setLoading({liquidation: false, history: false});
  };

  const onError = (type, error) => {
    log('[LOG] === onError ===> ', error);
    if (type === "Liquidation") {
      onResetData();
      onClose(false, error);
    }
    if (type === "History") {
      onResetData();
      onClose(false, error);
    }
    setRemoveFile(false);
    setLoading({liquidation: false, history: false});
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
  const {handleSubmit} = useForm();
  const disabled = loading.liquidation || loading.history;

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
                <BlockTitle tag="h4">{t("liquidation_assets:title")}</BlockTitle>
              )}
              {updateHistory && (
                <BlockTitle tag="h4">{t("liquidation_assets:history_title")}</BlockTitle>
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
                      <Spinner size="sm" color="light" />
                    )}
                    {!loading.liquidation && !loading.history && <Icon name="save"></Icon>}
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {disabled && (
                      <Spinner className="mr-2" size="sm" color="light" />
                    )}
                    {!loading.liquidation && !loading.history && <Icon name="save"></Icon>}
                    <span>{t("common:save")}</span>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <AssetInformations data={dataItem} />
        <EmployeeInformations data={dataItem} />

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("liquidation_assets:information_liquidation")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="4">
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
              <Col md="8">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="file">
                      {t("liquidation_assets:file")}
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
          </div>
        </Block>
      </Form>
    </SimpleBar>
  );
};

export default LiquidationForm;
