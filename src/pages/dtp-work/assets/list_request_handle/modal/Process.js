import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {Modal, ModalBody, Spinner} from "reactstrap";
import PerfectScrollbar from 'react-perfect-scrollbar';
/** COMPONENTS */
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockBetween,
  BlockTitle,
  UserAvatar,
  Icon,
  Row,
  Col,
} from "../../../../../components/Component";
/** COMMON */
import {findUpper} from "../../../../../utils/Utils";

const statusClassName = {
	"-1": "primary",
	0: "danger",
	1: "success",
  null: "gray",
};

function ProcessModal(props) {
  const {t} = useTranslation();
  const {
    show,
    dataRequest,
    onClose,
  } = props;

  /** Use redux */
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    request: null,
    process: [],
  });

  /**
   ** FUNCTIONS 
   */
  const onPrepareData = reuqest => {
    if (reuqest) {
      let fProcess = approvedState["listProcessApproved"].filter(f =>
        f.requestID === reuqest.requestID);
      fProcess = fProcess.sort((a, b) => a.levelApproval < b.levelApproval);
      setData({request: reuqest, process: fProcess});
    }
    setLoading(false);
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (!loading) {
      if (data.request) {
        if (dataRequest?.requestID !== data.request.requestID) {
          setLoading(true);
          onPrepareData(dataRequest);
        }
      } else {
        setLoading(true);
        onPrepareData(dataRequest);
      }
    }
  }, [
    loading,
    dataRequest,
    data.request,
  ]);

  /**
   ** RENDER
   */
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={show}
      size="lg"
      toggle={onClose}>
      <ModalBody>
        <BlockHead>
          <BlockBetween>
            <BlockHeadContent>
              {data.request?.requestTypeID === 1 && (
                <BlockTitle tag="h4">{t("approved_process:title_assets")}</BlockTitle>
              )}
              {data.request?.requestTypeID === 2 && (
                <BlockTitle tag="h4">{t("approved_process:title_damage")}</BlockTitle>
              )}
              {data.request?.requestTypeID === 3 && (
                <BlockTitle tag="h4">{t("approved_process:title_lost")}</BlockTitle>
              )}
            </BlockHeadContent>
            <a href="#cancel" className="close">
              {" "}
              <Icon name="cross-sm" onClick={onClose} />
            </a>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("approved_process:information_process")}</h6>
          </div>
          <div className="mt-3">
            {loading && (
              <div className="text-center">
                <Spinner size="sm" color="primary" />
              </div>
            )}
            {!loading && (
              <PerfectScrollbar>
                <ul className="timeline-list">
                  {data.process.length > 0 && data.process.map((itemT, indexT) => {
                    return (
                      <Row className="timeline-item" key={itemT.levelApproval + "_timeline_" + indexT}>
                        <div className={`timeline-status bg-${
                          statusClassName[itemT.statusID]} ${itemT.statusID === null ? "is-outline" : ""}`} />
                        <Col md="3">
                          {itemT.approveDate && (
                            <div className={`text-center rounded bg-${statusClassName[itemT.statusID]}-dim py-1`}>
                              <span className={`text-${statusClassName[itemT.statusID]}`}>{itemT.approveDate}</span>
                              <span className={`text-${statusClassName[itemT.statusID]}`}>{" - "}</span>
                              <span className={`text-${statusClassName[itemT.statusID]}`}>{itemT.approveTime}</span>
                            </div>
                          )}
                        </Col>
                        <Icon name="clock" />
                        <Col md="6">
                          <div className="timeline-data">
                            <div className="timeline-des">
                              <div className="profile-ud plain">
                                <span className="profile-ud-label fw-bold">{`${itemT.levelApproval === 0
                                ? t("approved_process:employee_request")
                                : t("approved_process:employee_approved")}${
                                  itemT.levelApproval !== 0
                                    ? (" (" + itemT.titleApprove + ") ")
                                    : ""}`}:</span>
                                <div className="user-card">
                                  <UserAvatar className="sm" text={findUpper(itemT.personApproveName)} />
                                  <div className="user-info">
                                    <span className="profile-ud-value text-primary fw-bold">{itemT.personApproveName}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="profile-ud plain mt-2">
                                <span className="profile-ud-label fw-bold">{t("approved_process:status")}:</span>
                                <span className="profile-ud-value">{itemT.statusName || "-"}</span>
                              </div>
                              <div className="profile-ud plain mt-2">
                                <span className="profile-ud-label fw-bold">{t("approved_process:reason")}:</span>
                                <span className="profile-ud-value">{itemT.reason || "-"}</span>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    )
                  })}
                </ul>
              </PerfectScrollbar>
            )}
          </div>
        </Block>
      </ModalBody>
    </Modal>
  )
}

export default ProcessModal;
