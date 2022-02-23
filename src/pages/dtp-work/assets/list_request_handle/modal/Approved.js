import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Form, FormGroup, Modal, ModalBody, Collapse} from "reactstrap";
import {toast} from "react-toastify";
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
  };

  const onFormCancel = isSuccess => {
    setDataRequest(null);
    onResetData();
    onClose(isSuccess, false);
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

  /**
   ** RENDER
   */
   const {errors, register, handleSubmit} = useForm();
   const disabled = loading.submit;
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={show}
      size="lg"
      toggle={() => onFormCancel(false)}
    >
      <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
        <ModalBody>
          <BlockHead>
            <BlockBetween>
              <BlockHeadContent>
                {dataRequest?.requestTypeID === 1 && (
                  <BlockTitle tag="h3">{t("approved_action:approved_assets")}</BlockTitle>
                )}
                {dataRequest?.requestTypeID === 2 && (
                  <BlockTitle tag="h3">{t("approved_action:approved_damage")}</BlockTitle>
                )}
                {dataRequest?.requestTypeID === 3 && (
                  <BlockTitle tag="h3">{t("approved_action:approved_lost")}</BlockTitle>
                )}
              </BlockHeadContent>
              <a href="#cancel" className="close">
                {" "}
                <Icon name="cross-sm" onClick={() => onFormCancel(false)} />
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
  );
};

export default ApprovedForm;
