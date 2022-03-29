/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {
  Form,
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
  CInput,
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
      CurrentPassword: form.oldPassword,
      NewPassword: form.newPassword,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchChangePassword(params, history));
  };

  const onSuccess = () => {
    dispatch(Actions.resetChangePassword());
    localStorage.removeItem(Constants.LS_U_P);
    localStorage.removeItem(Constants.LS_SIGN_IN);
    dispatch(Actions.fSignout());
    toast(t("success:change_password"), {type: "success"});
    setLoading(false);
    window.history.replaceState(
      "auth-login",
      "auth-login",
      process.env.PUBLIC_URL + "/auth-login",
    );
    window.location.reload();
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    dispatch(Actions.resetChangePassword());
    toast(error || t("error:change_password"), {type: "error"});
    setLoading(false);
  };

  /**
   ** LIFE CYCLE 
   */
  useEffect(() => {
    dispatch(Actions.toggleShowSidebar());
    return () => {
      dispatch(Actions.toggleShowSidebar());
    }
  }, []);

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
                <BlockTitle tag="h5">{t("change_password:title")}</BlockTitle>
                <BlockDes><p>{t("change_password:sub_title")}</p></BlockDes>
              </BlockContent>
            </BlockHead>
            
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <CInput
                id="oldPassword"
                type="text"
                password
                required
                disabled={loading}
                leftLabel="change_password:old_password"
                holder="change_password:holder_old_password"
                validate={{required: t("validate:empty")}}
                register={register}
                errors={errors}
                errorsCustom={validate}
              />
              <CInput
                id="newPassword"
                type="text"
                password
                required
                disabled={loading}
                leftLabel="change_password:new_password"
                holder="change_password:holder_new_password"
                validate={{required: t("validate:empty")}}
                register={register}
                errors={errors}
                errorsCustom={validate}
              />
              <CInput
                id="confirmPassword"
                type="text"
                password
                required
                disabled={loading}
                leftLabel="change_password:confirm_password"
                holder="change_password:holder_confirm_password"
                validate={{required: t("validate:empty")}}
                register={register}
                errors={errors}
                errorsCustom={validate}
              />

              <Button
                className="btn-block"
                type="submit"
                color="primary"
                disabled={loading}>
                {loading
                  ? <Spinner size="sm" color="light" />
                  : <Icon name="save" />
                }
                <span>{t("common:save")}</span>
              </Button>
              
              <div className="form-note-s2 text-center pt-4">
                <Link to={`${process.env.PUBLIC_URL}/`}>
                  <strong>{t("common:close")}</strong>
                </Link>
              </div>
            </Form>
          </PreviewCard>
        </Block>
      </Content>

      <Modal
        isOpen={view.confirm}
        className="modal-dialog-centered"
        modalClassName="zoom"
        size="sm"
        toggle={loading ? undefined : toggleView}>
        <ModalBody className="modal-body-sm text-center">
          <div className="nk-modal">
            <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-alert bg-warning"/>
            <h4 className="nk-modal-title">{t("change_password:confirm_title")}</h4>
            <div className="nk-modal-text">
              <div className="sub-text-sm d-flex flex-column align-items-start">
                <li>{t("change_password:confirm_des_1")}</li>
                <li>{t("change_password:confirm_des_2")}</li>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="nk-modal-action mr-2">
                <Button
                  color="success"
                  disabled={loading}
                  onClick={onConfirm}>
                  {loading && <Spinner size="sm" color="light" />}
                  {!loading && <Icon name="check" />}
                  <span>{t("common:confirm")}</span>
                </Button>
              </div>
              <div className="nk-modal-action ml-2">
                <Button
                  className="btn-dim"
                  color="danger"
                  disabled={loading}
                  onClick={toggleView}>
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
