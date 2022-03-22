import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Link, useParams} from "react-router-dom";
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
import SuccessCheck from "./SuccessCheck";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
/** REDUX */
import * as Actions from "../../redux/actions";

/** All init */
const INPUT_NAME = {
  PASSWORD: "password",
};

const ResetPassword = () => {
  const {t} = useTranslation();
  const {tokenData} = useParams();

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);

  /** Use state */
  const [loading, setLoading] = useState({
    check: false,
    submit: false,
  });
  const [success, setSuccess] = useState(false);
  const [errorVal, setError] = useState("a");
  const [passState, setPassState] = useState(false);

  /**
   ** FUNCTIONS 
   */
  const onCheckTokenExpired = () => {
    let params = {
      Token: tokenData || "not_token",
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchCheckTokenPassword(params));
    setLoading({...loading, check: true});
  };

  const onFormSubmit = formData => {
    setError("");
    let valPassword = formData[INPUT_NAME.PASSWORD].trim();
    if (valPassword !== "") {
      setLoading({...loading, submit: true});
      let params = {
        Lang: commonState["language"],
        TokenData: tokenData || "not_token",
        NewPassword: valPassword,
      };
      dispatch(Actions.fFetchResetPassword(params));
    }
  };

  const onCompleteCheck = isSuccess => {
    if (!isSuccess) {
      setError(authState["errorHelperCheckTokenPass"]);
    }
    setLoading({...loading, check: false});
  };

  const onCompleteChange = (status, message) => {
    if (status) {
      setSuccess(true);
    } else {
      setError(message || t("error:cannot_reset_password"));
    }
    setLoading({check: false, submit: false});
  };

  /**
   ** LIFE CYCLE
   */
   useEffect(() => {
    setError("");
    dispatch(Actions.resetResetPassword());
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
  const {errors, register, handleSubmit} = useForm();
  const disabledInput = loading.check || loading.submit;

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
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor={INPUT_NAME.PASSWORD}>
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
                      ref={register({ required: t("validate:empty") })}
                      className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                      type={passState ? "text" : "password"}
                      id={INPUT_NAME.PASSWORD}
                      name={INPUT_NAME.PASSWORD}
                      placeholder={t("reset_password:holder_password")}
                      disabled={disabledInput}
                    />
                    {errors[INPUT_NAME.PASSWORD] && (
                      <span className="invalid">{errors[INPUT_NAME.PASSWORD].message}</span>
                    )}
                  </div>
                </FormGroup>
                <Button
                  className="btn-block"
                  type="submit"
                  color="primary"
                  disabled={disabledInput}>
                  {(loading.check || loading.submit)
                    ? <Spinner size="sm" color="light" />
                    : t("reset_password:btn_send")
                  }
                </Button>
              </Form>
              <div className="form-note-s2 text-center pt-4">
                <Link to={disabledInput ? "#" : `${process.env.PUBLIC_URL}/auth-login`}>
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
                      <BlockTitle tag="h4" className="text-success">{t("success:send_reset_pass_title")}</BlockTitle>
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
                  <BlockTitle tag="h4" className="text-danger">{t("error:title")}</BlockTitle>
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
