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
  RSelect,
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
    type: true,
    group: true,
    assets: true,
  });
  const [error, setError] = useState({
    department: null,
    company: null,
    type: null,
    group: null,
    assets: null,
  });
  const [dataSelect, setDataSelect] = useState({
    suppliers: [],
    departments: [],
    companys: [],
    assetType: [],
    assetGroup: [],
    assetGroupDetail: [],
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
    setError({
      department: null,
      company: null,
      type: null,
      group: null,
      assets: null,
    });
    if (!nextInput) {
      return setFormData({...formData, [e.key]: e.value});
    }

    if (nextInput && e.key) {
      pos !== 4 && setDisables({...disables, [nextInput]: false});

      let filter = [], defaultData = [];
      if (pos === 1) {
        if (formData.assetPrefix) {
          setFormData({
            ...formData,
            [e.key]: e.value,
            assetPrefix: e.value.shortName + formData.assetPrefix.substring(2, formData.assetPrefix.length),
          });
        } else {
          setFormData({...formData, [e.key]: e.value});
        }
      } else if (pos === 2) { // type
        filter = masterState["assetGroup"].filter(f => f.typeID == e.value.value);
        filter = filter.map(item => {return {value: item.groupID, label: item.groupName}});
        defaultData = [];
        defaultData = [...defaultData, ...filter];
        setDataSelect({...dataSelect, assetGroup: defaultData});
        setDisables({...disables, group: false, assets: true});
        setFormData({
          ...formData,
          [e.key]: e.value,
          assetGroup: "",
          assetAssets: "",
          assetPrefix: "",
        });
      } else if (pos === 3) { // group
        filter = masterState["assetGroupDetail"].filter(f => f.groupID == e.value.value);
        filter = filter.map(item => {return {value: item.absID, label: item.itemName}});
        defaultData = [];
        defaultData = [...defaultData, ...filter];
        setDataSelect({...dataSelect, assetGroupDetail: defaultData});
        setDisables({...disables, assets: false});
        setFormData({
          ...formData,
          [e.key]: e.value,
          assetAssets: "",
          assetPrefix: "",
        });
      } else if (pos === 4) { // prefix
        let fPrefix = masterState["assetGroupDetail"].find(f => f.absID == e.value.value);
        if (fPrefix) {
          setFormData({
            ...formData,
            [e.key]: e.value,
            [nextInput]: formData.assetCompany.shortName + "." + fPrefix.itemCode,
          });
        }
      }
    } else {
      if (pos === 1) {
        setDisables({type: true, group: true, assets: true});
        setFormData({
          ...formData,
          assetType: "",
          assetGroup: "",
          assetAssets: "",
          assetPrefix: "",
        });
      }
      if (pos === 2) {
        setDisables({...disables, group: true, assets: true});
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
    console.log('[LOG] === onSetFormDataDetails ===> ', data);
    let fSupplier = masterState["supplier"].find(f => f.supplierID === data.suppiler);
    let fDept = masterState["department"].find(f => f.deptCode == data.deptCodeManager);
    setFormData({
      ...formData,
      assetName: data?.assetName || "",
      assetSupplier: fSupplier
        ? {value: fSupplier.supplierID, label: fSupplier.supplierName}
        : "",
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
      assetDepartment: fDept
        ? {value: fDept.deptCode, label: fDept.deptName}
        : "",
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
    setDisables({
      type: true,
      group: true,
      assets: true,
    });
    setError({
      department: null,
      company: null,
      type: null,
      group: null,
      assets: null,
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

  const onValidateAdd = () => {
    let isError = false,
    tmpError = {
      department: null,
      company: null,
      type: null,
      group: null,
      assets: null,
    };
    setError(tmpError);
    if (!formData.assetDepartment) {
      isError = true;
      tmpError.department = {message: t("validate:empty")};
    }
    if (!formData.assetCompany) {
      isError = true;
      tmpError.company = {message: t("validate:empty")};
    }
    if (!formData.assetType) {
      isError = true;
      tmpError.type = {message: t("validate:empty")};
    }
    if (!formData.assetGroup) {
      isError = true;
      tmpError.group = {message: t("validate:empty")};
    }
    if (!formData.assetAssets) {
      isError = true;
      tmpError.assets = {message: t("validate:empty")};
    }
    setError(tmpError);
    return isError;
  };

  const onFormSubmit = () => {
    if (isAdd) {
      let isError = onValidateAdd();
      if (isError) return;

      setLoading({...loading, submit: true});
      let params = {
        AssetName: formData.assetName.trim(),
        Suppiler: Number(formData.assetSupplier.value),
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
        DeptCode: formData.assetDepartment.value,
        CmpnID: Number(formData.assetCompany.value),
        AssetTypeID: Number(formData.assetType.value),
        AssetGroupID: Number(formData.assetGroup.value),
        AssetGroupDetailID: Number(formData.assetAssets.value),
        PreAssetCode: formData.assetPrefix,
        Lang: commonState["language"],
        RefreshToken: authState["data"]["refreshToken"],
      };
      console.log('[LOG] === onFormSubmit ADD ===> ', params);
      dispatch(Actions.fFetchCreateAssets(params, history));
    } else {
      setLoading({...loading, submit: true});
      let params = {
        AssetID: updateItem.assetID,
        AssetName: formData.assetName.trim(),
        Suppiler: Number(formData.assetSupplier.value),
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
        DeptCode: formData.assetDepartment.value,
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
      let tmpDataSup = masterState["supplier"].map(item => {
        return {value: item.supplierID, label: item.supplierName};
      });
      let tmpDataDep = masterState["department"].map(item => {
        return {value: item.deptCode, label: item.deptName};
      });
      let tmpDataCom = masterState["company"].map(item => {
        return {value: item.cmpnID, label: item.cmpnName, shortName: item.shortName};
      });
      let tmpDataAst = masterState["assetType"].map(item => {
        return {value: item.typeID, label: item.typeName};
      });
      let tmpDataAsg = masterState["assetGroup"].map(item => {
        return {value: item.groupID, label: item.groupName};
      });
      let tmpDataAgd = masterState["assetGroupDetail"].map(item => {
        return {value: item.absID, label: item.itemName};
      });
      setDataSelect({
        suppliers: [...dataSelect.suppliers, ...tmpDataSup],
        departments: [...dataSelect.departments, ...tmpDataDep],
        companys: [...dataSelect.companys, ...tmpDataCom],
        assetType: [...dataSelect.assetType, ...tmpDataAst],
        assetGroup: [...dataSelect.assetGroup, ...tmpDataAsg],
        assetGroupDetail: [...dataSelect.assetGroupDetail, ...tmpDataAgd],
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
    if (!loading.main && updateItem && show) {
      onSetFormDataDetails(updateItem);
    }
  }, [
    loading.main,
    show,
    updateItem,
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
                  <RSelect
                    name="assetSupplier"
                    isMulti={false}
                    isDisabled={disabled}
                    options={dataSelect.suppliers}
                    value={formData.assetSupplier}
                    placeholder={t("add_assets:holder_supplier")}
                    onChange={e => onChangeSelect(null, {key: "assetSupplier", value: e})}
                  />
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
                    {t("add_assets:department")} <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-control-wrap">
                  <RSelect
                    name="assetDepartment"
                    isMulti={false}
                    isDisabled={disabled}
                    error={error.department}
                    options={dataSelect.departments}
                    value={formData.assetDepartment}
                    placeholder={t("add_assets:holder_department")}
                    onChange={e => onChangeSelect(null, {key: "assetDepartment", value: e})}
                  />
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
                      <RSelect
                        name="assetCompany"
                        isMulti={false}
                        isDisabled={disabled}
                        error={error.company}
                        options={dataSelect.companys}
                        value={formData.assetCompany}
                        placeholder={t("add_assets:holder_company")}
                        onChange={e => onChangeSelect("type", {key: "assetCompany", value: e}, 1)}
                      />
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
                      <RSelect
                        name="assetType"
                        isMulti={false}
                        isDisabled={disables.type || disabled}
                        error={error.type}
                        options={dataSelect.assetType}
                        value={formData.assetType}
                        placeholder={t("add_assets:holder_type")}
                        onChange={e => onChangeSelect("group", {key: "assetType", value: e}, 2)}
                      />
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
                      <RSelect
                        name="assetGroup"
                        isMulti={false}
                        isDisabled={disables.group || disabled}
                        error={error.group}
                        options={dataSelect.assetGroup}
                        value={formData.assetGroup}
                        placeholder={t("add_assets:holder_group")}
                        onChange={e => onChangeSelect("assets", {key: "assetGroup", value: e}, 3)}
                      />
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
                      <RSelect
                        name="assetAssets"
                        isMulti={false}
                        isDisabled={disables.assets || disabled}
                        error={error.assets}
                        options={dataSelect.assetGroupDetail}
                        value={formData.assetAssets}
                        placeholder={t("add_assets:holder_group")}
                        onChange={e => onChangeSelect("assetPrefix", {key: "assetAssets", value: e}, 4)}
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="assetPrefix">
                        {t("add_assets:prefix")}
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
