import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
/** COMPONENTS */
import {
  DataTableHead,
  DataTableRow,
  DataTableBody,
} from "../../../../components/Component";
import RowProject from "../components/RowProject";
/** COMMON */
import Configs from "../../../../configs";
import Routes from "../../../../services/routesApi";
import {getCookies} from "../../../../utils/Utils";

function TableProject(props) {
  const {t} = useTranslation();
  const {
    isWrite,
    disabled,
    dataProjects,
    onDetails,
    onUpdate,
    onClone,
    onRemove,
  } = props;

  /** Use state */
  const [data, setData] = useState(dataProjects);

  /**
   ** FUNCTIONS
   */
  const onExportExecl = pj => {
    let tmpAccessToken = getCookies("access_token");
    if (tmpAccessToken) {
      let params = {
        UserToken: tmpAccessToken,
        PrjID: pj.prjID,
      }
      window.location = `${Configs.hostAPI}/${Configs.prefixAPI}${
        Routes.PROJECT.EXPORT_PROJECT
      }?value=${JSON.stringify(params)}`;
    }
	};

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
          <span className="fw-bold">{t("project:public")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("project:priority")}</span>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold">{t("project:start_end_date")}</span>
        </DataTableRow>
        <DataTableRow size="md">
          <span className="fw-bold">{t("project:inspection")}</span>
        </DataTableRow>
        <DataTableRow size="sm">
          <span className="fw-bold">{t("project:owner")}</span>
        </DataTableRow>
        {isWrite && <DataTableRow className="nk-tb-col-tools" />}
      </DataTableHead>

      {data.length > 0
        ? data.map((item, index) => {
          return (
            <RowProject
              key={item.prjID + "_prj_" + index}
              className=""
              isWrite={isWrite}
              disabled={disabled}
              padding={padding}
              index={index}
              data={item}
              onDetails={onDetails}
              onUpdate={onUpdate}
              onClone={onClone}
              onExport={onExportExecl}
              onRemove={onRemove}
            />
          )  
        })
        : null}
    </DataTableBody>
  );
};

export default TableProject;
