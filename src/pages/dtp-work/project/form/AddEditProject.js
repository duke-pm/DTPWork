import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Form, FormGroup, Spinner} from "reactstrap";
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
import {log} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

const CustomDateInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-left">
      <Icon name="calendar"/>
    </div>
    <input
      className="form-control date-picker"
      type="text"
      value={moment(value).format("DD/MM/YYYY")}
      onChange={onChange}
    />
  </div>
));

function AddEditProjectForm(props) {
  const {t} = useTranslation();
  const {errors, register, clearErrors, handleSubmit} = useForm();
  const {
    show,
    history,
    isUpdate,
    isClone,
    authState,
    commonState,
    masterState,
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
  });
  const [dataSelect, setDataSelect] = useState({
    subProjects: [],
    owners: [],
  });
  const [formData, setFormData] = useState({
    id: -1,
    name: "",
    subProject: "",
    description: "",
    owner: "",
    members: "",
    isPublic: true,
    inspectionTime: new Date(),
    priority: "",
  });

  /**
   ** FUNCTIONS
   */
  const onChangeInput = e =>
  setFormData({...formData, [e.target.name]: e.target.value});

  const onChangeSelect = e => {
    if (error.owner) setError({owner: null});
    setFormData({...formData, [e.key]: e.value});
  };

  const onChangeInspectionTime = date => {
    setFormData({...formData, inspectionTime: date});
  };

  const onChangePublic = () => {
    setFormData({...formData, isPublic: !formData.isPublic});
  };

  const onResetData = () => {
    setFormData({
      id: -1,
      name: "",
      subProject: "",
      description: "",
      owner: "",
      members: "",
      isPublic: true,
      inspectionTime: new Date(),
      priority: "",
    });
  };

  const onGetMasterData = () => {
    let params = {
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchUsersByLogin(params, history));
    dispatch(Actions.fFetchSubProjects(params, history));
  };

  const onSetDataDetails = pj => {
    let fMembers = [], i = null, fMem = null;
    if (pj.lstUserInvited.length > 0) {
      for (i of pj.lstUserInvited) {
        fMem = dataSelect.owners.find(f => f.value === i.userID);
        if (fMem) fMembers.push(fMem);
      }
    }
    let fSubProject = null, fOwner = null;
    fOwner = dataSelect.owners.find(f => f.value === pj.owner);
    if (pj.prjParentID > 0) {
      fSubProject = dataSelect.subProjects.find(f =>
        f.value === pj.prjParentID);
    }

    setFormData({
      id: pj.prjID,
      name: (isClone ? t("project:copy_of") + " " : "") + pj.prjName,
      subProject: fSubProject || "",
      description: pj.descr,
      owner: fOwner || "",
      members: fMembers.length > 0 ? fMembers : "",
      isPublic: pj.isPublic,
      inspectionTime: pj.appraisalTime
        ? new Date(`${
          moment(pj.appraisalTime).year()
        }/${
          moment(pj.appraisalTime).month() + 1
        }/${
          moment(pj.appraisalTime).date()
        }`)
        : new Date(),
      priority: pj.priorityLevel > 0 ? pj.priorityLevel : "",
    });
  };

  const onValidate = () => {
    let isError = false,
      tmpError = {
        owner: null,
      };
    if (!formData.owner) {
      isError = true;
      tmpError.owner = {};
      tmpError.owner.message = t("validate:empty");
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
        PrjID: isUpdate ? formData.id : "0",
        PrjName: formData.name.trim(),
        PrjParentID: formData.subProject?.value || 0,
        Descr: formData.description.trim(),
        IsPublic: formData.isPublic,
        Owner: formData.owner?.value || 0,
        AppraisalTime: moment(formData.inspectionTime).format("YYYY/MM/DD"),
        PriorityLevel: formData.priority ? Number(formData.priority) : "",
        LstUserInvited: tmpEmps,
        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      log('[LOG] === onFormSubmit ===> ', params);
      if (isClone) {
        params.PrjID = "0";
        return dispatch(Actions.fFetchCreateProject(params, history));
      }
      if (!isUpdate) {
        dispatch(Actions.fFetchCreateProject(params, history));
      } else {
        dispatch(Actions.fFetchUpdateProject(params, history));
      }
    }
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      dispatch(Actions.resetMasterData());
      let tmpDataUsers = masterState["usersByLogin"].map(item => {
        return {value: item.empID, label: item.empName};
      });
      let tmpDataProjects = masterState["subProjects"].map(item => {
        return {value: item.prjID, label: item.prjName};
      });
      setDataSelect({
        subProjects: [...dataSelect.subProjects, ...tmpDataProjects],
        owners: [...dataSelect.owners, ...tmpDataUsers],
      });
      setLoading({main: false, submit: false});
    } else {
      dispatch(Actions.resetProject());
      let message = "success:create_project";
      if (type === "Update") message = "success:update_project";
      if (type === "Clone") message = "success:clone_project";
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
      if (!masterState["submittingUsersByLogin"] && !masterState["submittingSubProjects"]) {
        if (masterState["successUsersByLogin"] && masterState["successSubProjects"] &&
          !masterState["errorUsersByLogin"] && !masterState["errorSubProjects"]) {
          return onSuccess("MasterData");
        }
        if (!masterState["successUsersByLogin"] && !masterState["successSubProjects"] &&
          masterState["errorUsersByLogin"] && masterState["errorSubProjects"]) {
          return onError(masterState["errorHelperUsersByLogin"]);
        }
      }
    }
  }, [
    show,
    loading.main,
    masterState["submittingUsersByLogin"],
    masterState["submittingSubProjects"],
    masterState["successUsersByLogin"],
    masterState["successSubProjects"],
    masterState["errorUsersByLogin"],
    masterState["errorSubProjects"],
  ]);

  useEffect(() => {
    if (loading.submit && ((!isUpdate && isClone) || (!isUpdate && !isClone))) {
      if (!projectState["submittingCreateProject"]) {
        if (projectState["successCreateProject"] && !projectState["errorCreateProject"]) {
          return onSuccess(isClone ? "Clone" : "Create");
        }
        if (!projectState["successCreateProject"] && projectState["errorCreateProject"]) {
          return onError(projectState["errorHelperCreateProject"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    projectState["submittingCreateProject"],
    projectState["successCreateProject"],
    projectState["errorCreateProject"],
  ]);

  useEffect(() => {
    if (loading.submit && isUpdate && !isClone) {
      if (!projectState["submittingUpdateProject"]) {
        if (projectState["successUpdateProject"] && !projectState["errorUpdateProject"]) {
          return onSuccess("Update");
        }
        if (!projectState["successUpdateProject"] && projectState["errorUpdateProject"]) {
          return onError(projectState["errorHelperUpdateProject"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    projectState["submittingUpdateProject"],
    projectState["successUpdateProject"],
    projectState["errorUpdateProject"],
  ]);

  /**
   ** RENDER
   */
   const disabled = loading.main || loading.submit;
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
                <BlockTitle tag="h5">{t("project:add_project")}</BlockTitle>
              )}
              {isUpdate && (
                <BlockTitle tag="h5">{t("project:update_project")}</BlockTitle>
              )}
              {isClone && (
                <BlockTitle tag="h5">{t("project:clone_project")}</BlockTitle>
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
            <h6 className="overline-title">{t("project:informations_basic")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("project:name")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="code" />
                    </div>
                    <input
                      ref={register({ required: t("validate:empty") })}
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      disabled={disabled}
                      value={formData.name}
                      placeholder={t("project:holder_name")}
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
                    <label className="form-label" htmlFor="subProject">
                      {t("project:sub_project")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="subProject"
                      isMulti={false}
                      isDisabled={disabled}
                      options={dataSelect.subProjects}
                      value={formData.subProject}
                      placeholder={t("project:holder_sub_project")}
                      onChange={e => onChangeSelect({key: "subProject", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="owner">
                      {t("project:owner")} <span className="text-danger">*</span>
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
                      placeholder={t("project:holder_owner")}
                      onChange={e => onChangeSelect({key: "owner", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="members">
                      {t("project:members")}
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="members"
                      isMulti={true}
                      isDisabled={disabled}
                      options={dataSelect.owners}
                      value={formData.members}
                      placeholder={t("project:holder_members")}
                      onChange={e => onChangeSelect({key: "members", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input form-control"
                      id="isPublic"
                      disabled={disabled}
                      checked={formData.isPublic}
                      onChange={onChangePublic}
                    />
                    <label className="custom-control-label" htmlFor="isPublic">
                      {t("project:public")}
                    </label>
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </Block>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("project:informations_other")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
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
              {authState?.data?.userName === Configs.specialUserProject && (
                <>
                  <Col md="6">
                    <FormGroup className="form-group">
                      <label className="form-label" htmlFor="inspectionTime">
                        {t("project:inspection_time")}
                      </label>
                      <DatePicker
                        selected={formData.inspectionTime}
                        className="form-control date-picker"
                        disabled={disabled}
                        value={formData.inspectionTime}
                        onChange={onChangeInspectionTime}
                        customInput={<CustomDateInput />}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <div className="form-label-group">
                        <label className="form-label" htmlFor="priority">
                          {t("project:priority")}
                        </label>
                      </div>
                      <div className="form-control-wrap">
                        <input
                          className="form-control"
                          type="number"
                          id="priority"
                          name="priority"
                          min={1}
                          disabled={disabled}
                          value={formData.priority}
                          placeholder={t("project:holder_priority")}
                          onChange={onChangeInput}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </>
              )}
            </Row>
          </div>
        </Block>
      </Form>
    </SimpleBar>
   );
};

export default AddEditProjectForm;
