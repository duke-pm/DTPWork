import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledTooltip,
  Progress,
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
import Constants from "../../../../utils/constants";
import {durationDay, expiredDate, findUpper} from "../../../../utils/Utils";

function RowTask(props) {
  const {t} = useTranslation();
  const {
    isWrite,
    disabled,
    className,
    padding,
    index,
    data,
    onOverview,
    onUpdate,
    onClone,
    onRemove,
  } = props;

  /** Use state */
  const [viewChild, setViewChild] = useState(true);

  /**
   ** FUNCTIONS
   */
  const onChangeView = () => {
    setViewChild(!viewChild);
  };

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
      <DataTableItem key={data.taskID + "_task_" + index}>
        {data.countChild > 0 ? (
          <DataTableRow className="nk-tb-col-check">
            <div className={`${className + padding}`}>
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
          <DataTableRow className="nk-tb-col-check" />
        )}
        <DataTableRow>
          <NavLink
            to={`${process.env.PUBLIC_URL}${Routes.taskDetails}/${data.taskID}`}>
            <span className={`tb-lead ${className + padding}`}>{data.taskName}</span>
          </NavLink>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold"
            style={{
              color: Constants.TYPE_TASK_COLOR[data.typeName],
              textTransform: "uppercase",
            }}>
            {data.typeName}
          </span>
        </DataTableRow>
        <DataTableRow size="md">
          {data.taskTypeID !== 3 && (
            <>
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
            </>
          )}
        </DataTableRow>
        <DataTableRow size="lg">
          <span className={`text-${Constants.PRIORITY_TASK_COLOR[data.priority]}`}>
            {data.priorityName}
          </span>
        </DataTableRow>
        <DataTableRow size="lg">
          {data.startDate && data.endDate && (
            <div className="d-flex justify-content-start align-items-center" id="duration">
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
                      id={`delay_${data.taskID}`}
                      className={`tb-lead ${(expiredDate(data.endDate) > 0 && data.statusID < 5) &&
                      "text-danger"}`}>
                      {moment(data.endDate.split("T")[0]).format("DD/MM/YYYY")}
                    </span>
                    <UncontrolledTooltip autohide={true} placement="top" target={`delay_${data.taskID}`}>
                      {`${t("task:delay")} ${expiredDate(data.endDate)} ${t("task:days")}`}
                    </UncontrolledTooltip>
                  </>
                ) : (
                  <>
                    <span id={`duration_${data.taskID}`} className="tb-lead">
                      {moment(data.endDate.split("T")[0]).format("DD/MM/YYYY")}
                    </span>
                    <UncontrolledTooltip autohide={true} placement="top" target={`duration_${data.taskID}`}>
                      {`${durationDay(data.startDate, data.endDate)} ${t("task:days")}`}
                    </UncontrolledTooltip>
                  </>
                )}
              </div>
            </div>
          )}
        </DataTableRow>
        <DataTableRow size="lg">
          <div className="project-list-progress">
            <Progress
              id={`per_${data.taskID}`}
              className="progress-pill progress-md bg-light"
              value={data.percentage}
            ></Progress>
            <UncontrolledTooltip autohide={true} placement="top" target={`per_${data.taskID}`}>
              {`${data.percentage}%`}
            </UncontrolledTooltip>
          </div>
        </DataTableRow>
        <DataTableRow size="md">
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
                          href="#overview"
                          onClick={(ev) => {
                            ev.preventDefault();
                            !disabled && onOverview(data.taskID);
                          }}
                        >
                          <Icon name="eye"></Icon>
                          <span>{t("task:overview")}</span>
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
                      {isWrite && data.isModified && (
                        <>
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
                          {data.taskTypeID === 2 && data.statusID === 1 && data.countChild === 0 && (
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
                          )}
                        </>
                      )}
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          </DataTableRow>
        )}
      </DataTableItem>
      {data.countChild > 0 && viewChild && data.lstTaskItem.map((item, index) => {
        return (
          <RowTask
            key={item.prjID + "_prj_" + index}
            className="ml-"
            isWrite={isWrite}
            disabled={disabled}
            padding={padding + 2}
            index={index}
            data={item}
            onOverview={onOverview}
            onUpdate={onUpdate}
            onClone={onClone}
            onRemove={onRemove}
          />
        )
      })}
    </>
  );
};

export default RowTask;
