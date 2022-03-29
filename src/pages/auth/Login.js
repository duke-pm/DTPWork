/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {Form, Spinner} from "reactstrap";
import {toast} from "react-toastify";
/** COMPONENTS */
import {
  Block,
  BlockHead,
  BlockContent,
  BlockTitle,
  BlockDes,
  PreviewCard,
  Button,
  CInput,
} from "../../components/Component";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
/** COMMON */
import Constants from "../../utils/constants";
import {encodeData, decodeData} from "utils/Utils";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
/** REDUX */
import * as Actions from "../../redux/actions";

const Login = () => {
  const {t, i18n} = useTranslation();

  /** Use redux */
  const dispatch = useDispatch();
  const authState = useSelector(({auth}) => auth);
  const commonState = useSelector(({common}) => common);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  /**
   ** FUNCTIONS 
   */
  const onCheckLocalStorage = () => {
    /** Check language */
    let localLanguage = localStorage.getItem(Constants.LS_LANGUAGE);
    if (localLanguage) {
      i18n.changeLanguage(localLanguage);
      dispatch(Actions.changeLanguage(localLanguage));
    }

    /** Check theme */
    let localTheme = localStorage.getItem(Constants.LS_THEME);
    if (localTheme) {
      dispatch(Actions.changeTheme(localTheme));
    }

    /** Check info sign in */
    let lEncodeSignin = localStorage.getItem(Constants.LS_U_P);
    if (lEncodeSignin && !authState["data"]["accessToken"]) {
      lEncodeSignin = decodeData(lEncodeSignin);
      onSubmitLogin(lEncodeSignin.userName, lEncodeSignin.password);
    } else {
      localStorage.removeItem(Constants.LS_SIGN_IN);
      setLoading({main: false, submit: false});
    }
  };

  const onPrepareForm = formData => {
    setLoading({...loading, submit: true});
    onSubmitLogin(formData.userName, formData.password);
  };

  const onSubmitLogin = (userName, password) => {
    setForm({userName, password});
    let params = {
      Username: userName,
      Password: password,
      TypeLogin: 1, // for WEB(1), MOBILE(2)
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchSignIn(params));
  };

  const onSaveLocalData = () => {
    let encodeSI = encodeData(authState["data"]);
    localStorage.setItem(Constants.LS_SIGN_IN, encodeSI);

    let encodeUP = encodeData(form);
    localStorage.setItem(Constants.LS_U_P, encodeUP);

    onGoToHomepage();
  };

  const onGoToHomepage = () => {
    window.history.replaceState(
      `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
      "auth-login",
      `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
    );
    window.location.reload();
  };

  const onSignInError = error => {
    toast(error, {type: "error"});
    if (form.userName) {
      setForm({userName: "", password: ""});
    }
    dispatch(Actions.resetSignIn());
    setLoading({main: false, submit: false});
  };

  /**
   ** LIFE CYCLE 
   */
  useEffect(() => {
    onCheckLocalStorage();
  }, []);

  useEffect(() => {
    if (loading.main || loading.submit) {
      if (!authState["submitting"]) {
        if (authState["successSignIn"] && !authState["errorSignIn"]) {
          return onSaveLocalData();
        }

        if (!authState["successSignIn"] && authState["errorSignIn"]) {
          return onSignInError(authState["errorHelperSignIn"]);
        }
      }
    }
  }, [
    loading.main,
    loading.submit,
    authState["submitting"],
    authState["successSignIn"],
    authState["errorSignIn"]
  ]);
  
  /**
   ** RENDER 
   */
  const {errors, register, handleSubmit} = useForm();
  const disabled = loading.main || loading.submit;

  return (
    <React.Fragment>
      <Head title={t("sign_in:title")} />

      <PageContainer>
        <Block className="nk-block-middle nk-auth-body wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>

          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h5">{t("sign_in:head_title")}</BlockTitle>
                <BlockDes>{t("sign_in:sub_title")}</BlockDes>
              </BlockContent>
            </BlockHead>

            <Form className="is-alter" onSubmit={handleSubmit(onPrepareForm)}>
              <CInput
                id="userName"
                type="text"
                required
                disabled={disabled}
                leftLabel="sign_in:user_name"
                holder="sign_in:holder_user_name"
                validate={{required: t("validate:empty")}}
                register={register}
                errors={errors}
              />

              <CInput
                id="password"
                type="text"
                password
                required
                disabled={disabled}
                leftLabel="sign_in:password"
                rightLabel={
                  <Link
                    className="link link-primary link-sm"
                    to={disabled ? undefined : `${process.env.PUBLIC_URL}/auth-forgot`}>
                    {t("sign_in:forgot_password")}
                  </Link>
                }
                holder="sign_in:holder_password"
                validate={{required: t("validate:empty")}}
                register={register}
                errors={errors}
              />

              <Button
                className="btn-block"
                type="submit"
                color="primary"
                disabled={disabled}>
                {disabled
                  ? <Spinner size="sm" color="light" />
                  : <span>{t("sign_in:title")}</span>
                }
              </Button>
            </Form>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
