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
import Services from "../../../../../services";
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
  const managementState = useSelector(({management}) => management);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [dataSelect, setDataSelect] = useState({
    parents: [],
    types: [
      {
        label: 'Collapse',
        value: 2
      },
      {
        label: 'Item',
        value: 3
      }
    ],
  });
  const [formData, setFormData] = useState({
    id: -1,
    name: "",
    type: dataSelect.types[0],
    parent: "",
    level: "",
    webIcon: "",
    webUrl: "",
    mobileIcon: "",
    mobileUrl: "",
    inactive: false,
    web: true,
    mobile: true,
    order: 0,
  });

  /**
   ** FUNCTIONS
   */
  const onChangeInput = e =>
   setFormData({...formData, [e.target.name]: e.target.value});

  const onChangeInactive = e =>
   setFormData({...formData, inactive: !formData.inactive});

  const onChangeWeb = e =>
   setFormData({...formData, web: !formData.web});

  const onChangeMobile = e =>
   setFormData({...formData, mobile: !formData.mobile});

  const onChangeSelect = e => {
    setFormData({...formData, [e.key]: e.value});
  };

  const onResetData = () => {
    setFormData({
      id: -1,
      name: "",
      type: dataSelect.types[0],
      parent: "",
      level: "",
      webIcon: "",
      webUrl: "",
      mobileIcon: "",
      mobileUrl: "",
      inactive: false,
      web: false,
      mobile: false,
      order: 0,
    });
  };

  const onGetMenuData = async () => {
    let params = {
      Search: "",
      PageNum: 1,
      PageSize: -1,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    let dataMenu = await Services.management.getMenuList(params);
    if (dataMenu && !dataMenu.isError) {
      let tmpDataParents = dataMenu.data.map(item => {
        return {value: item.menuID, label: item.menuName};
      });
      setDataSelect({...dataSelect, parents: tmpDataParents});
    }
  };

  const onSetFormDataDetails = data => {
    log('[LOG] === onSetFormDataDetails ===> ', data);
    let fType = null,
      fParent = null;

    if (data.typeID) {
      fType = dataSelect.types.find(f => f.value === data.typeID);
    }
    if (data.parentID) {
      fParent = dataSelect.parents.find(f => f.value === data.parentID);
    }

    setFormData({
      id: data.menuID,
      name: data.menuName,
      type: fType || "",
      parent: fParent || "",
      level: data.levelID,
      webIcon: data.icon,
      webUrl: data.url,
      mobileIcon: data.mIcon,
      mobileUrl: data.mName,
      inactive: data.inactive,
      web: data.isWeb,
      mobile: data.isMobile,
      order: data.visOrder,
    });
    setLoading({...loading, main: false});
  };

  const onFormSubmit = () => {
    setLoading({...loading, submit: true});
    let params = {
      MenuID: !isUpdate ? "0" : formData.id,
      MenuName: formData.name.trim(),
      TypeID: formData.type?.value || null,
      LevelID: !isUpdate ? 0 : formData.level,
      ParentID: formData.parent?.value || null,
      Url: formData.webUrl.trim(),
      Icon: formData.webIcon.trim(),
      DirectionIcon: "",
      MName: formData.mobileUrl.trim(),
      MIcon:formData.mobileIcon.trim(),
      IsWeb: formData.web,
      IsMobile: formData.mobile,
      VisOrder: formData.order,
      Inactive: formData.inactive,

      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    log('[LOG] === onFormSubmit ===> ', params);
    if (!isUpdate) {
      dispatch(Actions.fFetchCreateMenu(params, history));
    } else {
      dispatch(Actions.fFetchUpdateMenu(params, history));
    }
  };

  const onSuccess = type => {
    dispatch(Actions.resetMenu());
    setLoading({main: false, submit: false});
    let message = "success:create_menu";
    if (type === "Update") message = "success:update_menu";
    toast(t(message), {type: "success"});
    onResetData();
    onClose(type);
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    dispatch(Actions.resetMenu());
    setLoading({main: false, submit: false});
    toast(error, {type: "error"});
  };

  /**
   ** LIFE CYCLE
   */
   useEffect(() => {
    if (loading.main && authState["successSignIn"] && show) {
      onGetMenuData();
    }
    if (!show) {
      clearErrors();
    }
  }, [
    show,
    loading.main,
    authState["successSignIn"],
  ]);

  useEffect(() => {
    if (dataSelect.parents.length > 0) {
      if (isUpdate) {
        onSetFormDataDetails(updateItem);
      } else {
        onResetData();
        setLoading({...loading, main: false});
      }
    }
  }, [
    dataSelect.parents,
    isUpdate,
  ]);

  useEffect(() => {
    if (loading.submit && !isUpdate) {
      if (!managementState["submittingCreateMenu"]) {
        if (managementState["successCreateMenu"] && !managementState["errorCreateMenu"]) {
          return onSuccess("Create");
        }
        if (!managementState["successCreateMenu"] && managementState["errorCreateMenu"]) {
          return onError(managementState["errorHelperCreateMenu"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    managementState["submittingCreateMenu"],
    managementState["successCreateMenu"],
    managementState["errorCreateMenu"],
  ]);

  useEffect(() => {
    if (loading.submit && isUpdate) {
      if (!managementState["submittingUpdateMenu"]) {
        if (managementState["successUpdateMenu"] && !managementState["errorUpdateMenu"]) {
          return onSuccess("Update");
        }
        if (!managementState["successUpdateMenu"] && managementState["errorUpdateMenu"]) {
          return onError(managementState["errorHelperUpdateMenu"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    managementState["submittingUpdateMenu"],
    managementState["successUpdateMenu"],
    managementState["errorUpdateMenu"],
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
                <BlockTitle tag="h4">{t("management:add_menu")}</BlockTitle>
              )}
              {isUpdate && (
                <BlockTitle tag="h4">{t("management:update_menu")}</BlockTitle>
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
              <Col md="8">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("management:name_menu")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="view-list-fill" />
                    </div>
                    <input
                      ref={register({ required: t("validate:empty") })}
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      disabled={disabled}
                      value={formData.name}
                      placeholder={t("management:holder_name_menu")}
                      onChange={onChangeInput}
                    />
                    {errors.name && (
                      <span className="invalid">{errors.name.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="type">
                      {t("management:type_menu")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="type"
                      isMulti={false}
                      isDisabled={disabled}
                      options={dataSelect.types}
                      value={formData.type}
                      placeholder={t("management:holder_type_menu")}
                      onChange={e => onChangeSelect({key: "type", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="parent">
                      {t("management:parent_menu")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="parent"
                      isMulti={false}
                      isDisabled={disabled}
                      options={dataSelect.parents}
                      value={formData.parent}
                      placeholder={t("management:holder_parent_menu")}
                      onChange={e => onChangeSelect({key: "parent", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="order">
                      {t("management:order")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="sort-v" />
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      id="order"
                      name="order"
                      disabled={disabled}
                      value={formData.order}
                      placeholder={t("management:holder_order")}
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
            <h6 className="overline-title">{t("management:informations_web")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="webIcon">
                      {t("management:web_icon")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="b-si" />
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      id="webIcon"
                      name="webIcon"
                      disabled={disabled}
                      value={formData.webIcon}
                      placeholder={t("management:holder_web_icon")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="webUrl">
                      {t("management:web_url_action")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="link-alt" />
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      id="webUrl"
                      name="webUrl"
                      disabled={disabled}
                      value={formData.webUrl}
                      placeholder={t("management:holder_web_url_action")}
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
            <h6 className="overline-title">{t("management:informations_mobile")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="mobileIcon">
                      {t("management:mobile_icon")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="b-si" />
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      id="mobileIcon"
                      name="mobileIcon"
                      disabled={disabled}
                      value={formData.mobileIcon}
                      placeholder={t("management:holder_mobile_icon")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="mobileUrl">
                      {t("management:mobile_url_action")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="link-alt" />
                    </div>
                    <input
                      className="form-control"
                      type="text"
                      id="mobileUrl"
                      name="mobileUrl"
                      disabled={disabled}
                      value={formData.mobileUrl}
                      placeholder={t("management:holder_mobile_url_action")}
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
              {isUpdate && (
                <Col md="3">
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
              <Col md="3">
                <FormGroup>
                  <div className="form-control-wrap">
                    <div className="custom-control custom-checkbox">
                      <input
                        className="custom-control-input form-control"
                        id="web"
                        name="web"
                        type="checkbox"
                        disabled={disabled}
                        checked={formData.web}
                        onChange={onChangeWeb}
                      />
                      <label className="custom-control-label" htmlFor="web">
                        {t("management:for_web")}
                      </label>
                    </div>
                  </div>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <div className="form-control-wrap">
                    <div className="custom-control custom-checkbox">
                      <input
                        className="custom-control-input form-control"
                        id="mobile"
                        name="mobile"
                        type="checkbox"
                        disabled={disabled}
                        checked={formData.mobile}
                        onChange={onChangeMobile}
                      />
                      <label className="custom-control-label" htmlFor="mobile">
                        {t("management:for_mobile")}
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
