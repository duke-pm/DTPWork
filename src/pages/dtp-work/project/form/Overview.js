import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {
  FormGroup,
  Spinner,
  Progress,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import {toast} from "react-toastify";
import moment from "moment";
/** COMPONENTS */
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  RSelect,
  BlockDes,
  UserAvatar,
  TooltipComponent,
  InputSwitch,
  AlertConfirm,
} from "../../../../components/Component";
/** COMMON */
import Constants from "../../../../utils/constants";
import {log, findUpper} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

const STATUS_REJECT = 7;
const STATUS_FINISHED = 5;
const PERCENT_COMPLETE = 100;
let curStatus = "";
let curPercent = "";

function Overview(props) {
  const {t} = useTranslation();
  const {
    isLoading,
    isWrite,
    isSidebar,
    history,
    commonState,
    authState,
    masterState,
    projectState,
    onGoBack,
    toggleSideBar,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const statusMaster = masterState["projectStatus"];

  /** Use state */
  const [loading, setLoading] = useState({
    submitStatus: false,
    submitProgress: false,
    submitRecieve: false,
    submitFollow: false,
  });
  const [view, setView] = useState({
    progress: false,
    confirmStatus: false,
    confirmProgress: false,
  });
  const [isEdit, setIsEdit] = useState({
    status: true,
    progress: true,
  });
  const [dataSelect, setDataSelect] = useState({
    status: [],
  });
  const [data, setData] = useState({
    overview: null,
    watchers: [],
    status: null,
    progress: null,
    watch: false,
    recieveEmail: false,
  });
  const [updateItem, setUpdateItem] = useState(null);

  /**
   ** FUNCTIONS
   */
  const onChangeRecieve = () => {
    setLoading({...loading, submitRecieve: true});
    let params = {
      TaskID: data.overview?.taskID,
      IsWatched: data.watch,
      IsReceiveEmail: data.recieveEmail ? 0 : 1,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchFollow(params, history));
  };

  const toggleWatch = () => {
    setLoading({...loading, submitFollow: true});
    let params = {
      UserName: authState["data"]["userName"],
      TaskID: data.overview?.taskID,
      IsWatched: data.watch ? 0 : 1,
      IsReceiveEmail: 1,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchFollow(params, history));
  };

  const onChangeSelect = e => {
    if (data.overview?.statusID !== e.value) {
      if (e.value === STATUS_FINISHED) {
        setUpdateItem(e.value);
        toggleView("confirmStatus");
      } else {
        onSubmitStatus(e.value);
      }
    }
  };

  const onChangeInput = e => {
    setData({...data, progress: e.target.value});
  };

  const toggleView = type => {
    setView({
      progress: type === "progress" ? true : false,
      confirmStatus: type === "confirmStatus" ? true : false,
      confirmProgress: type === "confirmProgress" ? true : false,
    });
    if (!type && updateItem) setUpdateItem(null);
  };

  const onCheckProgress = () => {
    if (data.overview?.percentage !== data.progress) {
      if (Number(data.progress) === PERCENT_COMPLETE) {
        toggleView("confirmProgress");
      } else {
        onSubmitProgress();
      }
    }
  };

  const onSubmitStatus = value => {
    setLoading({...loading, submitStatus: true});
    curPercent = data.overview?.percentage;
    curStatus = data.overview?.statusName;

    let params = {
      TaskID: data.overview?.taskID,
      StatusID: value,
      Percentage: value === STATUS_FINISHED
        ? PERCENT_COMPLETE
        : data.overview?.percentage,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchChangeStatusTask(params, history));
  };

  const onSubmitProgress = () => {
    setLoading({...loading, submitProgress: true});
    curPercent = data.overview?.percentage;
    curStatus = data.overview?.statusName;

    let params = {
      TaskID: data.overview?.taskID,
      StatusID: data.progress === STATUS_FINISHED
        ? STATUS_FINISHED
        : data.overview?.statusID,
      Percentage: data.progress,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchChangeProgressTask(params, history));
  };

  const onUpdateActivitiesStatus = () => {
    let taskDetail = projectState["overview"];
    let comment = "";
    if (taskDetail.statusID === STATUS_FINISHED) {
      comment = `* ${t("task_details:status").toUpperCase()} ${t(
        "task_details:holder_change_from",
      )} ${curStatus} ${t("task_details:holder_change_to")} ${
        taskDetail.statusName
      }.\n* ${t("task_details:progress").toUpperCase()} ${t(
        "task_details:holder_change_from",
      )} ${curPercent} ${t("task_details:holder_change_to")} ${
        taskDetail.percentage
      }.`;
    } else {
      comment = `* ${t("task_details:status").toUpperCase()} ${t(
        "task_details:holder_change_from",
      )} ${curStatus} ${t("task_details:holder_change_to")} ${
        taskDetail.statusName
      }.`;
    }
    
    let params = {
      LineNum: 0,
      TaskID: taskDetail.taskID,
      Comments: comment,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchCreateComment(params, history));
    curPercent = "";
    curStatus = "";
    return;
  };

  const onUpdateActivitiesProgress = () => {
    let taskDetail = projectState["overview"];
    let comment = "";
    if (taskDetail.percentage === PERCENT_COMPLETE) {
      comment = `* ${t("task_details:status").toUpperCase()} ${t(
        "task_details:holder_change_from",
      )} ${curStatus} ${t("task_details:holder_change_to")} ${
        taskDetail.statusName
      }.\n* ${t("task_details:progress").toUpperCase()} ${t(
        "task_details:holder_change_from",
      )} ${curPercent} ${t("task_details:holder_change_to")} ${
        taskDetail.percentage
      }.`;
    } else {
      comment = `* ${t("task_details:progress").toUpperCase()} ${t(
        "task_details:holder_change_from",
      )} ${curPercent}% ${t("task_details:holder_change_to")} ${
        taskDetail.percentage
      }%.`;
    }
    
    let params = {
      LineNum: 0,
      TaskID: taskDetail.taskID,
      Comments: comment,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchCreateComment(params, history));
    curPercent = "";
    curStatus = "";
    return;
  };

  const onSuccess = type => {
    toggleView();
    if (type === "Status" || type === "Progress" || type === "Follow") {
      let message = "success:update_status_task";
      if (type === "Status") onUpdateActivitiesStatus();
      if (type === "Progress") {
        message = "success:update_progress_task";
        onUpdateActivitiesProgress();
      }
      if (type === "Follow") {
        if (projectState["isReceivedEmail"]) {
          message = "success:follow_task";
        } else {
          message = "success:unfollow_task";
        }
      }
      dispatch(Actions.resetTask());
      toast(t(message), {type: "success"});
    }
    setLoading({
      submitStatus: false,
      submitProgress: false,
      submitRecieve: false,
      submitFollow: false,
    });
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    toggleView();
    dispatch(Actions.resetTask());
    toast(error, {type: "error"});
    setLoading({
      submitStatus: false,
      submitProgress: false,
      submitRecieve: false,
      submitFollow: false,
    });
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (projectState) {
      if (dataSelect.status.length === 0) {
        let tmpDataStatus = masterState["projectStatus"].map(item => {
          return {value: item.statusID, label: item.statusName};
        });
        setDataSelect({status: [...dataSelect.status, ...tmpDataStatus]});
      }

      setData({
        overview: projectState.overview,
        watchers: projectState.watchers,
        status: {
          value: projectState.overview?.statusID,
          label: projectState.overview?.statusName,
        },
        progress: projectState.overview?.percentage + "",
        watch: projectState.isWatched,
        recieveEmail: projectState.isReceivedEmail,
      });
      let tmpIsEdit = {...isEdit};
      if (projectState.overview?.statusID === STATUS_REJECT ||
        projectState.overview?.statusID === STATUS_FINISHED) {
        tmpIsEdit.status = false;
        tmpIsEdit.progress = false;
      }
      if (projectState.overview?.isUpdated === false) {
        tmpIsEdit.status = false;
        tmpIsEdit.progress = false;
      }
      setIsEdit(tmpIsEdit);
    }
  }, [
    projectState,
    projectState.overview,
  ]);

  useEffect(() => {
    if (loading.submitStatus) {
      if (!projectState["submittingChangeStatusTask"]) {
        if (projectState["successChangeStatusTask"] && !projectState["errorChangeStatusTask"]) {
          return onSuccess("Status");
        }
        if (!projectState["successChangeStatusTask"] && projectState["errorChangeStatusTask"]) {
          return onError(projectState["errorHelperChangeStatusTask"]);
        }
      }
    }
  }, [
    loading.submitStatus,
    projectState["submittingChangeStatusTask"],
    projectState["successChangeStatusTask"],
    projectState["errorChangeStatusTask"],
  ]);

  useEffect(() => {
    if (loading.submitProgress) {
      if (!projectState["submittingChangeProgressTask"]) {
        if (projectState["successChangeProgressTask"] && !projectState["errorChangeProgressTask"]) {
          return onSuccess("Progress");
        }
        if (!projectState["successChangeProgressTask"] && projectState["errorChangeProgressTask"]) {
          return onError(projectState["errorHelperChangeProgressTask"]);
        }
      }
    }
  }, [
    loading.submitProgress,
    projectState["submittingChangeProgressTask"],
    projectState["successChangeProgressTask"],
    projectState["errorChangeProgressTask"],
  ]);

  useEffect(() => {
    if (loading.submitRecieve || loading.submitFollow) {
      if (!projectState["submittingFollow"]) {
        if (projectState["successFollow"] && !projectState["errorFollow"]) {
          return onSuccess("Follow");
        }
        if (!projectState["successFollow"] && projectState["errorFollow"]) {
          return onError(projectState["errorHelperFollow"]);
        }
      }
    }
  }, [
    loading.submitRecieve,
    loading.submitFollow,
    projectState["submittingFollow"],
    projectState["successFollow"],
    projectState["errorFollow"],
  ]);

  /**
   ** RENDER
   */
  let statusColor = "info";
  switch (data.overview?.statusID) {
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

  const formatStatusLabel = ({label, value, customAbbreviation}) => {
    let color = "info";
    switch (value) {
      case 2:
        color = "warning";
        break;
      case 3:
        color = "success";
        break;
      case 4:
        color = "primary";
        break;
      case 5:
        color = "gray";
        break;
      case 6:
        color = "warning";
        break;
      case 7:
        color = "danger";
        break;
      default:
        color = "info";
        break;
    };
    return (
      <div style={{ display: "flex" }}>
        <span className={`text-${color}`}>{label}</span>
        <div style={{ marginLeft: "10px", color: "#ccc" }}>
          {customAbbreviation}
        </div>
      </div>
    );
  };

  const disabled = isLoading || loading.submitStatus ||
    loading.submitProgress || loading.submitRecieve ||
    loading.submitFollow || !isWrite;
  if (isLoading) {
    return (
      <React.Fragment>
        <div className="text-center my-2">
          <Spinner color="primary" size="sm" />
        </div>
      </React.Fragment>
    );
  };
  return (
    <SimpleBar className="px-4 py-3 nk-chat" style={{overflowY: "scroll"}}>
      <BlockHead className="mt-2">
        <BlockHeadContent>
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-center">
              <Button
                color="light"
                outline
                className="bg-white d-none d-sm-inline-flex"
                onClick={onGoBack}>
                <Icon name="arrow-left"></Icon>
                <span>{t("common:back")}</span>
              </Button>
              <Button
                color="light"
                outline
                className="btn-icon bg-white d-inline-flex d-sm-none"
                onClick={onGoBack}>
                <Icon name="arrow-left"></Icon>
              </Button>
              <BlockTitle tag="h4" className="mr-3 ml-2">
                <span style={{color: Constants.TYPE_TASK_COLOR[data.overview?.typeName]}}>
                  {data.overview?.typeName}
                </span> {data.overview?.taskName}
              </BlockTitle>
            </div>
            <div className="d-flex align-items-center">
              <Button
                className={`d-none d-sm-inline-flex ${data.watch ? "" : "btn-dim"}`}
                color="primary"
                disabled={disabled}
                onClick={toggleWatch}
              >
                {loading.submitFollow && <Spinner size="sm" color="primary" />}
                {!loading.submitFollow && (
                  <Icon name={`${data.watch ? "eye-off" : "eye"}`}></Icon>
                )}
                {data.watch && <span>{t("task_details:unfollow")}</span>}
                {!data.watch && <span>{t("task_details:follow")}</span>}
              </Button>
              <Button
                className={`btn-icon d-inline-flex d-sm-none ${data.watch ? "" : "btn-dim"}`}
                color="primary"
                onClick={toggleWatch}>
                {loading.submitFollow && <Spinner size="sm" color="primary" />}
                {!loading.submitFollow && (
                  <Icon name={`${data.watch ? "eye-off" : "eye"}`}></Icon>
                )}
              </Button>
              <Button
                className={`btn-icon btn-dim ml-2 ${isSidebar ? "active" : ""}`}
                color="gray"
                onClick={toggleSideBar}>
                <Icon name="chat" />
              </Button>
            </div>
          </div>
          <BlockDes className="text-soft pt-2">
            <ul className="list-inline">
              <li>
                <span className="text-primary">#{
                  data.overview?.taskID
                }</span>: {t("task_details:created_by")} <span className="text-primary fw-bold">{
                  data.overview?.crtdUser
                }</span>. {t("task_details:last_updated")} {moment(data.overview?.lUpdDate).format("DD/MM/YYYY")}
              </li>
            </ul>
          </BlockDes>
        </BlockHeadContent>
      </BlockHead>

      <Block>
        <Row className="g-3">
          <Col size="12">
            <div className="profile-ud plain">
              <span className="profile-ud-label fw-bold">{t("task_details:description")}</span>
              <span className="profile-ud-value">
                {data.overview?.descr || t("task_details:non_description")}
              </span>
            </div>
          </Col>
        </Row>
      </Block>

      <Block>
        <div className="data-head">
          <h6 className="overline-title">{t("task_details:informations_action")}</h6>
        </div>
        <div className="mt-3">
          <Row className="g-3">
            {data.overview?.taskTypeID !== Constants.TYPE_TASK.MILESTONE &&
              !isEdit.status && (
              <Col sm="6" md="6" lg="3">
                <div className="profile-ud plain">
                  <span className="profile-ud-label fw-bold">{t("task_details:status")}</span>
                  <span className={`profile-ud-value text-${statusColor}`}>
                    {data.overview?.statusName}
                  </span>
                </div>
              </Col>
            )}
            {data.overview?.taskTypeID !== Constants.TYPE_TASK.MILESTONE &&
              isEdit.status && (
              <Col sm="6"  md="3" lg="3">
                <div className="profile-ud plain">
                  <div className="d-flex justify-content-between">
                    <span className="profile-ud-label fw-bold">{t("task_details:status")}</span>
                    {loading.submitStatus && <Spinner size="sm" color="primary" />}
                  </div>
                  <div className="form-control-wrap mt-1">
                    <RSelect
                      name="status"
                      isMulti={false}
                      isDisabled={disabled}
                      isClearable={false}
                      options={dataSelect.status}
                      value={data.status}
                      placeholder={t("task_details:holder_status")}
                      formatOptionLabel={formatStatusLabel}
                      onChange={onChangeSelect}
                    />
                  </div>
                </div>
              </Col>
            )}
            <Col sm="6" md="6" lg="3">
              <FormGroup>
                <div className="form-label-group profile-ud plain align-items-start">
                  <span className="profile-ud-label fw-bold">
                    {t("task_details:progress")}
                  </span>
                  {!loading.submitProgress && !view.progress && isEdit.progress && (
                    <a
                      href="#editProgress"
                      onClick={(ev) => {
                        ev.preventDefault();
                        !disabled && toggleView("progress")
                      }}
                      className="search-toggle toggle-search"
                    >
                      <Icon name="edit-alt"></Icon>
                    </a>
                  )}
                  {loading.submitProgress && <Spinner size="sm" color="primary" />}
                </div>
                <div className="form-control-wrap">
                  {!view.progress && (
                    <div className="project-list-progress">
                      <div className="project-progress-percent">
                        {data.overview?.percentage}%
                      </div>
                      <Progress
                        animated
                        className="progress-pill progress-lg bg-light flex-fill ml-1"
                        value={data.overview?.percentage}
                      ></Progress>
                    </div>
                  )}
                  {view.progress && (
                    <div className="form-control-wrap d-flex">
                      <input
                        className="form-control"
                        type="number"
                        min={Number(data.progress)}
                        max={100}
                        autoFocus={true}
                        id="progress"
                        name="progress"
                        disabled={disabled}
                        value={data.progress}
                        placeholder={t("task_details:holder_progress")}
                        onChange={onChangeInput}
                      />
                      
                      <Button
                        className="btn-icon btn-dim ml-3"
                        color="success"
                        disabled={disabled}
                        onClick={onCheckProgress}>
                        <Icon name="check"></Icon>
                      </Button>
                      <Button
                        className="btn-icon btn-dim ml-1"
                        color="danger"
                        disabled={disabled}
                        onClick={toggleView}>
                        <Icon name="cross"></Icon>
                      </Button>
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:recieve_email")}</span>
                {loading.submitRecieve && <Spinner size="sm" color="primary" />}
                {!loading.submitRecieve && (
                  <InputSwitch
                    label={t("task_details:recieve_email_noti")}
                    id={"recieve_email"}
                    disabled={disabled || !data.watch}
                    checked={data.recieveEmail}
                    onChange={onChangeRecieve}
                  />
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Block>

      <Block>
        <div className="data-head">
          <h6 className="overline-title">{t("task_details:informations_people_time")}</h6>
        </div>
        <div className="mt-3">
          <Row className="g-3">
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:start_date")}</span>
                <span className="profile-ud-value">
                  {moment(data.overview?.startDate).format("DD/MM/YYYY") || "-"}
                </span>
              </div>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:end_date")}</span>
                <span className="profile-ud-value">
                  {moment(data.overview?.endDate).format("DD/MM/YYYY") || "-"}
                </span>
              </div>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:assignee")}</span>
                {data.overview?.ownerName && (
                  <div className="user-card">
                    <UserAvatar id="owner" className="sm" text={findUpper(data.overview?.ownerName)} />
                    <div className="user-info">
                      <span className="tb-lead">
                        {data.overview?.ownerName}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:members")}</span>
                {data.overview?.lstUserInvited.length > 0
                  ? (
                    <ul className="project-users g-1">
                      {data.overview?.lstUserInvited.slice(0, 3).map((item, idx) => {
                        return (
                          <li key={idx}>
                            <UserAvatar
                              id={`member_${item.userID}`}
                              className="sm"
                              text={findUpper(item.fullName)}
                            />
                            <UncontrolledPopover placement="top" target={`member_${item.userID}`}>
                              <PopoverHeader>
                                {item.fullName} ({item.userName})
                              </PopoverHeader>
                              <PopoverBody>
                                <li><span className="fw-bold">{t("task_details:email")}</span>: {item.email || "-"}</li>
                                <li><span className="fw-bold">{t("task_details:department")}</span>: {item.deptName || "-"}</li>
                                <li><span className="fw-bold">{t("task_details:job_title")}</span>: {item.jobTitle || "-"}</li>
                              </PopoverBody>
                            </UncontrolledPopover>
                          </li>
                        );
                      })}
                      {data.overview?.lstUserInvited.length > 3 && (
                        <li>
                          <UserAvatar theme="light" className="sm" text={`+${
                            data.overview?.lstUserInvited.length - 3
                          }`} />
                        </li>
                      )}
                    </ul>
                  ) : "-"}
              </div>
            </Col>
          </Row>
        </div>
      </Block>

      <Block>
        <div className="data-head">
          <h6 className="overline-title">{t("task_details:informations_other")}</h6>
        </div>
        <div className="mt-3">
          <Row className="g-3">
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:priority")}</span>
                <span className={`profile-ud-value text-${Constants.PRIORITY_TASK_COLOR[data.overview?.priority]}`}>
                  {data.overview?.priorityName}
                </span>
              </div>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:sector")}</span>
                <span className="profile-ud-value">
                  {data.overview?.sectorName || "-"}
                </span>
              </div>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:grade")}</span>
                <span className="profile-ud-value">
                  {data.overview?.gradeName || "-"}
                </span>
              </div>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:component")}</span>
                <span className="profile-ud-value">
                  {data.overview?.componentName || "-"}
                </span>
              </div>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:author")}</span>
                <span className="profile-ud-value">
                  {data.overview?.author || "-"}
                </span>
              </div>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:owner_shipDTP")}</span>
                <span className="profile-ud-value">
                  {data.overview?.ownershipDTP || "-"}
                </span>
              </div>
            </Col>
            <Col sm="6" md="6" lg="3">
              <div className="profile-ud plain">
                <span className="profile-ud-label fw-bold">{t("task_details:origin_publisher")}</span>
                <span className="profile-ud-value">
                  {data.overview?.originPublisher || "-"}
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </Block>

      <Block>
        <div className="data-head">
          <h6 className="overline-title">{t("task_details:list_watchers")}</h6>
        </div>
        <div className="mt-3">
          {data.watchers.length === 0 && (
            <span className="profile-ud-value">
              {t("task_details:empty_user_follow_task")}
            </span>
          )}
          <Row className="g-3">
            {data.watchers.length > 0 && (
              data.watchers.map((itemW, indexW) => {
                return (
                  <Col sm="6" md="6" lg="3" key={"watcher_" + indexW}>
                    <div className="user-card">
                      <UserAvatar className="sm" text={findUpper(itemW.fullName)}></UserAvatar>
                      <div className="user-info d-flex flex-column">
                        <span className="fw-medium">
                          {itemW.fullName}
                        </span>
                        <div className="d-flex">
                          <span className="ff-italic fs-10px">{t("task_details:recieve_email")}: </span>
                          <TooltipComponent
                            id={"check_" + indexW}
                            icon={`${itemW.isReceiveEmail ? "check-circle-fill" : "cross-circle-fill"}`}
                            iconClass={`card-hint text-${itemW.isReceiveEmail ? "success" : "danger"} ml-1`}
                            text={t("task_details:recieve_email_noti")}
                            direction="top"
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })
            )}
          </Row>
        </div>
      </Block>
      
      <AlertConfirm
        show={view.confirmStatus}
        loading={loading.submitStatus}
        title={t("task_details:confirm_change")}
        content={<span>{t("task_details:confirm_change_to_finished")}</span>}
        onConfirm={() => onSubmitStatus(updateItem)}
        onClose={toggleView}
      />

      <AlertConfirm
        show={view.confirmProgress}
        loading={loading.submitProgress}
        title={t("task_details:confirm_change")}
        content={<span>{t("task_details:confirm_change_to_100")}</span>}
        onConfirm={onSubmitProgress}
        onClose={toggleView}
      />
    </SimpleBar>
  );
};

export default Overview;
