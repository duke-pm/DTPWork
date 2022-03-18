import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {
  Form,
  FormGroup,
  Spinner,
  Col,
  Row,
} from "reactstrap";
/** COMPONENTS */
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  PreviewCard,
  Button,
} from "../../components/Component";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
/** COMMON */
import SuccessCheck from "./SuccessCheck";
import ErrorCheck from "./ErrorCheck";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
/** REDUX */
import * as Actions from "../../redux/actions";

/** All init */
const INPUT_NAME = {
  EMAIL: "email",
};

const ForgotPassword = () => {
  const {t} = useTranslation();

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);

  /** Use state */
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorVal, setError] = useState("");

  /**
   ** FUNCTIONS 
   */
  const onFormSubmit = formData => {
    setError("");
    let valEmail = formData[INPUT_NAME.EMAIL].trim();
    if (valEmail !== "") {
      setLoading(true);
      let params = {
        Email: valEmail.toLowerCase(),
        Lang: commonState["language"],
      };
      dispatch(Actions.fFetchForgotPassword(params));
    }
  };

  const onCompleteSend = isSuccess => {
    if (isSuccess) {
      setSuccess(isSuccess);
    } else {
      setError(authState["errorHelperForgotPass"]);
    }
    setLoading(false);
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    setError("");
    dispatch(Actions.resetForgotPassword());
  }, []);

  useEffect(() => {
    if (loading) {
      if (!authState["submittingForgotPass"]) {
        if (authState["successForgotPass"] && !authState["errorForgotPass"]) {
          return onCompleteSend(true);
        }
        if (!authState["successForgotPass"] && authState["errorForgotPass"]) {
          return onCompleteSend(false);
        }
      }
    }
  }, [
    loading,
    authState["submittingForgotPass"],
    authState["successForgotPass"],
    authState["errorForgotPass"],
  ]);

  /**
   ** RENDER 
   */
  const {errors, register, handleSubmit} = useForm();

  return (
    <React.Fragment>
      <Head title={t("forgot_password:title")} />

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
                  <BlockTitle tag="h4">{t("forgot_password:title")}</BlockTitle>
                  <BlockDes><p>{t("forgot_password:sub_title")}</p></BlockDes>
                </BlockContent>
              </BlockHead>

              <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor={INPUT_NAME.EMAIL}>
                      {t("forgot_password:email")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      ref={register({
                        required: t("validate:empty"),
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t("validate:format_email"),
                        },
                      })}
                      className="form-control form-control-lg"
                      id={INPUT_NAME.EMAIL}
                      name={INPUT_NAME.EMAIL}
                      type={INPUT_NAME.EMAIL}
                      placeholder={t("forgot_password:holder_email")}
                      disabled={loading}
                    />
                    {errors[INPUT_NAME.EMAIL] && (
                      <span className="invalid">{errors[INPUT_NAME.EMAIL].message}</span>
                    )}
                  </div>
                </FormGroup>
                <FormGroup>
                  <Button
                    className="btn-block"
                    type="submit"
                    size="lg"
                    color="primary"
                    disabled={loading}>
                    {loading
                      ? <Spinner size="sm" color="light" />
                      : <span>{t("forgot_password:btn_send")}</span>
                    }
                  </Button>
                </FormGroup>
              </Form>
              <div className="form-note-s2 text-center pt-4">
                <Link to={loading ? "#" : `${process.env.PUBLIC_URL}/auth-login`}>
                  <span>{t("forgot_password:return_sign_in")}</span>
                </Link>
              </div>
            </PreviewCard>
          )}

          {success && !errorVal && (
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
              <Row>
                <Col lg="5" md="5" sm="4" xs="4">{SuccessCheck}</Col>
                <Col lg="7" md="7" sm="8" xs="8" className="d-flex flex-column justify-content-center">
                  <BlockHead>
                    <BlockContent className="flex-column align-items-center">
                      <BlockTitle tag="h4">{t("success:send_reset_link_title")}</BlockTitle>
                      <BlockDes>{t("success:send_reset_link_sub_title")}</BlockDes>
                    </BlockContent>
                  </BlockHead>
                </Col>
              </Row>
              
              <div className="form-note-s2 text-center pt-4">
                <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                  <span>{t("forgot_password:return_sign_in")}</span>
                </Link>
              </div>
            </PreviewCard>
          )}

          {!success && errorVal && (
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
              <Row>
                <Col lg="5" md="5" sm="4" xs="4">{ErrorCheck}</Col>
                <Col lg="7" md="7" sm="8" xs="8" className="d-flex flex-column justify-content-center">
                  <BlockHead>
                    <BlockContent className="d-flex flex-column align-items-center">
                      <BlockTitle tag="h4">{t("error:title")}</BlockTitle>
                      <BlockDes>{errorVal}</BlockDes>
                    </BlockContent>
                  </BlockHead>
                </Col>
              </Row>
            
              <div className="form-note-s2 text-center pt-4">
                <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                  <span>{t("forgot_password:return_sign_in")}</span>
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

export default ForgotPassword;
