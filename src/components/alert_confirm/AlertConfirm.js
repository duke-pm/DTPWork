import React from "react";
import {useTranslation} from "react-i18next";
import {Spinner, Modal, ModalBody} from "reactstrap";
/** COMPONENTS */
import {
  Icon,
  Button,
} from "components/Component";

function AlertConfirm({
  loading,
  show,
  title,
  content,
  onConfirm,
  onClose,
  ...props
}) {
  const {t} = useTranslation();

  /**
   ** RENDER
   */
  return (
    <Modal
      className="modal-sm"
      isOpen={show}
      toggle={loading ? undefined : onClose}
    >
      <ModalBody className="modal-body-sm text-center">
        <div className="nk-modal">
          <Icon className="nk-modal-icon icon-circle icon-circle-xxl ni ni-question bg-warning"></Icon>
          <h4 className="nk-modal-title">{title}</h4>
          <div className="nk-modal-text">
            <div className="sub-text-sm">
              {content}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className="nk-modal-action mr-2">
              <Button
                color="success"
                size="lg"
                disabled={loading}
                onClick={onConfirm}
              >
                {loading && (
                  <Spinner className="mr-1" size="sm" color="light" />
                )}
                <span>{t("common:ok")}</span>
              </Button>
            </div>
            <div className="nk-modal-action ml-2">
              <Button
                className="btn-dim"
                color="danger"
                size="lg"
                disabled={loading}
                onClick={onClose}
              >
                <span>{t("common:close")}</span>
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AlertConfirm;
