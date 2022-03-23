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

function TableMenu(props) {
  const {t} = useTranslation();
  const {
    loadingForm,
    isWrite,
    history,
    commonState,
    authState,
    dataMenu,
    onUpdate,
  } = props;

  /** Use redux */
  const dispatch = useDispatch();
  const managementState = useSelector(({management}) => management);

  /** Use state */
  const [loading, setLoading] = useState(false);
  const [choosedMenu, setChoosedMenu] = useState(null);
  const [data, setData] = useState(dataMenu);

  /**
   ** FUNCTIONS
   */
  const onChangeCheck = (type, id, menu) => {
    setLoading(true);
    setChoosedMenu(id);
    let params = {
      ...menu,
      Inactive: type === "inactive" ? !menu.inactive : menu.inactive,
      IsWeb: type === "web" ? !menu.isWeb : menu.isWeb,
      IsMobile: type === "mobile" ? !menu.isMobile : menu.isMobile,

      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchUpdateMenu(params, history));
  };

  const onSuccess = () => {
    dispatch(Actions.resetMenu());
    setChoosedMenu(null);
    setLoading(false);
    toast(t("success:update_menu"), {type: "success"});
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    dispatch(Actions.resetMenu());
    setChoosedMenu(null);
    setLoading(false);
    toast(error, {type: "error"});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    setData(dataMenu);
  }, [dataMenu]);

  useEffect(() => {
    if (loading && choosedMenu) {
      if (!managementState["submittingUpdateMenu"]) {
        if (managementState["successUpdateMenu"] && !managementState["errorUpdateMenu"]) {
          return onSuccess();
        }
        if (!managementState["successUpdateMenu"] && managementState["errorUpdateMenu"]) {
          return onError(managementState["errorHelperUpdateMenu"]);
        }
      }
    }
  }, [
    loading,
    choosedMenu,
    managementState["submittingUpdateMenu"],
    managementState["successUpdateMenu"],
    managementState["errorUpdateMenu"],
  ]);

  /**
   ** RENDER
   */
  let idChkInactive = "", idChkWeb = "", idChkMobile = "";
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow size="sm">
          <span className="fw-bold">{t("management:order")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:name_menu")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("management:type_menu")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("management:web_url_action")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("management:mobile_url_action")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:active")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:for_web")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:for_mobile")}</span>
        </DataTableRow>
        {isWrite && <DataTableRow className="nk-tb-col-tools" />}
      </DataTableHead>

      {(!loadingForm && data.length > 0)
        ? data.map((item, index) => {
          idChkInactive = `check_active_${item.menuID}`;
          idChkWeb = `check_web_${item.menuID}` ;
          idChkMobile = `check_mobile_${item.menuID}`;
          return (
            <DataTableItem key={item.menuID + "_menu_mana_" + index}>
              <DataTableRow size="sm">
                <span>{item.visOrder}</span>
              </DataTableRow>
              <DataTableRow>
                <span className={`${!item.inactive && "tb-lead"}`}>{item.menuName}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span>{item.typeName}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span>{item.url}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span>{item.mName}</span>
              </DataTableRow>
              <DataTableRow>
                <div className="form-control-wrap">
                  <div className="custom-control custom-control-sm custom-checkbox">
                    <input
                      className="custom-control-input form-control"
                      id={idChkInactive}
                      name={idChkInactive}
                      type="checkbox"
                      disabled={loading || !isWrite || item.typeID === 1}
                      checked={!item.inactive}
                      onChange={() => onChangeCheck("inactive", idChkInactive, item)}
                    />
                    <label className="custom-control-label" htmlFor={idChkInactive}>
                      {""}
                    </label>
                  </div>
                </div>
              </DataTableRow>
              <DataTableRow>
                <div className="form-control-wrap">
                  <div className="custom-control custom-control-sm custom-checkbox">
                    <input
                      className="custom-control-input form-control"
                      id={idChkWeb}
                      name={idChkWeb}
                      type="checkbox"
                      disabled={loading || !isWrite || item.typeID === 1 || item.inactive}
                      checked={item.isWeb}
                      onChange={() => onChangeCheck("web", idChkWeb, item)}
                    />
                    <label className="custom-control-label" htmlFor={idChkWeb}>
                      {""}
                    </label>
                  </div>
                </div>
              </DataTableRow>
              <DataTableRow>
                <div className="form-control-wrap">
                  <div className="custom-control custom-control-sm custom-checkbox">
                    <input
                      className="custom-control-input form-control"
                      id={idChkMobile}
                      name={idChkMobile}
                      type="checkbox"
                      disabled={loading || !isWrite || item.typeID === 1 || item.inactive}
                      checked={item.isMobile}
                      onChange={() => onChangeCheck("mobile", idChkMobile, item)}
                    />
                    <label className="custom-control-label" htmlFor={idChkMobile}>
                      {""}
                    </label>
                  </div>
                </div>
              </DataTableRow>
              {isWrite && (
                <DataTableRow className="nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1">
                    {item.typeID !== 1 && (
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
                    )}
                  </ul>
                </DataTableRow>
              )}
            </DataTableItem>
          );
        }) : null}
    </DataTableBody>
  );
};

export default TableMenu;
