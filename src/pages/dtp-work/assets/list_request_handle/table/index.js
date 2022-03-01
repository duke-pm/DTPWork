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
  PaginationComponent,
  PreviewAltCard,
  Icon,
  UserAvatar,
} from "components/Component";
/** COMMON */
import Configs from "configs";
import {findUpper} from "utils/Utils";

function TableRequestHandle(props) {
  const {t} = useTranslation();
  const {
    loading,
    curPage,
    countItem,
    dataRequest,
    onChangePage,
    onApproved,
    onProcess,
  } = props;

  /** Use state */
  const [data, setData] = useState(dataRequest);
  const [currentPage, setCurrentPage] = useState(curPage);

  /**
   ** FUNCTIONS
   */
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    onChangePage(pageNumber);
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
    <React.Fragment>
      <div className="nk-tb-list is-separate is-medium mb-3">
        <DataTableHead className="nk-tb-item">
          <DataTableRow size="sm">
            <span className="lead-text">{t("request_handle:code_request")}</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="lead-text">{t("request_handle:date_request")}</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="lead-text">{t("request_handle:name_employee")}</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="lead-text">{t("request_handle:department_employee")}</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="lead-text">{t("request_handle:region_employee")}</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="lead-text">{t("request_handle:type_request")}</span>
          </DataTableRow>
          <DataTableRow size="md">
            <span className="lead-text">{t("request_handle:status_request")}</span>
          </DataTableRow>
          <DataTableRow className="nk-tb-col-tools" />
        </DataTableHead>

        {data.length > 0
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
                <DataTableRow size="sm">
                  <span className="tb-sub text-primary">#{item.requestID}</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="tb-sub">{moment(item.requestDate).format("DD/MM/YYYY")}</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <div className="user-card">
                    <UserAvatar text={findUpper(item.personRequest)} />
                    <div className="user-info">
                      <span className="tb-lead">
                        {item.personRequest} <span className="dot dot-success d-md-none ml-1"></span>
                      </span>
                      <span>{item.jobTitle}</span>
                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="tb-sub">{item.deptName}</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className="tb-sub">{item.regionName}</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span className={`tb-status text-${typeColor}`}>
                    {item.requestTypeName.replace("Yêu cầu ", "").toUpperCase()}
                  </span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span
                    className={`dot bg-${statusColor} d-mb-none`}
                  ></span>
                  <span
                    className={`badge badge-sm badge-dot has-bg badge-${
                      statusColor
                    } d-none d-mb-inline-flex`}
                  >
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
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#actions"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  onApproved(item);
                                }}
                              >
                                <Icon name="check-circle-cut"></Icon>
                                <span>{t("request_handle:approved_action")}</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#process"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  onProcess(item);
                                }}
                              >
                                <Icon name="list-check"></Icon>
                                <span>{t("request_handle:approved_timeline")}</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </DataTableRow>
              </DataTableItem>
          )})
          : null}
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border spinner-border-sm text-primary" />
        </div>
      )}

      {/** Paging */}
      <PreviewAltCard>
      {data.length > 0 ? (
        <PaginationComponent
          itemPerPage={Configs.perPage}
          totalItems={countItem}
          currentPage={currentPage}
          paginate={paginate}
        />
      ) : (
        <div className="text-center">
          <span className="text-silent">{t("common:no_data")}</span>
        </div>
      )}
      </PreviewAltCard>
    </React.Fragment>
  )

}

export default TableRequestHandle;
