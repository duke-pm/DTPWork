import React, {forwardRef, useRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import SimpleBar from "simplebar-react";
import NumberFormat from 'react-number-format';
import {Form, FormGroup, Spinner} from "reactstrap";
import moment from "moment";
/** COMPONENTS */
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockBetween,
  BlockTitle,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  DataTableBody,
  Icon,
  Button,
  Row,
  Col,
  RSelect,
  TooltipComponent,
} from "../../../../../components/Component";
/** COMMON */
import {log} from "../../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../../redux/actions";

const CustomDateInput = forwardRef(({ value, onClick, onChange, disabled }, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-left">
      <Icon name="calendar"/>
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

function AddAllowForm(props) {
  const {t} = useTranslation();
  const {errors, register, clearErrors, handleSubmit} = useForm();
  const {
    show,
    history,
    commonState,
    authState,
    onClose,
  } = props;

  const refBar = useRef(null);

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
    locationUse: null,
    assets: null,
  });
  const [dataSelect, setDataSelect] = useState({
    regions: [],
    departments: [],
  });
  const [formData, setFormData] = useState({
    nameEmployee: "",
    depEmployee: "",
    regEmployee: "",
    
    requestDate: new Date(),
    locationUse: "",
    typeRequest: "N", // N or A
    inPlaning: true,
    reason: "",
    supplier: "",

    assets: [{des: "", amount: "", price: "", total: ""}],
  });

  /**
   ** FUNCTIONS 
   */
  const scrollToBottom = () => {
    if (refBar.current) {
      const scrollHeight = refBar.current.scrollHeight;
      const height = refBar.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      refBar.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  const onChangeInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onChangeAssets = (idx, e) => {
    let tmpFormData = {...formData};
    tmpFormData.assets[idx][e.target.name.split("_")[0]] = e.target.value;
    if (e.target.name.split("_")[0] === "amount") {
      if (tmpFormData.assets[idx]["amount"] !== 0 && tmpFormData.assets[idx]["price"] !== "") {
        tmpFormData.assets[idx]["total"] = tmpFormData.assets[idx]["price"] * e.target.value;
      }
    }
    if (e.target.name.split("_")[0] === "price") {
      if (tmpFormData.assets[idx]["amount"] !== 0 && tmpFormData.assets[idx]["price"] !== "") {
        tmpFormData.assets[idx]["total"] = tmpFormData.assets[idx]["amount"] * e.target.value;
      }
    }
    setFormData(tmpFormData);
  };

  const onChangeType = newType => {
    if (newType !== formData.typeRequest) {
      setFormData({...formData, typeRequest: newType});
    }
  };

  const onChangeInPlaning = isIn => {
    if (isIn !== formData.inPlaning) {
      setFormData({...formData, inPlaning: isIn});
    }
  };

  const onChangeSelect = (e) => {
    setError({
      locationUse: null,
      assets: null,
    });
    setFormData({...formData, [e.key]: e.value});
  };

  const onAddRowAssets = () => {
    if (error.assets) {
      setError({...error, assets: null});
    }
    let tmpFormData = {...formData};
    let tmpRow = {des: "", amount: "", price: "", total: ""};
    tmpFormData.assets.push(tmpRow);
    setFormData(tmpFormData);
    scrollToBottom();
  };

  const onRemoveRowAssets = (idx) => {
    let tmpFormData = {...formData};
    tmpFormData.assets.splice(idx, 1);
    setFormData(tmpFormData);
    scrollToBottom();
  };

  const onResetData = () => {
    setFormData({
      ...formData,
      locationUse: "",
      typeRequest: "N",
      inPlaning: true,
      reason: "",
      supplier: "",
      assets: [{des: "", amount: "", price: "", total: ""}],
    });
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "Region,Department",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onValidate = () => {
    let isError = false,
    tmpError = {
      locationUse: null,
      assets: null,
    };
    setError(tmpError);
    if (formData.assets.length === 0) {
      isError = true;
      tmpError.assets = {message: t("validate:empty_assets")};
    }
    if (!formData.locationUse) {
      isError = true;
      tmpError.locationUse = {message: t("validate:empty")};
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
    let assets = [], item = null;
    for (item of formData.assets) {
      assets.push({
        Descr: item.des,
        Qty: Number(item.amount),
        UnitPrice: item.price === "" ? 0 : Number(item.price),
        TotalAmt: item.total === "" ? 0 : Number(item.total),
      });
    }
    let params = {
      EmpCode: authState["data"]["empCode"],
      DeptCode: authState["data"]["deptCode"],
      RegionCode: authState["data"]["regionCode"],
      JobTitle: authState["data"]["jobTitle"],
      RequestDate: moment(formData.requestDate).format("YYYY-MM-DD"),
      Location: formData.locationUse.value,
      Reason: formData.reason.trim(),
      DocType: formData.typeRequest,
      IsBudget: formData.inPlaning,
      SupplierName: formData.supplier.trim(),
      ListAssets: assets,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    log('[LOG] === onFormSubmit ===> ', params);
    dispatch(Actions.fFetchCreateRequest("allow", params, history));
  };

  const onSuccess = type => {
    setLoading({main: false, submit: false});
    if (type === "MasterData") {
      let tmpDataDep = masterState["department"].map(item => {
        return {value: item.deptCode, label: item.deptName};
      });
      let tmpDataReg = masterState["region"].map(item => {
        return {value: item.regionCode, label: item.regionName, id: item.regionID};
      });
      setDataSelect({
        departments: [...dataSelect.departments, ...tmpDataDep],
        regions: [...dataSelect.regions, ...tmpDataReg],
      });
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
      onClose(true, t("success:create_request_allow"));
    }
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
      scrollableNodeProps={{ref: refBar}}
      className={`nk-add-assets toggle-slide toggle-slide-right toggle-screen-any ${
        show ? "content-active" : ""
      }`}
    >
      <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
        <BlockHead>
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h4">{t("add_request_assets:allow_title")}</BlockTitle>
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
                    {!loading.submit && <Icon name="plus" />}
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
                    {!loading.submit && <Icon name="plus" />}
                    <span>{t("common:add_new")}</span>
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
                      <Icon name="calendar"/>
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
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="locationUse">
                      {t("add_request_assets:location_use")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="locationUse"
                      isMulti={false}
                      isDisabled={disabled}
                      error={error.locationUse}
                      options={dataSelect.departments}
                      value={formData.locationUse}
                      placeholder={t("add_request_assets:holder_location_use")}
                      onChange={e => onChangeSelect({key: "locationUse", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="supplier">
                      {t("add_request_assets:supplier")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="building" />
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      id="supplier"
                      name="supplier"
                      disabled={disabled}
                      value={formData.supplier}
                      placeholder={t("add_request_assets:holder_supplier")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="reason">
                      {t("add_request_assets:reason")}
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
                      placeholder={t("add_request_assets:holder_reason")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="typeRequest">
                      {t("add_request_assets:type_request")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="preview-block">
                      <div className="custom-control custom-radio">
                        <input
                          className="custom-control-input form-control"
                          type="radio"
                          id="typeRequest1"
                          name="typeRequest1"
                          disabled={disabled}
                          checked={formData.typeRequest === "N"}
                          onChange={() => onChangeType("N")}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="typeRequest1">
                          {t("add_request_assets:buy_new")}
                        </label>
                      </div>
                    </div>
                    <div className="preview-block mt-2">
                      <div className="custom-control custom-radio">
                        <input
                          className="custom-control-input form-control"
                          type="radio"
                          id="typeRequest2"
                          name="typeRequest2"
                          disabled={disabled}
                          checked={formData.typeRequest === "A"}
                          onChange={() => onChangeType("A")}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="typeRequest2">
                          {t("add_request_assets:additional")}
                        </label>
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="inPlaning">
                      {t("add_request_assets:in_planing")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="preview-block">
                      <div className="custom-control custom-radio">
                        <input
                          className="custom-control-input form-control"
                          type="radio"
                          id="inPlaning1"
                          name="inPlaning1"
                          disabled={disabled}
                          checked={formData.inPlaning}
                          onChange={() => onChangeInPlaning(true)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="inPlaning1">
                          {t("common:yes")}
                        </label>
                      </div>
                    </div>
                    <div className="preview-block mt-2">
                      <div className="custom-control custom-radio">
                        <input
                          className="custom-control-input form-control"
                          type="radio"
                          id="inPlaning2"
                          name="inPlaning2"
                          disabled={disabled}
                          checked={!formData.inPlaning}
                          onChange={() => onChangeInPlaning(false)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="inPlaning2">
                          {t("common:no")}
                        </label>
                      </div>
                    </div>
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Block>
        
        <Block>
          <div className="data-head d-flex justify-content-between">
            <h6 className="overline-title mb-0">
              {t("add_request_assets:information_assets")}
            </h6>
            <a
              href="#addAssets"
              onClick={onAddRowAssets}
              className="link link-sm"
            >
              <Icon name="plus-circle"/>
              <span>{t("add_request_assets:add_assets")}</span>
            </a>
          </div>
          {error.assets && (
            <div className="d-flex align-items-center">
              <Icon className="text-danger" name="alert-circle-fill" />
              <span className="text-danger ml-1">{error.assets.message}</span>
            </div>
          )}
          {formData.assets.length > 0 && (
            <div className="mt-3">
              <Row className="g-3">
                <Col size="12">
                  <DataTableBody className="border-top" compact>
                    <DataTableHead>
                      <DataTableRow>
                        <span>{t("add_request_assets:des_assets")}</span> <span className="text-danger">*</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span>{t("add_request_assets:amount_assets")}</span> <span className="text-danger">*</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span>{t("add_request_assets:price_assets")}</span>
                      </DataTableRow>
                      <DataTableRow>
                        <span>{t("add_request_assets:total_assets")}</span>
                      </DataTableRow>
                      <DataTableRow className="nk-tb-col-tools" />
                    </DataTableHead>

                    {formData.assets.map((itemA, indexA) => {
                      return (
                        <DataTableItem key={"_asset_item_" + indexA}>
                          <DataTableRow>
                            <div className="form-control-wrap">
                              <div className="form-icon form-icon-left">
                                <Icon name="monitor" />
                              </div>
                              <input
                                ref={register({ required: t("validate:empty") })}
                                className="form-control"
                                type="text"
                                id={"des_" + indexA}
                                name={"des_" + indexA}
                                disabled={disabled}
                                value={itemA.des}
                                placeholder={t("add_request_assets:des_assets")}
                                onChange={e => onChangeAssets(indexA, e)}
                              />
                              {errors["des_" + indexA] && (
                                <span className="invalid">{errors["des_" + indexA].message}</span>
                              )}
                            </div>
                          </DataTableRow>
                          <DataTableRow>
                            <div className="form-control-wrap">
                              <div className="form-icon form-icon-left">
                                <Icon name="list-ol" />
                              </div>
                              <input
                                ref={register({
                                  required: t("validate:empty"),
                                  min: {
                                    value: 1,
                                    message: t("validate:number_large_than_one"),
                                  },
                                })}
                                className="form-control"
                                type="number"
                                id={"amount_" + indexA}
                                name={"amount_" + indexA}
                                disabled={disabled}
                                value={itemA.amount}
                                placeholder={t("add_request_assets:amount_assets")}
                                onChange={e => onChangeAssets(indexA, e)}
                              />
                              {errors["amount_" + indexA] && (
                                <span className="invalid">{errors["amount_" + indexA].message}</span>
                              )}
                            </div>
                          </DataTableRow>
                          <DataTableRow>
                            <div className="form-control-wrap">
                              <div className="form-icon form-icon-left">
                                <Icon name="sign-vnd" />
                              </div>
                              <NumberFormat
                                className="form-control"
                                name="price"
                                value={itemA.price}
                                placeholder={t("add_request_assets:price_assets")}
                                thousandSeparator
                                prefix="đ "
                                onValueChange={val =>
                                  onChangeAssets(indexA, {target: {name: "price", value: val.floatValue}})}
                              />
                            </div>
                          </DataTableRow>
                          <DataTableRow>
                            <div className="form-control-wrap">
                              <div className="form-icon form-icon-left">
                                <Icon name="sign-vnd" />
                              </div>
                              <NumberFormat
                                className="form-control"
                                name="total"
                                value={itemA.total}
                                placeholder={t("add_request_assets:total_assets")}
                                thousandSeparator
                                prefix="đ "
                                disabled={true}
                              />
                            </div>
                          </DataTableRow>
                          <DataTableRow className="nk-tb-col-tools">
                            <ul className="nk-tb-actions gx-1">
                              <li className="nk-tb-action-hidden" onClick={() => onRemoveRowAssets(indexA)}>
                                <TooltipComponent
                                  tag="a"
                                  containerClassName="btn btn-trigger btn-icon"
                                  id={"remove" + indexA}
                                  icon="cross-circle text-danger"
                                  direction="top"
                                  text={t("common:remove")}
                                />
                              </li>
                            </ul>
                          </DataTableRow>
                        </DataTableItem>
                      );
                    })}
                  </DataTableBody>
                </Col>
              </Row>
            </div>
          )}
        </Block>
      </Form>
    </SimpleBar>
  );
  
};

export default AddAllowForm;
