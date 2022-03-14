import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
/** COMPONENTS */
import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
} from "components/Component";
import RowTask from "../components/RowTask";

function TableTask(props) {
  const {t} = useTranslation();
  const {
    isWrite,
    disabled,
    dataTasks,
    onOverview,
    onUpdate,
    onClone,
    onRemove,
  } = props;

  /** Use state */
  const [data, setData] = useState(dataTasks);

  /**
   ** LIFE CYCLE
   */
   useEffect(() => {
    setData(dataTasks);
  }, [dataTasks]);

  /**
   ** RENDER
   */
  let padding = 0;
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow className="nk-tb-col-check" />
        <DataTableRow>
          <span className="fw-bold">{t("task:name")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("task:type")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("task:status")}</span>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold">{t("task:priority")}</span>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold">{t("task:start_end_date")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("task:progress")}</span>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold">{t("task:assign")}</span>
        </DataTableRow>
        {isWrite && <DataTableRow className="nk-tb-col-tools" />}
      </DataTableHead>

      {data.length > 0
        ? data.map((item, index) => {
          return (
            <RowTask
              key={item.prjID + "_prj_" + index}
              className=""
              isWrite={isWrite}
              disabled={disabled}
              padding={padding}
              index={index}
              data={item}
              onOverview={onOverview}
              onUpdate={onUpdate}
              onClone={onClone}
              onRemove={onRemove}
            />
          )  
        })
        : null}
    </DataTableBody>
  );
};

export default TableTask;
