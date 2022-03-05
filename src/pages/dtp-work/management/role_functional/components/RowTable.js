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

function RowTable(props) {
  const {t} = useTranslation();
  const {
    index,
    data,
  } = props;

  /** Use state */
  const [viewChild, setViewChild] = useState(false);

  /**
   ** RENDER
   */
  console.log('[LOG] === RowTable ===> ', data);
  return (
    <DataTableItem key={data.menuID + "_menu_" + index}>
      <DataTableRow>
        <span className="tb-lead">{data.menuName}</span>
      </DataTableRow>
      <DataTableRow>
        <span className="tb-lead">{data.menuName}</span>
      </DataTableRow>
      <DataTableRow>
        <span className="tb-lead">{data.menuName}</span>
      </DataTableRow>
      <DataTableRow>
        <span className="tb-lead">{data.menuName}</span>
      </DataTableRow>
    </DataTableItem>
  );
};

export default RowTable;
