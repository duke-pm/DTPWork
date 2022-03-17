import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {FrappeGantt} from 'frappe-gantt-react';
import {toast} from "react-toastify";
import moment from "moment";
/** COMPONENTS */
import Content from "layout/content/Content";
import Head from "layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  DataTable,
  TooltipComponent,
} from "components/Component";
/** COMMON */
import Routes from "route/routes";
import {log} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";

function GanttTasks({history}) {
  const {t} = useTranslation();
  const {projectID = null} = useParams();

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);
  const projectState = useSelector(({project}) => project);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    search: false,
    submit: false,
  });
  const [isWrite, setIsWrite] = useState(false);
  const [data, setData] = useState({
    list: [],
    count: 0,
  });

  /**
   ** FUNCTIONS
   */
  const onUnActiveChart = () => {
    history.replace(`${Routes.tasks}/${projectID}`);
  };

  const onHandleChangeDate = (task, start, end) => {
    if (isWrite && task.status !== 5 && task.status !== 7) {
      let newData = [
				...[],
				{
          TaskID: task.id,
          StartDate: moment(start).format('YYYY-MM-DD'),
          EndDate: moment(end).format('YYYY-MM-DD'),
        },
			];
      setLoading({...loading, submit: true});
      let params = {
        LstUpdateInfo: newData,
        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      dispatch(Actions.fFetchUpdateGanttTask(params, history));
    } else {
      toast(t("error:update_date_task"), {type: "error"});
    }
  };

  const onStartGetData = (
    statusID = null,
    ownerID = null,
    sectorID = null,
    search = "",
    page = 1,
  ) => {
    let params = {
      PrjID: projectID,
      StatusID: statusID,
      OwnerID: ownerID,
      SectorID: sectorID,
      Search: search,
      PageNum: page,
      PageSize: -1,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchListTaskAll(params, history));
  };

  const onSuccess = type => {
    dispatch(Actions.resetTask());
    if (type === "Gantt") {
      let tmpData = {...data};
      tmpData.list = projectState["ganttTasks"];
      setData(tmpData);
      setLoading({main: false, search: false, submit: false});
    }
    if (type === "Update") {
      toast(t("success:update_task"), {type: "success"});
      setLoading({...loading, search: true, submit: false});
      onStartGetData();
    }
  };

  const onError = error => {
    dispatch(Actions.resetTask());
    log('[LOG] === onError ===> ', error);
    toast(error, {type: "error"});
    setLoading({main: false, search: false, submit: false});
  };

  /**
   ** LIFE CYCLE
   */
   useEffect(() => {
    if (loading.main && authState["successSignIn"] && authState["menu"]) {
      let fMenuRequest = null;
      if (authState["menu"].length > 0) {
        for (let item of authState["menu"]) {
          if (item.subMenu && item.subMenu.length > 0) {
            fMenuRequest = item.subMenu.find(f => f.link === Routes.projects);
            if (fMenuRequest) {
              setIsWrite(fMenuRequest.isWrite);
              return onStartGetData();
            }
          }
        }
      }
      if (!fMenuRequest) onStartGetData();
    }
  }, [
    loading.main,
    authState["successSignIn"],
    authState["menu"],
  ]);

  useEffect(() => {
    if (loading.main || loading.search) {
      if (!projectState["submittingListTaskAll"]) {
        if (projectState["successListTaskAll"] && !projectState["errorListTaskAll"]) {
          return onSuccess("Gantt");
        }
        if (!projectState["successListTaskAll"] && projectState["errorListTaskAll"]) {
          return onError(projectState["errorHelperListTaskAll"]);
        }
      }
    }
  }, [
    loading.main,
    loading.search,
    projectState["submittingListTaskAll"],
    projectState["successListTaskAll"],
    projectState["errorListTaskAll"],
  ]);

  useEffect(() => {
    if (loading.submit) {
      if (!projectState["submittingUpdateGanttTask"]) {
        if (projectState["successUpdateGanttTask"] && !projectState["errorUpdateGanttTask"]) {
          return onSuccess("Update");
        }
        if (!projectState["successUpdateGanttTask"] && projectState["errorUpdateGanttTask"]) {
          return onError(projectState["errorHelperUpdateGanttTask"]);
        }
      }
    }
  }, [
    loading.submit,
    projectState["submittingUpdateGanttTask"],
    projectState["successUpdateGanttTask"],
    projectState["errorUpdateGanttTask"],
  ]);

  /**
   ** RENDER
   */
  const disabled = loading.main || loading.search || loading.submit;
  return (
    <React.Fragment>
      <Head title={t("project:main_title")} />

      <Content>
        {/** Header table */}
        <BlockHead size="sm">
          <BlockHeadContent>
            <BlockTitle tag="h4">{`${t("task:grant_chart")} #${projectID}`}</BlockTitle>
          </BlockHeadContent>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools"></div>
                <div className="card-tools mr-n1">
                  <ul className="btn-toolbar gx-1">
                    <li onClick={!disabled ? onUnActiveChart : undefined}>
                      <TooltipComponent
                        tag="a"
                        containerClassName="btn btn-trigger btn-icon"
                        id="unChart"
                        icon="list-ol"
                        direction="top"
                        text={t("task:list")}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              {data.list.length > 0 && (
                <FrappeGantt
                  tasks={data.list}
                  onDateChange={!disabled ? onHandleChangeDate : undefined}
                />
              )}
            </div>
          </DataTable>
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default GanttTasks;
