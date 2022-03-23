import React from "react";
import {useTranslation} from "react-i18next";
import {
  Spinner,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
/** COMPONENTS */
import {
  Icon,
  Button,
} from "../Component";

function AlertConfirm({
  loading,
  show,
  title,
  content,
  onConfirm,
  onClose,
}) {
  const {t} = useTranslation();

  /**
   ** RENDER
   */
  return (
    <Modal
      isOpen={show}
      className="modal-dialog-centered"
      modalClassName="zoom"
      size="sm"
      toggle={loading ? undefined : onClose}>
      <ModalHeader className="fc-event-secondary" toggle={loading ? undefined : onClose}>
        {title}
      </ModalHeader>
      <ModalBody className="modal-body-sm text-center">
        <div className="nk-modal">
          <Icon className="nk-modal-icon icon-circle-xxl ni ni-question"></Icon>
          <div className="mt-4">
            <span>{content}</span>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          disabled={loading}
          onClick={onConfirm}>
          {loading && <Spinner size="sm" color="light" />}
          {!loading && <Icon name="check" />}
          <span>{t("common:confirm")}</span>
        </Button>
        <Button
          className="btn-dim"
          color="danger"
          disabled={loading}
          onClick={onClose}>
          <Icon name="cross" />
          <span>{t("common:close")}</span>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AlertConfirm;
