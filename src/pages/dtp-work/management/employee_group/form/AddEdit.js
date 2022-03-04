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
} from "components/Component";
/** COMMON */
import {log} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";

function AddEditForm(props) {
  const {t} = useTranslation();
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
  const managementState = useSelector(({management}) => management);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [formData, setFormData] = useState({
    id: -1,
    name: "",
    description: "",
    inactive: false,
  });

  /**
   ** FUNCTIONS
   */
  const onChangeInput = e =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onChangeCheckbox = () =>
    setFormData({...formData, inactive: !formData.inactive});

  const onResetData = () => {
    setFormData({
      id: -1,
      name: "",
      description: "",
      inactive: false,
    });
  };

  const onSetDataDetails = group => {
    setFormData({
      id: group.groupID,
      name: group.groupName,
      description: group.description,
      inactive: group.inactive,
    });
    setLoading({...loading, main: false});
  };

  const onFormSubmit = () => {
    setLoading({...loading, submit: true});
    let params = {
      GroupID: !isUpdate ? "0" : formData.id,
      GroupName: formData.name.trim(),
      Description: formData.description.trim(),
      Inactive: formData.inactive,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    if (!isUpdate) {
      dispatch(Actions.fFetchCreateEmployeeGroup(params, history));
    } else {
      dispatch(Actions.fFetchUpdateEmployeeGroup(params, history));
    }
  };

  const onSuccess = type => {
    setLoading({main: false, submit: false});
    let message = "success:create_employee_group";
    if (type === "Update") message = "success:update_employee_group";
    toast(t(message), {type: "success"});
    onResetData();
    onClose(type);
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
    if (show) {
      if (updateItem) {
        onSetDataDetails(updateItem);
      } else {
        onResetData();
        setLoading({...loading, main: false});
      }
    }
  }, [
    show,
    updateItem
  ]);

  useEffect(() => {
    if (loading.submit && !isUpdate) {
      if (!managementState["submittingCreateEmpGro"]) {
        if (managementState["successCreateEmpGro"] && !managementState["errorCreateEmpGro"]) {
          return onSuccess("Create");
        }
        if (!managementState["successCreateEmpGro"] && managementState["errorCreateEmpGro"]) {
          return onError(managementState["errorHelperCreateEmpGro"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    managementState["submittingCreateEmpGro"],
    managementState["successCreateEmpGro"],
    managementState["errorCreateEmpGro"],
  ]);

  useEffect(() => {
    if (loading.submit && isUpdate) {
      if (!managementState["submittingUpdateEmpGro"]) {
        if (managementState["successUpdateEmpGro"] && !managementState["errorUpdateEmpGro"]) {
          return onSuccess("Update");
        }
        if (!managementState["successUpdateEmpGro"] && managementState["errorUpdateEmpGro"]) {
          return onError(managementState["errorHelperUpdateEmpGro"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    managementState["submittingUpdateEmpGro"],
    managementState["successUpdateEmpGro"],
    managementState["errorUpdateEmpGro"],
  ]);

  /**
   ** RENDER
   */
  const {errors, register, handleSubmit} = useForm();
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
                <BlockTitle tag="h4">{t("management:add_employee_group")}</BlockTitle>
              )}
              {isUpdate && (
                <BlockTitle tag="h4">{t("management:update_employee_group")}</BlockTitle>
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
                      <Spinner className="mr-1" size="sm" color="light" />
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
            <h6 className="overline-title">{t("management:informations")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("management:name_group")} <span className="text-danger">*</span>
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
                      placeholder={t("management:holder_name_group")}
                      onChange={onChangeInput}
                    />
                    {errors.name && (
                      <span className="invalid">{errors.name.message}</span>
                    )}
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
                      placeholder={t("management:holder_description")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
              {isUpdate && (
                <Col md="4">
                  <FormGroup>
                    <div className="form-control-wrap">
                      <div className="custom-control custom-checkbox">
                        <input
                          className="custom-control-input form-control"
                          id="inactive"
                          name="inactive"
                          type="checkbox"
                          disabled={disabled}
                          checked={formData.inactive}
                          onChange={onChangeCheckbox}
                        />
                        <label className="custom-control-label" htmlFor="inactive">
                          {t("management:inactive")}
                        </label>
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              )}
            </Row>
          </div>
        </Block>
      </Form>
    </SimpleBar>
  );
};

export default AddEditForm;
