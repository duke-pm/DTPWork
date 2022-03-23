import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
} from "reactstrap";
/** COMPONENTS */
import {
  DataTableHead,
  DataTableItem,
  DataTableRow,
  DataTableBody,
  Icon,
  UserAvatar,
} from "../../../../components/Component";
/** COMMON */
import {findUpper} from "../../../../utils/Utils";

function TableBookings(props) {
  const {t} = useTranslation();
  const {
    loading,
    isWrite,
    disabled,
    dataBookings,
    onUpdate,
    onRemove,
  } = props;

  /** Use state */
  const [data, setData] = useState(dataBookings);

  /**
   ** LIFE CYCLE
   */
   useEffect(() => {
    setData(dataBookings);
  }, [dataBookings]);

  /**
   ** RENDER
   */
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow size="md">
          <span className="fw-bold">{t("all_booking:code")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("all_booking:name_booking")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("all_booking:time_use")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("all_booking:resource")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("all_booking:created_user")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("all_booking:created_time")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("all_booking:status")}</span>
        </DataTableRow>
        {isWrite && <DataTableRow className="nk-tb-col-tools" />}
      </DataTableHead>

      {(!loading && data.length > 0)
        ? data.map((item, index) => {
          let statusColor = "primary";
          switch (item.statusID) {
            case 2:
              statusColor = "success";
              break;
            case 3:
              statusColor = "secondary";
              break;
            default:
              statusColor = "warning";
              break;
          };

          return (
            <DataTableItem key={item.bookID + "_booking_" + index}>
              <DataTableRow size="md">
                <span className="tb-lead text-primary">#{item.bookID}</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{item.purpose}</span>
              </DataTableRow>
              <DataTableRow>
                <div className="d-flex justify-content-start align-items-center">
                  <div className="user-info">
                    <span className="tb-lead">
                      {item.strStartDateTime.split(" - ")[0]}
                    </span>
                    <span className="ff-italic fs-10px">{item.strStartDateTime.split(" - ")[1]}</span>
                  </div>
                  <Icon name="arrow-right mx-1" />
                  <div className="user-info">
                    <span className="tb-lead">
                      {item.strEndDateTime.split(" - ")[0]}
                    </span>
                    <span className="ff-italic fs-10px">{item.strEndDateTime.split(" - ")[1]}</span>
                  </div>
                </div>
              </DataTableRow>
              <DataTableRow size="md">
                <Badge
                  style={{backgroundColor: item.color}}
                  className="badge badge-dim badge-pill">
                  {item.resourceName}  
                </Badge>
              </DataTableRow>
              <DataTableRow size="md">
                <div className="user-card">
                  <UserAvatar className="sm" text={findUpper(item.ownerName)} />
                  <div className="user-info">
                    <span className="tb-lead">
                      {item.ownerName}
                    </span>
                  </div>
                </div>
              </DataTableRow>
              <DataTableRow size="md">
                <span>{item.strCrtdDate}</span>
              </DataTableRow>
              <DataTableRow>
                <span className={`dot bg-${statusColor} d-mb-none`} />
                <span
                  className={`badge badge-sm badge-dot has-bg badge-${
                    statusColor
                  } d-none d-mb-inline-flex`}>
                  {item.statusName}
                </span>
              </DataTableRow>
              {isWrite && (
                <DataTableRow className="nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                          <Icon name="more-h"/>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                className="cursor-pointer link link-sm"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  !disabled && onUpdate(item);
                                }}>
                                <Icon name="edit"/>
                                <span>{t("common:update")}</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                className="cursor-pointer link link-sm"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  !disabled && onRemove(item);
                                }}>
                                <Icon name="trash"/>
                                <span>{t("common:remove")}</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </DataTableRow>
              )}
            </DataTableItem>
        )})
        : null}
    </DataTableBody>
  );
};

export default TableBookings;
