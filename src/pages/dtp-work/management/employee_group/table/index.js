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
} from "../../../../../components/Component";
/** COMMON */
import {log} from "../../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../../redux/actions";

function TableEmployeeGroup(props) {
  const {t} = useTranslation();
  const {
    loadingForm,
    isWrite,
    history,
    commonState,
    authState,
    dataGroup,
    onUpdate,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const managementState = useSelector(({management}) => management);

  /** Use state */
  const [loading, setLoading] = useState(false);
  const [choosedGroup, setChoosedGroup] = useState(null);
  const [data, setData] = useState(dataGroup);

  /**
   ** FUNCTIONS
   */
  const onChangeInactive = group => {
    setLoading(true);
    setChoosedGroup(group.groupID);
    let params = {
      ...group,
      Inactive: !group.inactive,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchUpdateEmployeeGroup(params, history));
  };

  const onSuccess = () => {
    dispatch(Actions.resetEmployeeGroup());
    setChoosedGroup(null);
    setLoading(false);
    toast(t("success:update_employee_group"), {type: "success"});
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    dispatch(Actions.resetEmployeeGroup());
    setChoosedGroup(null);
    setLoading(false);
    toast(error, {type: "error"});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    setData(dataGroup);
  }, [dataGroup]);

  useEffect(() => {
    if (loading && choosedGroup) {
      if (!managementState["submittingUpdateEmpGro"]) {
        if (managementState["successUpdateEmpGro"] && !managementState["errorUpdateEmpGro"]) {
          return onSuccess();
        }
        if (!managementState["successUpdateEmpGro"] && managementState["errorUpdateEmpGro"]) {
          return onError(managementState["errorHelperUpdateEmpGro"]);
        }
      }
    }
  }, [
    loading,
    choosedGroup,
    managementState["submittingUpdateEmpGro"],
    managementState["successUpdateEmpGro"],
    managementState["errorUpdateEmpGro"],
  ])

  /**
   ** RENDER
   */
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow size="sm">
          <span className="fw-bold">{t("management:code_group")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:name_group")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("management:description")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:active")}</span>
        </DataTableRow>
        {isWrite && <DataTableRow className="nk-tb-col-tools" />}
      </DataTableHead>

      {(!loadingForm && data.length > 0)
        ? data.map((item, index) => {
          return (
            <DataTableItem key={item.groupID + "_emp_group_" + index}>
              <DataTableRow size="sm">
                <span className="tb-lead text-primary">#{item.groupID}</span>
              </DataTableRow>
              <DataTableRow>
                <span className={`${!item.inactive && "tb-lead"}`}>{item.groupName}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span>{item.description}</span>
              </DataTableRow>
              <DataTableRow>
                <div className="form-control-wrap">
                  <div className="custom-control custom-control-sm custom-checkbox">
                    <input
                      className="custom-control-input form-control"
                      id={`check_${item.groupID}`}
                      name={`check_${item.groupID}`}
                      type="checkbox"
                      disabled={loading || !isWrite}
                      checked={!item.inactive}
                      onChange={() => onChangeInactive(item)}
                    />
                    <label className="custom-control-label" htmlFor={`check_${item.groupID}`}>
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
                          <Icon name="more-h"/>
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
                                <Icon name="edit"/>
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

export default TableEmployeeGroup;
