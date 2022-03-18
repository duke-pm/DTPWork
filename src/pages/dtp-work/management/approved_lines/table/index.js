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

function TableApprovedLines(props) {
  const {t} = useTranslation();
  const {
    isWrite,
    history,
    commonState,
    authState,
    dataLines,
    onUpdate,
    onRemove,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const managementState = useSelector(({management}) => management);

  /** Use state */
  const [loading, setLoading] = useState(false);
  const [choosedLines, setChoosedLines] = useState(null);
  const [data, setData] = useState(dataLines);

  /**
   ** FUNCTIONS
   */
  const onChangeInactive = line => {
    setLoading(true);
    setChoosedLines(line.roleID);
    let params = {
      ...line,
      Inactive: !line.inactive,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchUpdateApprovedLines(params, history));
  };

  const onSuccess = () => {
    dispatch(Actions.resetApprovedLines());
    setChoosedLines(null);
    setLoading(false);
    toast(t("success:update_approved_lines"), {type: "success"});
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    dispatch(Actions.resetApprovedLines());
    setChoosedLines(null);
    setLoading(false);
    toast(error, {type: "error"});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    setData(dataLines);
  }, [dataLines]);

  useEffect(() => {
    if (loading && choosedLines) {
      if (!managementState["submittingApprovedLines"]) {
        if (managementState["successUpdateApprovedLines"] && !managementState["errorUpdateApprovedLines"]) {
          return onSuccess();
        }
        if (!managementState["successUpdateApprovedLines"] && managementState["errorUpdateApprovedLines"]) {
          return onError(managementState["errorHelperUpdateApprovedLines"]);
        }
      }
    }
  }, [
    loading,
    choosedLines,
    managementState["submittingApprovedLines"],
    managementState["successUpdateApprovedLines"],
    managementState["errorUpdateApprovedLines"],
  ])

  /**
   ** RENDER
   */
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow size="sm">
          <span className="fw-bold">{t("management:code_line")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:description")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:active")}</span>
        </DataTableRow>
        {isWrite && <DataTableRow className="nk-tb-col-tools" />}
      </DataTableHead>

      {data.length > 0
        ? data.map((item, index) => {
          return (
            <DataTableItem key={item.roleID + "_app_line_" + index}>
              <DataTableRow size="sm">
                <span className="tb-lead text-primary">{item.roleCode}</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{item.roleName}</span>
              </DataTableRow>
              <DataTableRow>
                <div className="form-control-wrap">
                  <div className="custom-control custom-control-sm custom-checkbox">
                    <input
                      className="custom-control-input form-control"
                      id={`check_${item.roleID}`}
                      name={`check_${item.roleID}`}
                      type="checkbox"
                      disabled={loading || !isWrite}
                      checked={!item.inactive}
                      onChange={() => onChangeInactive(item)}
                    />
                    <label className="custom-control-label" htmlFor={`check_${item.roleID}`}>
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
                                href="#update"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  !loading && onUpdate(item);
                                }}
                              >
                                <Icon name="edit"></Icon>
                                <span>{t("common:update")}</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                href="#remove"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  !loading && onRemove(item);
                                }}
                              >
                                <Icon name="trash"></Icon>
                                <span>{t("common:remove")}</span>
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

export default TableApprovedLines;
