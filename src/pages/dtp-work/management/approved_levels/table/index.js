import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
/** COMPONENTS */
import {
  DataTableHead,
  DataTableItem,
  DataTableRow,
  DataTableBody,
  Icon,
} from "../../../../../components/Component";

function TableApprovedLevels(props) {
  const {t} = useTranslation();
  const {
    disabled,
    loading,
    isWrite,
    dataLevels,
    onUpdate,
    onRemove,
  } = props;

  /** Use state */
  const [data, setData] = useState(dataLevels);

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    setData(dataLevels);
  }, [dataLevels]);

  /**
   ** RENDER
   */
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow>
          <span className="fw-bold">{t("management:code_line")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("management:description")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:group_functional")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:level_number") + " 1"}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:level_number") + " 2"}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:level_number") + " 3"}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:level_number") + " 4"}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:level_number") + " 5"}</span>
        </DataTableRow>
        {isWrite && <DataTableRow className="nk-tb-col-tools" />}
      </DataTableHead>

      {(!loading && data.length > 0)
        ? data.map((item, index) => {
          return (
            <DataTableItem key={item.absID + "_app_level_" + index}>
              <DataTableRow>
                <span className="tb-lead text-primary">{item.roleCode}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span>{item.roleName}</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{item.groupName}</span>
              </DataTableRow>
              {item.listLevel.length > 0 &&
                item.listLevel.map((itemL, indexL) => {
                  return (
                    <DataTableRow key={"item_level_" + indexL}>
                      <span className={`${itemL.fullName && "tb-lead"}`}>
                        {itemL.fullName || "-"}
                      </span>
                    </DataTableRow>
                  );
                })}
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
                                className="cursor-pointer link link-sm"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  !disabled && onUpdate(item);
                                }}
                              >
                                <Icon name="edit"/>
                                <span>{t("common:update")}</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                className="cursor-pointer link link-sm"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  !disabled && onRemove(item);
                                }}
                              >
                                <Icon name="trash"/>
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

export default TableApprovedLevels;
