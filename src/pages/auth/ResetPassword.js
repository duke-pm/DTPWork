/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Link, useParams} from "react-router-dom";
import {
  Form,
  Spinner,
  Col,
  Row,
} from "reactstrap";
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
import SuccessCheck from "./SuccessCheck";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
/** REDUX */
import * as Actions from "../../redux/actions";

const ResetPassword = () => {
  const {t} = useTranslation();
  const {tokenData} = useParams();
  const {errors, register, handleSubmit} = useForm();

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);

  /** Use state */
  const [loading, setLoading] = useState({
    check: true,
    submit: false,
  });
  const [success, setSuccess] = useState(false);
  const [errorVal, setError] = useState("a");

  /**
   ** FUNCTIONS 
   */
  const onCheckTokenExpired = () => {
    if (tokenData) {
      let params = {
        Token: tokenData,
        Lang: commonState["language"],
      };
      dispatch(Actions.fFetchCheckTokenPassword(params));
    } else {
      onCompleteCheck(false, t("error:cannot_reset_password"));
    }
  };

  const onFormSubmit = formData => {
    setError("");
    setLoading({...loading, submit: true});
    let params = {
      TokenData: tokenData,
      NewPassword: formData.password,
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchResetPassword(params));
  };

  const onCompleteCheck = (isSuccess, message) => {
    dispatch(Actions.resetResetPassword());
    if (!isSuccess) {
      setError(message || authState["errorHelperCheckTokenPass"]);
    }
    setLoading({...loading, check: false});
  };

  const onCompleteChange = (isSuccess, message) => {
    dispatch(Actions.resetResetPassword());
    setSuccess(isSuccess);
    if (!isSuccess) {
      setError(message || t("error:cannot_reset_password"));
    }
    setLoading({check: false, submit: false});
  };

  /**
   ** LIFE CYCLE
   */
   useEffect(() => {
    onCheckTokenExpired();
  }, []);

  useEffect(() => {
    if (loading.check) {
      if (!authState["submittingCheckTokenPass"]) {
        if (authState["successCheckTokenPass"] && !authState["errorCheckTokenPass"]) {
          return onCompleteCheck(true);
        }

        if (!authState["successCheckTokenPass"] && authState["errorCheckTokenPass"]) {
          return onCompleteCheck(false);
        }
      }
    }
  }, [
    loading.check,
    authState["submittingCheckTokenPass"],
    authState["successCheckTokenPass"],
    authState["errorCheckTokenPass"],
  ]);

  useEffect(() => {
    if (loading.submit) {
      if (!authState["submittingUpdatePass"]) {
        if (authState["successUpdatePass"] && !authState["errorUpdatePass"]) {
          return onCompleteChange(true);
        }

        if (!authState["successUpdatePass"] && authState["errorUpdatePass"]) {
          return onCompleteChange(
            false,
            typeof authState["errorHelperUpdatePass"] === "string"
              ? authState["errorHelperUpdatePass"]
              : null,
          );
        }
      }
    }
  }, [
    loading.submit,
    authState["submittingUpdatePass"],
    authState["successUpdatePass"],
    authState["errorUpdatePass"],
  ]);

  /**
   ** RENDER 
   */
  const disabled = loading.check || loading.submit;
  return (
    <React.Fragment>
      <Head title={t("reset_password:title")} />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body wide-xs">
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
                  <BlockDes><p>{t("reset_password:sub_title")}</p></BlockDes>
                </BlockContent>
              </BlockHead>
              <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
                <CInput
                  id="password"
                  type="text"
                  password
                  required
                  disabled={disabled}
                  leftLabel="reset_password:password"
                  holder="reset_password:holder_password"
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
                    : <span>{t("reset_password:btn_send")}</span>
                  }
                </Button>
              </Form>
              <div className="form-note-s2 text-center pt-4">
                <Link to={disabled ? "#" : `${process.env.PUBLIC_URL}/auth-login`}>
                  <strong>{t("reset_password:return_sign_in")}</strong>
                </Link>
              </div>
            </PreviewCard>
          )}

          {success && (
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
              <Row>
                <Col lg="5" md="5" sm="4" xs="4">{SuccessCheck}</Col>
                <Col lg="7" md="7" sm="8" xs="8" className="d-flex flex-column justify-content-center">
                  <BlockHead>
                    <BlockContent>
                      <BlockTitle tag="h5" className="text-success">{t("success:send_reset_pass_title")}</BlockTitle>
                      <BlockDes>{t("success:send_reset_pass_sub_title")}</BlockDes>
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
                  <BlockTitle tag="h5" className="text-danger">{t("error:title")}</BlockTitle>
                  <BlockDes>{errorVal}</BlockDes>
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
