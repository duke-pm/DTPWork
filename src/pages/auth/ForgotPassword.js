/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {
  Form,
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
  CInput,
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

const ForgotPassword = () => {
  const {t} = useTranslation();
  const {errors, register, handleSubmit} = useForm();

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
    setLoading(true);
    let params = {
      Email: formData.email.toLowerCase(),
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchForgotPassword(params));
  };

  const onCompleteSend = isSuccess => {
    dispatch(Actions.resetForgotPassword());
    setSuccess(isSuccess);
    if (!isSuccess) {
      setError(authState["errorHelperForgotPass"]);
    }
    setLoading(false);
  };

  /**
   ** LIFE CYCLE
   */
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
                  <BlockTitle tag="h5">{t("forgot_password:title")}</BlockTitle>
                  <BlockDes><p>{t("forgot_password:sub_title")}</p></BlockDes>
                </BlockContent>
              </BlockHead>

              <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <CInput
                  id="email"
                  type="email"
                  required
                  disabled={loading}
                  icon="at"
                  leftLabel="forgot_password:email"
                  holder="forgot_password:holder_email"
                  validate={{
                    required: t("validate:empty"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("validate:format_email"),
                    },
                  }}
                  register={register}
                  errors={errors}
                />
                
                <Button
                  className="btn-block"
                  type="submit"
                  color="primary"
                  disabled={loading}>
                  {loading
                    ? <Spinner size="sm" color="light" />
                    : <span>{t("forgot_password:btn_send")}</span>
                  }
                </Button>
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
                      <BlockTitle tag="h5" className="text-success">{t("success:send_reset_link_title")}</BlockTitle>
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
                      <BlockTitle tag="h5" className="text-danger">{t("error:title")}</BlockTitle>
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
