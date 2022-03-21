import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {
  Form,
  FormGroup,
  Spinner,
  Modal,
  ModalBody,
} from "reactstrap";
import {toast} from "react-toastify";
/** COMPONENTS */
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  PreviewCard,
} from "../../../../components/Component";
/** COMMON */
import Constants from "../../../../utils/constants";
import {log} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

function ChangePassword({history}) {
  const {t} = useTranslation();

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);

  /** Use state */
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [view, setView] = useState({
    confirm: false,
  });
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [validate, setValidate] = useState({
    newPassword: null,
    confirmPassword: null,
  });

  /**
   ** FUNCTIONS 
   */
  const togglePassState = () => setPassState(!passState);

  const toggleView = type => {
    setView({
      confirm: type === "confirm" ? true : false,
    });
  };

  const onValidate = formData => {
    let isError = false,
      tmpError = {
        newPassword: {message: ""},
        confirmPassword: {message: ""},
      };
    if (formData.newPassword.trim() === formData.oldPassword.trim()) {
      isError = true;
      tmpError.newPassword.message = t("error:new_password_same_old");
    } else {
      tmpError.newPassword = null;
    }
    if (formData.newPassword.trim() !== formData.confirmPassword.trim()) {
      isError = true;
      tmpError.confirmPassword.message = t("error:confirm_password_not_same");
    } else {
      tmpError.confirmPassword = null;
    }
    setValidate(tmpError);
    return isError;
  };

  const onFormSubmit = formData => {
    let isError = onValidate(formData);
    if (isError) return;
    setForm(formData);
    toggleView("confirm");
  };

  const onConfirm = () => {
    toggleView();
    setLoading(true);
    let params = {
      CurrentPassword: form.oldPassword.trim(),
      NewPassword: form.newPassword.trim(),
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchChangePassword(params, history));
  };

  const onSuccess = () => {
    dispatch(Actions.resetChangePassword());
    localStorage.removeItem(Constants.LS_U_P);
    localStorage.removeItem(Constants.LS_SIGN_IN);
    setLoading(false);
    toast(t("success:change_password"), {type: "success"});
    dispatch(Actions.fSignout());
    window.history.replaceState(
      "auth-login",
      "auth-login",
      process.env.PUBLIC_URL + "/auth-login",
    );
    window.location.reload();
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    setLoading(false);
    toast(error || t("error:change_password"), {type: "error"});
  };

  /**
   ** LIFE CYCLE 
   */
  useEffect(() => {
    if (loading) {
      if (!authState["submittingChangePass"]) {
        if (authState["successChangePass"] && !authState["errorChangePass"]) {
          return onSuccess();
        }
        if (!authState["successChangePass"] && authState["errorChangePass"]) {
          return onError(authState["errorHelperChangePass"]);
        }
      }
    }
  }, [
    loading,
    authState["submittingChangePass"],
    authState["successChangePass"],
    authState["errorChangePass"],
  ]);

  /**
   ** RENDER 
   */
  const {errors, register, handleSubmit} = useForm();
  return (
    <React.Fragment>
      <Head title={t("change_password:main_title")} />
      <Content>
        <Block className="nk-block-middle nk-auth-body wide-xs">
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">{t("change_password:title")}</BlockTitle>
                <BlockDes><p>{t("change_password:sub_title")}</p></BlockDes>
              </BlockContent>
            </BlockHead>
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="oldPassword">
                    {t("change_password:old_password")} <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#oldPassword"
                    onClick={togglePassState}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>
                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    ref={register({ required: t("validate:empty") })}
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    type={passState ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
                    disabled={loading}
                    placeholder={t("change_password:holder_old_password")}
                    autoComplete="12323"
                  />
                  {errors.oldPassword && (
                    <span className="invalid">{errors.oldPassword.message}</span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="newPassword">
                    {t("change_password:new_password")} <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#newPassword"
                    onClick={togglePassState}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>
                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    ref={register({ required: t("validate:empty") })}
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    type={passState ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    disabled={loading}
                    placeholder={t("change_password:holder_new_password")}
                    autoComplete="sdvdfbhfgbsdv"
                  />
                  {errors.newPassword && (
                    <span className="invalid">{errors.newPassword.message}</span>
                  )}
                  {validate.newPassword && (
                    <span className="invalid">{validate.newPassword.message}</span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="confirmPassword">
                    {t("change_password:confirm_password")} <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#confirmPassword"
                    onClick={togglePassState}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>
                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    ref={register({ required: t("validate:empty") })}
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    type={passState ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    disabled={loading}
                    placeholder={t("change_password:holder_confirm_password")}
                    autoComplete="sdvdfbhfgbsdv"
                  />
                  {errors.confirmPassword && (
                    <span className="invalid">{errors.confirmPassword.message}</span>
                  )}
                  {validate.confirmPassword && (
                    <span className="invalid">{validate.confirmPassword.message}</span>
                  )}
                </div>
              </FormGroup>

              <FormGroup>
                <Button className="btn-block" type="submit" color="primary" disabled={loading}>
                  {loading
                    ? <Spinner size="sm" color="light" />
                    : <Icon name="save" />
                  }
                  <span>{t("common:save")}</span>
                </Button>
                <div className="form-note-s2 text-center pt-4">
                  <Link to={`${process.env.PUBLIC_URL}/`}>
                    <strong>{t("common:cancel")}</strong>
                  </Link>
                </div>
              </FormGroup>
            </Form>
          </PreviewCard>
        </Block>
      </Content>

      <Modal
        className="modal-dialog-centered"
        isOpen={view.confirm}
        size="sm"
        toggle={loading ? undefined : toggleView}
      >
        <ModalBody className="modal-body-sm text-center">
          <div className="nk-modal">
            <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-alert bg-warning"></Icon>
            <h4 className="nk-modal-title">{t("change_password:confirm_title")}</h4>
            <div className="nk-modal-text">
              <div className="sub-text-sm">
                <li>{t("change_password:confirm_des_1")}</li>
                <li>{t("change_password:confirm_des_2")}</li>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="nk-modal-action mr-2">
                <Button
                  color="success"
                  size="lg"
                  disabled={loading}
                  onClick={onConfirm}
                >
                  {loading && (
                    <Spinner size="sm" color="light" />
                  )}
                  {!loading && <Icon name="check" />}
                  <span>{t("common:confirm")}</span>
                </Button>
              </div>
              <div className="nk-modal-action ml-2">
                <Button
                  color="danger"
                  size="lg"
                  disabled={loading}
                  onClick={toggleView}
                >
                  <Icon name="cross" />
                  <span>{t("common:close")}</span>
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ChangePassword;
