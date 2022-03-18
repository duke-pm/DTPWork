import React from "react";
import {useTranslation} from "react-i18next";
/** COMPONENTS */
import {
  Block,
  Row,
  Col,
} from "../../../../../components/Component";

function EmployeeInformations(props) {
  const {t} = useTranslation();
  const {
    data = {
      employeeCode: "",
      employee: "",
      position: "",
      department: "",
      region: "",
    },
  } = props;

  /**
   ** RENDER
   */
  return (
    <Block>
      <div className="data-head">
        <h6 className="overline-title">{t("approved_assets:information_employee")}</h6>
      </div>
      <div className="mt-3">
        <Row className="g-3">
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:employee_code")}</span>
              <span className="profile-ud-value text-primary">{data?.employeeCode || "-"}</span>
            </div>
          </Col>
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:employee")}</span>
              <span className="profile-ud-value">{data?.employee || "-"}</span>
            </div>
          </Col>
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:position")}</span>
              <span className="profile-ud-value">{data?.position || "-"}</span>
            </div>
          </Col>
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:department")}</span>
              <span className="profile-ud-value">{data?.department || "-"}</span>
            </div>
          </Col>
          <Col md="4">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("approved_assets:region")}</span>
              <span className="profile-ud-value">{data?.region || "-"}</span>
            </div>
          </Col>
        </Row>
      </div>
    </Block>
  )
};

export default EmployeeInformations;
