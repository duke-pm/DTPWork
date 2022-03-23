import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import {toast} from "react-toastify";
/** COMMON */
import {
  Block,
  Icon,
  Button,
  Row,
  Col,
} from "../../../../../components/Component";
/** COMMON */
import {log} from "../../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../../redux/actions";

function AddSupplier(props) {
  const {t} = useTranslation();
  const {errors, register, clearErrors, handleSubmit} = useForm();
  const {
    history,
    show,
    authState,
    commonState,
    onCancel,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [loading, setLoading] = useState({
    submit: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    contact: "",
    contactPhone: "",
  });

  /**
   ** FUNCTIONS 
   */
  const onChangeInput = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onFormCancel = isSuccess => {
    onResetData();
    onCancel(isSuccess);
  };

  const onResetData = () => {
    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
      contact: "",
      contactPhone: "",
    });
  };

  const onFormSubmit = () => {
    setLoading({submit: true});
    let params = {
      SupplierID: 0,
      SupplierName: formData.name.trim(),
      Address: formData.address.trim(),
      Email: formData.email.trim(),
      Phone: formData.phone.trim(),
      CnctName: formData.contact.trim(),
      CnctPhone: formData.contactPhone.trim(),

      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchCreateSupplier(params, history));
  };

  const onSuccess = () => {
    dispatch(Actions.fResetCreateAssets());
    onFormCancel(true);
  };

  const onError = error => {
    dispatch(Actions.fResetCreateAssets());
    log('[LOG] === onError ===> ', error);
    toast(error || t("error:create_supplier"), {type: "error"});
    setLoading({submit: false});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (show) clearErrors();
  }, [show]);

  useEffect(() => {
    if (loading.submit && show) {
      if (!approvedState["submittingCreateSupplier"]) {
        if (approvedState["successCreateSupplier"] && !approvedState["errorCreateSupplier"]) {
          return onSuccess();
        }
        if (!approvedState["successCreateSupplier"] && approvedState["errorCreateSupplier"]) {
          return onError(approvedState["errorHelperCreateSupplier"]);
        }
      }
    }
  }, [
    show,
    loading.submit,
    approvedState["submittingCreateSupplier"],
    approvedState["successCreateSupplier"],
    approvedState["errorCreateSupplier"],
  ]);

  /**
   ** RENDER
   */
  const disabled = loading.submit;
  return (
    <Modal
      isOpen={show}
      className="modal-dialog-centered"
      modalClassName="zoom"
      size="lg"
      toggle={() => onFormCancel(false)}>
      <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
        <ModalHeader className="fc-event-secondary" toggle={() => onFormCancel(false)}>
          {t("add_assets:create_supplier")}
        </ModalHeader>

        <ModalBody>
          <Block>
            <div className="data-head">
              <h6 className="overline-title">{t("add_assets:information")}</h6>
            </div>
            <div className="mt-3">
              <Row className="g-3">
                <Col size="12">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="name">
                        {t("add_assets:supplier_name")} <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-icon form-icon-left">
                        <Icon name="building"/>
                      </div>
                      <input
                        ref={register({ required: t("validate:empty") })}
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        disabled={disabled}
                        value={formData.name}
                        placeholder={t("add_assets:holder_supplier_name")}
                        onChange={onChangeInput}
                      />
                      {errors.name && (
                        <span className="invalid">{errors.name.message}</span>
                      )}
                    </div>
                  </FormGroup>
                </Col>
                <Col size="12">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="address">
                        {t("add_assets:supplier_address")} <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-icon form-icon-left">
                        <Icon name="location"/>
                      </div>
                      <input
                        ref={register({ required: t("validate:empty") })}
                        className="form-control"
                        type="text"
                        id="address"
                        name="address"
                        disabled={disabled}
                        value={formData.address}
                        placeholder={t("add_assets:holder_supplier_address")}
                        onChange={onChangeInput}
                      />
                      {errors.address && (
                        <span className="invalid">{errors.address.message}</span>
                      )}
                    </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="email">
                        {t("add_assets:supplier_email")}
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-icon form-icon-left">
                        <Icon name="mail"/>
                      </div>
                      <input
                        ref={register({
                          pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: t("validate:format_email"),
                          },
                        })}
                        className="form-control"
                        type="email"
                        id="email"
                        name="email"
                        disabled={disabled}
                        value={formData.email}
                        placeholder={t("add_assets:holder_supplier_email")}
                        onChange={onChangeInput}
                      />
                      {errors.email && (
                        <span className="invalid">{errors.email.message}</span>
                      )}
                    </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="phone">
                        {t("add_assets:supplier_phone")}
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-icon form-icon-left">
                        <Icon name="call"/>
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        id="phone"
                        name="phone"
                        disabled={disabled}
                        value={formData.phone}
                        placeholder={t("add_assets:holder_supplier_phone")}
                        onChange={onChangeInput}
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="contact">
                        {t("add_assets:supplier_contact")} <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-icon form-icon-left">
                        <Icon name="user"/>
                      </div>
                      <input
                        ref={register({ required: t("validate:empty") })}
                        className="form-control"
                        type="text"
                        id="contact"
                        name="contact"
                        disabled={disabled}
                        value={formData.contact}
                        placeholder={t("add_assets:holder_supplier_contact")}
                        onChange={onChangeInput}
                      />
                      {errors.contact && (
                        <span className="invalid">{errors.contact.message}</span>
                      )}
                    </div>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <div className="form-label-group">
                      <label className="form-label" htmlFor="contactPhone">
                        {t("add_assets:supplier_contact_phone")}
                      </label>
                    </div>
                    <div className="form-control-wrap">
                      <div className="form-icon form-icon-left">
                        <Icon name="call"/>
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        id="contactPhone"
                        name="contactPhone"
                        disabled={disabled}
                        value={formData.contactPhone}
                        placeholder={t("add_assets:holder_supplier_contact_phone")}
                        onChange={onChangeInput}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Block>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            disabled={disabled}
          >
            {disabled && <Spinner size="sm" color="light" />}
            {!disabled && <Icon name="save" />}
            <span>{t("common:save")}</span>
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
};

export default AddSupplier;
