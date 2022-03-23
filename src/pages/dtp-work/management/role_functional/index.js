import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {Spinner} from "reactstrap";
import {toast} from "react-toastify";
/** COMPONENTS */
import Content from "../../../../layout/content/Content";
import Head from "../../../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockBetween,
  BlockTitle,
  DataTable,
  Icon,
  Button,
  RSelect,
  Loading,
} from "../../../../components/Component";
import TableRoleFunctional from "./table";
/** COMMON */
import Routes from "../../../../route/routes";
import {checkIsWrite, log} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

function RoleFunctional({history}) {
  const {t} = useTranslation();

  /** Use redux */
  const dispatch = useDispatch();
  const masterState = useSelector(({master}) => master);
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);
  const managementState = useSelector(({management}) => management);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    search: false,
    update: false,
  });
  const [isWrite, setIsWrite] = useState(false);
  const [dataSelect, setDataSelect] = useState({
    groups: [],
    employees: [],
    employeesNotParse: [],
  });
  const [formData, setFormData] = useState({
    group: "",
    employee: "",
  });
  const [data, setData] = useState({
    role: null,
  });

  /**
   ** FUNCTIONS
   */
  const onChangeSelect = e => {
    if (e.key === "group") {
      setFormData({...formData, [e.key]: e.value});
      let fEmployees = dataSelect.employeesNotParse.filter(f =>
        f.group === e.value.value);
      if (fEmployees.length > 0) {
        setDataSelect({...dataSelect, employees: fEmployees});
      } else {
        setDataSelect({...dataSelect, employees: []});
      }
      setLoading({...loading, search: true});
      onStartGetData(e.value.value, 0);
    } else if (e.key === "employee") {
      setFormData({...formData, [e.key]: e.value});
      setLoading({...loading, search: true});
      onStartGetData(formData.group.value, e.value.value, 0);
    }
  };

  const onGetMasterData = () => {
    let params = {
      ListType: "UserGroups,Users",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onStartGetData = (
    groupID = 0,
    userID = 0,
  ) => {
    let params = {
      GroupID: groupID,
      UserID: userID,
      IsWebOrMobile: 0,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchRoleList(params, history));
  };

  const onUpdateRole = () => {
    setLoading({...loading, update: true});
    let tmpRole = managementState["role"];
    let params = {
      GroupID: formData.group?.value || 0,
      UserID: formData.employee?.value || 0,
      lstPermissionItem: tmpRole.lstPermissionItem,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchUpdateRole(params, history));
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      dispatch(Actions.resetMasterData());
      let tmpDataGroups = masterState["userGroup"].map(item => {
        return {value: item.groupID, label: item.groupName};
      });
      let tmpDataEmployees = masterState["users"].map(item => {
        return {value: item.empID, label: item.empName, group: item.groupID};
      });
      setDataSelect({
        ...dataSelect,
        employeesNotParse: [...dataSelect.employeesNotParse, ...tmpDataEmployees],
        groups: [...dataSelect.groups, ...tmpDataGroups],
      });
    }
    if (type === "Search") {
      dispatch(Actions.resetRole());
      setData({...data, role: managementState["role"]["lstPermissionItem"][0]});
      setLoading({main: false, submit: false, update: false});
    }
    if (type === "Update") {
      dispatch(Actions.resetRole());
      toast(t("success:update_role_functional"), {type: "success"});
      setLoading({main: false, submit: false, update: false});
    }
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    dispatch(Actions.resetMasterData());
    dispatch(Actions.resetRole());
    setLoading({main: false, submit: false, update: false});
    toast(error, {type: "error"});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    if (loading.main && authState["successSignIn"] && authState["menu"]) {
      let menu = checkIsWrite(authState["menu"], Routes.roleFunctional);
      if (menu) setIsWrite(menu.isWrite);
      return onStartGetData();
    }
  }, [
    loading.main,
    authState["successSignIn"],
    authState["menu"],
  ]);

  useEffect(() => {
    if (loading.main && authState["successSignIn"]) {
      onGetMasterData();
    }
  }, [
    loading.main,
    authState["successSignIn"],
  ]);

  useEffect(() => {
    if (!masterState["submittingGetAll"]) {
      if (masterState["successGetAll"] && !masterState["errorGetAll"]) {
        return onSuccess("MasterData");
      }
      if (!masterState["successGetAll"] && masterState["errorGetAll"]) {
        return onError("MasterData", masterState["errorHelperGetAll"]);
      }
    }
  }, [
    masterState["submittingGetAll"],
    masterState["successGetAll"],
    masterState["errorGetAll"],
  ]);

  useEffect(() => {
    if (loading.main || loading.search) {
      if (!managementState["submittingRole"]) {
        if (managementState["successRole"] && !managementState["errorRole"]) {
          return onSuccess("Search");
        }
        if (!managementState["successRole"] && managementState["errorRole"]) {
          return onError(managementState["errorHelperRole"]);
        }
      }
    }
  }, [
    loading.main,
    loading.search,
    managementState["submittingRole"],
    managementState["successRole"],
    managementState["errorRole"],
  ]);

  useEffect(() => {
    if (loading.update) {
      if (!managementState["submittingUpdateRole"]) {
        if (managementState["successUpdateRole"] && !managementState["errorUpdateRole"]) {
          return onSuccess("Update");
        }
        if (!managementState["successUpdateRole"] && managementState["errorUpdateRole"]) {
          return onError(managementState["errorHelperUpdateRole"]);
        }
      }
    }
  }, [
    loading.update,
    managementState["submittingUpdateRole"],
    managementState["successUpdateRole"],
    managementState["errorUpdateRole"],
  ]);

  /**
   ** RENDER
   */
  const disabled = loading.main || loading.search || loading.update;
  return (
    <React.Fragment>
      <Head title={t("management:title")} />

      <Content>
        {/** Header table */}
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle tag="h4">{t("management:role_functional")}</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <ul className="nk-block-tools g-3">
                  {isWrite && (
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        disabled={disabled || (!formData.group && !formData.employee)}
                        onClick={onUpdateRole}>
                        {loading.update && <Spinner color="light" size="sm" />}
                        {!loading.update && <Icon name="save" />}
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        disabled={disabled || (!formData.group && !formData.employee)}
                        onClick={onUpdateRole}>
                        {loading.update && <Spinner color="light" size="sm" />}
                        {!loading.update && <Icon name="save" />}
                        <span>{t("common:save")}</span>
                      </Button>
                    </li>
                  )}
                </ul>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        {/** Content table */}
        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools"></div>
                <div className="card-tools mr-n1">
                  <ul className="btn-toolbar gx-1">
                    <li className="nk-block-tools-opt" style={{width: "250px"}}>
                      <RSelect
                        name="group"
                        isMulti={false}
                        isDisabled={disabled}
                        options={dataSelect.groups}
                        value={formData.group}
                        placeholder={t("management:holder_employee_group")}
                        onChange={e => onChangeSelect({key: "group", value: e})}
                      />
                    </li>
                    <li className="nk-block-tools-opt" style={{width: "250px"}}>
                      <RSelect
                        name="employee"
                        isMulti={false}
                        isDisabled={disabled}
                        options={dataSelect.employees}
                        value={formData.employee}
                        placeholder={t("management:holder_employee_list")}
                        onChange={e => onChangeSelect({key: "employee", value: e})}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/** Data table */}
            <TableRoleFunctional
              loading={disabled}
              disabled={!formData.group}
              dataRole={data.role}
            />
          </DataTable>
        </Block>
      </Content>

      <Loading show={loading.main} />
    </React.Fragment>
  );
};

export default RoleFunctional;

