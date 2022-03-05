import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Spinner
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
} from "components/Component";
/** COMMON */
import {findUpper, log} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";
import RowTable from "../components/RowTable";

function TableRoleFunctional(props) {
  const {t} = useTranslation();
  const {
    isWrite,
    history,
    commonState,
    authState,
    dataRole,
    onUpdate,
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
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
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
              index={index}
              data={item}
            />
          )})
        : null
      }
    </DataTableBody>
  );
};

export default TableRoleFunctional
