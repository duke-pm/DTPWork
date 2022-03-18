import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {
  UncontrolledTooltip,
  Badge,
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
import {durationDay, expiredDate, findUpper} from "../../../../utils/Utils";
import Constants from "../../../../utils/constants";

function RowProjectsOverview(props) {
  const {t} = useTranslation();
  const {
    disabled,
    className,
    padding,
    index,
    data,
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
      statusColor = "success";
      break;
    case 4:
      statusColor = "primary";
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
      <DataTableItem key={data.itemID + "_project_" + index}>
        {data.countChild > 0 ? (
          <DataTableRow className="nk-tb-col-check">
            <div style={{paddingLeft: `${padding}px`}}>
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
          {data.countChild > 0 && (
            <NavLink
              className={`d-flex align-items-center`}
              to={`${process.env.PUBLIC_URL}${Routes.tasks}/${data.itemID}`}>
              {!data.isProject && (
                <span className="fw-bold"
                  style={{
                    color: Constants.TYPE_TASK_COLOR[data.typeName],
                    textTransform: "uppercase",
                    paddingLeft: !data.isProject ? `${padding}px` : "",
                  }}>
                  {data.typeName}
                </span>
              )}
              <span className={`tb-lead ${!data.isProject ? "ml-2" : ""}`} style={{
                paddingLeft: data.isProject ? `${padding}px` : "",
              }}>{data.itemName}</span>
            </NavLink>
          )}
          {data.countChild === 0 && (
            <a
              className={`d-flex align-items-center`}
              href="#project"
              onClick={data.countChild > 0 ? onChangeView : undefined}>
              {!data.isProject && (
              <span className="fw-bold"
                style={{
                  color: Constants.TYPE_TASK_COLOR[data.typeName],
                  textTransform: "uppercase",
                  paddingLeft: !data.isProject ? `${padding}px` : "",
                }}>
                {data.typeName}
              </span>
              )}
              <span className={`tb-lead ${!data.isProject ? "ml-2" : ""}`} style={{
                paddingLeft: data.isProject ? `${padding}px` : "",
              }}>{data.itemName}</span>
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
                      id={`delay_${data.itemID}`}
                      className={`tb-lead ${(expiredDate(data.endDate) > 0 && data.statusID < 5) &&
                      "text-danger"}`}>
                      {moment(data.endDate.split("T")[0]).format("DD/MM/YYYY")}
                    </span>
                    <UncontrolledTooltip autohide={true} placement="top" target={`delay_${data.itemID}`}>
                      {`${t("task:delay")} ${expiredDate(data.endDate)} ${t("task:days")}`}
                    </UncontrolledTooltip>
                  </>
                ) : (
                  <>
                    <span id={`duration_${data.itemID}`} className="tb-lead">
                      {moment(data.endDate.split("T")[0]).format("DD/MM/YYYY")}
                    </span>
                    <UncontrolledTooltip autohide={true} placement="top" target={`duration_${data.itemID}`}>
                      {`${durationDay(data.startDate, data.endDate)} ${t("task:days")}`}
                    </UncontrolledTooltip>
                  </>
                )}
              </div>
            </div>
          )}
        </DataTableRow>
        <DataTableRow size="md">
          <div className="project-list-progress">
            <Progress
              id={`per_${data.itemID}`}
              className="progress-pill progress-md bg-light"
              value={data.percentage}
            ></Progress>
            <UncontrolledTooltip autohide={true} placement="top" target={`per_${data.itemID}`}>
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
      </DataTableItem>
      {data.countChild > 0 && viewChild && data.lstItemChild.map((item, index) => {
        return (
          <RowProjectsOverview
            key={item.itemID + "_prj_" + index}
            className="ml-"
            disabled={disabled}
            padding={padding + 10}
            index={index}
            data={item}
          />
        )
      })}
    </>
  );
};

export default RowProjectsOverview;
