import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
/** COMPONENTS */
import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
} from "../../../../../components/Component";
import RowTable from "../components/RowTable";

function TableRoleFunctional(props) {
  const {t} = useTranslation();
  const {
    loading,
    disabled,
    dataRole,
  } = props;

  /** Use state */
  const [data, setData] = useState(dataRole);

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    setData(dataRole);
  }, [dataRole]);

  /**
   ** RENDER
   */
  let padding = 0;
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow className="nk-tb-col-check" />
        <DataTableRow>
          <span className="fw-bold">{t("management:name_menu")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:is_access")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:is_read")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("management:is_write")}</span>
        </DataTableRow>
      </DataTableHead>

      {data?.lstPermissionItem.length > 0
        ? data?.lstPermissionItem.map((item, index) => {
          return (
            <RowTable
              key={item.menuID + "_menu_" + index}
              className=""
              padding={padding}
              disabled={disabled}
              loading={loading}
              index={index}
              data={item}
              onChangeParent={null}
            />
          )})
        : null
      }
    </DataTableBody>
  );
};

export default TableRoleFunctional
