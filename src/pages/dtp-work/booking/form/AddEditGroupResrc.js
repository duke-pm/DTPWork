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
} from "../../../../components/Component";
/** COMMON */
import {log} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

function AddEditGroupResrcForm(props) {
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
    icon: null,
  });
  const [dataSelect, setDataSelect] = useState({
    icons: [],
  });
  const [formData, setFormData] = useState({
    id: -1,
    name: "",
    description: "",
    icon: "",
  });

  /**
   ** FUNCTIONS
   */
  const onChangeInput = e =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const onChangeSelect = e => {
    if (error.icon) setError({icon: null});
    setFormData({...formData, icon: e});
  };

  const onResetData = () => {
    setFormData({
      id: -1,
      name: "",
      description: "",
      icon: "",
    });
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "BKIcon",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onSetDataDetails = group => {
    let fIcon = dataSelect.icons.find(f => f.label === group.icon);

    setFormData({
      id: group.groupID,
      name: group.groupName,
      description: group.descr,
      icon: fIcon?.value || "",
    });
    setLoading({...loading, main: false});
  };

  const onValidate = () => {
    let isError = false,
      tmpError = {icon: null};
    if (!formData.icon) {
      isError = true;
      tmpError.icon = {};
      tmpError.icon.message = t("validate:empty");
    }
    setError(tmpError);
    return isError;
  };

  const onFormSubmit = () => {
    let isError = onValidate();
    if (!isError) {
      setLoading({...loading, submit: true});
      let params = {
        GroupID: !isUpdate ? "0" : formData.id,
        GroupName: formData.name.trim(),
        Descr: formData.description.trim(),
        IconID: formData.icon,
        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      if (!isUpdate) {
        dispatch(Actions.fFetchCreateGroupResource(params, history));
      } else {
        dispatch(Actions.fFetchUpdateGroupResource(params, history));
      }
    }
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      dispatch(Actions.resetMasterData());
      let tmpDataIcons = masterState["bkIcon"].map(item => {
        return {value: item.iconID, label: item.label};
      });
      setDataSelect({
        icons: [...dataSelect.icons, ...tmpDataIcons],
      });
    } else {
      dispatch(Actions.resetResource());
      let message = "success:create_group_resource";
      if (type === "Update") message = "success:update_group_resource";
      toast(t(message), {type: "success"});
      onResetData();
      onClose(type);
    }
    setLoading({main: false, submit: false});
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    dispatch(Actions.resetMasterData());
    dispatch(Actions.resetResource());
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
      if (!bookingState["submittingCreateGroupResrc"]) {
        if (bookingState["successCreateGroupResrc"] && !bookingState["errorCreateGroupResrc"]) {
          return onSuccess("Create");
        }
        if (!bookingState["successCreateGroupResrc"] && bookingState["errorCreateGroupResrc"]) {
          return onError(bookingState["errorHelperCreateGroupResrc"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    bookingState["submittingCreateGroupResrc"],
    bookingState["successCreateGroupResrc"],
    bookingState["errorCreateGroupResrc"],
  ]);

  useEffect(() => {
    if (loading.submit && isUpdate) {
      if (!bookingState["submittingUpdateGroupResrc"]) {
        if (bookingState["successUpdateGroupResrc"] && !bookingState["errorUpdateGroupResrc"]) {
          return onSuccess("Update");
        }
        if (!bookingState["successUpdateGroupResrc"] && bookingState["errorUpdateGroupResrc"]) {
          return onError(bookingState["errorHelperUpdateGroupResrc"]);
        }
      }
    }
  }, [
    isUpdate,
    loading.submit,
    bookingState["submittingUpdateGroupResrc"],
    bookingState["successUpdateGroupResrc"],
    bookingState["errorUpdateGroupResrc"],
  ]);

  /**
   ** RENDER
   */
  const disabled = loading.main || loading.submit;
  return (
    <SimpleBar
      className={`nk-add-assets toggle-slide toggle-slide-right toggle-screen-any ${
        show ? "content-active" : ""
      }`}>
      <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
        <BlockHead>
          <BlockBetween>
            <BlockHeadContent>
              {!isUpdate && (
                <BlockTitle tag="h4">{t("group_resources:add_group")}</BlockTitle>
              )}
              {isUpdate && (
                <BlockTitle tag="h4">{t("group_resources:update_group")}</BlockTitle>
              )}
            </BlockHeadContent>
            <BlockHeadContent>
              <ul className="nk-block-tools g-3">
                <li className="nk-block-tools-opt">
                  <Button
                    className="toggle btn-icon d-md-none"
                    color="primary"
                    type="submit"
                    disabled={disabled}>
                    {disabled && <Spinner size="sm" color="light" />}
                    {!disabled && <Icon name="save" />}
                  </Button>
                  <Button
                    className="toggle d-none d-md-inline-flex"
                    color="primary"
                    type="submit"
                    disabled={disabled}>
                    {disabled && <Spinner size="sm" color="light" />}
                    {!disabled && <Icon name="save" />}
                    <span>{t("common:save")}</span>
                  </Button>
                </li>
              </ul>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <div className="data-head">
            <h6 className="overline-title">{t("group_resources:informations_basic")}</h6>
          </div>
          <div className="mt-3">
            <Row className="g-3">
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="name">
                      {t("group_resources:name")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <Icon name="building" />
                    </div>
                    <input
                      ref={register({required: t("validate:empty")})}
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      disabled={disabled}
                      value={formData.name}
                      placeholder={t("group_resources:holder_name")}
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
                      {t("group_resources:description")}
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
                      placeholder={t("group_resources:holder_description")}
                      onChange={onChangeInput}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col size="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="icon">
                      {t("group_resources:icon")} <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <ul className="custom-control-group">
                      {dataSelect.icons.map((itemI, indexI) => {
                        return (
                          <li key={`sel_icon_${indexI}`}>
                            <div className="custom-control custom-radio custom-control-pro no-control">
                              <input
                                type="radio"
                                className="custom-control-input"
                                name={`icon_${itemI.value}`}
                                id={`icon_${itemI.value}`}
                                disabled={disabled}
                                checked={formData.icon === itemI.value}
                                onChange={() => onChangeSelect(itemI.value)}
                              />
                              <label className="custom-control-label text-center" htmlFor={`icon_${itemI.value}`}>
                                <Icon
                                  name={itemI.label}
                                  className={formData.icon === itemI.value && "text-primary"}
                                />
                              </label>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {error.icon && (
                      <span className="invalid">{error.icon.message}</span>
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

export default AddEditGroupResrcForm;
