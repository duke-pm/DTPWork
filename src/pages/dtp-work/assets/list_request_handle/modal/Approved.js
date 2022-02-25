import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Form, FormGroup, Modal, ModalBody, Collapse} from "reactstrap";
import moment from "moment";
/** COMMON */
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  BlockBetween,
  Row,
  Col,
} from "components/Component";
/** COMMON */
import { numberFormat } from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";

function ApprovedForm(props) {
  const {t} = useTranslation();
  const {
    history,
    show,
    authState,
    commonState,
    updateItem,
    onClose,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [loading, setLoading] = useState({
    submit: false,
  });
  const [view, setView] = useState({
    confirm: false,
  });
  const [error, setError] = useState({
    reason: null,
  });
  const [dataRequest, setDataRequest] = useState(null);
  const [formData, setFormData] = useState({
    approved: 1,
    reason: "",
  });

  /**
   ** FUNCTIONS 
   */
  const toggleConfirm = () => {
    setView({...view, confirm: !view.confirm});
  };

  const onChangeInput = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onChangeRadio = val => {
    setFormData({...formData, approved: val});
  };

  const onResetData = () => {
    setFormData({reason: "", approved: 1});
  };

  const onFormSubmit = () => {
    setError({reason: null});
    if (formData.approved === 2 && formData.reason.trim() === "") {
      return setError({reason: {message: t("validate:empty")}});
    }
    toggleConfirm();
  };

  const onConfirm = () => {
    setLoading({submit: true});
    let params = {
      RequestID: dataRequest?.requestID,
      RequestTypeID: dataRequest?.requestTypeID,
      PersonRequestID: dataRequest?.personRequestID,
      Status: formData.approved === 1 ? true : false,
      Reason: formData.approved === 1 ? "" : formData.reason,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchApprovedRequest(params, history));
  };

  const onFormCancel = isSuccess => {
    setDataRequest(null);
    onResetData();
    onClose(isSuccess, false);
  };

  const onSuccess = () => {
    onClose(true, true, formData.approved === 1
      ? t("success:approved_request")
      : t("success:reject_request"));
    onDone();
  };

  const onError = (message) => {
    onClose(false, true, message);
    onDone();
  };

  const onDone = () => {
    dispatch(Actions.fResetApprovedRequest());
    toggleConfirm();
    onResetData();
    setDataRequest(null);
    setLoading({submit: false});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (updateItem && show) {
      setDataRequest(updateItem);
    }
  }, [
    show,
    updateItem,
  ]);

  useEffect(() => {
    if (loading.submit) {
      if (!approvedState["submittingApprovedRequest"]) {
        if (approvedState["successApprovedRequest"] && !approvedState["errorApprovedRequest"]) {
          return onSuccess();
        }
        if (!approvedState["successApprovedRequest"] && approvedState["errorApprovedRequest"]) {
          return onError(approvedState["errorHelperApprovedRequest"]);
        }
      }
    }
  }, [
    loading.submit,
    approvedState["submittingApprovedRequest"],
    approvedState["successApprovedRequest"],
    approvedState["errorApprovedRequest"],
  ]);

  /**
   ** RENDER
   */
   const {handleSubmit} = useForm();
   const disabled = loading.submit;
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={show}
        size="lg"
        toggle={() => disabled ? null : onFormCancel(false)}
      >
        <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
          <ModalBody>
            <BlockHead>
              <BlockBetween>
                <BlockHeadContent>
                  {dataRequest?.requestTypeID === 1 && (
                    <BlockTitle tag="h4">{t("approved_action:approved_assets")}</BlockTitle>
                  )}
                  {dataRequest?.requestTypeID === 2 && (
                    <BlockTitle tag="h4">{t("approved_action:approved_damage")}</BlockTitle>
                  )}
                  {dataRequest?.requestTypeID === 3 && (
                    <BlockTitle tag="h4">{t("approved_action:approved_lost")}</BlockTitle>
                  )}
                </BlockHeadContent>
                <a href="#cancel" className="close">
                  {" "}
                  <Icon name="cross-sm" onClick={() => disabled ? null : onFormCancel(false)} />
                </a>
              </BlockBetween>
            </BlockHead>

            <div className="nk-divider divider md"></div>

            <Block>
              <BlockHead>
                <BlockTitle tag="h6">{t("approved_action:information")}</BlockTitle>
              </BlockHead>
              <div className="profile-ud-list">
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("approved_action:code_assets")}</span>
                    <span className="profile-ud-value text-primary">{dataRequest?.assetCode || "-"}</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("approved_action:name_assets")}</span>
                    <span className="profile-ud-value">{dataRequest?.assetName || "-"}</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("approved_action:group_assets")}</span>
                    <span className="profile-ud-value">{dataRequest?.assetGroupName || "-"}</span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("approved_action:purchase_date_assets")}</span>
                    <span className="profile-ud-value">
                      {dataRequest?.purchaseDate
                        ? moment(dataRequest?.purchaseDate).format("DD/MM/YYYY")
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("approved_action:origin_price_assets")}</span>
                    <span className="profile-ud-value">
                      {dataRequest?.originalPrice
                        ? numberFormat(dataRequest?.originalPrice)
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="profile-ud-item">
                  <div className="profile-ud wider">
                    <span className="profile-ud-label">{t("approved_action:status_assets")}</span>
                    <span className="profile-ud-value">
                      <span
                        className={`dot bg-${
                          dataRequest?.assetStatusID === 1
                            ? "gray"
                            : dataRequest?.assetStatusID === 2
                              ? "success"
                              : dataRequest?.assetStatusID === 3
                                ? "warning"
                                : (dataRequest?.assetStatusID === 4 || dataRequest?.assetStatusID === 5)
                                  ? "danger"
                                  : "primary"
                        } d-mb-none`}
                      ></span>
                      <span
                        className={`badge badge-sm badge-dot has-bg badge-${
                          dataRequest?.assetStatusID === 1
                            ? "gray"
                            : dataRequest?.assetStatusID === 2
                              ? "success"
                              : dataRequest?.assetStatusID === 3
                                ? "warning"
                                : (dataRequest?.assetStatusID === 4 || dataRequest?.assetStatusID === 5)
                                  ? "danger"
                                  : "primary"
                        } d-none d-mb-inline-flex`}
                      >
                        {dataRequest?.assetStatusName}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Block>

            <div className="nk-divider divider md"></div>

            <Block>
              <BlockHead>
                <BlockTitle tag="h6">{t("approved_action:information_approved")}</BlockTitle>
              </BlockHead>
              <Row className="g-3">
                <Col size="3" />
                <Col size="3">
                  <div className="preview-block">
                    <div className="custom-control custom-radio">
                      <input
                        className="custom-control-input form-control"
                        type="radio"
                        id="radioApproved"
                        name="radioApproved"
                        disabled={disabled}
                        checked={formData.approved === 1}
                        onChange={() => onChangeRadio(1)}
                      />
                      <label
                        className={`custom-control-label ${formData.approved === 1 && "fw-bold"}`}
                        htmlFor="radioApproved">
                        {t("common:approved")}
                      </label>
                    </div>
                  </div>
                </Col>
                <Col size="3">
                  <div className="preview-block">
                    <div className="custom-control custom-radio">
                      <input
                        className="custom-control-input form-control"
                        type="radio"
                        id="radioReject"
                        name="radioReject"
                        disabled={disabled}
                        checked={formData.approved === 2}
                        onChange={() => onChangeRadio(2)}
                      />
                      <label
                        className={`custom-control-label ${formData.approved === 2 && "fw-bold"}`}
                        htmlFor="radioReject">
                        {t("common:reject")}
                      </label>
                    </div>
                  </div>
                </Col>
                <Col size="3" />
                <Col size="12">
                  <Collapse isOpen={formData.approved === 2}>
                    <FormGroup>
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="reason">
                          {t("approved_action:confirm_reject_des")} <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <textarea
                          className="no-resize form-control"
                          type="text"
                          id="reason"
                          name="reason"
                          disabled={disabled}
                          value={formData.reason}
                          placeholder={t("approved_action:holder_confirm_reject_des")}
                          onChange={onChangeInput}
                        />
                        {error.reason && (
                          <span className="invalid">{error.reason.message}</span>
                        )}
                      </div>
                    </FormGroup>
                  </Collapse>
                  <div className="nk-divider divider sm"></div>
                </Col>

                <Col size="12">
                  <Button
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    <Icon name="send" />
                    <span>{t("common:send")}</span>
                  </Button>
                </Col>
              </Row>
            </Block>
          </ModalBody>
        </Form>
      </Modal>

      <Modal
        className="modal-dialog-centered"
        isOpen={view.confirm}
        size="sm"
        toggle={disabled ? undefined : toggleConfirm}
      >
        <ModalBody className="modal-body-sm text-center">
          <div className="nk-modal">
            <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-alert bg-warning"></Icon>
            <h4 className="nk-modal-title">{t("approved_action:confirm_approved_title")}</h4>
            <div className="nk-modal-text">
              {formData.approved === 1 && (
                <div className="caption-text">
                  {t("approved_action:confirm_approved_des_1")}
                  <span className="fw-bold">{dataRequest?.requestTypeID === 1
                    ? t("approved_action:confirm_approved_assets_des_2")
                    : dataRequest?.requestTypeID === 2
                      ? t("approved_action:confirm_approved_damage_des_2")
                      : t("approved_action:confirm_approved_lost_des_2")}{dataRequest?.requestID}
                  </span>{t("approved_action:confirm_approved_des_3")}
                  <span className="fw-bold">{dataRequest?.fullName}</span>?
                </div>
              )}
              {formData.approved === 2 && (
                <div className="caption-text">
                  {t("approved_action:confirm_reject_des_1")}
                  <span className="fw-bold">{dataRequest?.requestTypeID === 1
                    ? t("approved_action:confirm_approved_assets_des_2")
                    : dataRequest?.requestTypeID === 2
                      ? t("approved_action:confirm_approved_damage_des_2")
                      : t("approved_action:confirm_approved_lost_des_2")}{dataRequest?.requestID}
                  </span>{t("approved_action:confirm_approved_des_3")}
                  <span className="fw-bold">{dataRequest?.fullName}</span>?
                </div>
              )}
              {formData.approved === 2 && (
                <span className="sub-text-sm">
                  {`${t("approved_action:confirm_reject_des")}: ${formData.reason}.`}
                </span>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <div className="nk-modal-action mr-2">
                <Button
                  color="primary"
                  size="lg"
                  disabled={disabled}
                  onClick={onConfirm}
                >
                  {disabled && (
                    <div className="spinner-border spinner-border-sm text-white" role="status" />
                  )}
                  {!disabled && <Icon name="check" />}
                  <span>{t("common:confirm")}</span>
                </Button>
              </div>
              <div className="nk-modal-action ml-2">
                <Button
                  color="gray"
                  size="lg"
                  disabled={disabled}
                  onClick={toggleConfirm}
                >
                  <Icon name="cross" />
                  <span>{t("common:close")}</span>
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ApprovedForm;
