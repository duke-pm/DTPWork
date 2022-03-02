import React from "react";
import {useTranslation} from "react-i18next";
import {Modal, ModalBody} from "reactstrap";
import moment from "moment";
/** COMPONENTS */
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockBetween,
  BlockTitle,
  DataTableHead,
  DataTableItem,
  DataTableRow,
  DataTableBody,
  Icon,
  Row,
  Col,
  Button,
} from "components/Component";
/** COMMON */
import Configs from "configs";
import Routes from "services/routesApi";
import {getCookies, numberFormat} from "utils/Utils";

function DetailsModal(props) {
  const {t} = useTranslation();
  const {
    show,
    typeRequest,
    dataRequest,
    dataDetails,
    onClose,
  } = props;

  /**
   ** FUNCTIONS
   */
  const onExportExcel = () => {
    let tmpAccessToken = getCookies("access_token");
    if (tmpAccessToken && dataRequest) {
      let params = {
        UserToken: tmpAccessToken,
        RequestID: dataRequest.requestID,
      }
      if (typeRequest === 1) {
        window.location = `${Configs.hostAPI}/${Configs.prefixAPI}${
          Routes.APPROVED.EXPORT_REQUEST_ALLOW
        }?value=${JSON.stringify(params)}`;
      } else if (typeRequest === 2) {
        window.location = `${Configs.hostAPI}/${Configs.prefixAPI}${
          Routes.APPROVED.EXPORT_REQUEST_DAMAGE
        }?value=${JSON.stringify(params)}`;
      }
    }
  };
  
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
              {typeRequest === 1 && (
                <BlockTitle tag="h4">{t("request_details:assets_title")}</BlockTitle>
              )}
              {typeRequest === 2 && (
                <BlockTitle tag="h4">{t("request_details:damage_title")}</BlockTitle>
              )}
              {typeRequest === 3 && (
                <BlockTitle tag="h4">{t("request_details:lost_title")}</BlockTitle>
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
            <h6 className="overline-title">{t("request_details:information_employee")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <div className="profile-ud plain">
                  <span className="profile-ud-label fw-bold">{t("request_details:code_employee")}</span>
                  <span className="profile-ud-value text-primary">#{dataRequest?.empCode || "-"}</span>
                </div>
              </Col>
              <Col md="6">
                <div className="profile-ud plain">
                  <span className="profile-ud-label fw-bold">{t("request_details:name_employee")}</span>
                  <span className="profile-ud-value">{dataRequest?.fullName || "-"}</span>
                </div>
              </Col>
              <Col md="6">
                <div className="profile-ud plain">
                  <span className="profile-ud-label fw-bold">{t("request_details:department_employee")}</span>
                  <span className="profile-ud-value">{dataRequest?.deptName || "-"}</span>
                </div>
              </Col>
              <Col md="6">
                <div className="profile-ud plain">
                  <span className="profile-ud-label fw-bold">{t("request_details:region_employee")}</span>
                  <span className="profile-ud-value">{dataRequest?.regionName || "-"}</span>
                </div>
              </Col>
            </Row>
          </div>
        </Block>

        {typeRequest === 1 && (
          <Block>
            <div className="data-head">
              <h6 className="overline-title">{t("request_details:information_assets_approved")}</h6>
            </div>
            <div className="mt-3">
              <Row className="g-3">
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:request_date")}</span>
                    <span className="profile-ud-value">
                      {dataRequest?.requestDate
                        ? moment(dataRequest?.requestDate).format("DD/MM/YYYY")
                        : "-"}
                    </span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:location_use")}</span>
                    <span className="profile-ud-value">{dataRequest?.locationName || "-"}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:type_buy")}</span>
                    <span className="profile-ud-value">
                      {dataRequest?.docType === "N" ? t("request_details:buy_new") : t("request_details:additional")}
                    </span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:in_planing")}</span>
                    <span className="profile-ud-value">
                      {dataRequest?.isBudget ? t("common:yes") : t("common:no")}
                    </span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{`${t("request_details:status")}`}</span>
                    <span
                      className={`dot bg-${
                        dataRequest?.statusID === 1
                          ? "gray"
                          : dataRequest?.statusID === 2
                            ? "warning"
                            : dataRequest?.statusID === 3
                              ? "success"
                              : "danger"
                      } d-mb-none`}
                    ></span>
                    <span
                      className={`badge badge-sm badge-dot has-bg badge-${
                        dataRequest?.statusID === 1
                          ? "gray"
                          : dataRequest?.statusID === 2
                            ? "warning"
                            : dataRequest?.statusID === 3
                              ? "success"
                              : "danger"
                      } d-none d-mb-inline-flex`}
                    >
                      {dataRequest?.statusName}
                    </span>
                  </div>
                </Col>
                {dataRequest?.supplierName !== "" && (
                  <Col md="6">
                    <div className="profile-ud plain">
                      <span className="profile-ud-label fw-bold">{`${t("request_details:supplier")}`}</span>
                      <span className="profile-ud-value">{dataRequest?.supplierName}</span>
                    </div>
                  </Col>
                )}
                {dataRequest?.reason !== "" && (
                  <Col md="6">
                    <div className="profile-ud plain">
                      <span className="profile-ud-label fw-bold">{`${t("request_details:reason")}`}</span>
                      <span className="profile-ud-value">{dataRequest?.reason}</span>
                    </div>
                  </Col>
                )}
                {dataDetails.length > 0 && (
                  <Col size="12">
                    <div className="profile-ud plain">
                      <span className="profile-ud-label fw-bold">{`${t("request_details:assets")}`}</span>
                      <span className="profile-ud-value">
                        <DataTableBody className="border-top" bodyclass="nk-tb-orders">
                          <DataTableHead>
                            <DataTableRow size="lg">
                              <span>{t("request_details:des_assets")}</span>
                            </DataTableRow>
                            <DataTableRow size="sm">
                              <span>{t("request_details:count_assets")}</span>
                            </DataTableRow>
                            <DataTableRow size="md">
                              <span>{t("request_details:price_assets")}</span>
                            </DataTableRow>
                            <DataTableRow size="md">
                              <span>{t("request_details:subtotal")}</span>
                            </DataTableRow>
                          </DataTableHead>

                          {dataDetails.map((itemD, indexD) => {
                            return (
                              <DataTableItem key={"_asset_item_" + indexD}>
                                <DataTableRow>
                                  <span className="tb-lead">{itemD.descr}</span>
                                </DataTableRow>
                                <DataTableRow>
                                  <span className="tb-sub tb-amount">{itemD.qty}</span>
                                </DataTableRow>
                                <DataTableRow>
                                  <span className="tb-sub tb-amount">
                                    {itemD.unitPrice
                                      ? numberFormat(itemD.unitPrice)
                                      : "-"}
                                  </span>
                                </DataTableRow>
                                <DataTableRow>
                                  <span className="tb-sub tb-amount">
                                    {itemD.totalAmt
                                      ? numberFormat(itemD.totalAmt)
                                      : "-"
                                    }
                                  </span>
                                </DataTableRow>
                              </DataTableItem>
                            );
                          })}
                        </DataTableBody>
                      </span>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          </Block>
        )}

        {typeRequest !== 1 && (
          <Block>
            <div className="data-head">
              <h6 className="overline-title">{t("request_details:information_assets")}</h6>
            </div>
            <div className="mt-3">
              <Row className="g-3">
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:code")}</span>
                    <span className="profile-ud-value text-primary">#{dataRequest?.assetID || "-"}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:name")}</span>
                    <span className="profile-ud-value">{dataRequest?.assetName || "-"}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:group")}</span>
                    <span className="profile-ud-value">{dataRequest?.assetGroupName || "-"}</span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:purchase_date")}</span>
                    <span className="profile-ud-value">
                      {dataRequest?.purchaseDate
                        ? moment(dataRequest?.purchaseDate).format("DD/MM/YYYY")
                        : "-"}
                    </span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:origin_price")}</span>
                    <span className="profile-ud-value">
                      {dataRequest?.originalPrice
                        ? numberFormat(dataRequest?.originalPrice)
                        : "-"}
                    </span>
                  </div>
                </Col>
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:status")}</span>
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
                </Col>
                <Col size="12">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:description")}:</span>
                    <span className="profile-ud-value">{dataRequest?.descr || "-"}</span>
                  </div>
                </Col>
              </Row>
            </div>
          </Block>
        )}

        {typeRequest !== 1 && (
          <Block>
          <div className="data-head">
            <h6 className="overline-title">
              {`${t("request_details:information_status")} ${
                typeRequest === 2
                  ? t("request_details:type_damage")
                  : t("request_details:type_lost")
              }`}
            </h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <div className="profile-ud plain">
                  <span className="profile-ud-label fw-bold">{`${t("request_details:status")}`}</span>
                  <span
                    className={`dot bg-${
                      dataRequest?.statusID === 1
                        ? "gray"
                        : dataRequest?.statusID === 2
                          ? "warning"
                          : dataRequest?.statusID === 3
                            ? "success"
                            : "danger"
                    } d-mb-none`}
                  ></span>
                  <span
                    className={`badge badge-sm badge-dot has-bg badge-${
                      dataRequest?.statusID === 1
                        ? "gray"
                        : dataRequest?.statusID === 2
                          ? "warning"
                          : dataRequest?.statusID === 3
                            ? "success"
                            : "danger"
                    } d-none d-mb-inline-flex`}
                  >
                    {dataRequest?.statusName}
                  </span>
                </div>
              </Col>
              <Col md="6">
                <div className="profile-ud plain">
                  <span className="profile-ud-label fw-bold">{`${t("request_details:reason")}`}</span>
                  <span className="profile-ud-value">{dataRequest?.reason || "-"}</span>
                </div>
              </Col>
              {dataRequest?.statusID === 4 && (
                <Col md="6">
                  <div className="profile-ud plain">
                    <span className="profile-ud-label fw-bold">{t("request_details:reason_reject")}:</span>
                    <span className="profile-ud-value">{dataRequest?.reasonReject || "-"}</span>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        </Block>
        )}
        {typeRequest !== 3 && (
          <div className="mt-3">
            <Row className="g-3">
              <Col size="12">
                <Button
                  color="primary"
                  type="button"
                  onClick={onExportExcel}
                >
                  <Icon name="download" />
                  <span>{t("common:export")}</span>
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </ModalBody>
    </Modal>
  );
}

export default DetailsModal;
