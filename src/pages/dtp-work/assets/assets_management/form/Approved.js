import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import SimpleBar from "simplebar-react";
import {
  Form,
  FormGroup,
  Label,
  Spinner,
} from "reactstrap";
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
  RSelect,
} from "../../../../../components/Component";
import AssetInformations from "../components/AssetInformations";
import EmployeeInformations from "../components/EmployeeInformations";
/** COMMON */
import Configs from "../../../../../configs";
import Routes from "../../../../../services/routesApi";
import {getCookies, log} from "../../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../../redux/actions";

const CustomDateInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-left">
      <Icon name="calendar"/>
    </div>
    <input
      className="form-control date-picker"
      type="text"
      value={moment(value).format("DD/MM/YYYY")}
      onChange={onChange}
    />
  </div>
));

function ApprovedForm(props) {
  const {t} = useTranslation();
  const {
    show,
    isApproved,
    isRecall,
    history,
    commonState,
    authState,
    updateItem,
    updateHistory,
    onClose,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const masterState = useSelector(({master}) => master);
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    approved: false,
    recall: false,
    history: false,
  });
  const [error, setError] = useState({
    employee: null,
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
  });
  const [dataSelect, setDataSelect] = useState({
    employee: [],
    department: [],
    region: [],
  });
  const [formData, setFormData] = useState({
    assetEmployee: "",
    assetPosition: "",
    assetDepartment: "",
    assetRegion: "",
    approvedDate: new Date(),
    reason: "",
    file: "",
  });

  /**
   ** FUNCTIONS 
   */
  const onChangeInput = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onChangeSelect = sel => {
    if (error.employee) setError({employee: null});
    let fEmp = masterState["employee"].find(f => f.empCode === sel.value);
    if (fEmp) {
      let fDep = dataSelect.department.find(f => f.value === fEmp.deptCode);
      let fReg = dataSelect.region.find(f => f.value === fEmp.regionCode);
      setFormData({
        ...formData,
        assetEmployee: sel,
        assetDepartment: fDep,
        assetRegion: fReg,
        assetPosition: fEmp.jobTitle,
      });
    }
  };

  const onChangeFile = e => {
    if (e.target.files.length > 0) {
      if (formData.file && e.target.files[0].name !== formData.file.name) {
        setRemoveFile(true);
      }
      setFormData({...formData, file: e.target.files[0]});
    }
  };

  const onChangeDate = value => {
    setFormData({...formData, approvedDate: value});
  };

  const onResetData = () => {
    setDataItem({
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
    });
    if (!updateHistory) {
      if (isApproved) {
        setFormData({
          assetEmployee: "",
          assetPosition: "",
          assetDepartment: "",
          assetRegion: "",
          approvedDate: new Date(),
          reason: "",
          file: "",
        });
      }
      if (isRecall) {
        setFormData({
          ...formData,
          approvedDate: new Date(),
          reason: "",
          file: "",
        });
      }
    } else {
      setFormData({
        ...formData,
        reason: "",
        file: "",
      });
    }
  };

  const onSetFormDataDetails = (data, dataH) => {
    if (!dataH) {
      setDataItem({
        id: data?.assetID,
        code: data?.assetCode,
        name: data?.assetName,
        group: data?.groupName,
        description: data?.descr || "",
        purchaseDate: data.purchaseDate,
        originPrice: data?.originalPrice,
        statusID: data?.statusID,
        status: data?.statusName,
        employeeCode: data?.empCode || "",
        employee: data?.empName || "",
        department: data?.deptNameManager || "",
        region: data?.regionName || "",
      });
      if (isRecall) {
        setFormData({
          ...formData,
          assetEmployee: data.empCode,
          assetDepartment: data.deptCodeManager,
          assetRegion: data.regionCode,
          assetPosition: data.jobTitle,
        });
      }
    } else {
      setDataItem({
        ...dataItem,
        id: data.assetID,
        code: data.assetCode || "-",
        name: data.assetName,
        group: data.groupName,
        description: data.descr || "-",
        purchaseDate: data.purchaseDate,
        originPrice: data.originalPrice || "-",
        statusID: data.statusID,
        status: data.statusName,
      });
      setFormData({
        ...formData,
        approvedDate: dataH.transDate,
        assetEmployee: dataH.empCode,
        assetDepartment: dataH.deptCode,
        assetRegion: dataH.regionCode,
        assetPosition: dataH.jobTitle,
        file: dataH.attachFiles ? {id: "history", name: dataH.attachFiles} : "",
        reason: dataH.reasons || "",
      });
    }
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "Region,Department,Employee,Supplier",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onFormSubmit = () => {
    setError({employee: null});
    if (!updateHistory) {
      if (!formData.assetEmployee) {
        return setError({employee: {message: t("validate:empty")}});
      }
  
      setLoading({
        ...loading,
        approved: isApproved ? true : false,
        recall: isRecall ? true : false,
      });
      let params = {
        AssetID: dataItem.id,
        EmpCode: isApproved
          ? formData.assetEmployee.value
          : formData.assetEmployee,
        DeptCode: isApproved
          ? formData.assetDepartment.value
          : formData.assetDepartment,
        RegionCode: isApproved
          ? formData.assetRegion.value
          : formData.assetRegion,
        Reasons: formData.reason.trim(),
        JobTitle: formData.assetPosition,
        FileUpload: formData.file,
        TransDate: moment(formData.approvedDate).format("YYYY-MM-DD"),
        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      log('[LOG] === onFormSubmit ===> ', params);
      if (isApproved) {
        dispatch(Actions.fFetchApprovedAssets(params, history));
      }
      if (isRecall) {
        dispatch(Actions.fFetchRecallAssets(params, history));
      }
    }
    if (updateHistory) {
      setLoading({...loading, history: true});
      let params = {
        LineNum: updateHistory.lineNum,
        AssetID: dataItem.id,
        IsRemovedFile: isRemoveFile,
        TypeUpdate: isApproved ? "Allocation" : "Recovery",
        TransDate: moment(formData.approvedDate).format("YYYY/MM/DD"),
        Reasons: formData.reason.trim(),
        FileUpload: formData.file?.id === "history" ? "" : formData.file,

        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      log('[LOG] === onFormSubmit ===> ', params);
      dispatch(Actions.fFetchUpdateProcess(params, history));
    }
  };

  const onExportExcel = (type, assetID) => {
		const token = getCookies("access_token");
		const params = {
			UserToken: token,
			AssetID: assetID
		};
		window.location = `${Configs.hostAPI}/${Configs.prefixAPI}${
      type === "Approved"
        ? Routes.APPROVED.EXPORT_APPROVED_ASSETS
        : Routes.APPROVED.EXPORT_RECALL_ASSETS
    }?value=${JSON.stringify(params)}`;
	};

  const onSuccess = type => {
    if (type === "MasterData") {
      let tmpDataEmp = masterState["employee"].map(item => {
        return {value: item.empCode, label: item.empName};
      });
      let tmpDataDep = masterState["department"].map(item => {
        return {value: item.deptCode, label: item.deptName};
      });
      let tmpDataReg = masterState["region"].map(item => {
        return {value: item.regionCode, label: item.regionName};
      });
      setDataSelect({
        employee: [...dataSelect.employee, ...tmpDataEmp],
        department: [...dataSelect.department, ...tmpDataDep],
        region: [...dataSelect.region, ...tmpDataReg],
      });
    }
    if (type === "Approved") {
      onExportExcel(type, dataItem.id);
      onResetData();
      onClose(true, t("success:approved_assets"));
    }
    if (type === "Recall") {
      onExportExcel(type, dataItem.id);
      onResetData();
      onClose(true, t("success:recall_assets"));
    }
    if (type === "History") {
      onResetData();
      onClose(true, t("success:update_history_assets"), isApproved ? "approved" : "recall", true);
    }
    setRemoveFile(false);
    setLoading({main: false, approved: false, recall: false, history: false});
  };

  const onError = (type, error) => {
    log('[LOG] === onError ===> ', error);
    if (type === "Approved" || type === "Recall" || type === "History") {
      onResetData();
      onClose(false, error);
    }
    setRemoveFile(false);
    setLoading({main: false, approved: false, recall: false, history: false});
  };

  const onDownloadAttachFile = () => {
    window.open(`${Configs.hostAPI}/${formData.file.name}`, "_blank");
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
    if (!loading.main && updateItem && !updateHistory && show) {
      onSetFormDataDetails(updateItem);
    }
    if (!loading.main && updateItem && updateHistory && show) {
      onSetFormDataDetails(updateItem, updateHistory);
    }
  }, [
    show,
    loading.main,
    updateItem,
    updateHistory,
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
    if (loading.approved && show) {
      if (!approvedState["submittingApprovedRecallAssets"]) {
        if (approvedState["successApprovedRecallAssets"] && !approvedState["errorApprovedRecallAssets"]) {
          return onSuccess("Approved");
        }
        if (!approvedState["successApprovedRecallAssets"] && approvedState["errorApprovedRecallAssets"]) {
          return onError("Approved", approvedState["errorHelperApprovedRecallAssets"]);
        }
      }
    }
  }, [
    show,
    loading.approved,
    approvedState["submittingApprovedRecallAssets"],
    approvedState["successApprovedRecallAssets"],
    approvedState["errorApprovedRecallAssets"],
  ]);

  useEffect(() => {
    if (loading.recall && show) {
      if (!approvedState["submittingApprovedRecallAssets"]) {
        if (approvedState["successApprovedRecallAssets"] && !approvedState["errorApprovedRecallAssets"]) {
          return onSuccess("Recall");
        }
        if (!approvedState["successApprovedRecallAssets"] && approvedState["errorApprovedRecallAssets"]) {
          return onError("Recall", approvedState["errorHelperApprovedRecallAssets"]);
        }
      }
    }
  }, [
    show,
    loading.recall,
    approvedState["submittingApprovedRecallAssets"],
    approvedState["successApprovedRecallAssets"],
    approvedState["errorApprovedRecallAssets"],
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
  const disabled = loading.approved || loading.recall || loading.history;

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
              {isApproved && !updateHistory && <BlockTitle tag="h4">
                {t("approved_assets:title")}
              </BlockTitle>}
              {isApproved && updateHistory && <BlockTitle tag="h4">
                {t("approved_assets:history_approved_title")}
              </BlockTitle>}
              {isRecall && !updateHistory && <BlockTitle tag="h4">
                {t("approved_assets:recall_title")}
              </BlockTitle>}
              {isRecall && updateHistory && <BlockTitle tag="h4">
                {t("approved_assets:history_recall_title")}
              </BlockTitle>}
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
                    <Icon name="undo"/>
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="gray"
                    type="button"
                    disabled={disabled}
                    onClick={onResetData}
                  >
                    <Icon name="undo"/>
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
                    {!loading.approved && !loading.recall && !loading.history && <Icon name="save"/>}
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
                    {!loading.approved && !loading.recall && !loading.history && <Icon name="save"/>}
                    <span>{t("common:save")}</span>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <AssetInformations data={dataItem} />

        {isRecall && !updateHistory && (
          <Block>
            <EmployeeInformations
              data={{
                employeeCode: dataItem?.employeeCode,
                employee: dataItem?.employee,
                position: formData?.assetPosition,
                department: dataItem?.department,
                region: dataItem?.region,
              }}
            />
          </Block>
        )}
        {isRecall && updateHistory && (
          <Block>
            <EmployeeInformations
              data={{
                employeeCode: updateHistory?.empCode,
                employee: updateHistory?.empName,
                position: updateHistory?.jobTitle,
                department: updateHistory?.deptName,
                region: updateHistory?.regionName,
              }}
            />
          </Block>
        )}
        {isApproved && updateHistory && (
          <Block>
            <EmployeeInformations
              data={{
                employeeCode: updateHistory?.empCode,
                employee: updateHistory?.empName,
                position: updateHistory?.jobTitle,
                department: updateHistory?.deptName,
                region: updateHistory?.regionName,
              }}
            />
          </Block>
        )}

        {isApproved && !isRecall && (
        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("approved_assets:information_approved")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              {!updateHistory && (
                <Col md="4">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="approvedDate">
                        {t("approved_assets:approved_date")}
                      </label>
                    </div>
                    <div className="form-control-wrap" style={{zIndex: 1000}}>
                      <div className="form-icon form-icon-left">
                        <Icon name="calendar"/>
                      </div>
                      <DatePicker
                        selected={formData.approvedDate}
                        className="form-control date-picker"
                        disabled={disabled}
                        value={formData.approvedDate}
                        onChange={onChangeDate}
                        customInput={<CustomDateInput />}
                      />
                    </div>
                  </FormGroup>
                </Col>
              )}
              {!updateHistory && (
                <Col md="8">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="assetEmployee">
                        {t("approved_assets:approved_for")} <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <RSelect
                        name="assetEmployee"
                        isMulti={false}
                        error={error.employee}
                        options={dataSelect.employee}
                        value={formData.assetEmployee}
                        placeholder={t("approved_assets:holder_approved_for")}
                        onChange={onChangeSelect}
                      />
                    </div>
                  </FormGroup>
                </Col>
              )}
              {!updateHistory && (
                <Col md="4">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="assetPosition">
                        {t("approved_assets:position")}
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-icon form-icon-left">
                        <Icon name="account-setting"/>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        id="assetPosition"
                        name="assetPosition"
                        disabled={true}
                        value={formData.assetPosition}
                        placeholder={t("approved_assets:holder_position")}
                      />
                    </div>
                  </FormGroup>
                </Col>
              )}
              {!updateHistory && (
                <Col md="4">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="assetDepartment">
                        {t("approved_assets:department")}
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <RSelect
                        name="assetDepartment"
                        isMulti={false}
                        isDisabled={true}
                        options={dataSelect.department}
                        value={formData.assetDepartment}
                        placeholder={t("approved_assets:holder_department")}
                      />
                    </div>
                  </FormGroup>
                </Col>
              )}
              {!updateHistory && (
                <Col md="4">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="assetRegion">
                        {t("approved_assets:region")}
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <RSelect
                        name="assetRegion"
                        isMulti={false}
                        isDisabled={true}
                        options={dataSelect.region}
                        value={formData.assetRegion}
                        placeholder={t("approved_assets:holder_region")}
                      />
                    </div>
                  </FormGroup>
                </Col>
              )}
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="file">
                      {t("approved_assets:file")}
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
                        <Icon name="download"/>
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
                      {t("approved_assets:reason")}
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
                      placeholder={t("approved_assets:holder_reason")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Block>
        )}

        {!isApproved && isRecall && !updateHistory && (
          <Block>
            <div className="data-head">
              <h6 className="overline-title">{t("approved_assets:information_recall")}</h6>
            </div>
            <div className="mt-3">
              <Row className="g-3">
                <Col md="6">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="approvedDate">
                        {t("approved_assets:recall_date")}
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-icon form-icon-left">
                        <Icon name="calendar"/>
                      </div>
                      <DatePicker
                        selected={formData.approvedDate}
                        className="form-control date-picker"
                        disabled={disabled}
                        value={formData.approvedDate}
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
                        {t("approved_assets:file")}
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
                      <label className="form-label" htmlFor="reasonRecall">
                        {t("approved_assets:reason_recall")}
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <textarea
                        className="no-resize form-control"
                        type="text"
                        id="reasonRecall"
                        name="reason"
                        disabled={disabled}
                        value={formData.reason}
                        placeholder={t("approved_assets:holder_reason_recall")}
                        onChange={onChangeInput}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Block>
        )}
      </Form>
    </SimpleBar>
  );
};

export default ApprovedForm;
