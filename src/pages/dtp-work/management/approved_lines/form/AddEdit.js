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
  const managementState = useSelector(({management}) => management);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [formData, setFormData] = useState({
    id: -1,
    code: "",
    name: "",
    inactive: false,
  });

  /**
   ** FUNCTIONS
   */
   const onChangeInput = e =>
   setFormData({...formData, [e.target.name]: e.target.value});

  const onChangeCheckbox = () =>
    setFormData({...formData, inactive: !formData.inactive});

  const onResetData = () => {
    setFormData({
      id: -1,
      code: "",
      name: "",
      inactive: false,
    });
  };

  const onSetDataDetails = role => {
    setFormData({
      id: role.roleID,
      code: role.roleCode,
      name: role.roleName,
      inactive: role.inactive,
    });
    setLoading({...loading, main: false});
  };

  const onFormSubmit = () => {
    setLoading({...loading, submit: true});
    let params = {
      RoleID: !isUpdate ? "0" : formData.id,
      RoleCode: formData.code.trim(),
      RoleName: formData.name.trim(),
      Inactive: formData.inactive,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    if (!isUpdate) {
      dispatch(Actions.fFetchCreateApprovedLines(params, history));
    } else {
      dispatch(Actions.fFetchUpdateApprovedLines(params, history));
    }
  };

  const onSuccess = type => {
    setLoading({main: false, submit: false});
    let message = "success:create_approved_lines";
    if (type === "Update") message = "success:update_approved_lines";
    toast(t(message), {type: "success"});
    onResetData();
    onClose(type);
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
    if (show) {
      if (isUpdate) {
        onSetDataDetails(updateItem);
      } else {
        onResetData();
        setLoading({...loading, main: false});
      }
    } else {
      clearErrors();
    }
  }, [
    show,
    isUpdate,
  ]);

  useEffect(() => {
    if (loading.submit && !isUpdate) {
      if (!managementState["submittingCreateApprovedLines"]) {
        if (managementState["successCreateApprovedLines"] && !managementState["errorCreateApprovedLines"]) {
          return onSuccess("Create");
        }
        if (!managementState["successCreateApprovedLines"] && managementState["errorCreateApprovedLines"]) {
          return onError(managementState["errorHelperCreateApprovedLines"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    managementState["submittingCreateApprovedLines"],
    managementState["successCreateApprovedLines"],
    managementState["errorCreateApprovedLines"],
  ]);

  useEffect(() => {
    if (loading.submit && isUpdate) {
      if (!managementState["submittingUpdateApprovedLines"]) {
        if (managementState["successUpdateApprovedLines"] && !managementState["errorUpdateApprovedLines"]) {
          return onSuccess("Update");
        }
        if (!managementState["successUpdateApprovedLines"] && managementState["errorUpdateApprovedLines"]) {
          return onError(managementState["errorHelperUpdateApprovedLines"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    managementState["submittingUpdateApprovedLines"],
    managementState["successUpdateApprovedLines"],
    managementState["errorUpdateApprovedLines"],
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
                <BlockTitle tag="h4">{t("management:add_approved_lines")}</BlockTitle>
              )}
              {isUpdate && (
                <BlockTitle tag="h4">{t("management:update_approved_lines")}</BlockTitle>
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
              <Col md="4">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="code">
                      {t("management:code_line")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: t("validate:empty") })}
                      className="form-control"
                      type="text"
                      id="code"
                      name="code"
                      disabled={disabled}
                      value={formData.code}
                      placeholder={t("management:holder_code_line")}
                      onChange={onChangeInput}
                    />
                    {errors.code && (
                      <span className="invalid">{errors.code.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="8">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("management:description")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: t("validate:empty") })}
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      disabled={disabled}
                      value={formData.name}
                      placeholder={t("management:holder_name_code_line")}
                      onChange={onChangeInput}
                    />
                    {errors.name && (
                      <span className="invalid">{errors.name.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              {isUpdate && (
                <Col size="12">
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
                          onChange={onChangeCheckbox}
                        />
                        <label className="custom-control-label" htmlFor="inactive">
                          {t("management:inactive")}
                        </label>
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              )}
            </Row>
          </div>
        </Block>
      </Form>
    </SimpleBar>
  );
};

export default AddEditForm;
