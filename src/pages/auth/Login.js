import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {Form, FormGroup, Spinner} from "reactstrap";
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
  Icon,
} from "../../components/Component";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
/** COMMON */
import FieldsAuth from "../../configs/fieldsAuth";
import Constants from "../../utils/constants";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
/** REDUX */
import * as Actions from "../../redux/actions";

/** All init */
const INPUT_NAME = {
  USER_NAME: "userName",
  PASSWORD: "password",
};

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
  const [passState, setPassState] = useState(false);

  /**
   ** FUNCTIONS 
   */
  const togglePassState = () => setPassState(!passState);

  const onCheckLocalStorage = () => {
    /** Check language */
    let localLanguage = localStorage.getItem(Constants.LS_LANGUAGE);
    if (localLanguage) {
      i18n.changeLanguage(localLanguage);
      dispatch(Actions.changeLanguage(localLanguage));
    }

    /** Check info sign in */
    let localSignIn = localStorage.getItem(Constants.LS_SIGN_IN);
    if (localSignIn && !authState["data"]["accessToken"]) {
      localSignIn = JSON.parse(localSignIn);
      let i, tmpDataLogin = {tokenInfo: {}, lstMenu: {}};
      for (i = 0; i < FieldsAuth.length; i++) {
        tmpDataLogin.tokenInfo[FieldsAuth[i].key] =
        localSignIn[FieldsAuth[i].value];
      }
      tmpDataLogin["lstMenu"] = localSignIn["lstMenu"];
      dispatch(Actions.fSuccessSignIn(tmpDataLogin));
      onGoToHomepage();
    }
    setLoading({main: false, submit: false});
  };

  const onForm = formData => {
    let valUsername = formData[INPUT_NAME.USER_NAME].trim(),
      valPassword = formData[INPUT_NAME.PASSWORD].trim();
    if (valUsername !== "" && valPassword !== "") {
      onSubmitLogin(valUsername, valPassword);
    } else {
      toast(t("error:wrong_username_password"), {type: "error"});
    }
  };

  const onSubmitLogin = (userName, password) => {
    setLoading({...loading, submit: true});
    let params = {
      Username: userName,
      Password: password,
      TypeLogin: 1,
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchSignIn(params));
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
    setLoading({main: false, submit: false});
    dispatch(Actions.resetSignIn());
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
          localStorage.setItem(Constants.LS_SIGN_IN, JSON.stringify(authState["data"]));
          return onGoToHomepage();
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
  const disabledInput = loading.main || loading.submit;

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
                <BlockTitle tag="h4">{t("sign_in:head_title")}</BlockTitle>
                <BlockDes>{t("sign_in:sub_title")}</BlockDes>
              </BlockContent>
            </BlockHead>

            <Form className="is-alter" onSubmit={handleSubmit(onForm)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor={INPUT_NAME.USER_NAME}>
                  {t("sign_in:user_name")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: t("validate:empty") })}
                    className="form-control-lg form-control"
                    id={INPUT_NAME.USER_NAME}
                    name={INPUT_NAME.USER_NAME}
                    type="text"
                    placeholder={t("sign_in:holder_user_name")}
                    disabled={disabledInput}
                  />
                  {errors[INPUT_NAME.USER_NAME] && (
                    <span className="invalid">{errors[INPUT_NAME.USER_NAME].message}</span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor={INPUT_NAME.PASSWORD}>
                    {t("sign_in:password")}
                  </label>
                  <Link
                    className="link link-primary link-sm"
                    to={disabledInput ? "#" : `${process.env.PUBLIC_URL}/auth-forgot`}
                  >
                    {t("sign_in:forgot_password")}
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#"
                    onClick={togglePassState}
                    className={`form-icon lg form-icon-right passcode-switch ${passState
                      ? "is-hidden"
                      : "is-shown"
                    }`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>
                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    ref={register({ required: t("validate:empty") })}
                    className={`form-control-lg form-control ${passState
                      ? "is-hidden"
                      : "is-shown"
                    }`}
                    id={INPUT_NAME.PASSWORD}
                    name={INPUT_NAME.PASSWORD}
                    type={passState ? "text" : "password"}
                    placeholder={t("sign_in:holder_password")}
                    disabled={disabledInput}
                  />
                  {errors[INPUT_NAME.PASSWORD] && (
                    <span className="invalid">{errors[INPUT_NAME.PASSWORD].message}</span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <Button
                  className="btn-block"
                  type="submit"
                  size="lg"
                  color="primary"
                  disabled={disabledInput}
                >
                  {disabledInput
                    ? <Spinner size="sm" color="light" />
                    : <span>{t("sign_in:title")}</span>
                  }
                </Button>
              </FormGroup>
            </Form>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Login;
