import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip,
  Badge,
} from "reactstrap";
import moment from "moment";
/** COMPONENTS */
import {
  DataTableItem,
  DataTableRow,
  Icon,
  Button,
  UserAvatar,
} from "../../../../components/Component";
/** COMMON */
import Routes from "../../../../route/routes";
import {durationDay, expiredDate, findUpper} from "../../../../utils/Utils";

function RowProject(props) {
  const {t} = useTranslation();
  const {
    isWrite,
    disabled,
    padding,
    index,
    data,
    onDetails,
    onUpdate,
    onClone,
    onExport,
    onRemove,
  } = props;

  /** Use state */
  const [viewChild, setViewChild] = useState(true);

  /**
   ** FUNCTIONS
   */
  const onChangeView = () => setViewChild(!viewChild);

  /**
   ** RENDER
   */
  let statusColor = "info";
  switch (data.statusID) {
    case 2:
      statusColor = "warning";
      break;
    case 3:
      statusColor = "primary";
      break;
    case 4:
      statusColor = "success";
      break;
    case 5:
      statusColor = "gray";
      break;
    case 6:
      statusColor = "warning";
      break;
    case 7:
      statusColor = "danger";
      break;
    default:
      statusColor = "info";
      break;
  };
  return (
    <>
      <DataTableItem key={data.prjID + "_project_" + index}>
        {data.countChild > 0 ? (
          <DataTableRow className="nk-tb-col-check">
            <div>
              <Button
                className={`${!viewChild && "btn-dim"}`}
                size="sm"
                color="primary"
                onClick={onChangeView}>
                <Icon name={viewChild ? "minus" : "plus"} />  
              </Button>
            </div>
          </DataTableRow>
        ) : (
          <DataTableRow className="nk-tb-col-check">
          </DataTableRow>
        )}
        <DataTableRow>
          {data.countTask > 0 && (
            <NavLink
              to={`${process.env.PUBLIC_URL}${Routes.tasks}/${data.prjID}`}>
              <span className={`tb-lead`} style={{paddingLeft: `${padding}px`}}>{data.prjName}</span>
            </NavLink>
          )}
          {data.countTask === 0 && (
            <a
              href="#project"
              onClick={data.countChild > 0 ? onChangeView : undefined}>
              <span className={`tb-lead`} style={{paddingLeft: `${padding}px`}}>{data.prjName}</span>
            </a>
          )}
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
            {data.statusName}
          </span>
        </DataTableRow>
        <DataTableRow size="md">
          <div className="asterisk tb-asterisk">
            {data.isPublic && (
              <Icon className="text-success" name="check-circle-fill" />
            )}
            {!data.isPublic && (
              <Icon className="text-danger" name="cross-circle-fill" />
            )}
          </div>
        </DataTableRow>
        <DataTableRow size="md">
          {data.priorityLevel > 0 && (
            <div className="align-items-center">
              <Badge color="danger" pill>
                {data.priorityLevel}
                <Icon className=" ml-1 text-light" name="flag-fill" />
              </Badge>
            </div>
          )}
        </DataTableRow>
        <DataTableRow size="sm">
          {data.startDate && data.endDate && (
            <div className="d-flex justify-content-start align-items-center">
              <div className="user-info">
                <span className="tb-lead">
                  {moment(data.startDate.split("T")[0]).format("DD/MM/YYYY")}
                </span>
              </div>
              <Icon name="arrow-right mx-1" />
              <div className="user-info">
                {(expiredDate(data.endDate) > 0 && data.statusID < 5) ? (
                  <>
                    <span
                      id={`delay_${data.prjID}`}
                      className={`tb-lead ${(expiredDate(data.endDate) > 0 && data.statusID < 5) &&
                      "text-danger"}`}>
                      {moment(data.endDate.split("T")[0]).format("DD/MM/YYYY")}
                    </span>
                    <UncontrolledTooltip autohide={true} placement="top" target={`delay_${data.prjID}`}>
                      {`${t("task:delay")} ${expiredDate(data.endDate)} ${t("task:days")}`}
                    </UncontrolledTooltip>
                  </>
                ) : (
                  <>
                    <span id={`duration_${data.prjID}`} className="tb-lead">
                      {moment(data.endDate.split("T")[0]).format("DD/MM/YYYY")}
                    </span>
                    <UncontrolledTooltip autohide={true} placement="top" target={`duration_${data.prjID}`}>
                      {`${durationDay(data.startDate, data.endDate)} ${t("task:days")}`}
                    </UncontrolledTooltip>
                  </>
                )}
              </div>
            </div>
          )}
        </DataTableRow>
        <DataTableRow size="md">
          {data.appraisalTime && (
            <span>{moment(data.appraisalTime).format('DD/MM/YY')}</span>
          )}
        </DataTableRow>
        <DataTableRow size="sm">
          <div className="user-card">
            <UserAvatar className="sm" text={findUpper(data.ownerName)} />
            <div className="user-info">
              <span className="tb-lead">
                {data.ownerName}
              </span>
            </div>
          </div>
        </DataTableRow>
        {isWrite && (
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
                          href="#details"
                          onClick={(ev) => {
                            ev.preventDefault();
                            !disabled && onDetails(data.prjID);
                          }}
                        >
                          <Icon name="eye"></Icon>
                          <span>{t("common:details")}</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#update"
                          onClick={(ev) => {
                            ev.preventDefault();
                            !disabled && onUpdate(data);
                          }}
                        >
                          <Icon name="edit"></Icon>
                          <span>{t("common:update")}</span>
                        </DropdownItem>
                      </li>
                      {isWrite && (
                        <li>
                          <DropdownItem
                            tag="a"
                            href="#clone"
                            onClick={(ev) => {
                              ev.preventDefault();
                              !disabled && onClone(data);
                            }}
                          >
                            <Icon name="copy"></Icon>
                            <span>{t("common:clone")}</span>
                          </DropdownItem>
                        </li>
                      )}
                      {data.countChild === 0 &&
                        data.countTask > 0 && (
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#export"
                              onClick={(ev) => {
                                ev.preventDefault();
                                !disabled && onExport(data);
                              }}
                            >
                              <Icon name="download"></Icon>
                              <span>{t("common:export")}</span>
                            </DropdownItem>
                          </li>
                        )
                      }
                      {data.countChild === 0 &&
                        data.statusID === 1 &&
                        data.isModified &&
                        isWrite && (
                          <li>
                            <DropdownItem
                              tag="a"
                              href="#remove"
                              onClick={(ev) => {
                                ev.preventDefault();
                                !disabled && onRemove(data);
                              }}
                            >
                              <Icon name="trash"></Icon>
                              <span>{t("common:remove")}</span>
                            </DropdownItem>
                          </li>
                        )
                      }
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          </DataTableRow>
        )}
      </DataTableItem>
      {data.countChild > 0 && viewChild && data.lstProjectItem.map((item, index) => {
        return (
          <RowProject
            key={item.prjID + "_prj_" + index}
            isWrite={isWrite}
            disabled={disabled}
            padding={padding + 10}
            index={index}
            data={item}
            onDetails={onDetails}
            onUpdate={onUpdate}
            onClone={onClone}
            onExport={onExport}
            onRemove={onRemove}
          />
        )
      })}
    </>
  );
};

export default RowProject;
