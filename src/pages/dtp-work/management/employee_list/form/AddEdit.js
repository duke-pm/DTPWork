import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Form, FormGroup, Spinner} from "reactstrap";
import SimpleBar from "simplebar-react";
import {toast} from "react-toastify";
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

function AddEditForm(props) {
  const {t} = useTranslation();
  const {errors, register, clearErrors, handleSubmit} = useForm();
  const {
    show,
    history,
    isUpdate,
    authState,
    commonState,
    updateItem,
    onClose,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const masterState = useSelector(({master}) => master);
  const managementState = useSelector(({management}) => management);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [error, setError] = useState({
    company: null,
    code: null,
    group: null,
    region: null,
    bizLine: null,
  });
  const [dataSelect, setDataSelect] = useState({
    sales: [],
    groups: [],
    managers: [],
    companies: [],
    bizLines: [],
    regions: [],
    users: [],
  });
  const [formData, setFormData] = useState({
    id: -1,
    userName: "",
    salesUser: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    group: "",
    manager: "",
    company: "",
    bizLine: [],
    region: [],
    code: "",
    inactive: false,
    changePass: true,
  });

  /**
   ** FUNCTIONS
   */
  const onChangeInput = e =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onChangeInactive = () =>
    setFormData({...formData, inactive: !formData.inactive});

  const onChangeChangePass = () =>
    setFormData({...formData, changePass: !formData.changePass});

  const onChangeSelect = e => {
    setError({...error, [e.key]: null});
    setFormData({...formData, [e.key]: e.value});
  };

  const onResetData = () => {
    setFormData({
      id: -1,
      userName: "",
      salesUser: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      group: "",
      manager: "",
      company: "",
      bizLine: "",
      region: "",
      code: "",
      inactive: false,
      changePass: true,
    });
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "Region,Employee,Company,Users,Sales,BizLines,UserGroups",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onSetFormDataDetails = employee => {
    log('[LOG] === onSetFormDataDetails ===> ', employee);
    let fSale = null,
      fGroup = null,
      fManager = null,
      fCompany = null,
      fBizLine = [],
      fRegion = [],
      fUser = null;
    if (employee.slpCode !== -1) {
      fSale = dataSelect.sales.find(f => f.value === employee.slpCode);
    }
    if (employee.groupID) {
      fGroup = dataSelect.groups.find(f => f.value === employee.groupID);
    }
    if (employee.lineManager) {
      fManager = dataSelect.managers.find(f => f.value === employee.lineManager);
    }
    if (employee.legal) {
      fCompany = dataSelect.companies.find(f => f.value === Number(employee.legal));
    }
    if (employee.empCode) {
      fUser = dataSelect.users.find(f => f.value === employee.empCode);
    }
    if (employee.bizLine && employee.bizLine.length > 0) {
      let tmpBizLines = employee.bizLine.split(",");
      for (let itemBizLine of tmpBizLines) {
        let fBL = dataSelect.bizLines.find(f => f.value === Number(itemBizLine));
        if (fBL) fBizLine.push(fBL);
      }
    }
    if (employee.region && employee.region.length > 0) {
      let tmpRegions = employee.bizLine.split(",");
      for (let itemRegion of tmpRegions) {
        let fRG = dataSelect.regions.find(f => f.value === Number(itemRegion));
        if (fRG) fRegion.push(fRG);
      }
    }
    setFormData({
      id: employee.userID,
      userName: employee.userName,
      salesUser: fSale || "",
      firstName: employee.lastName,
      lastName: employee.firstName,
      phone: employee.cellPhone,
      email: employee.email,
      group: fGroup || "",
      manager: fManager || "",
      company: fCompany || "",
      bizLine: fBizLine.length > 0 ? fBizLine : "",
      region: fRegion.length > 0 ? fRegion : "",
      code: fUser || "",
      inactive: employee.inactive,
      changePass: employee.isChange,
    });
  };

  const onValidate = () => {
    let isError = false,
      tmpError = {
        company: null,
        code: null,
        group: null,
        region: null,
        bizLine: null,
      };
    if (!formData.company) {
      isError = true;
      tmpError.company = {message: ""};
      tmpError.company.message = t("validate:empty");
    }
    if (!formData.code) {
      isError = true;
      tmpError.code = {message: ""};
      tmpError.code.message = t("validate:empty");
    }
    if (!formData.group) {
      isError = true;
      tmpError.group = {message: ""};
      tmpError.group.message = t("validate:empty");
    }
    if (!formData.region) {
      isError = true;
      tmpError.region = {message: ""};
      tmpError.region.message = t("validate:empty");
    }
    if (!formData.bizLine) {
      isError = true;
      tmpError.bizLine = {message: ""};
      tmpError.bizLine.message = t("validate:empty");
    }
    setError(tmpError);
    return isError;
  };

  const onFormSubmit = () => {
    let isError = onValidate();
    if (isError) return;

    setLoading({...loading, submit: true});
    let bizLines = null, regions = null;
    if (formData.bizLine.length > 0) {
      bizLines = formData.bizLine.map(item => item.value);
      bizLines = bizLines.toString();
    }
    if (formData.region.length > 0) {
      regions = formData.region.map(item => item.value);
      regions = regions.toString();
    }
    let params = {
      UserID: !isUpdate ? "0" : formData.id,
      UserName: formData.userName.trim(),
      FirstName: formData.lastName.trim(),
      LastName: formData.firstName.trim(),
      CellPhone: formData.phone.trim(),
      Email: formData.email.trim(),
      GroupID: formData.group.value,
      BizLine: bizLines,
      Region: regions,
      SlpCode: formData.salesUser.value || -1,
      Legal: formData.company.value,
      EmpCode: formData.code.value,
      LineManager: formData.manager.value || -1,
      Inactive: formData.inactive,
      Ischange: formData.changePass,

      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    log('[LOG] === onFormSubmit ===> ', params);
    if (!isUpdate) {
      dispatch(Actions.fFetchCreateEmployee(params, history));
    } else {
      dispatch(Actions.fFetchUpdateEmployee(params, history));
    }
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      let tmpDataBizlines = masterState["bizlines"].map(item => {
        return {value: item.bizLineID, label: item.bizLineName};
      });
      let tmpDataCompany = masterState["company"].map(item => {
        return {value: item.cmpnID, label: item.cmpnName};
      });
      let tmpDataEmployee = masterState["employee"].map(item => {
        return {value: item.empCode, label: item.empName};
      });
      let tmpDataRegion = masterState["region"].map(item => {
        return {value: item.regionID, label: item.regionName, code: item.regionCode};
      });
      let tmpDataSale = masterState["sales"].map(item => {
        return {value: item.slpCode, label: item.slpName};
      });
      let tmpDataUserGroup = masterState["userGroup"].map(item => {
        return {value: item.groupID, label: item.groupName};
      });
      let tmpDataUser = masterState["users"].map(item => {
        return {value: item.empID, label: item.empName};
      });
      setDataSelect({
        bizLines: [...dataSelect.bizLines, ...tmpDataBizlines],
        companies: [...dataSelect.companies, ...tmpDataCompany],
        regions: [...dataSelect.regions, ...tmpDataRegion],
        sales: [...dataSelect.sales, ...tmpDataSale],
        groups: [...dataSelect.groups, ...tmpDataUserGroup],
        managers: [...dataSelect.managers, ...tmpDataUser],
        users: [...dataSelect.users, ...tmpDataEmployee],
      });
    }
    if (type === "Create" || type === "Update") {
      let message = "success:create_employee";
      if (type === "Update") message = "success:update_employee";
      toast(t(message), {type: "success"});
      onResetData();
      onClose(type);
    }
    setLoading({main: false, submit: false});
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    setLoading({main: false, submit: false});
    toast(error, {type: "error"});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (!show) {
      onResetData();
      clearErrors();
    }
  }, [show]);

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
      onSetFormDataDetails(updateItem);
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
      if (!managementState["submittingCreateEmp"]) {
        if (managementState["successCreateEmp"] && !managementState["errorCreateEmp"]) {
          return onSuccess("Create");
        }
        if (!managementState["successCreateEmp"] && managementState["errorCreateEmp"]) {
          return onError(managementState["errorHelperCreateEmp"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    managementState["submittingCreateEmp"],
    managementState["successCreateEmp"],
    managementState["errorCreateEmp"],
  ]);

  useEffect(() => {
    if (loading.submit && isUpdate) {
      if (!managementState["submittingUpdateEmp"]) {
        if (managementState["successUpdateEmp"] && !managementState["errorUpdateEmp"]) {
          return onSuccess("Update");
        }
        if (!managementState["successUpdateEmp"] && managementState["errorUpdateEmp"]) {
          return onError(managementState["errorHelperUpdateEmp"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    managementState["submittingUpdateEmp"],
    managementState["successUpdateEmp"],
    managementState["errorUpdateEmp"],
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
              {!isUpdate && (
                <BlockTitle tag="h4">{t("management:add_employee")}</BlockTitle>
              )}
              {isUpdate && (
                <BlockTitle tag="h4">{t("management:update_employee")}</BlockTitle>
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
                    {disabled && (
                      <Spinner size="sm" color="light" />
                    )}
                    {!loading.main && !loading.submit && <Icon name="save" />}
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {disabled && (
                      <Spinner className="mr-1" size="sm" color="light" />
                    )}
                    {!loading.main && !loading.submit && <Icon name="save" />}
                    <span>{t("common:save")}</span>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("management:informations")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="userName">
                      {t("management:username_employee")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="user-circle" />
                    </div>
                    <input
                      ref={register({ required: t("validate:empty") })}
                      className="form-control"
                      type="text"
                      id="userName"
                      name="userName"
                      disabled={disabled}
                      value={formData.userName}
                      placeholder={t("management:holder_username_employee")}
                      onChange={onChangeInput}
                    />
                    {errors.userName && (
                      <span className="invalid">{errors.userName.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="code">
                      {t("management:id_employee")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="code"
                      isMulti={false}
                      isDisabled={disabled}
                      error={error.code}
                      options={dataSelect.users}
                      value={formData.code}
                      placeholder={t("management:holder_id_employee")}
                      onChange={e => onChangeSelect({key: "code", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="firstName">
                      {t("management:first_name_employee")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="text" />
                    </div>
                    <input
                      ref={register({ required: t("validate:empty") })}
                      className="form-control"
                      type="text"
                      id="firstName"
                      name="firstName"
                      disabled={disabled}
                      value={formData.firstName}
                      placeholder={t("management:holder_first_name_employee")}
                      onChange={onChangeInput}
                    />
                    {errors.firstName && (
                      <span className="invalid">{errors.firstName.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="lastName">
                      {t("management:last_name_employee")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="text" />
                    </div>
                    <input
                      ref={register({ required: t("validate:empty") })}
                      className="form-control"
                      type="text"
                      id="lastName"
                      name="lastName"
                      disabled={disabled}
                      value={formData.lastName}
                      placeholder={t("management:holder_last_name_employee")}
                      onChange={onChangeInput}
                    />
                    {errors.lastName && (
                      <span className="invalid">{errors.lastName.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="email">
                      {t("management:email_employee")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="at" />
                    </div>
                    <input
                      ref={register({
                        required: t("validate:empty"),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t("validate:format_email"),
                        },
                      })}
                      className="form-control"
                      type="text"
                      id="email"
                      name="email"
                      disabled={disabled}
                      value={formData.email}
                      placeholder={t("management:holder_email_employee")}
                      onChange={onChangeInput}
                    />
                    {errors.email && (
                      <span className="invalid">{errors.email.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="phone">
                      {t("management:phone_employee")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="mobile" />
                    </div>
                    <input
                      className="form-control"
                      type="number"
                      id="phone"
                      name="phone"
                      disabled={disabled}
                      value={formData.phone}
                      placeholder={t("management:holder_phone_employee")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Block>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("management:informations_other")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="salesUser">
                      {t("management:sale_employee")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="salesUser"
                      isMulti={false}
                      isDisabled={disabled}
                      options={dataSelect.sales}
                      value={formData.salesUser}
                      placeholder={t("management:holder_sale_employee")}
                      onChange={e => onChangeSelect({key: "salesUser", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="group">
                      {t("management:group_employee")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="group"
                      isMulti={false}
                      isDisabled={disabled}
                      error={error.group}
                      options={dataSelect.groups}
                      value={formData.group}
                      placeholder={t("management:holder_group_employee")}
                      onChange={e => onChangeSelect({key: "group", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="manager">
                      {t("management:manager_employee")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="manager"
                      isMulti={false}
                      isDisabled={disabled}
                      options={dataSelect.managers}
                      value={formData.manager}
                      placeholder={t("management:holder_manager_employee")}
                      onChange={e => onChangeSelect({key: "manager", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="company">
                      {t("management:company_employee")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="company"
                      isMulti={false}
                      isDisabled={disabled}
                      error={error.company}
                      options={dataSelect.companies}
                      value={formData.company}
                      placeholder={t("management:holder_company_employee")}
                      onChange={e => onChangeSelect({key: "company", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="bizLine">
                      {t("management:biz_line_employee")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      isMulti
                      name="bizLine"
                      isDisabled={disabled}
                      error={error.bizLine}
                      options={dataSelect.bizLines}
                      value={formData.bizLine}
                      placeholder={t("management:holder_biz_line_employee")}
                      onChange={e => onChangeSelect({key: "bizLine", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="region">
                      {t("management:region_employee")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      isMulti
                      name="region"
                      isDisabled={disabled}
                      error={error.region}
                      options={dataSelect.regions}
                      value={formData.region}
                      placeholder={t("management:holder_region_employee")}
                      onChange={e => onChangeSelect({key: "region", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              {isUpdate && (
                <Col md="4">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <div className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input form-control"
                          id="inactive"
                          name="inactive"
                          type="checkbox"
                          disabled={disabled}
                          checked={formData.inactive}
                          onChange={onChangeInactive}
                        />
                        <label className="custom-control-label" htmlFor="inactive">
                          {t("management:inactive")}
                        </label>
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              )}
              <Col size="12">
                <FormGroup>
                  <div className="form-control-wrap">
                    <div className="custom-control custom-checkbox">
                      <input
                        className="custom-control-input form-control"
                        id="changePass"
                        name="changePass"
                        type="checkbox"
                        disabled={disabled}
                        checked={formData.changePass}
                        onChange={onChangeChangePass}
                      />
                      <label className="custom-control-label" htmlFor="changePass">
                        {t("management:need_change_password")}
                      </label>
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

export default AddEditForm;
