import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Form, FormGroup, Spinner, Label} from "reactstrap";
import SimpleBar from "simplebar-react";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";
import moment from "moment";
/** COMPONENTS */
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockBetween,
  BlockTitle,
  Icon,
  Button,
  Row,
  Col,
  RSelect,
} from "../../../../components/Component";
/** COMMON */
import Configs from "../../../../configs";
import Constants from "../../../../utils/constants";
import {log} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

const CustomDateInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-left">
      <Icon name="calendar"></Icon>
    </div>
    <input
      className="form-control date-picker"
      type="text"
      value={moment(value).format("DD/MM/YYYY")}
      onChange={onChange}
    />
  </div>
));

function AddEditTaskForm(props) {
  const {t} = useTranslation();
  const {errors, register, clearErrors, handleSubmit} = useForm();
  const {
    show = false, 
    history,
    isUpdate,
    isClone,
    authState,
    commonState,
    masterState,
    createType,
    prjID,
    updateItem,
    onClose,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const projectState = useSelector(({project}) => project);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [error, setError] = useState({
    owner: null,
    priority: null,
  });
  const [dataSelect, setDataSelect] = useState({
    subTasks: [],
    owners: [],
    sectors: [],
    priority: [],
    grades: [],
    components: [],
    types: Constants.TYPE_TASK,
  });
  const [formData, setFormData] = useState({
    id: -1,
    type: createType || "",
    name: "",
    subTask: "",
    description: "",
    owner: "",
    members: "",
    startDate: new Date(),
    endDate: new Date(),
    status: 1,
    sector: "",
    priority: "",
    grade: "",
    component: "",
    author: "",
    ownershipDTP: "",
    originPublisher: "",
    file: "",
    percentage: 0,
    version: "",
  });

  /**
   ** FUNCTIONS
   */
  const onChangeInput = e =>
    setFormData({...formData, [e.target.name]: e.target.value});
 
  const onChangeSelect = e => {
    if (error[e.key]) {
      setError({...error, [e.key]: null});
    }
    setFormData({...formData, [e.key]: e.value});
  };

  const onChangeDate = (type, date) => {
    setFormData({...formData, [type]: date});
  };

  const onChangeFile = e => {
    setFormData({...formData, file: e.target.files[0]});
  };

  const onResetData = () => {
    setFormData({
      id: -1,
      type: createType || "",
      name: "",
      subTask: "",
      description: "",
      owner: "",
      members: "",
      startDate: new Date(),
      endDate: new Date(),
      status: 1,
      sector: "",
      priority: "",
      grade: "",
      component: "",
      author: "",
      ownershipDTP: "",
      originPublisher: "",
      file: "",
      percentage: 0,
      version: "",
    });
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "PrjStatus,PrjComponent,PrjPriority,PrjSector,PrjGrade",
      PrjID: prjID,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
    dispatch(Actions.fFetchUsersByLogin(params, history));
    dispatch(Actions.fFetchSubTasks(params, history));
  };

  const onSetDataDetails = tk => {
    let fMembers = [], i = null, fMem = null;
    if (tk.lstUserInvited.length > 0) {
      for (i of tk.lstUserInvited) {
        fMem = dataSelect.owners.find(f => f.value === i.userID);
        if (fMem) fMembers.push(fMem);
      }
    }
    let fSubTask = null, fOwner = null, fSector = null,
      fPriority = null, fGrade = null, fComponent = null;
    fOwner = dataSelect.owners.find(f => f.value === tk.owner);
    fSector = dataSelect.sectors.find(f => f.value === tk.sectorID);
    fPriority = dataSelect.priority.find(f => f.value === tk.priority);
    fGrade = dataSelect.grades.find(f => f.value === tk.grade);
    fComponent = dataSelect.components.find(f => f.value === tk.component);

    if (tk.parentID > 0) {
      fSubTask = dataSelect.subTasks.find(f =>
        f.value === tk.parentID);
    }

    setFormData({
      id: tk.taskID,
      type: tk.taskTypeID,
      name: (isClone ? t("project:copy_of") + " " : "") + tk.taskName,
      subTask: fSubTask || "",
      description: tk.descr,
      owner: fOwner || "",
      members: fMembers.length > 0 ? fMembers : "",
      startDate: new Date(`${
        moment(tk.startDate).year()
      }/${
        moment(tk.startDate).month() + 1
      }/${
        moment(tk.startDate).date()
      }`),
      endDate: new Date(`${
        moment(tk.endDate).year()
      }/${
        moment(tk.endDate).month() + 1
      }/${
        moment(tk.endDate).date()
      }`),
      status: tk.statusID,
      sector: fSector || "",
      priority: fPriority || "",
      grade: fGrade || "",
      component: fComponent || "",
      author: tk.author,
      ownershipDTP: tk.ownershipDTP,
      originPublisher: tk.originPublisher,
      file: tk.attachFiles ? {id: "history", name: tk.attachFiles} : "",
      percentage: tk.percentage,
      version: "",
    });
  };

  const onValidate = () => {
    let isError = false,
      tmpError = {
        owner: null,
        priority: null,
      };
    if (!formData.owner) {
      isError = true;
      tmpError.owner = {};
      tmpError.owner.message = t("validate:empty");
    }
    if (!formData.priority) {
      isError = true;
      tmpError.priority = {};
      tmpError.priority.message = t("validate:empty");
    }
    setError(tmpError);
    return isError;
  };

  const onFormSubmit = () => {
    let isError = onValidate();
    if (!isError) {
      setLoading({...loading, submit: true});
      let tmpEmps = "";
      if (formData.members && formData.members.length > 0) {
        tmpEmps = formData.members.map(item => item.value);
        tmpEmps = tmpEmps.join();
      }

      let params = {
        TaskID: isUpdate ? formData.id : "0",
        TaskName: formData.name.trim(),
        TaskTypeID: formData.type,
        PrjID: prjID,
        ParentID: formData.subTask?.value || 0,
        Descr: formData.description.trim(),
        StartDate: moment(formData.startDate).format("YYYY/MM/DD"),
        EndDate: moment(formData.endDate).format("YYYY/MM/DD"),
        Owner: formData.owner?.value || 0,
        Priority: formData.priority?.value || "",
        StatusID: formData.status,
        SectorID: formData.sector?.value || "",
        Grade: formData.grade?.value || "",
        Component: formData.component?.value || "",
        Author: formData.author.trim(),
        OriginPublisher: formData.originPublisher.trim(),
        OwnershipDTP: formData.ownershipDTP.trim(),
        AttachFiles: formData.file,
        Percentage: Number(formData.percentage),
        Version: formData.version,
        LstUserInvited: tmpEmps,
        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      log('[LOG] === onFormSubmit ===> ', params);
      if (isClone) {
        params.TaskID = "0";
        return dispatch(Actions.fFetchCreateTask(params, history));
      }
      if (!isUpdate) {
        params.TaskTypeID = createType;
        dispatch(Actions.fFetchCreateTask(params, history));
      } else {
        params.AttachFiles = formData.file?.id === "history" ? "" : formData.file;
        dispatch(Actions.fFetchUpdateTask(params, history));
      }
    }
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      dispatch(Actions.resetMasterData());
      let tmpDataUsers = masterState["usersByLogin"].map(item => {
        return {value: item.empID, label: item.empName};
      });
      let tmpDataTasks = masterState["subTasks"].map(item => {
        return {value: item.taskID, label: item.taskName, type: item.value};
      });
      let tmpDataSectors = masterState["projectSector"].map(item => {
        return {value: item.sectorID, label: item.sectorName};
      });
      let tmpDataGrades = masterState["projectGrade"].map(item => {
        return {value: item.gradeID, label: item.gradeName};
      });
      let tmpDataComponents = masterState["projectComponent"].map(item => {
        return {value: item.componentID, label: item.componentName};
      });
      let tmpDataPriority = masterState["projectPriority"].map(item => {
        return {value: item.priority, label: item.priorityName};
      });

      setDataSelect({
        subTasks: [...dataSelect.subTasks, ...tmpDataTasks],
        owners: [...dataSelect.owners, ...tmpDataUsers],
        sectors: [...dataSelect.sectors, ...tmpDataSectors],
        grades: [...dataSelect.grades, ...tmpDataGrades],
        components: [...dataSelect.components, ...tmpDataComponents],
        priority: [...dataSelect.priority, ...tmpDataPriority],
      });
      setLoading({main: false, submit: false});
    } else {
      dispatch(Actions.resetTask());
      let message = "success:create_task";
      if (type === "Update") message = "success:update_task";
      if (type === "Clone") message = "success:clone_task";
      toast(t(message), {type: "success"});
      onResetData();
      onClose(type);
      setLoading({main: false, submit: false});
    }
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    toast(error, {type: "error"});
    setLoading({main: false, submit: false});
  };

  const onDownloadAttachFile = () => {
    window.open(`${Configs.hostAPI}/${formData.file.name}`, "_blank");
  };

  /**
   ** LIFE CYCLE
   */
   useEffect(() => {
    if (loading.main && authState["successSignIn"] && show) {
      onGetMasterData();
    }
  }, [
    show,
    loading.main,
    authState["successSignIn"],
  ]);

  useEffect(() => {
    if (!loading.main && (isUpdate || isClone) && show) {
      onSetDataDetails(updateItem);
    }
    if (!show) {
      onResetData();
      clearErrors();
    }
  }, [
    show,
    loading.main,
    isUpdate,
    isClone,
  ]);

  useEffect(() => {
    if (loading.main && show) {
      if (!masterState["submittingGetAll"] && !masterState["submittingUsersByLogin"] && !masterState["submittingSubTasks"]) {
        if (masterState["successGetAll"] && masterState["successUsersByLogin"] && masterState["successSubTasks"] &&
          !masterState["errorGetAll"] && !masterState["errorUsersByLogin"] && !masterState["errorSubTasks"]) {
          return onSuccess("MasterData");
        }
        if (!masterState["successGetAll"] && !masterState["successUsersByLogin"] && !masterState["successSubTasks"] &&
          masterState["errorGetAll"] && masterState["errorUsersByLogin"] && masterState["errorSubTasks"]) {
          return onError(masterState["errorHelperUsersByLogin"]);
        }
      }
    }
  }, [
    show,
    loading.main,
    masterState["submittingGetAll"],
    masterState["submittingUsersByLogin"],
    masterState["submittingSubTasks"],
    masterState["successGetAll"],
    masterState["successUsersByLogin"],
    masterState["successSubTasks"],
    masterState["errorGetAll"],
    masterState["errorUsersByLogin"],
    masterState["errorSubTasks"],
  ]);

  useEffect(() => {
    if (loading.submit && ((!isUpdate && isClone) || (!isUpdate && !isClone))) {
      if (!projectState["submittingCreateTask"]) {
        if (projectState["successCreateTask"] && !projectState["errorCreateTask"]) {
          return onSuccess(isClone ? "Clone" : "Create");
        }
        if (!projectState["successCreateTask"] && projectState["errorCreateTask"]) {
          return onError(projectState["errorHelperCreateTask"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    projectState["submittingCreateTask"],
    projectState["successCreateTask"],
    projectState["errorCreateTask"],
  ]);

  useEffect(() => {
    if (loading.submit && isUpdate && !isClone) {
      if (!projectState["submittingUpdateTask"]) {
        if (projectState["successUpdateTask"] && !projectState["errorUpdateTask"]) {
          return onSuccess("Update");
        }
        if (!projectState["successUpdateTask"] && projectState["errorUpdateTask"]) {
          return onError(projectState["errorHelperUpdateTask"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    projectState["submittingUpdateTask"],
    projectState["successUpdateTask"],
    projectState["errorUpdateTask"],
  ]);

  /**
   ** RENDER
   */
  const formatTaskLabel = ({label, type, customAbbreviation}) => {
    let typeTask = "PHASE";
    if (type === 2) typeTask = "TASK";
    else if (type === 3) typeTask = "MILESTONE";

    return (
      <div style={{ display: "flex" }}>
        <span className="fw-bold" style={{color: Constants.TYPE_TASK_COLOR[typeTask]}}>
          {typeTask.toUpperCase()}
        </span>
        <span className="pl-2">{label}</span>
        <div style={{ marginLeft: "10px", color: "#ccc" }}>
          {customAbbreviation}
        </div>
      </div>
    );
  };

  const formatPriorityLabel = ({value, label, customAbbreviation}) => {
    return (
      <div style={{ display: "flex" }}>
        <span className={`text-${Constants.PRIORITY_TASK_COLOR[value]}`}>{label}</span>
        <div style={{ marginLeft: "10px", color: "#ccc" }}>
          {customAbbreviation}
        </div>
      </div>
    );
  };

  const disabled = loading.main || loading.submit;
  let typeTask = "PHASE";
  if (createType) {
    if (createType === 2) typeTask = "TASK";
    else if (createType === 3) typeTask = "MILESTONE";
  } else if (updateItem && (isUpdate || isClone)) {
    if (updateItem.taskTypeID === 2) typeTask = "TASK";
    else if (updateItem.taskTypeID === 3) typeTask = "MILESTONE";
  }
  return (
    <SimpleBar
      className={`nk-add-assets toggle-slide toggle-slide-right toggle-screen-any ${
        show ? "content-active" : ""
      }`}
    >
      <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
        <BlockHead>
          <BlockBetween>
            <BlockHeadContent>
              {!isUpdate && !isClone && (
                <BlockTitle tag="h4">
                  {t("task:add")} <span style={{color: Constants.TYPE_TASK_COLOR[typeTask]}}>
                    {typeTask}</span>
                </BlockTitle>
              )}
              {isUpdate && (
                <BlockTitle tag="h4">
                  {t("task:update")} <span style={{color: Constants.TYPE_TASK_COLOR[typeTask]}}>
                    {typeTask}</span>
                </BlockTitle>
              )}
              {isClone && (
                <BlockTitle tag="h4">
                  {t("task:clone")} <span style={{color: Constants.TYPE_TASK_COLOR[typeTask]}}>
                    {typeTask}</span>
                </BlockTitle>
              )}
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li className="nk-block-tools-opt">
                  <Button
                    className="toggle btn-icon d-md-none"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {disabled && (
                      <Spinner size="sm" color="light" />
                    )}
                    {!loading.main && !loading.submit && <Icon name="save" />}
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                    disabled={disabled}
                  >
                    {disabled && (
                      <Spinner className="mr-1" size="sm" color="light" />
                    )}
                    {!loading.main && !loading.submit && <Icon name="save" />}
                    <span>{t("common:save")}</span>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("task:informations_basic")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("task:name")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      ref={register({ required: t("validate:empty") })}
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      disabled={disabled}
                      value={formData.name}
                      placeholder={t("task:holder_name")}
                      onChange={onChangeInput}
                    />
                    {errors.name && (
                      <span className="invalid">{errors.name.message}</span>
                    )}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="subTask">
                      {t("task:sub_task")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="subTask"
                      isMulti={false}
                      isDisabled={disabled}
                      options={dataSelect.subTasks}
                      value={formData.subTask}
                      placeholder={t("task:holder_sub_task")}
                      formatOptionLabel={formatTaskLabel}
                      onChange={e => onChangeSelect({key: "subTask", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="description">
                      {t("project:description")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <textarea
                      className="no-resize form-control"
                      type="text"
                      id="description"
                      name="description"
                      disabled={disabled}
                      value={formData.description}
                      placeholder={t("project:holder_description")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Block>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("task:informations_people_time")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="owner">
                      {t("task:owner")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="owner"
                      isMulti={false}
                      isDisabled={disabled}
                      error={error.owner}
                      options={dataSelect.owners}
                      value={formData.owner}
                      placeholder={t("task:holder_owner")}
                      onChange={e => onChangeSelect({key: "owner", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="members">
                      {t("task:members")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="members"
                      isMulti={true}
                      isDisabled={disabled}
                      options={dataSelect.owners}
                      value={formData.members}
                      placeholder={t("task:holder_members")}
                      onChange={e => onChangeSelect({key: "members", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <Row>
                  <Col md="6">
                    <FormGroup className="form-group">
                      <label className="form-label" htmlFor="startDate">
                        {t("task:start_date")}
                      </label>
                      <DatePicker
                        selected={formData.startDate}
                        className="form-control date-picker"
                        disabled={disabled}
                        value={formData.startDate}
                        onChange={date => onChangeDate("startDate", date)}
                        customInput={<CustomDateInput />}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="form-group">
                      <label className="form-label" htmlFor="endDate">
                        {t("task:end_date")}
                      </label>
                      <DatePicker
                        selected={formData.endDate}
                        className="form-control date-picker"
                        disabled={disabled}
                        value={formData.endDate}
                        onChange={date => onChangeDate("endDate", date)}
                        customInput={<CustomDateInput />}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Block>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("task:informations_other")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="sector">
                      {t("task:sector")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="sector"
                      isMulti={false}
                      isDisabled={disabled}
                      options={dataSelect.sectors}
                      value={formData.sector}
                      placeholder={t("task:holder_sector")}
                      onChange={e => onChangeSelect({key: "sector", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="priority">
                      {t("task:priority")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="priority"
                      isMulti={false}
                      isDisabled={disabled}
                      error={error.priority}
                      options={dataSelect.priority}
                      value={formData.priority}
                      placeholder={t("task:holder_priority")}
                      formatOptionLabel={formatPriorityLabel}
                      onChange={e => onChangeSelect({key: "priority", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="grade">
                      {t("task:grade")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="grade"
                      isMulti={false}
                      isDisabled={disabled}
                      options={dataSelect.grades}
                      value={formData.grade}
                      placeholder={t("task:holder_grade")}
                      onChange={e => onChangeSelect({key: "grade", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="component">
                      {t("task:component")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="component"
                      isMulti={false}
                      isDisabled={disabled}
                      options={dataSelect.components}
                      value={formData.component}
                      placeholder={t("task:holder_component")}
                      onChange={e => onChangeSelect({key: "component", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="author">
                      {t("task:author")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      id="author"
                      name="author"
                      disabled={disabled}
                      value={formData.author}
                      placeholder={t("task:holder_author")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="ownershipDTP">
                      {t("task:owner_shipDTP")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      id="ownershipDTP"
                      name="ownershipDTP"
                      disabled={disabled}
                      value={formData.ownershipDTP}
                      placeholder={t("task:holder_owner_shipDTP")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="originPublisher">
                      {t("task:origin_publisher")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      className="form-control"
                      type="text"
                      id="originPublisher"
                      name="originPublisher"
                      disabled={disabled}
                      value={formData.originPublisher}
                      placeholder={t("task:holder_origin_publisher")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="file">
                      {t("task:file")}
                    </label>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className={`form-control-wrap flex-fill ${isUpdate && formData.file?.id === "history" && "mr-3"}`}>
                      <div className="custom-file">
                        <input
                          className="custom-file-input form-control"
                          id="file"
                          type="file"
                          multiple={false}
                          disabled={disabled}
                          onChange={onChangeFile}
                        />
                        <Label className="custom-file-label" htmlFor="file">
                          {!formData.file ? t("common:choose_file") : formData.file.name}
                        </Label>
                      </div>
                    </div>
                    {isUpdate && formData.file?.id === "history" && (
                      <Button
                        color="primary"
                        type="button"
                        disabled={disabled}
                        onClick={onDownloadAttachFile}
                      >
                        <Icon name="download"></Icon>
                        <span>{t("common:download")}</span>
                      </Button>
                    )}
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Block>
      </Form>
    </SimpleBar>
  );
};

export default AddEditTaskForm;
