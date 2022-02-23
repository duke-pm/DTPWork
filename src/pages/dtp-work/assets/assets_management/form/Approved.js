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
  RSelect,
} from "components/Component";
/** COMMON */
import Routes from "services/routesApi";
import {numberFormat} from "utils/Utils";
import {getCookies} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";
import Configs from "configs";

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
  });
  const [error, setError] = useState({
    employee: null,
  })
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
    setFormData({...formData, file: e.target.files[0]});
  };

  const onChangeDate = value => {
    setFormData({...formData, approvedDate: value});
  };

  const onResetData = () => {
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
      EmpCode: formData.assetEmployee.value,
      DeptCode: formData.assetDepartment.value,
      RegionCode: formData.assetRegion.value,
      Reasons: formData.reason,
      JobTitle: formData.assetPosition,
      FileUpload: formData.file,
      TransDate: moment(formData.approvedDate).format("YYYY-MM-DD"),
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    console.log('[LOG] === onFormSubmit ===> ', params);
    if (isApproved) {
      dispatch(Actions.fFetchApprovedAssets(params, history));
    }
    if (isRecall) {
      dispatch(Actions.fFetchRecallAssets(params, history));
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
    setLoading({main: false, approved: false, recall: false});
  };

  const onError = (type, error) => {
    console.log('[LOG] === onError ===> ', error);
    setLoading({main: false, approved: false, recall: false});
    if (type === "Approved" || type === "Recall") {
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
    if (!loading.main && updateItem && show) {
      onSetFormDataDetails(updateItem);
    }
  }, [
    loading.main,
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

  /**
   ** RENDER 
   */
  const {errors, register, handleSubmit} = useForm();
  const disabled = loading.main || loading.approved || loading.recall;

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
              {isApproved && <BlockTitle tag="h3">{t("approved_assets:title")}</BlockTitle>}
              {isRecall && <BlockTitle tag="h3">{t("approved_assets:recall_title")}</BlockTitle>}
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
                    {(loading.approved || loading.recall) && (
                      <div className="spinner-border spinner-border-sm text-white" role="status" />
                    )}
                    {!loading.approved && !loading.recall && <Icon name="save"></Icon>}
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {(loading.approved || loading.recall) && (
                      <div className="spinner-border spinner-border-sm text-white mr-2" role="status" />
                    )}
                    {!loading.approved && !loading.recall && <Icon name="save"></Icon>}
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
            <BlockTitle tag="h6">{t("approved_assets:information")}</BlockTitle>
          </BlockHead>
          <div className="profile-ud-list">
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("approved_assets:code")}</span>
                <span className="profile-ud-value">{dataItem.code}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("approved_assets:name")}</span>
                <span className="profile-ud-value">{dataItem.name}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("approved_assets:group")}</span>
                <span className="profile-ud-value">{dataItem.group}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("approved_assets:purchase_date")}</span>
                <span className="profile-ud-value">{dataItem.purchaseDate}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("approved_assets:origin_price")}</span>
                <span className="profile-ud-value">{dataItem.originPrice}</span>
              </div>
            </div>
            <div className="profile-ud-item">
              <div className="profile-ud wider">
                <span className="profile-ud-label">{t("approved_assets:status")}</span>
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
                <span className="profile-ud-label">{t("approved_assets:description")}</span>
                <span className="profile-ud-value">{dataItem.description}</span>
              </div>
            </div>
          </div>

          <div className="nk-divider divider md"></div>

          <BlockHead>
            {isApproved && (
              <BlockTitle tag="h6">{t("approved_assets:information_approved")}</BlockTitle>
            )}
            {isRecall && (
              <BlockTitle tag="h6">{t("approved_assets:information_employee")}</BlockTitle>
            )}
          </BlockHead>
          {isRecall && (
            <div className="profile-ud-list">
              <div className="profile-ud-item">
                <div className="profile-ud wider">
                  <span className="profile-ud-label">{t("approved_assets:employee")}</span>
                  <span className="profile-ud-value">{dataItem.employee}</span>
                </div>
              </div>
              <div className="profile-ud-item">
                <div className="profile-ud wider">
                  <span className="profile-ud-label">{t("approved_assets:position")}</span>
                  <span className="profile-ud-value">{formData.assetPosition}</span>
                </div>
              </div>
              <div className="profile-ud-item">
                <div className="profile-ud wider">
                  <span className="profile-ud-label">{t("approved_assets:department")}</span>
                  <span className="profile-ud-value">{dataItem.department}</span>
                </div>
              </div>
              <div className="profile-ud-item">
                <div className="profile-ud wider">
                  <span className="profile-ud-label">{t("approved_assets:region")}</span>
                  <span className="profile-ud-value">{dataItem.region}</span>
                </div>
              </div>
            </div>
          )}
          {isApproved && (
            <Row className="g-3">
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="approvedDate">
                      {t("approved_assets:approved_date")}
                    </label>
                  </div>
                  <div className="form-control-wrap" style={{zIndex: 1000}}>
                    <div className="form-icon form-icon-left">
                      <Icon name="calendar"></Icon>
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
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="assetPosition">
                      {t("approved_assets:position")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
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
              <Col size="12">
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
          )}

          {isRecall && (
            <>
              <div className="nk-divider divider md"></div>
              
              <BlockHead>
                  <BlockTitle tag="h6">{t("approved_assets:information_recall")}</BlockTitle>
              </BlockHead>
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
                        <Icon name="calendar"></Icon>
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
            </>
          )}
        </Block>
      </Form>
    </SimpleBar>
  );
};

export default ApprovedForm;
