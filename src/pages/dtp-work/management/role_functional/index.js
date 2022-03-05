import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Spinner, FormGroup} from "reactstrap";
import {toast} from "react-toastify";
/** COMPONENTS */
import Content from "layout/content/Content";
import Head from "layout/head/Head";
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
  Row,
  Col,
} from "components/Component";
/** COMMON */
import Configs from "configs";
import Routes from "route/routes";
import {log} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";
import TableRoleFunctional from "./table";

function RoleFunctional(props) {
  const {t} = useTranslation();
  const history = useHistory();

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
  });
  const [isWrite, setIsWrite] = useState(false);
  const [dataSelect, setDataSelect] = useState({
    groups: [],
    employees: [],
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
  const onChangeSelect = e =>
    setFormData({...formData, [e.key]: e.value});

  const onGetMasterData = () => {
    let params = {
      ListType: "UserGroups,Users",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onStartGetData = () => {
    let params = {
      GroupID: 0,
      UserID: 0,
      IsWebOrMobile: 0,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchRoleList(params, history));
  };

  const onFilterRole = () => {
    
  };

  const onUpdateRole = () => {
  
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      let tmpDataGroups = masterState["userGroup"].map(item => {
        return {value: item.groupID, label: item.groupName};
      });
      let tmpDataEmployees = masterState["users"].map(item => {
        return {value: item.empID, label: item.empName};
      });
      setDataSelect({
        groups: [...dataSelect.groups, ...tmpDataGroups],
        employees: [...dataSelect.employees, ...tmpDataEmployees],
      });
    }
    if (type === "Search") {
      setData({...data, role: managementState["role"]["lstPermissionItem"][0]});
      setLoading({main: false, submit: false});
    }
    if (type === "Update") {
      toast(t("success:role_functional"), {type: "success"});
      setLoading({main: false, submit: false});
    }
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
    if (loading.main && authState["successSignIn"] && authState["menu"]) {
      let fMenuRequest = null;
      if (authState["menu"].length > 0) {
        for (let item of authState["menu"]) {
          if (item.subMenu && item.subMenu.length > 0) {
            fMenuRequest = item.subMenu.find(f => f.link === Routes.roleFunctional);
            if (fMenuRequest) {
              setIsWrite(fMenuRequest.isWrite);
              return onStartGetData();
            }
          }
        }
      }
      if (!fMenuRequest) onStartGetData();
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
    if (loading.main) {
      if (!masterState["submittingGetAll"]) {
        if (masterState["successGetAll"] && !masterState["errorGetAll"]) {
          return onSuccess("MasterData");
        }
        if (!masterState["successGetAll"] && masterState["errorGetAll"]) {
          return onError("MasterData", masterState["errorHelperGetAll"]);
        }
      }
    }
  }, [
    loading.main,
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

  /**
   ** RENDER
   */
  const disabled = loading.main || loading.search;
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
                        onClick={onUpdateRole}
                      >
                        <Icon name="save"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={onUpdateRole}
                      >
                        <Icon name="save"></Icon>
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
                    <li className="nk-block-tools-opt">
                      <Button
                        className="btn-dim toggle btn-icon d-md-none"
                        color="secondary"
                        onClick={onFilterRole}
                      >
                        <Icon name="filter"></Icon>
                      </Button>
                      <Button
                        className="btn-dim toggle d-none d-md-inline-flex"
                        color="secondary"
                        onClick={onFilterRole}
                      >
                        <Icon name="filter"></Icon>
                        <span>{t("common:filter")}</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/** Data table */}
            <TableRoleFunctional
              isWrite={isWrite}
              history={history}
              commonState={commonState}
              authState={authState}
              dataRole={data.role}
              onUpdate={onUpdateRole}
            />
          </DataTable>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default RoleFunctional;

