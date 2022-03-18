import React from "react";
import {useTranslation} from "react-i18next";
import moment from "moment";
/** COMMON */
import {
  Block,
  Row,
  Col,
} from "../../../../../components/Component";
/** COMMON */
import {numberFormat} from "../../../../../utils/Utils";

function AssetInformations(props) {
  const {t} = useTranslation();
  const {
    data = {
      code: "",
      name: "",
      group: "",
      purchaseDate: "",
      originPrice: "",
      statusID: "",
      status: "",
      description: "",
    },
  } = props;

  /**
   ** RENDER
   */
  return (
    <Block>
      <div className="data-head">
        <h6 className="overline-title">{t("approved_assets:information")}</h6>
      </div>
      <div className="mt-3">
        <Row className="g-3">
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:code")}</span>
              <span className="profile-ud-value text-primary">{data?.code}</span>
            </div>
          </Col>
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:name")}</span>
              <span className="profile-ud-value">{data?.name}</span>
            </div>
          </Col>
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:group")}</span>
              <span className="profile-ud-value">{data?.group}</span>
            </div>
          </Col>
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:purchase_date")}</span>
              <span className="profile-ud-value">
                {data?.purchaseDate ? moment(data?.purchaseDate).format("DD/MM/YYYY") : "-"}
              </span>
            </div>
          </Col>
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:origin_price")}</span>
              <span className="profile-ud-value">
                {data?.originPrice ? numberFormat(data?.originPrice) : "-"}
              </span>
            </div>
          </Col>
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:status")}</span>
              <span className="profile-ud-value">
                <span
                  className={`dot bg-${
                    data?.statusID === 1
                      ? "gray"
                      : data?.statusID === 2
                        ? "success"
                        : data?.statusID === 3
                          ? "warning"
                          : (data?.statusID === 4 || data?.statusID === 5)
                            ? "danger"
                            : "primary"
                  } d-mb-none`}
                ></span>
                <span
                  className={`badge badge-sm badge-dot has-bg badge-${
                    data?.statusID === 1
                      ? "gray"
                      : data?.statusID === 2
                        ? "success"
                        : data?.statusID === 3
                          ? "warning"
                          : (data?.statusID === 4 || data?.statusID === 5)
                            ? "danger"
                            : "primary"
                  } d-none d-mb-inline-flex`}
                >
                  {data?.status}
                </span>
              </span>
            </div>
          </Col>
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:description")}</span>
              <span className="profile-ud-value">{data?.description}</span>
            </div>
          </Col>
        </Row>
      </div>
    </Block>
  )
};

export default AssetInformations;
