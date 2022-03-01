import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import moment from "moment";
/** COMPONENTS */
import {
  DataTableHead,
  DataTableItem,
  DataTableRow,
  PreviewAltCard,
  Icon,
  UserAvatar,
  PaginationComponent,
} from "components/Component";
/** COMMON */
import Configs from "configs";
import Routes from "services/routesApi";
import {getCookies, findUpper} from "utils/Utils";

function TableRequest(props) {
  const {t} = useTranslation();
  const {
    loadingTable,
    idxTab,
    dataRequest,
    curPage,
    countItem,
    onChangePage,
    onDetails,
    onProcess,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const approvedState = useSelector(({approved}) => approved);

  /** Use state */
  const [data, setData] = useState(dataRequest);
  const [currentPage, setCurrentPage] = useState(curPage);

  /**
   ** FUNCTIONS
   */
  // Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    onChangePage(idxTab, pageNumber);
  };

  const onExportExcel = requestID => {
    let tmpAccessToken = getCookies("access_token");
    if (tmpAccessToken) {
      let params = {
        UserToken: tmpAccessToken,
        RequestID: requestID,
      }
      window.location = `${Configs.hostAPI}/${Configs.prefixAPI}${
        Routes.APPROVED.EXPORT_REQUEST_DAMAGE
      }?value=${JSON.stringify(params)}`;
    }
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
      {/** Data request */}
      <div className="nk-tb-list is-separate is-medium mb-3">
        <DataTableHead className="nk-tb-item">
          <DataTableRow>
            <span className="lead-text">{t("request_approved:code_request")}</span>
          </DataTableRow>
          <DataTableRow>
            <span className="lead-text">{t("request_approved:date_request")}</span>
          </DataTableRow>
          <DataTableRow>
            <span className="lead-text">{t("request_approved:name_employee")}</span>
          </DataTableRow>
          <DataTableRow>
            <span className="lead-text">{t("request_approved:department_employee")}</span>
          </DataTableRow>
          <DataTableRow>
            <span className="lead-text">{t("request_approved:region_employee")}</span>
          </DataTableRow>
          <DataTableRow>
            <span className="lead-text">{t("request_approved:status_request")}</span>
          </DataTableRow>
          <DataTableRow className="nk-tb-col-tools" />
        </DataTableHead>

        {data.length > 0 ?
          data.map((itemR, indexR) => {
            let statusColor = "gray";
            switch (itemR.statusID) {
              case 2:
                statusColor = "warning";
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

            return (
              <DataTableItem key={itemR.requestID + "_table_item_" + indexR}>
                <DataTableRow>
                  <span className="tb-sub text-primary">
                    #{itemR.requestID}
                  </span>
                </DataTableRow>
                <DataTableRow>
                  <span>{moment(itemR.requestDate).format("DD/MM/YYYY")}</span>
                </DataTableRow>
                <DataTableRow>
                  <div className="user-card">
                    <UserAvatar text={findUpper(itemR.fullName)} />
                    <div className="user-info">
                      <span className="tb-lead">
                        {itemR.fullName} <span className="dot dot-success d-md-none ml-1"></span>
                      </span>
                      <span>{itemR.jobTitle}</span>
                    </div>
                  </div>
                </DataTableRow>
                <DataTableRow>
                  <span>{itemR.deptName}</span>
                </DataTableRow>
                <DataTableRow>
                  <span>{itemR.regionName}</span>
                </DataTableRow>
                <DataTableRow>
                  <span
                    className={`dot bg-${statusColor} d-mb-none`}
                  ></span>
                  <span
                    className={`badge badge-sm badge-dot has-bg badge-${
                      statusColor
                    } d-none d-mb-inline-flex`}
                  >
                    {itemR.statusName}
                  </span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1">
                    <UncontrolledDropdown>
                      <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                        <Icon name="more-h"></Icon>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <ul className="link-list-opt no-bdr">
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#viewDetails"
                              onClick={(ev) => {
                                ev.preventDefault();
                                onDetails(itemR);
                              }}
                            >
                              <Icon name="eye"></Icon>
                              <span>{t("request_approved:view_details")}</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#viewProcess"
                              onClick={(ev) => {
                                ev.preventDefault();
                                onProcess(itemR);
                              }}
                            >
                              <Icon name="list-check"></Icon>
                              <span>{t("request_approved:approved_timeline")}</span>
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#exportExcel"
                              onClick={(ev) => {
                                ev.preventDefault();
                                onExportExcel(itemR.requestID);
                              }}
                            >
                              <Icon name="download"></Icon>
                              <span>{t("request_approved:export_file")}</span>
                            </DropdownItem>
                          </li>
                        </ul>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </ul>
                </DataTableRow>
              </DataTableItem>
            )
          })
          : null}
      </div>

      {loadingTable && (
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
  );
};

export default TableRequest;
