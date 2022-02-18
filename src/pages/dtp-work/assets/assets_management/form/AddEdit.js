import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import SimpleBar from "simplebar-react";
import {Form, FormGroup, Input} from "reactstrap";
import moment from "moment";
/** COMMON */
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
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
  const {show} = props;

  /** Use redux */
  const dispatch = useDispatch();
  const authState = useSelector(({auth}) => auth);
  const masterState = useSelector(({master}) => master);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [disables, setDisables] = useState({
    type: false,
    group: false,
    assets: false,

  });
  const [formData, setFormData] = useState({
    assetName: "",
    assetQuantity: 1,
    assetSupplier: "",
    assetDesciption: "",
    assetPurchaseDate: new Date(),
    assetEffectiveDate: new Date(),
    assetInsuranceDate: 0,
    assetOriginPrice: 0,
    assetDepreciationDate: 0,
    assetDepartment: "",
    assetCompany: "",
    assetType: "",
    assetGroup: "",
    assetAssets: "",
    assetPrefix: "",
  });

  /**
   ** FUNCTIONS 
   */
  const onInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onChangeSelect = (nextInput, e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    if (nextInput) {
      setDisables({...disables, [nextInput]: false});
    }
  };

  const onDateChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const onResetData = () => {
  
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "Region,Department,Employee,Supplier,Company,AssetType,AssetGroup,AssetGroupDetail",
    }
    dispatch(Actions.fFetchMasterData(params));
  };

  

  const onFormSubmit = () => {
    
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      setFormData({
        ...formData,
        assetSupplier: masterState["supplier"][0]?.supplierID,
        assetDepartment: masterState["department"][0]?.deptCode,
        assetCompany: masterState["company"][0]?.cmpnID,
        assetType: masterState["assetType"][0]?.typeID,
        assetGroup: masterState["assetGroup"][0]?.groupID,
        assetAssets: masterState["assetGroupDetail"][0]?.absID,
      });
    }
    setLoading({main: false, submit: false});
  };

  const onError = error => {
    console.log('[LOG] === onError ===> ', error);
    setLoading({main: false, submit: false});
  };

  /**
   ** LIFE CYCLE 
   */
  useEffect(() => {
    if (authState["successSignIn"]) {
      onGetMasterData();
    }
  }, [
    authState["successSignIn"]
  ]);

  useEffect(() => {
    if (loading.main) {
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
    loading.main,
    masterState["submittingGetAll"],
    masterState["successGetAll"],
    masterState["errorGetAll"],
  ]);

  /**
   ** RENDER 
   */
  const { errors, register, handleSubmit } = useForm();

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
              <BlockTitle tag="h3">{t("add_assets:title")}</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li className="nk-block-tools-opt">
                  <Button
                    className="toggle btn-icon d-md-none"
                    color="gray"
                    onClick={onResetData}
                  >
                    <Icon name="undo"></Icon>
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="gray"
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
                  >
                    <Icon name="plus"></Icon>
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                  >
                    <Icon name="plus"></Icon>
                    <span>{t("common:add_new")}</span>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

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
                    name="assetName"
                    placeholder={t("add_assets:holder_name")}
                    onChange={onInputChange}
                  />
                  {errors.assetName && <span className="invalid">{errors.assetName.message}</span>}
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
                    <Input type="select" name="assetSupplier" id="assetSupplier">
                      {masterState["supplier"].length > 0 &&
                        masterState["supplier"].map((itemS, indexS) => {
                          return (
                            <option
                              key={itemS.supplierID + "_supplier_" + indexS}
                              value={itemS.supplierID}>
                              {itemS.supplierName}
                            </option>
                          )
                        })}
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col md="2">
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
                    name="assetQuantity"
                    value={formData.assetQuantity}
                    placeholder={t("add_assets:holder_quantity")}
                    onChange={onInputChange}
                  />
                  {errors.assetQuantity && <span className="invalid">{errors.assetQuantity.message}</span>}
                </div>
              </FormGroup>
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
                    name="assetDesciption"
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
                    name="assetInsuranceDate"
                    placeholder={t("add_assets:holder_insurance_date")}
                    onChange={onInputChange}
                  />
                  {errors.assetInsuranceDate && <span className="invalid">{errors.assetInsuranceDate.message}</span>}
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
                  <input
                    className="form-control"
                    type="number"
                    name="assetOriginPrice"
                    placeholder={t("add_assets:holder_origin_price")}
                    onChange={onInputChange}
                  />
                  {errors.assetOriginPrice && <span className="invalid">{errors.assetOriginPrice.message}</span>}
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
                    name="assetDepreciationDate"
                    placeholder={t("add_assets:holder_depreciation_date")}
                    onChange={onInputChange}
                  />
                  {errors.assetDepreciationDate && <span className="invalid">{errors.assetDepreciationDate.message}</span>}
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
                    <Input type="select" name="assetDepartment" id="assetDepartment">
                      {masterState["department"].length > 0 &&
                        masterState["department"].map((itemD, indexD) => {
                          return (
                            <option
                              key={itemD.deptCode + "_department_" + indexD}
                              value={itemD.deptCode}>
                              {itemD.deptName}
                            </option>
                          )
                        })}
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>

          <div className="nk-divider divider md"></div>
          <BlockHead>
            <BlockTitle tag="h6">{t("add_assets:rule_code")}</BlockTitle>
          </BlockHead>
          <Row className="g-3">
            <Col md="8">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetCompany">
                    {t("add_assets:company")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input
                      type="select"
                      name="assetCompany"
                      id="assetCompany"
                      value={formData.assetCompany}
                      onChange={e => onChangeSelect("type", e)}
                    >
                      {masterState["company"].length > 0 &&
                        masterState["company"].map((itemC, indexC) => {
                          return (
                            <option
                              key={itemC.cmpnID + "_company_" + indexC}
                              value={itemC.cmpnID}>
                              {itemC.cmpnName}
                            </option>
                          )
                        })}
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetType">
                    {t("add_assets:type")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input
                      type="select"
                      name="assetType"
                      id="assetType"
                      value={formData.assetType}
                      disabled={disables.type}
                      onChange={e => onChangeSelect("group", e)}
                    >
                      {masterState["assetType"].length > 0 &&
                        masterState["assetType"].map((itemAT, indexAT) => {
                          return (
                            <option
                              key={itemAT.typeID + "_assetType_" + indexAT}
                              value={itemAT.typeID}>
                              {itemAT.typeName}
                            </option>
                          )
                        })}
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetGroup">
                    {t("add_assets:group")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input
                      type="select"
                      name="assetGroup"
                      id="assetGroup"
                      value={formData.assetGroup}
                      disabled={disables.group}
                      onChange={e => onChangeSelect("assets", e)}
                    >
                      {masterState["assetGroup"].length > 0 &&
                        masterState["assetGroup"].map((itemAG, indexAG) => {
                          return (
                            <option
                              key={itemAG.groupID + "_assetGroup_" + indexAG}
                              value={itemAG.groupID}>
                              {itemAG.groupName}
                            </option>
                          )
                        })}
                    </Input>
                  </div>
                </div>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="assetAssets">
                    {t("add_assets:assets")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <div className="form-control-select">
                    <Input
                      type="select"
                      name="assetAssets"
                      id="assetAssets"
                      value={formData.assetAssets}
                      disabled={disables.assets}
                      onChange={e => onChangeSelect(null, e)}
                    >
                      {masterState["assetGroupDetail"].length > 0 &&
                        masterState["assetGroupDetail"].map((itemAA, indexAA) => {
                          return (
                            <option
                              key={itemAA.absID + "_assetGroupDetail_" + indexAA}
                              value={itemAA.absID}>
                              {itemAA.itemName}
                            </option>
                          )
                        })}
                    </Input>
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
                    ref={register({ required: t("validate:empty") })}
                    className="form-control"
                    disabled={true}
                    type="text"
                    name="assetPrefix"
                    onChange={onInputChange}
                  />
                  {errors.assetPrefix && <span className="invalid">{errors.assetPrefix.message}</span>}
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Block>
      </Form>
    </SimpleBar>
  )
};

export default AddEditForm;
