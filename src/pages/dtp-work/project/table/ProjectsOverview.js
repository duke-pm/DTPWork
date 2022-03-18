import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
/** COMPONENTS */
import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
} from "../../../../components/Component";
import RowProjectsOverview from "../components/RowProjectsOverview";

function TableProjectsOverview(props) {
  const {t} = useTranslation();
  const {
    disabled,
    dataProjects,
  } = props;

  /** Use state */
  const [data, setData] = useState(dataProjects);

  /**
   ** LIFE CYCLE
   */
   useEffect(() => {
    setData(dataProjects);
  }, [dataProjects]);

  /**
   ** RENDER
   */
  let padding = 0;
  return (
    <DataTableBody compact>
      <DataTableHead className="nk-tb-item">
        <DataTableRow className="nk-tb-col-check" />
        <DataTableRow>
          <span className="fw-bold">{t("project:name")}</span>
        </DataTableRow>
        <DataTableRow>
          <span className="fw-bold">{t("project:status")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("project:priority")}</span>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold">{t("project:start_end_date")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("task:progress")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("project:owner")}</span>
        </DataTableRow>
      </DataTableHead>

      {data.length > 0
        ? data.map((item, index) => {
          return (
            <RowProjectsOverview
              key={item.itemID + "_prj_" + index}
              className=""
              disabled={disabled}
              padding={padding}
              index={index}
              data={item}
            />
          )  
        })
        : null}
    </DataTableBody>
  );
};

export default TableProjectsOverview;
