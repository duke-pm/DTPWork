import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
/** COMPONENTS */
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import ContentAlt from "../../../../layout/content/ContentAlt";
import {Row, Col, Icon, Button} from "../../../../components/Component";
import Overview from "./Overview";
import Activities from "./Activities";
/** COMMON */
import Routes from "../../../../route/routes";
import Constants from "../../../../utils/constants";
import {log} from "../../../../utils/Utils";
/** REDUX */
import * as Actions from "../../../../redux/actions";

function TaskDetails({history}) {
  const {t} = useTranslation();
  const {taskID = null} = useParams();

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);
  const authState = useSelector(({auth}) => auth);
  const masterState = useSelector(({master}) => master);
  const projectState = useSelector(({project}) => project);

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    search: false,
  });
  const [isWrite, setIsWrite] = useState(false);
  const [data, setData] = useState({
    task: null,
  });

  /**
   ** FUNCTIONS
   */
  const onGoBack = () => history.goBack();

  const onGetMasterData = () => {
    let params = {
      ListType: "PrjStatus",
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    }
    dispatch(Actions.fFetchMasterData(params, history));
  };

  const onStartGetData = () => {
    let params = {
      TaskID: taskID,
      RefreshToken: authState["data"]["refreshToken"],
      Lang: commonState["language"],
    };
    dispatch(Actions.fFetchTaskDetails(params, history));
  };

  const onSuccess = type => {
    if (type === "MasterData") {
      dispatch(Actions.resetMasterData());
      onStartGetData();
    } else {
      dispatch(Actions.resetTask());
      setData({task: projectState["overview"]});
      setLoading({main: false, search: false});
    }
  };

  const onError = error => {
    dispatch(Actions.resetMasterData());
    dispatch(Actions.resetTask());
    log('[LOG] === onError ===> ', error);
    toast(error, {type: "error"});
    setLoading({main: false, search: false});
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
              return onGetMasterData();
            }
          }
        }
      }
      if (!fMenuRequest) {
        return onGetMasterData();
      }
    }
  }, [
    loading.main,
    authState["successSignIn"],
    authState["menu"],
  ]);

  useEffect(() => {
    if (loading.main) {
      if (!masterState["submittingGetAll"]) {
        if (masterState["successGetAll"] && !masterState["errorGetAll"]) {
          return onSuccess("MasterData");
        }
        if (!masterState["successGetAll"] && masterState["errorGetAll"]) {
          return onError(masterState["errorHelperGetAll"]);
        }
      }
    }
  }, [
    loading.main,
    masterState["submittingGetAll"],
    masterState["successGetAll"],
    masterState["errorGetAll"],
  ]);

  useEffect(() => {
    if (loading.main) {
      if (!projectState["submittingTaskDetails"]) {
        if (projectState["successTaskDetails"] && !projectState["errorTaskDetails"]) {
          return onSuccess();
        }
        if (!projectState["successTaskDetails"] && projectState["errorTaskDetails"]) {
          return onError(projectState["errorHelperTaskDetails"]);
        }
      }
    }
  }, [
    loading.main,
    projectState["submittingTaskDetails"],
    projectState["successTaskDetails"],
    projectState["errorTaskDetails"],
  ]);

  /**
   ** RENDER
   */
  return (
    <React.Fragment>
      <Head title={t("project:main_title")} />

      {!loading.main && !data.task && (
        <Content>
          <Row className="row g-gs preview-icon-svg">
            <Col xs="2" md="2" lg="3">
              <Button
                color="light"
                outline
                className="bg-white d-none d-sm-inline-flex"
                onClick={onGoBack}>
                <Icon name="arrow-left"></Icon>
                <span>{t("common:back")}</span>
              </Button>
              <Button
                color="light"
                outline
                className="btn-icon bg-white d-inline-flex d-sm-none"
                onClick={onGoBack}>
                <Icon name="arrow-left"></Icon>
              </Button>
            </Col>
            <Col xs="8" md="8" lg="6">
              <div className="preview-icon-box card card-bordered align-items-center">
                <div style={{height: 150, width: 150}}>
                  {Constants.SVG_ICON.RE_CHECK}
                </div>
                <span className="ff-italic fs-12px mt-2">
                  {t("task_details:no_information_task")}
                </span>
              </div>
            </Col>
            <Col xs="2" md="2" lg="3" />
          </Row>
        </Content>
      )}

      {!loading.main && data.task && (
        <ContentAlt>
          <Row className="g-0">
            <Col md="8">
              <Overview
                isLoading={loading.main}
                isWrite={isWrite}
                history={history}
                commonState={commonState}
                authState={authState}
                masterState={masterState}
                projectState={projectState}
                onGoBack={onGoBack}
              />
            </Col>

            <Col md="4" className="pl-0 pr-0">
              <div className="border-left">
                <Activities
                  isLoading={loading.main}
                  isWrite={isWrite}
                  history={history}
                  commonState={commonState}
                  authState={authState}
                  taskID={data.task.taskID}
                  projectState={projectState}
                />
              </div>
            </Col>
          </Row>
        </ContentAlt>
      )}
    </React.Fragment>
  );
};

export default TaskDetails;
