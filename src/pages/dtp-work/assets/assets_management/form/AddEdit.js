import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import SimpleBar from "simplebar-react";
import NumberFormat from 'react-number-format';
import {Form, FormGroup} from "reactstrap";
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

function AddEditForm(props) {
  const {t} = useTranslation();
  const {
    show,
    isAdd,
    isUpdate,
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
    submit: false,
  });
  const [disables, setDisables] = useState({
    group: true,
    assets: true,
  });
  const [dataSelect, setDataSelect] = useState({
    suppliers: [{supplierID: "", supplierName: t("common:non_data")}],
    departments: [{deptCode: "", deptName: t("common:non_data")}],
    assetType: [{typeID: "", typeName: t("common:non_data")}],
    assetGroup: [{groupID: "", groupName: t("common:non_data")}],
    assetGroupDetail: [{absID: "", itemName: t("common:non_data")}],
  });
  const [formData, setFormData] = useState({
    assetName: "",
    assetQuantity: 1,
    assetSupplier: "",
    assetDesciption: "",
    assetPurchaseDate: new Date(),
    assetEffectiveDate: new Date(),
    assetInsuranceDate: "",
    assetOriginPrice: "",
    assetDepreciationDate: "",
    assetDepartment: "",
    assetCompany: "",
    assetType: "",
    assetGroup: "",
    assetAssets: "",
    assetPrefix: "",
    assetInactive: false,
  });

  /**
   ** FUNCTIONS 
   */
  const onInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onChangeSelect = (nextInput, e, pos) => {
    if (!nextInput) {
      return setFormData({...formData, [e.target.name]: e.target.value});
    }
    if (nextInput && e.target.value) {
      pos !== 4 && setFormData({...formData, [e.target.name]: e.target.value});
      pos !== 4 && setDisables({...disables, [nextInput]: false});

      let filter = [], defaultData = [];
      if (pos === 2) {
        filter = masterState["assetGroup"].filter(f => f.typeID == e.target.value);
        defaultData = [{groupID: "", groupName: t("common:non_data")}];
        defaultData = [...defaultData, ...filter];
        setDataSelect({...dataSelect, assetGroup: defaultData});
      } else if (pos === 3) {
        filter = masterState["assetGroupDetail"].filter(f => f.groupID == e.target.value);
        defaultData = [{absID: "", itemName: t("common:non_data")}];
        defaultData = [...defaultData, ...filter];
        setDataSelect({...dataSelect, assetGroupDetail: defaultData});
      } else if (pos === 4) {
        let fPrefix = masterState["assetGroupDetail"].find(f => f.absID == e.target.value);
        if (fPrefix) {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            [nextInput]: formData.assetCompany + "." + fPrefix.itemCode,
          });
        }
      }
    } else {
      if (pos === 2) {
        setDisables({group: true, assets: true});
        setFormData({
          ...formData,
          assetType: "",
          assetGroup: "",
          assetAssets: "",
          assetPrefix: "",
        });
      }
      if (pos === 3) {
        setDisables({...disables, assets: true});
        setFormData({
          ...formData,
          assetGroup: "",
          assetAssets: "",
          assetPrefix: "",
        });
      }
      if (pos === 4) {
        setFormData({
          ...formData,
          assetAssets: "",
          assetPrefix: "",
        });
      }
    }
  };

  const onChangeCheckbox = e => {
    setFormData({...formData, assetInactive: !formData.assetInactive})
  };

  const onDateChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const onSetFormDataDetails = data => {
    let fSupplier = masterState["supplier"].find(f => f.supplierName === data.supplierName);
    setFormData({
      ...formData,
      assetName: data?.assetName || "",
      assetSupplier: fSupplier?.supplierID || "",
      assetDesciption: data?.descr,
      assetPurchaseDate: data?.purchaseDate
        ? new Date(
          moment(data.purchaseDate).year() + "/" +
          (moment(data.purchaseDate).month() + 1) + "/" +
          moment(data.purchaseDate).date())
        : "",
      assetEffectiveDate: data?.effectiveDate
        ? new Date(
          moment(data.effectiveDate).year() + "/" +
          (moment(data.effectiveDate).month() + 1) + "/" +
          moment(data.effectiveDate).date())
        : "",
      assetInsuranceDate: data?.warrantyPeriod || "",
      assetOriginPrice: data?.originalPrice || "",
      assetDepreciationDate: data?.depreciationPeriod || "",
      assetDepartment: data?.deptCodeManager || "",
      assetInactive: data?.inactive || false,
    });
  };

  const onResetData = () => {
    setFormData({
      assetName: "",
      assetQuantity: 1,
      assetSupplier: "",
      assetDesciption: "",
      assetPurchaseDate: new Date(),
      assetEffectiveDate: new Date(),
      assetInsuranceDate: "",
      assetOriginPrice: "",
      assetDepreciationDate: "",
      assetDepartment: "",
      assetCompany: "",
      assetType: "",
      assetGroup: "",
      assetAssets: "",
      assetPrefix: "",
      assetInactive: false,
    });
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "Region,Department,Employee,Supplier,Company,AssetType,AssetGroup,AssetGroupDetail",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onFormSubmit = () => {
    setLoading({...loading, submit: true});
    if (isAdd) {
      let fConpany = masterState["company"].find(f => f.shortName === formData.assetCompany);
      let params = {
        AssetName: formData.assetName.trim(),
        Suppiler: Number(formData.assetSupplier),
        Qty: Number(formData.assetQuantity),
        Descr: formData.assetDesciption,
        PurchaseDate: moment(formData.assetPurchaseDate).format("YYYY-MM-DD"),
        EffectiveDate: moment(formData.assetEffectiveDate).format("YYYY-MM-DD"),
        WarrantyPeriod: formData.assetInsuranceDate !== ""
          ? Number(formData.assetInsuranceDate)
          : "",
        OriginalPrice: formData.assetOriginPrice !== ""
          ? Number(formData.assetOriginPrice)
          : "",
        DepreciationPeriod: formData.assetDepreciationDate !== ""
          ? Number(formData.assetDepreciationDate)
          : "",
        DeptCode: formData.assetDepartment,
        CmpnID: Number(fConpany.cmpnID),
        AssetTypeID: Number(formData.assetType),
        AssetGroupID: Number(formData.assetGroup),
        AssetGroupDetailID: Number(formData.assetAssets),
        PreAssetCode: formData.assetPrefix,
        Lang: commonState["language"],
        RefreshToken: authState["data"]["refreshToken"],
      };
      console.log('[LOG] === onFormSubmit ADD ===> ', params);
      dispatch(Actions.fFetchCreateAssets(params, history));
    } else {
      let params = {
        AssetID: updateItem.assetID,
        AssetName: formData.assetName.trim(),
        Suppiler: Number(formData.assetSupplier),
        Descr: formData.assetDesciption,
        PurchaseDate: moment(formData.assetPurchaseDate).format("YYYY-MM-DD"),
        EffectiveDate: moment(formData.assetEffectiveDate).format("YYYY-MM-DD"),
        WarrantyPeriod: formData.assetInsuranceDate !== ""
          ? Number(formData.assetInsuranceDate)
          : "",
        OriginalPrice: formData.assetOriginPrice !== ""
          ? Number(formData.assetOriginPrice)
          : "",
        DepreciationPeriod: formData.assetDepreciationDate !== ""
          ? Number(formData.assetDepreciationDate)
          : "",
        DeptCode: formData.assetDepartment,
        Inactive: formData.assetInactive,
        Lang: commonState["language"],
        RefreshToken: authState["data"]["refreshToken"],
      };
      console.log('[LOG] === onFormSubmit UPDATE ===> ', params);
      dispatch(Actions.fFetchUpdateAssets(params, history));
    }
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      masterState["company"][0] &&
        setFormData({...formData, assetCompany: masterState["company"][0].shortName});
      setDataSelect({
        suppliers: [...dataSelect.suppliers, ...masterState["supplier"]],
        departments: [...dataSelect.departments, ...masterState["department"]],
        assetType: [...dataSelect.assetType, ...masterState["assetType"]],
        assetGroup: [...dataSelect.assetGroup, ...masterState["assetGroup"]],
        assetGroupDetail: [...dataSelect.assetGroupDetail, ...masterState["assetGroupDetail"]],
      });
    }
    if (type === "Create" || type === "Update") {
      onResetData();
      onClose(true, type === "Create"
        ? t("success:create_assets")
        : t("success:update_assets"));
    }
    setLoading({main: false, submit: false});
  };

  const onError = (type, error) => {
    console.log('[LOG] === onError ===> ', error);
    setLoading({main: false, submit: false});
    if (type === "Create" || type === "Update") {
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
    authState["successSignIn"],
  ]);

  useEffect(() => {
    if (updateItem && show) {
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
    if (loading.submit && show) {
      if (!approvedState["submittingCreateAssets"]) {
        if (approvedState["successCreateAssets"] && !approvedState["errorCreateAssets"]) {
          return onSuccess("Create");
        }
        if (!approvedState["successCreateAssets"] && approvedState["errorCreateAssets"]) {
          return onError("Create", approvedState["errorHelperCreateAssets"]);
        }
      }
    }
  }, [
    show,
    loading.submit,
    approvedState["submittingCreateAssets"],
    approvedState["successCreateAssets"],
    approvedState["errorCreateAssets"],
  ]);

  useEffect(() => {
    if (loading.submit && show) {
      if (!approvedState["submittingUpdateAssets"]) {
        if (approvedState["successUpdateAssets"] && !approvedState["errorUpdateAssets"]) {
          return onSuccess("Update");
        }
        if (!approvedState["successUpdateAssets"] && approvedState["errorUpdateAssets"]) {
          return onError("Update", approvedState["errorHelperUpdateAssets"]);
        }
      }
    }
  }, [
    show,
    loading.submit,
    approvedState["submittingUpdateAssets"],
    approvedState["successUpdateAssets"],
    approvedState["errorUpdateAssets"],
  ]);

  /**
   ** RENDER 
   */
  const { errors, register, handleSubmit } = useForm();
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
              {isAdd && <BlockTitle tag="h3">{t("add_assets:title")}</BlockTitle>}
              {isUpdate && <BlockTitle tag="h3">{t("add_assets:update_title")}</BlockTitle>}
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                {isAdd && (
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
                )}
                {isAdd && (
                  <li className="nk-block-tools-opt">
                    <Button
                      className="toggle btn-icon d-md-none"
                      color="primary"
                      type="submit"
                      disabled={disabled}
                    >
                      {loading.submit && (
                        <div className="spinner-border spinner-border-sm text-white" role="status" />
                      )}
                      {!loading.submit && <Icon name="plus"></Icon>}
                    </Button>
                    <Button
                      className="toggle d-none d-md-inline-flex"
                      color="primary"
                      type="submit"
                      disabled={disabled}
                    >
                      {loading.submit && (
                        <div className="spinner-border spinner-border-sm text-white mr-2" role="status" />
                      )}
                      {!loading.submit && <Icon name="plus"></Icon>}
                      <span>{t("common:add_new")}</span>
                    </Button>
                  </li>
                )}
                {isUpdate && (
                  <li className="nk-block-tools-opt">
                    <Button
                      className="toggle btn-icon d-md-none"
                      color="primary"
                      type="submit"
                      disabled={disabled}
                    >
                      {loading.submit && (
                        <div className="spinner-border spinner-border-sm text-white" role="status" />
                      )}
                      {!loading.submit && <Icon name="edit-alt"></Icon>}
                    </Button>
                    <Button
                      className="toggle d-none d-md-inline-flex"
                      color="primary"
                      type="submit"
                      disabled={disabled}
                    >
                      {loading.submit && (
                        <div className="spinner-border spinner-border-sm text-white mr-2" role="status" />
                      )}
                      {!loading.submit && <Icon name="edit-alt"></Icon>}
                      <span>{t("common:update")}</span>
                    </Button>
                  </li>
                )}
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <div className="nk-divider divider md"></div>

        <Block>
          <BlockHead>
            <BlockTitle tag="h6">{t("add_assets:information")}</BlockTitle>
          </BlockHead>
          <Row className="g-3">
            <Col md="5">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetName">
                    {t("add_assets:name")} <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: t("validate:empty") })}
                    className="form-control"
                    type="text"
                    id="assetName"
                    name="assetName"
                    disabled={disabled}
                    value={formData.assetName}
                    placeholder={t("add_assets:holder_name")}
                    onChange={onInputChange}
                  />
                  {errors.assetName && (
                    <span className="invalid">{errors.assetName.message}</span>
                  )}
                </div>
              </FormGroup>
            </Col>
            <Col md="5">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetSupplier">
                    {t("add_assets:supplier")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <select
                      className="form-control form-select"
                      name="assetSupplier"
                      id="assetSupplier"
                      disabled={disabled}
                      value={formData.assetSupplier}
                      onChange={e => onChangeSelect(null, e)}
                    >
                      {dataSelect.suppliers.map((itemS, indexS) => {
                        return (
                          <option
                            key={itemS.supplierID + "_supplier_" + indexS}
                            value={itemS.supplierID}>
                            {itemS.supplierName}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col md="2">
              {isAdd && (
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="assetQuantity">
                      {t("add_assets:quantity")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="number"
                      min={1}
                      id="assetQuantity"
                      name="assetQuantity"
                      disabled={disabled}
                      value={formData.assetQuantity}
                      placeholder={t("add_assets:holder_quantity")}
                      onChange={onInputChange}
                    />
                    {errors.assetQuantity && (
                      <span className="invalid">{errors.assetQuantity.message}</span>
                    )}
                  </div>
                </FormGroup>
              )}
            </Col>
            <Col size="12">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetDesciption">
                    {t("add_assets:description")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <textarea
                    className="no-resize form-control"
                    type="text"
                    id="assetDesciption"
                    name="assetDesciption"
                    disabled={disabled}
                    value={formData.assetDesciption}
                    placeholder={t("add_assets:holder_description")}
                    onChange={onInputChange}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetPurchaseDate">
                    {t("add_assets:purchase_date")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-left">
                    <Icon name="calendar"></Icon>
                  </div>
                  <DatePicker
                    selected={formData.assetPurchaseDate}
                    className="form-control date-picker"
                    disabled={disabled}
                    value={formData.assetPurchaseDate}
                    onChange={e => onDateChange("assetPurchaseDate", e)}
                    customInput={<CustomDateInput />}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetEffectiveDate">
                    {t("add_assets:visible_date")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <div className="form-icon form-icon-left">
                    <Icon name="calendar"></Icon>
                  </div>
                  <DatePicker
                    selected={formData.assetEffectiveDate}
                    className="form-control date-picker"
                    disabled={disabled}
                    value={formData.assetEffectiveDate}
                    onChange={e => onDateChange("assetEffectiveDate", e)}
                    customInput={<CustomDateInput />}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetInsuranceDate">
                    {t("add_assets:insurance_date")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    type="number"
                    min={1}
                    id="assetInsuranceDate"
                    name="assetInsuranceDate"
                    disabled={disabled}
                    value={formData.assetInsuranceDate}
                    placeholder={t("add_assets:holder_insurance_date")}
                    onChange={onInputChange}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetOriginPrice">
                    {t("add_assets:origin_price")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <NumberFormat
                    className="form-control"
                    name={"assetOriginPrice"}
                    value={formData.assetOriginPrice}
                    placeholder={t("add_assets:holder_origin_price") || ' '}
                    thousandSeparator
                    prefix="đ "
                    onValueChange={val =>
                      onInputChange({target: {name: "assetOriginPrice", value: val.floatValue}})}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetDepreciationDate">
                    {t("add_assets:depreciation_date")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    className="form-control"
                    type="number"
                    min={1}
                    id="assetDepreciationDate"
                    name="assetDepreciationDate"
                    disabled={disabled}
                    value={formData.assetDepreciationDate}
                    placeholder={t("add_assets:holder_depreciation_date")}
                    onChange={onInputChange}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetDepartment">
                    {t("add_assets:department")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <select
                      ref={register({ required: t("validate:empty") })}
                      className="form-control form-select"
                      name="assetDepartment"
                      id="assetDepartment"
                      disabled={disabled}
                      value={formData.assetDepartment}
                      onChange={e => onChangeSelect(null, e)}
                    >
                      {dataSelect.departments.map((itemD, indexD) => {
                        return (
                          <option
                            key={itemD.deptCode + "_department_" + indexD}
                            value={itemD.deptCode}>
                            {itemD.deptName}
                          </option>
                        )
                      })}
                    </select>
                    {errors.assetDepartment && (
                      <span className="invalid">{errors.assetDepartment.message}</span>
                    )}
                  </div>
                </div>
              </FormGroup>
            </Col>
            {isUpdate && (
              <Col size="12" className="d-flex justify-content-end">
                <FormGroup>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input form-control"
                      id="assetInactive"
                      value={formData.assetInactive}
                      onChange={onChangeCheckbox}
                    />
                    <label className="custom-control-label" htmlFor="assetInactive">
                      {t("add_assets:non_use")}
                    </label>
                  </div>
                </FormGroup>
              </Col>
            )}
          </Row>

          {isAdd && (
            <>
              <div className="nk-divider divider md"></div>
          
              <BlockHead>
                <BlockTitle tag="h6">{t("add_assets:rule_code")}</BlockTitle>
              </BlockHead>
              <Row className="g-3">
                <Col md="8">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="assetCompany">
                        {t("add_assets:company")} <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <select
                          className="form-control form-select"
                          name="assetCompany"
                          id="assetCompany"
                          disabled={disabled}
                          value={formData.assetCompany}
                          onChange={e => onChangeSelect("type", e, 1)}
                        >
                          {masterState["company"].length > 0 &&
                            masterState["company"].map((itemC, indexC) => {
                              return (
                                <option
                                  key={itemC.shortName + "_company_" + indexC}
                                  value={itemC.shortName}>
                                  {itemC.cmpnName}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="assetType">
                        {t("add_assets:type")} <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <select
                          ref={register({ required: t("validate:empty") })}
                          className="form-control form-select"
                          name="assetType"
                          id="assetType"
                          disabled={disabled}
                          value={formData.assetType}
                          onChange={e => onChangeSelect("group", e, 2)}
                        >
                          {dataSelect.assetType.map((itemAT, indexAT) => {
                            return (
                              <option
                                key={itemAT.typeID + "_assetType_" + indexAT}
                                value={itemAT.typeID}>
                                {itemAT.typeName}
                              </option>
                            )
                          })}
                        </select>
                        {errors.assetType && (
                          <span className="invalid">{errors.assetType.message}</span>
                        )}
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="assetGroup">
                        {t("add_assets:group")} <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <select
                          ref={register({ required: t("validate:empty") })}
                          className="form-control form-select"
                          name="assetGroup"
                          id="assetGroup"
                          value={formData.assetGroup}
                          disabled={disables.group || disabled}
                          onChange={e => onChangeSelect("assets", e, 3)}
                        >
                          {dataSelect.assetGroup.map((itemAG, indexAG) => {
                            return (
                              <option
                                key={itemAG.groupID + "_assetGroup_" + indexAG}
                                value={itemAG.groupID}>
                                {itemAG.groupName}
                              </option>
                            )
                          })}
                        </select>
                        {errors.assetGroup && (
                          <span className="invalid">{errors.assetGroup.message}</span>
                        )}
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="assetAssets">
                        {t("add_assets:assets")} <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-control-select">
                        <select
                          ref={register({ required: t("validate:empty") })}
                          className="form-control form-select"
                          name="assetAssets"
                          id="assetAssets"
                          value={formData.assetAssets}
                          disabled={disables.assets || disabled}
                          onChange={e => onChangeSelect("assetPrefix", e, 4)}
                        >
                          {dataSelect.assetGroupDetail.map((itemAA, indexAA) => {
                            return (
                              <option
                                key={itemAA.absID + "_assetAssets_" + indexAA}
                                value={itemAA.absID}>
                                {itemAA.itemName}
                              </option>
                            )
                          })}
                        </select>
                        {errors.assetAssets && (
                          <span className="invalid">{errors.assetAssets.message}</span>
                        )}
                      </div>
                    </div>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="assetPrefix">
                        {t("add_assets:prefix")} <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <input
                        className="form-control"
                        disabled={true}
                        type="text"
                        name="assetPrefix"
                        value={formData.assetPrefix}
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
  )
};

export default AddEditForm;
