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
import Constants from "../../utils/constants";
import {encodeData, decodeData} from "utils/Utils";
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
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  })
  const [passState, setPassState] = useState(false);

  /**
   ** FUNCTIONS 
   */
  const onChangeInput = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const togglePassState = () => {
    setPassState(!passState);
  };

  const onCheckLocalStorage = () => {
    /** Check language */
    let localLanguage = localStorage.getItem(Constants.LS_LANGUAGE);
    if (localLanguage) {
      i18n.changeLanguage(localLanguage);
      dispatch(Actions.changeLanguage(localLanguage));
    }

    /** Check info sign in */
    let lEncodeSignin = localStorage.getItem(Constants.LS_U_P);
    if (lEncodeSignin && !authState["data"]["accessToken"]) {
      lEncodeSignin = decodeData(lEncodeSignin);
      setFormData({
        userName: lEncodeSignin.userName,
        password: lEncodeSignin.password,
      });
      onSubmitLogin(lEncodeSignin.userName, lEncodeSignin.password);
    } else {
      localStorage.removeItem(Constants.LS_SIGN_IN);
      setLoading({main: false, submit: false});
    }
  };

  const onForm = () => {
    let valUsername = formData.userName.trim(),
      valPassword = formData.password.trim();
    if (valUsername !== "" && valPassword !== "") {
      setLoading({...loading, submit: true});
      onSubmitLogin(valUsername, valPassword);
    } else {
      toast(t("error:wrong_username_password"), {type: "warning"});
    }
  };

  const onSubmitLogin = (userName, password) => {
    let params = {
      Username: userName,
      Password: password,
      TypeLogin: 1,
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchSignIn(params));
  };

  const onSaveLocalData = () => {
    let encodeSI = encodeData(authState["data"]);
    localStorage.setItem(Constants.LS_SIGN_IN, encodeSI);

    let encodeUP = encodeData(formData);
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
                  <label className="form-label" htmlFor="userName">
                  {t("sign_in:user_name")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    ref={register({required: t("validate:empty")})}
                    className="form-control"
                    id="userName"
                    name="userName"
                    type="text"
                    disabled={disabledInput}
                    value={formData.userName}
                    placeholder={t("sign_in:holder_user_name")}
                    onChange={onChangeInput}
                  />
                  {errors.userName && (
                    <span className="invalid">{errors.userName.message}</span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
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
                    ref={register({required: t("validate:empty")})}
                    className={`form-control ${passState
                      ? "is-hidden"
                      : "is-shown"
                    }`}
                    id="password"
                    name="password"
                    type={passState ? "text" : "password"}
                    disabled={disabledInput}
                    value={formData.password}
                    placeholder={t("sign_in:holder_password")}
                    onChange={onChangeInput}
                  />
                  {errors.password && (
                    <span className="invalid">{errors.password.message}</span>
                  )}
                </div>
              </FormGroup>
              <Button
                className="btn-block"
                type="submit"
                color="primary"
                disabled={disabledInput}
              >
                {disabledInput
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
