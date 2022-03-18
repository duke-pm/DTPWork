import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Form, FormGroup, Spinner} from "reactstrap";
import SimpleBar from "simplebar-react";
import {toast} from "react-toastify";
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
} from "../../../../../components/Component";
/** COMMON */
import {log} from "../../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../../redux/actions";

function AddEditForm(props) {
  const {t} = useTranslation();
  const {handleSubmit} = useForm();
  const {
    show,
    history,
    isUpdate,
    authState,
    commonState,
    updateItem,
    onClose,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const masterState = useSelector(({master}) => master);
  const managementState = useSelector(({management}) => management);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [error, setError] = useState({
    group: null,
    line: null,
    selUser1: null,
    selTitle1: null,
    selUser2: null,
    selTitle2: null,
    selUser3: null,
    selTitle3: null,
    selUser4: null,
    selTitle4: null,
    selUser5: null,
    selTitle5: null,
  });
  const [isChanged, setIsChanged] = useState(false);
  const [dataSelect, setDataSelect] = useState({
    groups: [],
    lines: [],
    employees: [],
    jobTitles: [],
  });
  const [formData, setFormData] = useState({
    id: -1,
    group: "",
    line: "",
    levels: [
      {
        LevelID: 1,
        employee: "",
        jobTitle: "",
      },
      {
        LevelID: 2,
        employee: "",
        jobTitle: "",
      },
      {
        LevelID: 3,
        employee: "",
        jobTitle: "",
      },
      {
        LevelID: 4,
        employee: "",
        jobTitle: "",
      },
      {
        LevelID: 5,
        employee: "",
        jobTitle: "",
      },
    ],
    description: "",
  });

  /**
   ** FUNCTIONS
   */
  const onChangeInput = e => {
    if (!isChanged) setIsChanged(true);
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onChangeSelect = e => {
    if (!isChanged) setIsChanged(true);
    setError({...error, [e.key]: null});
    setFormData({...formData, [e.key]: e.value});
  };

  const onChangeLevel = (index, e) => {
    if (!isChanged) setIsChanged(true);
    setError({...error, [e.key]: null});
    let tmpFormData = {...formData};
    if (e.key.search("selUser") !== -1) {
      tmpFormData.levels[index].employee = e.value;
    }
    if (e.key.search("selTitle") !== -1) {
      tmpFormData.levels[index].jobTitle = e.value;
    }
    setFormData(tmpFormData);
  };

  const onResetData = () => {
    setFormData({
      id: -1,
      group: "",
      line: "",
      levels: [
        {
          LevelID: 1,
          employee: "",
          jobTitle: "",
        },
        {
          LevelID: 2,
          employee: "",
          jobTitle: "",
        },
        {
          LevelID: 3,
          employee: "",
          jobTitle: "",
        },
        {
          LevelID: 4,
          employee: "",
          jobTitle: "",
        },
        {
          LevelID: 5,
          employee: "",
          jobTitle: "",
        },
      ],
      description: "",
    });
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "Roles,TypeGroups,TitleApproval,UserApproval",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onSetDataDetails = abs => {
    let tmpLevels = [], i = 0;
    for (i = 0; i < abs.listLevel.length; i++) {
      let newLevel = {
        LevelID: i + 1,
        employee: abs.listLevel[i].fullName
          ? {value: abs.listLevel[i].userID, label: abs.listLevel[i].fullName}
          : "",
        jobTitle: abs.listLevel[i].titleName
          ? {value: abs.listLevel[i].titleID, label: abs.listLevel[i].titleName}
          : "",
      }
      tmpLevels.push(newLevel);
    }

    setFormData({
      id: abs.absID,
      group: {value: abs.groupID, label: abs.groupName},
      line: abs.roleID
        ? {value: abs.roleID, label: abs.roleName}
        : "",
      description: abs.notes,
      levels: tmpLevels,
    });
    setLoading({...loading, main: false});
  };

  const onValidate = () => {
    let isError = false,
      tmpError = {
        group: null,
        line: null,
        selUser1: null,
        selTitle1: null,
        selUser2: null,
        selTitle2: null,
        selUser3: null,
        selTitle3: null,
        selUser4: null,
        selTitle4: null,
        selUser5: null,
        selTitle5: null,
      };
    if (!formData.group) {
      isError = true;
      tmpError.group = {};
      tmpError.group.message = t("validate:empty");
    }
    if (!formData.line) {
      isError = true;
      tmpError.line = {};
      tmpError.line.message = t("validate:empty");
    }
    if (!formData.levels[0].employee) {
      isError = true;
      tmpError.selUser1 = {};
      tmpError.selTitle1 = {};
      tmpError.selUser1.message = t("validate:empty");
      tmpError.selTitle1.message = t("validate:empty");
    } else {
      if (!formData.levels[1].jobTitle) {
        isError = true;
        tmpError.selTitle1 = {};
        tmpError.selTitle1.message = t("validate:empty");
      }
    }
    if (formData.levels[1].employee) {
      if (!formData.levels[1].jobTitle) {
        isError = true;
        tmpError.selTitle2 = {};
        tmpError.selTitle2.message = t("validate:empty");
      }
    }
    if (formData.levels[2].employee) {
      if (!formData.levels[2].jobTitle) {
        isError = true;
        tmpError.selTitle3 = {};
        tmpError.selTitle3.message = t("validate:empty");
      }
    }
    if (formData.levels[3].employee) {
      if (!formData.levels[3].jobTitle) {
        isError = true;
        tmpError.selTitle4 = {};
        tmpError.selTitle4.message = t("validate:empty");
      }
    }
    if (formData.levels[4].employee) {
      if (!formData.levels[4].jobTitle) {
        isError = true;
        tmpError.selTitle5 = {};
        tmpError.selTitle5.message = t("validate:empty");
      }
    }
    setError(tmpError);
    return isError;
  };

  const onFormSubmit = () => {
    let isError = onValidate();
    if (!isError) {
      setLoading({...loading, submit: true});
      let tmpLevels = [], i = 0;
      for (i = 0; i < formData.levels.length; i++) {
        let newLevel = {
          LevelID: i + 1,
          UserID: formData.levels[i].employee
            ? formData.levels[i].employee.value
            : "",
          TitleID: formData.levels[i].jobTitle
            ? formData.levels[i].jobTitle.value
            : "",
        }
        tmpLevels.push(newLevel);
      }

      let params = {
        AbsID: !isUpdate ? "0" : formData.id,
        GroupID: formData.group.value,
        RoleID: formData.line.value,
        Notes: formData.description.trim(),
        IsChanged: isChanged,
        Levels: tmpLevels,
        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      console.log('[LOG] === onFormSubmit ===> ', params);
      if (!isUpdate) {
        dispatch(Actions.fFetchCreateApprovedLevels(params, history));
      } else {
        dispatch(Actions.fFetchUpdateApprovedLevels(params, history));
      }
    }
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      let tmpDataGroups = masterState["typeGroups"].map(item => {
        return {value: item.groupID, label: item.groupName};
      });
      let tmpDataLines = masterState["roles"].map(item => {
        return {value: item.roleID, label: item.roleName};
      });
      let tmpDataEmployees = masterState["userApproval"].map(item => {
        return {value: item.empID, label: item.empName};
      });
      let tmpDataJobTitles = masterState["titleApproval"].map(item => {
        return {value: item.titleID, label: item.titleName};
      });
      setDataSelect({
        groups: [...dataSelect.groups, ...tmpDataGroups],
        lines: [...dataSelect.lines, ...tmpDataLines],
        employees: [...dataSelect.employees, ...tmpDataEmployees],
        jobTitles: [...dataSelect.jobTitles, ...tmpDataJobTitles],
      });
    } else {
      let message = "success:create_approved_levels";
      if (type === "Update") message = "success:update_approved_levels";
      toast(t(message), {type: "success"});
      onResetData();
      onClose(type);
    }
    setLoading({main: false, submit: false});
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    setLoading({main: false, submit: false});
    toast(error, {type: "error"});
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
    if (!loading.main && isUpdate && show) {
      onSetDataDetails(updateItem);
    }
  }, [
    show,
    loading.main,
    isUpdate,
  ]);

  useEffect(() => {
    if (loading.main && show) {
      if (!masterState["submittingGetAll"]) {
        if (masterState["successGetAll"] && !masterState["errorGetAll"]) {
          return onSuccess("MasterData");
        }
        if (!masterState["successGetAll"] && masterState["errorGetAll"]) {
          return onError(masterState["errorHelperGetAll"]);
        }
      }
    }
  }, [
    show,
    loading.main,
    masterState["submittingGetAll"],
    masterState["successGetAll"],
    masterState["errorGetAll"],
  ]);

  useEffect(() => {
    if (loading.submit && !isUpdate) {
      if (!managementState["submittingCreateApprovedLevels"]) {
        if (managementState["successCreateApprovedLevels"] && !managementState["errorCreateApprovedLevels"]) {
          return onSuccess("Create");
        }
        if (!managementState["successCreateApprovedLevels"] && managementState["errorCreateApprovedLevels"]) {
          return onError(managementState["errorHelperCreateApprovedLevels"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    managementState["submittingCreateApprovedLevels"],
    managementState["successCreateApprovedLevels"],
    managementState["errorCreateApprovedLevels"],
  ]);

  useEffect(() => {
    if (loading.submit && isUpdate) {
      if (!managementState["submittingUpdateApprovedLevels"]) {
        if (managementState["successUpdateApprovedLevels"] && !managementState["errorUpdateApprovedLevels"]) {
          return onSuccess("Update");
        }
        if (!managementState["successUpdateApprovedLevels"] && managementState["errorUpdateApprovedLevels"]) {
          return onError(managementState["errorHelperUpdateApprovedLevels"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    managementState["submittingUpdateApprovedLevels"],
    managementState["successUpdateApprovedLevels"],
    managementState["errorUpdateApprovedLevels"],
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
              {!isUpdate && (
                <BlockTitle tag="h4">{t("management:add_approved_levels")}</BlockTitle>
              )}
              {isUpdate && (
                <BlockTitle tag="h4">{t("management:update_approved_levels")}</BlockTitle>
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
            <h6 className="overline-title">{t("management:informations_line")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="group">
                      {t("management:group_functional")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="group"
                      isMulti={false}
                      isDisabled={disabled}
                      error={error.group}
                      options={dataSelect.groups}
                      value={formData.group}
                      placeholder={t("management:holder_group_functional")}
                      onChange={e => onChangeSelect({key: "group", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="line">
                      {t("management:informations_line")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <RSelect
                      name="line"
                      isMulti={false}
                      isDisabled={disabled}
                      error={error.line}
                      options={dataSelect.lines}
                      value={formData.line}
                      placeholder={t("management:holder_informations_line")}
                      onChange={e => onChangeSelect({key: "line", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="description">
                      {t("management:description")}
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
                      placeholder={t("management:holder_name_code_line")}
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
            <h6 className="overline-title">{t("management:informations_level")}</h6>
          </div>
          <div className="mt-3">
            {formData.levels.map((itemL, indexL) => {
              let isDisabled = false;
              if (disabled) isDisabled = true;
              if (!isDisabled && indexL !== 0) {
                if (!formData.levels[indexL - 1].employee || !formData.levels[indexL - 1].jobTitle) {
                  isDisabled = true;
                }
              }
              return (
                <Row className="g-3 align-items-center" key={`row_level_${indexL}`}>
                  <Col md="2">
                    <span className="fw-bold">
                      {`${t("management:level_number")} ${itemL.LevelID}`}
                    </span>
                    {indexL === 0 && <span className="text-danger">*</span>}
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <div className="form-control-wrap">
                        <RSelect
                          name={`selUser${itemL.LevelID}`}
                          isMulti={false}
                          isDisabled={isDisabled}
                          error={error[`selUser${itemL.LevelID}`]}
                          options={dataSelect.employees}
                          value={itemL.employee}
                          placeholder={t("management:holder_level")}
                          onChange={e => onChangeLevel(indexL, {key: `selUser${itemL.LevelID}`, value: e})}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <div className="form-control-wrap">
                        <RSelect
                          name={`selTitle${itemL.LevelID}`}
                          isMulti={false}
                          isDisabled={isDisabled}
                          error={error[`selTitle${itemL.LevelID}`]}
                          options={dataSelect.jobTitles}
                          value={itemL.jobTitle}
                          placeholder={t("management:holder_job_title_level")}
                          onChange={e => onChangeLevel(indexL, {key: `selTitle${itemL.LevelID}`, value: e})}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              );
            })}
          </div>
        </Block>
      </Form>
    </SimpleBar>
  );
};

export default AddEditForm;
