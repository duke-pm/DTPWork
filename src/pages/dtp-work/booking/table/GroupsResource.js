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
  UserAvatar,
} from "../../../../components/Component";
/** COMMON */
import {findUpper} from "../../../../utils/Utils";

function TableGroupResource(props) {
  const {t} = useTranslation();
  const {
    loading,
    isWrite,
    dataGroups,
    onUpdate,
    onRemove,
  } = props;

  /** Use state */
  const [data, setData] = useState(dataGroups);

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    setData(dataGroups);
  }, [dataGroups]);

  /**
   ** RENDER
   */
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow>
          <span className="fw-bold">{t("group_resources:code")}</span>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold">{t("group_resources:icon")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("group_resources:name")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("group_resources:description")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("group_resources:created_user")}</span>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold">{t("group_resources:updated_time")}</span>
        </DataTableRow>
        {isWrite && <DataTableRow className="nk-tb-col-tools" />}
      </DataTableHead>

      {(!loading && data.length > 0)
        ? data.map((item, index) => {
          return (
            <DataTableItem key={item.groupID + "_gro_res_" + index}>
              <DataTableRow>
                <span className="tb-lead text-primary">#{item.groupID}</span>
              </DataTableRow>
              <DataTableRow>
                <Icon name={item.icon} />
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{item.groupName}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span>{item.descr}</span>
              </DataTableRow>
              <DataTableRow>
                <div className="user-card">
                  <UserAvatar className="sm" text={findUpper(item.crtdName)} />
                  <div className="user-info">
                    <span className="tb-lead">
                      {item.crtdName}
                    </span>
                  </div>
                </div>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>{item.strCrtdDate}</span>
              </DataTableRow>
              {isWrite && (
                <DataTableRow className="nk-tb-col-tools">
                  <ul className="nk-tb-actions gx-1">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="btn btn-icon dropdown-toggle btn-trigger">
                          <Icon name="more-h" />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                className="cursor-pointer link link-sm"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  !loading && onUpdate(item);
                                }}>
                                <Icon name="edit" />
                                <span>{t("common:update")}</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                className="cursor-pointer link link-sm"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                  !loading && onRemove(item);
                                }}>
                                <Icon name="trash" />
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

export default TableGroupResource;
