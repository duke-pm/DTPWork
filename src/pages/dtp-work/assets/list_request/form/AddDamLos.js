import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import SimpleBar from "simplebar-react";
import {Form, FormGroup, Label, Spinner} from "reactstrap";
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
} from "../../../../../components/Component";
/** COMMON */
import {log} from "../../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../../redux/actions";

const CustomDateInput = forwardRef(({ value, onClick, onChange, disabled }, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-left">
      <Icon name="calendar"></Icon>
    </div>
    <input
      className="form-control date-picker"
      type="text"
      disabled={disabled}
      value={moment(value).format("DD/MM/YYYY")}
      onChange={onChange}
    />
  </div>
));

function AddDamLosForm(props) {
  const {t} = useTranslation();
  const {errors, register, clearErrors, handleSubmit} = useForm();
  const {
    show,
    typeRequest,
    history,
    commonState,
    authState,
    onClose,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const masterState = useSelector(({master}) => master);
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [error, setError] = useState({
    assets: null,
  });
  const [dataSelect, setDataSelect] = useState({
    regions: [],
    departments: [],
    assets: [],
  });
  const [formData, setFormData] = useState({
    nameEmployee: "",
    depEmployee: "",
    regEmployee: "",
    
    requestDate: new Date(),
    assets: "",
    reason: "",
    file: "",
  });

  /**
   ** FUNCTIONS 
   */
  const onChangeInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onChangeSelect = (e) => {
    setError({assets: null});
    setFormData({...formData, [e.key]: e.value});
  };

  const onChangeFile = e => {
    setFormData({...formData, file: e.target.files[0]});
  };

  const onResetData = () => {
    setFormData({
      ...formData,
      assets: "",
      reason: "",
      file: "",
    });
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "Region,Department",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    let params2 = {
      EmpCode: authState["data"]["empCode"],
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchMasterData(params, history));
    dispatch(Actions.fFetchAssetsByUser(params2, history));
  };

  const onValidate = () => {
    let isError = false,
    tmpError = {assets: null};
    setError(tmpError);

    if (!formData.assets) {
      isError = true;
      tmpError.assets = {message: t("validate:empty_assets")};
    }
    isError && setError(tmpError);
    return isError;
  };

  const onFormSubmit = () => {
    // Check validate
    let isError = onValidate();
    if (isError) return;
    // Call api
    setLoading({...loading, submit: true});
    if (formData.assets) {
      let params = {
        EmpCode: authState["data"]["empCode"],
        DeptCode: authState["data"]["deptCode"],
        RegionCode: authState["data"]["regionCode"],
        JobTitle: authState["data"]["jobTitle"],
        RequestDate: moment(formData.requestDate).format("YYYY-MM-DD"),
        Reasons: formData.reason.trim(),
        TypeUpdate: typeRequest === "damage" ? "Damage" : "Lost",
        AssetID: formData.assets.value,
        FileUpload: formData.file,
      };
      log('[LOG] === onFormSubmit ===> ', params);
      dispatch(Actions.fFetchCreateRequest("dam_los", params, history));
    }
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      let tmpSelect = {};
      let tmpDataDep = masterState["department"].map(item => {
        return {value: item.deptCode, label: item.deptName};
      });
      tmpSelect.departments = [...dataSelect.departments, ...tmpDataDep];
      let tmpDataReg = masterState["region"].map(item => {
        return {value: item.regionCode, label: item.regionName, id: item.regionID};
      });
      tmpSelect.regions = [...dataSelect.regions, ...tmpDataReg];
      if (masterState["assetByUser"].length > 0) {
        let tmpDataAss = masterState["assetByUser"].map(item => {
          return {value: item.assetID, label: item.assetName};
        });
        tmpSelect.assets = [...dataSelect.assets, ...tmpDataAss];
      } else {
        tmpSelect.assets = [];
      }
      setDataSelect(tmpSelect);

      let fDepEmp = tmpDataDep.find(f => f.value === authState["data"]["deptCode"]);
      let fRegEmp = tmpDataReg.find(f => f.value === authState["data"]["regionCode"]);
      setFormData({
        ...formData,
        nameEmployee: authState["data"]["fullName"],
        depEmployee: fDepEmp,
        regEmployee: fRegEmp,
      });
    }
    if (type === "Create") {
      onResetData();
      onClose(true, typeRequest === "damage"
        ? t("success:create_request_damage")
        : t("success:create_request_lost"));
    }
    setLoading({main: false, submit: false});
  };

  const onError = (type, error) => {
    log('[LOG] === onError ===> ', error);
    setLoading({main: false, submit: false});
    if (type === "Create") {
      onResetData();
      onClose(false, error);
    }
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (show) {
      clearErrors();
      setError({assets: null});
      onResetData();
    }
  }, [show]);

  useEffect(() => {
    if (loading.main && authState["successSignIn"] && show) {
      clearErrors();
      onGetMasterData();
    }
  }, [
    show,
    loading.main,
    authState["successSignIn"],
  ]);

  useEffect(() => {
    if (loading.main && show) {
      if (!masterState["submittingGetAll"] && !masterState["submittingAssetsByUser"]) {
        if (masterState["successGetAll"] && !masterState["errorGetAll"] &&
          masterState["successAssetsByUser"] && !masterState["errorAssetsByUser"]) {
          return onSuccess("MasterData");
        }
        if ((!masterState["successGetAll"] && masterState["errorGetAll"]) ||
          (!masterState["successAssetsByUser"] && masterState["errorAssetsByUser"])) {
          return onError("MasterData", masterState["errorHelperGetAll"]);
        }
      }
    }
  }, [
    show,
    loading.main,
    masterState["submittingGetAll"],
    masterState["submittingAssetsByUser"],
    masterState["successGetAll"],
    masterState["successAssetsByUser"],
    masterState["errorGetAll"],
    masterState["errorAssetsByUser"],
  ]);

  useEffect(() => {
    if (loading.submit && show) {
      if (!approvedState["submittingCreateRequest"]) {
        if (approvedState["successCreateRequest"] && !approvedState["errorCreateRequest"]) {
          return onSuccess("Create");
        }
        if (!approvedState["successCreateRequest"] && approvedState["errorCreateRequest"]) {
          return onError("Create", approvedState["errorHelperCreateRequest"]);
        }
      }
    }
  }, [
    show,
    loading.submit,
    approvedState["submittingCreateRequest"],
    approvedState["successCreateRequest"],
    approvedState["errorCreateRequest"],
  ]);

  /**
   ** RENDER
   */
  const disabled = loading.main || loading.submit;
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
              {typeRequest === "damage" && (
                <BlockTitle tag="h4">{t("add_request_assets:damage_title")}</BlockTitle>
              )}
              {typeRequest === "lost" && (
                <BlockTitle tag="h4">{t("add_request_assets:lost_title")}</BlockTitle>
              )}
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li className="nk-block-tools-opt">
                  <Button
                    className="toggle btn-icon d-md-none"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {loading.submit && (
                      <Spinner size="sm" color="light" />
                    )}
                    {!loading.submit && <Icon name="save" />}
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {loading.submit && (
                      <Spinner className="mr-2" size="sm" color="light" />
                    )}
                    {!loading.submit && <Icon name="save" />}
                    <span>{t("common:save")}</span>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("add_request_assets:information_employee")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="nameEmployee">
                      {t("add_request_assets:name_employee")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="user" />
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      id="nameEmployee"
                      name="nameEmployee"
                      disabled={true}
                      value={formData.nameEmployee}
                      placeholder={t("add_request_assets:holder_name_employee")}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="depEmployee">
                      {t("add_request_assets:department_employee")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="depEmployee"
                      isMulti={false}
                      isDisabled={true}
                      options={dataSelect.departments}
                      value={formData.depEmployee}
                      placeholder={t("add_request_assets:holder_department_employee")}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="regEmployee">
                      {t("add_request_assets:region_employee")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="regEmployee"
                      isMulti={false}
                      isDisabled={true}
                      options={dataSelect.regions}
                      value={formData.regEmployee}
                      placeholder={t("add_request_assets:holder_region_employee")}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Block>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("add_request_assets:information_request")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="requestDate">
                      {t("add_request_assets:request_date")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="calendar"></Icon>
                    </div>
                    <DatePicker
                      className="form-control date-picker"
                      disabled={true}
                      selected={formData.requestDate}
                      value={formData.requestDate}
                      customInput={<CustomDateInput />}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="assets">
                      {t("add_request_assets:assets_need_request")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="assets"
                      isMulti={false}
                      isDisabled={disabled}
                      error={error.assets}
                      options={dataSelect.assets}
                      value={formData.assets}
                      placeholder={t("add_request_assets:holder_assets_need_request")}
                      onChange={e => onChangeSelect({key: "assets", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="reason">
                      {t("add_request_assets:reason")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <textarea
                      ref={register({ required: t("validate:empty") })}
                      className="no-resize form-control"
                      type="text"
                      id="reason"
                      name="reason"
                      disabled={disabled}
                      value={formData.reason}
                      placeholder={t("add_request_assets:holder_reason")}
                      onChange={onChangeInput}
                    />
                    {errors.reason && (
                      <span className="invalid">{errors.reason.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="file">
                      {t("add_request_assets:file")}
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
          </div>
        </Block>
      </Form>
    </SimpleBar>
  );
};

export default AddDamLosForm;
