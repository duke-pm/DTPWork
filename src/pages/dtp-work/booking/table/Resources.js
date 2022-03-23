import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
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

function TableResource(props) {
  const {t} = useTranslation();
  const {
    loading,
    isWrite,
    dataResources,
    onUpdate,
    onRemove,
  } = props;

  /** Use state */
  const [data, setData] = useState(dataResources);

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    setData(dataResources);
  }, [dataResources]);

  /**
   ** RENDER
   */
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow>
          <span className="fw-bold">{t("resources:code")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("resources:name")}</span>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold">{t("resources:group")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("resources:created_user")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("resources:updated_time")}</span>
        </DataTableRow>
        {isWrite && <DataTableRow className="nk-tb-col-tools" />}
      </DataTableHead>

      {(!loading && data.length > 0)
        ? data.map((item, index) => {
          return (
            <DataTableItem key={item.resourceID + "_res_" + index}>
              <DataTableRow>
                <span className="tb-lead text-primary">#{item.resourceID}</span>
              </DataTableRow>
              <DataTableRow>
                <Badge
                  style={{backgroundColor: item.color}}
                  className="badge badge-dim badge-pill">
                  {item.resourceName}  
                </Badge>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>{item.groupName}</span>
              </DataTableRow>
              <DataTableRow size="md">
                <div className="user-card">
                  <UserAvatar className="sm" text={findUpper(item.crtdName)} />
                  <div className="user-info">
                    <span className="tb-lead">
                      {item.crtdName}
                    </span>
                  </div>
                </div>
              </DataTableRow>
              <DataTableRow size="md">
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

export default TableResource;
