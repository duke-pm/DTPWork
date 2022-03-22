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
} from "../../../../components/Component";
/** COMMON */
import {log} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

function AddEditResrcForm(props) {
  const {t} = useTranslation();
  const {errors, register, clearErrors, handleSubmit} = useForm();
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
  const bookingState = useSelector(({booking}) => booking);
  const masterState = useSelector(({master}) => master);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [error, setError] = useState({
    color: null,
    group: null,
  });
  const [dataSelect, setDataSelect] = useState({
    colors: [],
    groups: [],
  });
  const [formData, setFormData] = useState({
    id: -1,
    name: "",
    description: "",
    group: "",
    color: "",
  });

  /**
   ** FUNCTIONS
   */
  const onChangeInput = e =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onChangeSelect = e => {
    setError({...error, [e.key]: null});
    setFormData({...formData, [e.key]: e.value});
  };

  const onChangeSelectColor = e => {
    if (error.color) setError({...error, color: null});
    setFormData({...formData, color: e});
  };

  const onResetData = () => {
    setFormData({
      id: -1,
      name: "",
      description: "",
      group: "",
      color: "",
    });
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "BKResourceGroup,BKColor",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onSetDataDetails = res => {
    let fIcon = dataSelect.colors.find(f => f.value === res.colorID);
    let fGroup = dataSelect.groups.find(f => f.value === res.groupID);

    setFormData({
      id: res.groupID,
      name: res.groupName,
      description: res.descr,
      group: fGroup || "",
      color: fIcon?.value || "",
    });
    setLoading({...loading, main: false});
  };

  const onValidate = () => {
    let isError = false,
      tmpError = {
        group: null,
        color: null,
      };
    if (!formData.group) {
      isError = true;
      tmpError.group = {};
      tmpError.group.message = t("validate:empty");
    }
    if (!formData.color) {
      isError = true;
      tmpError.color = {};
      tmpError.color.message = t("validate:empty");
    }
    setError(tmpError);
    return isError;
  };

  const onFormSubmit = () => {
    let isError = onValidate();
    if (!isError) {
      setLoading({...loading, submit: true});
      let params = {
        ResourceID: !isUpdate ? "0" : formData.id,
        ResourceName: formData.name.trim(),
        Descr: formData.description.trim(),
        GroupID: formData.group.value,
        ColorID: formData.color,
        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      if (!isUpdate) {
        dispatch(Actions.fFetchCreateResource(params, history));
      } else {
        dispatch(Actions.fFetchUpdateResource(params, history));
      }
    }
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      dispatch(Actions.resetMasterData());
      let tmpDataColors = masterState["bkColor"].map(item => {
        return {value: item.colorID, label: item.value};
      });
      let tmpDataGroups = masterState["bkResourceGroup"].map(item => {
        return {value: item.groupID, label: item.groupName};
      });
      setDataSelect({
        groups: [...dataSelect.groups, ...tmpDataGroups],
        colors: [...dataSelect.colors, ...tmpDataColors],
      });
    } else {
      let message = "success:create_resource";
      if (type === "Update") message = "success:update_resource";
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
    if (!show) {
      onResetData();
      clearErrors();
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
      if (!bookingState["submittingCreateResrc"]) {
        if (bookingState["successCreateResrc"] && !bookingState["errorCreateResrc"]) {
          return onSuccess("Create");
        }
        if (!bookingState["successCreateResrc"] && bookingState["errorCreateResrc"]) {
          return onError(bookingState["errorHelperCreateResrc"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    bookingState["submittingCreateResrc"],
    bookingState["successCreateResrc"],
    bookingState["errorCreateResrc"],
  ]);

  useEffect(() => {
    if (loading.submit && isUpdate) {
      if (!bookingState["submittingUpdateResrc"]) {
        if (bookingState["successUpdateResrc"] && !bookingState["errorUpdateResrc"]) {
          return onSuccess("Update");
        }
        if (!bookingState["successUpdateResrc"] && bookingState["errorUpdateResrc"]) {
          return onError(bookingState["errorHelperUpdateResrc"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    bookingState["submittingUpdateResrc"],
    bookingState["successUpdateResrc"],
    bookingState["errorUpdateResrc"],
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
                <BlockTitle tag="h4">{t("resources:add_resources")}</BlockTitle>
              )}
              {isUpdate && (
                <BlockTitle tag="h4">{t("resources:update_resources")}</BlockTitle>
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
            <h6 className="overline-title">{t("resources:informations_basic")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("resources:name")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="building" />
                    </div>
                    <input
                      ref={register({ required: t("validate:empty") })}
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      disabled={disabled}
                      value={formData.name}
                      placeholder={t("resources:holder_name")}
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
                    <label className="form-label" htmlFor="group">
                      {t("resources:group")} <span className="text-danger">*</span>
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
                      placeholder={t("resources:holder_group")}
                      onChange={e => onChangeSelect({key: "group", value: e})}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="description">
                      {t("resources:description")}
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
                      placeholder={t("resources:holder_description")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="icon">
                      {t("resources:color")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <ul className="custom-control-group">
                      {dataSelect.colors.map((itemI, indexI) => {
                        return (
                          <li key={`sel_color_${indexI}`}>
                            <div className="custom-control custom-radio custom-control-pro no-control">
                              <input
                                type="radio"
                                className="custom-control-input"
                                name={`color_${itemI.value}`}
                                id={`color_${itemI.value}`}
                                disabled={disabled}
                                checked={formData.color === itemI.value}
                                onChange={() => onChangeSelectColor(itemI.value)}
                              />
                              <label
                                className="custom-control-label dot dot-xl"
                                style={{ background: itemI.label, height: "40px" }}
                                htmlFor={`color_${itemI.value}`}
                              ></label>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {error.color && (
                      <span className="invalid">{error.color.message}</span>
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

export default AddEditResrcForm;
