import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import {toast} from "react-toastify";
/** COMPONENTS */
import {
  DataTableHead,
  DataTableItem,
  DataTableRow,
  DataTableBody,
  Icon,
  UserAvatar,
} from "../../../../../components/Component";
/** COMMON */
import {findUpper, log} from "../../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../../redux/actions";

function TableEmployee(props) {
  const {t} = useTranslation();
  const {
    isWrite,
    history,
    commonState,
    authState,
    dataEmployee,
    onUpdate,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const managementState = useSelector(({management}) => management);

  /** Use state */
  const [loading, setLoading] = useState(false);
  const [choosedEmployee, setChoosedEmployee] = useState(null);
  const [data, setData] = useState(dataEmployee);

  /**
   ** FUNCTIONS
   */
  const onChangeInactive = employee => {
    setLoading(true);
    setChoosedEmployee(employee.userID);
    let params = {
      ...employee,
      Inactive: !employee.inactive,
      
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchUpdateEmployee(params, history));
  };

  const onSuccess = () => {
    dispatch(Actions.resetEmployee());
    setChoosedEmployee(null);
    setLoading(false);
    toast(t("success:update_employee"), {type: "success"});
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    dispatch(Actions.resetEmployee());
    setChoosedEmployee(null);
    setLoading(false);
    toast(error, {type: "error"});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    setData(dataEmployee);
  }, [dataEmployee]);

  useEffect(() => {
    if (loading && choosedEmployee) {
      if (!managementState["submittingUpdateEmp"]) {
        if (managementState["successUpdateEmp"] && !managementState["errorUpdateEmp"]) {
          return onSuccess();
        }
        if (!managementState["successUpdateEmp"] && managementState["errorUpdateEmp"]) {
          return onError(managementState["errorHelperUpdateEmp"]);
        }
      }
    }
  }, [
    loading,
    choosedEmployee,
    managementState["submittingUpdateEmp"],
    managementState["successUpdateEmp"],
    managementState["errorUpdateEmp"],
  ]);

  /**
   ** RENDER
   */
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow size="sm">
          <span className="fw-bold">{t("management:code_employee")}</span>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold">{t("management:username_employee")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:full_name_employee")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:group_employee")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:active")}</span>
        </DataTableRow>
        {isWrite && <DataTableRow className="nk-tb-col-tools" />}
      </DataTableHead>

      {data.length > 0
        ? data.map((item, index) => {
          return (
            <DataTableItem key={item.userID + "_emp_group_" + index}>
              <DataTableRow size="sm">
                <span className="tb-lead text-primary">#{item.userID}</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span className={`${!item.inactive && "tb-lead"}`}>{item.userName}</span>
              </DataTableRow>
              <DataTableRow>
                <div className="user-card">
                  <UserAvatar className="sm" text={findUpper(item.fullName)} />
                  <div className="user-info">
                    <span className={`tb-lead ${item.inactive && "text-gray"}`}>
                      {item.fullName}
                    </span>
                    <span className={`ff-italic fs-10px ${item.inactive && "text-gray"}`}>
                      {item.email}
                    </span>
                  </div>
                </div>
              </DataTableRow>
              <DataTableRow>
                <span>{item.groupName}</span>
              </DataTableRow>
              <DataTableRow>
                <div className="form-control-wrap">
                  <div className="custom-control custom-control-sm custom-checkbox">
                    <input
                      className="custom-control-input form-control"
                      id={`check_${item.userID}`}
                      name={`check_${item.userID}`}
                      type="checkbox"
                      disabled={loading || !isWrite}
                      checked={!item.inactive}
                      onChange={() => onChangeInactive(item)}
                    />
                    <label className="custom-control-label" htmlFor={`check_${item.userID}`}>
                      {""}
                    </label>
                  </div>
                </div>
              </DataTableRow>
              {isWrite && (
                <DataTableRow className="nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                          <Icon name="more-h"></Icon>
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#actions"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  !loading && onUpdate(item);
                                }}
                              >
                                <Icon name="edit"></Icon>
                                <span>{t("common:update")}</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </DataTableRow>
              )}
            </DataTableItem>
        )})
        : null}
    </DataTableBody>
  );
};

export default TableEmployee;
