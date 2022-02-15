import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {
  Block, BlockContent, BlockDes, BlockHead, BlockTitle,
  Button, Icon, PreviewCard,
} from "../../components/Component";
import {Form, FormGroup, Spinner, Alert} from "reactstrap";
/** COMPONENTS */
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
/** COMMON */
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";

const Login = () => {
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

  const onFormSubmit = (formData) => {
    setLoading(true);
    const loginName = "info@softnio.com";
    const pass = "123456";

    if (formData.name === loginName && formData.passcode === pass) {
      localStorage.setItem("accessToken", "token");
      setTimeout(() => {
        window.history.pushState(
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`,
          "auth-login",
          `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/"}`
        );
        window.location.reload();
      }, 2000);
    } else {
      setTimeout(() => {
        setError(t("error:wrong_username_password"));
        setLoading(false);
      }, 2000);
    }
  };

  const {errors, register, handleSubmit} = useForm();

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
                <BlockDes>
                  <p>{t("sign_in:sub_title")}</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> {errorVal}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="user-name">
                  {t("sign_in:user_name")}
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: t("validate:empty") })}
                    className="form-control-lg form-control"
                    id="user-name"
                    name="name"
                    type="text"
                    // defaultValue="info@softnio.com"
                    placeholder={t("sign_in:holder_user_name")}
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    {t("sign_in:password")}
                  </label>
                  <Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-forgot`}>
                    {t("sign_in:forgot_password")}
                  </Link>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>
                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="password"
                    // defaultValue="123456"
                    ref={register({ required: t("validate:empty") })}
                    placeholder={t("sign_in:holder_password")}
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : t("sign_in:title")}
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
