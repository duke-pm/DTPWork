import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {Form, FormGroup, Spinner, Alert, Col, Row} from "reactstrap";
import {
  Block, BlockContent, BlockDes, BlockHead, BlockTitle,
  Button, PreviewCard, Icon,
} from "../../components/Component";
/** COMPONENTS */
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
/** COMMON */
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";

const SvgCheckSuccess = (
  <div className="preview-icon-box card">
    <div className="preview-icon-wrap">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114 113.9">
        <path
          fill="#c4cefe"
          d="M83.84 108.24l-48.31-7.86a3.55 3.55 0 01-3.1-4l12.2-69.48a3.66 3.66 0 014.29-2.8l48.32 7.8a3.56 3.56 0 013.09 4l-12.2 69.52a3.66 3.66 0 01-4.29 2.82z"
        ></path>
        <path
          fill="#c4cefe"
          d="M29.73 103.29L74.66 96a3.41 3.41 0 002.84-3.94L65.4 22.95a3.5 3.5 0 00-4-2.82l-44.96 7.28a3.41 3.41 0 00-2.84 3.94l12.1 69.11a3.52 3.52 0 004.03 2.83z"
        ></path>
        <rect width="66" height="88" x="22" y="17.9" fill="#6576ff" rx="3" ry="3"></rect>
        <rect width="48" height="10" x="31" y="85.9" fill="#fff" rx="1.5" ry="1.5"></rect>
        <rect width="48" height="5" x="31" y="27.9" fill="#e3e7fe" rx="1" ry="1"></rect>
        <rect width="23" height="3" x="31" y="37.9" fill="#c4cefe" rx="1" ry="1"></rect>
        <rect width="20" height="3" x="59" y="37.9" fill="#c4cefe" rx="1" ry="1"></rect>
        <rect width="23" height="3" x="31" y="45.9" fill="#c4cefe" rx="1" ry="1"></rect>
        <rect width="20" height="3" x="59" y="45.9" fill="#c4cefe" rx="1" ry="1"></rect>
        <rect width="48" height="3" x="31" y="52.9" fill="#e3e7fe" rx="1" ry="1"></rect>
        <rect width="23" height="3" x="31" y="60.9" fill="#c4cefe" rx="1" ry="1"></rect>
        <path
          fill="#9cabff"
          d="M94.5 113.9a.5.5 0 01-.5-.5v-1.5h-1.5a.5.5 0 010-1H94v-1.5a.5.5 0 011 0v1.5h1.5a.5.5 0 010 1H95v1.5a.5.5 0 01-.5.5zM12.5 82.9a.5.5 0 01-.5-.5v-1.5h-1.5a.5.5 0 010-1H12v-1.5a.5.5 0 011 0v1.5h1.5a.5.5 0 010 1H13v1.5a.5.5 0 01-.5.5zM3 10.9a3 3 0 113-3 3 3 0 01-3 3zm0-5a2 2 0 102 2 2 2 0 00-2-2zM109.5 68.9a4.5 4.5 0 114.5-4.5 4.51 4.51 0 01-4.5 4.5zm0-8a3.5 3.5 0 103.5 3.5 3.5 3.5 0 00-3.5-3.5z"
        ></path>
        <path
          fill="#2ec98a"
          d="M103.66 4.95A5.66 5.66 0 0099.57.9a47.45 47.45 0 00-18.09 0 5.66 5.66 0 00-4.08 4.06 47.51 47.51 0 000 18.1 5.67 5.67 0 004.08 4.07 47.57 47.57 0 009 .87 47.78 47.78 0 009.06-.87 5.66 5.66 0 004.08-4.09 47.45 47.45 0 00.04-18.09z"
        ></path>
        <path
          fill="#fff"
          d="M96.66 10.71l-1.35 1.47c-1.9 2.06-3.88 4.21-5.77 6.3a1.29 1.29 0 01-1 .42 1.27 1.27 0 01-1-.42c-1.09-1.2-2.19-2.39-3.28-3.56a1.29 1.29 0 011.88-1.76c.78.84 1.57 1.68 2.35 2.54 1.6-1.76 3.25-3.55 4.83-5.27l1.35-1.46a1.29 1.29 0 011.9 1.74z"
        ></path>
      </svg>
    </div>
  </div>
);

const ResetPassword = () => {
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorVal, setError] = useState("a");
  const [passState, setPassState] = useState(false);

  /**
   ** FUNCTIONS 
   */
  const onFormSubmit = (formData) => {
    setLoading(true);
    const random = Math.random();
    if (random > 0.5) {
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    } else {
      setTimeout(() => {
        setError(t("error:cannot_reset_password"));
        setLoading(false);
      }, 2000);
    }
  };

  /**
   ** RENDER 
   */
  const {errors, register, handleSubmit} = useForm();

  return (
    <React.Fragment>
      <Head title="Forgot-Password" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
            </Link>
          </div>

          {!success && !errorVal && (
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
              <BlockHead>
                <BlockContent>
                  <BlockTitle tag="h5">{t("reset_password:title")}</BlockTitle>
                  <BlockDes>
                    <p>{t("reset_password:sub_title")}</p>
                  </BlockDes>
                </BlockContent>
              </BlockHead>
              <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="email">
                      {t("reset_password:password")}
                    </label>
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
                      placeholder={t("reset_password:holder_password")}
                      className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    />
                    {errors.password && <span className="invalid">{errors.password.message}</span>}
                  </div>
                </FormGroup>
                <FormGroup>
                  <Button size="lg" className="btn-block" type="submit" color="primary">
                    {loading ? <Spinner size="sm" color="light" /> : t("reset_password:btn_send")}
                  </Button>
                </FormGroup>
              </Form>
              <div className="form-note-s2 text-center pt-4">
                <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                  <strong>{t("reset_password:return_sign_in")}</strong>
                </Link>
              </div>
            </PreviewCard>
          )}

          {success && (
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
              <Row>
                <Col lg="5" md="5" sm="4" xs="4">
                  {SvgCheckSuccess}
                </Col>
                <Col lg="7" md="7" sm="8" xs="8" className="d-flex flex-column justify-content-center">
                  <BlockHead>
                    <BlockContent>
                      <BlockTitle tag="h5">{t("success:send_reset_pass_title")}</BlockTitle>
                      <BlockDes>
                        <p>{t("success:send_reset_pass_sub_title")}</p>
                      </BlockDes>
                    </BlockContent>
                  </BlockHead>
                </Col>
              </Row>
            
              <div className="form-note-s2 text-center pt-4">
                <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                  <strong>{t("reset_password:return_sign_in")}</strong>
                </Link>
              </div>
            </PreviewCard>
          )}

          {errorVal && (
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
              <BlockHead>
                <BlockContent className="d-flex flex-column align-items-center">
                  <h3 className="nk-error-title">{t("error:title")}</h3>
                  <BlockDes>
                    <p>{t("error:cannot_reset_password")}</p>
                  </BlockDes>
                  
                </BlockContent>
              </BlockHead>
            
              <div className="form-note-s2 text-center pt-4">
                <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                  <strong>{t("reset_password:return_sign_in")}</strong>
                </Link>
              </div>
            </PreviewCard>
          )}
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default ResetPassword;
