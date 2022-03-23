import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";
import moment from "moment";
/** COMPONENTS */
import {
  DataTableHead,
  DataTableItem,
  DataTableRow,
  DataTableBody,
  Icon,
  UserAvatar,
} from "../../../../../components/Component";
/** COMMON */
import Configs from "../../../../../configs";
import {findUpper} from "../../../../../utils/Utils";

function TableRequestHandle(props) {
  const {t} = useTranslation();
  const {
    loading,
    isWrite,
    dataRequest,
    onApproved,
    onProcess,
  } = props;

  /** Use state */
  const [data, setData] = useState(dataRequest);

  /**
   ** FUNCTIONS
   */
  const onDownload = fileDir => {
    window.open(`${Configs.hostAPI}/${fileDir}`, "_blank");
  };

   /**
   ** LIFE CYCLE
   */
   useEffect(() => {
    setData(dataRequest);
  }, [dataRequest]);

  /**
   ** RENDER
   */
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow>
          <span className="fw-bold">{t("request_handle:code_request")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("request_handle:date_request")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("request_handle:name_employee")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("request_handle:department_employee")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("request_handle:region_employee")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("request_handle:type_request")}</span>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold">{t("request_handle:status_request")}</span>
        </DataTableRow>
        <DataTableRow className="nk-tb-col-tools" />
      </DataTableHead>

      {(!loading && data.length > 0)
        ? data.map((item, index) => {
          let statusColor = "gray";
          let typeColor = "gray";
          switch (item.statusID) {
            case 2:
              statusColor = "primary";
              break;
            case 3:
              statusColor = "success";
              break;
            case 4:
              statusColor = "danger";
              break;
            default:
              statusColor = "gray";
              break;
          };
          switch (item.requestTypeID) {
            case 2:
              typeColor = "danger";
              break;
            case 3:
              typeColor = "danger";
              break;
            default:
              typeColor = "warning";
              break;
          };

          return (
            <DataTableItem key={item.requestID + "_table_request_" + index}>
              <DataTableRow size="md">
                <span className="tb-lead text-primary">#{item.requestID}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span>{moment(item.requestDate).format("DD/MM/YYYY")}</span>
              </DataTableRow>
              <DataTableRow>
                <div className="user-card">
                  <UserAvatar className="sm" text={findUpper(item.personRequest)} />
                  <div className="user-info">
                    <span className="tb-lead">
                      {item.personRequest}
                    </span>
                    <span className="ff-italic fs-10px">{item.jobTitle}</span>
                  </div>
                </div>
              </DataTableRow>
              <DataTableRow size="md">
                <span>{item.deptName}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span>{item.regionName}</span>
              </DataTableRow>
              <DataTableRow>
                <span className={`tb-status text-${typeColor}`}>
                  {item.requestTypeName.replace("Yêu cầu ", "").toUpperCase()}
                </span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span className={`dot bg-${statusColor} d-mb-none`} />
                <span className={`badge badge-sm badge-dot has-bg badge-${
                    statusColor
                  } d-none d-mb-inline-flex`}>
                  {item.statusName}
                </span>
              </DataTableRow>
              <DataTableRow className="nk-tb-col-tools">
                <ul className="nk-tb-actions gx-1">
                  <li>
                    <UncontrolledDropdown>
                      <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                        <Icon name="more-h"></Icon>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <ul className="link-list-opt no-bdr">
                          {isWrite && (
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#actions"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  onApproved(item);
                                }}>
                                <Icon name="check-circle-cut"></Icon>
                                <span>{t("request_handle:approved_action")}</span>
                              </DropdownItem>
                            </li>
                          )}
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#process"
                              onClick={(ev) => {
                                ev.preventDefault();
                                onProcess(item);
                              }}>
                              <Icon name="list-check"></Icon>
                              <span>{t("request_handle:approved_timeline")}</span>
                            </DropdownItem>
                          </li>
                          {item.attachFiles && (
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#attach"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  onDownload(item.attachFiles);
                                }}>
                                <Icon name="download"></Icon>
                                <span>{t("request_handle:download_attach_file")}</span>
                              </DropdownItem>
                            </li>
                          )}
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </li>
                </ul>
              </DataTableRow>
            </DataTableItem>
        )})
        : null}
    </DataTableBody>
  );
}

export default TableRequestHandle;
