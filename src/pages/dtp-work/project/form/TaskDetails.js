import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import SimpleBar from "simplebar-react";
import {toast} from "react-toastify";
import classNames from "classnames";
/** COMPONENTS */
import Head from "../../../../layout/head/Head";
import Content from "../../../../layout/content/Content";
import ContentAlt from "../../../../layout/content/ContentAlt";
import {Row, Col, Icon, Button, Loading} from "../../../../components/Component";
import Overview from "./Overview";
import Activities from "./Activities";
/** COMMON */
import Routes from "../../../../route/routes";
import Constants from "../../../../utils/constants";
import {checkIsWrite, log} from "../../../../utils/Utils";
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
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState({
    sideBar: false,
  });
  const [isWrite, setIsWrite] = useState(false);
  const [data, setData] = useState({
    task: null,
  });

  /**
   ** FUNCTIONS
   */
  const toggleSideBar = () => {
    setView({...view, sideBar: !view.sideBar});
  };

  const resizeFunc = () => {
    if (window.innerWidth > 1550) {
      setView({...view, sideBar: true});
    } else {
      setView({...view, sideBar: false});
    }
  };

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
      setLoading(false);
    }
  };

  const onError = error => {
    dispatch(Actions.resetMasterData());
    dispatch(Actions.resetTask());
    log('[LOG] === onError ===> ', error);
    toast(error, {type: "error"});
    setLoading(false);
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    window.addEventListener("resize", resizeFunc);
    resizeFunc();
  }, []);

  useEffect(() => {
    if (loading && authState["successSignIn"] && authState["menu"]) {
      let menu = checkIsWrite(authState["menu"], Routes.projects);
      if (menu) setIsWrite(menu.isWrite);
      return onGetMasterData();
    }
  }, [
    loading,
    authState["successSignIn"],
    authState["menu"],
  ]);

  useEffect(() => {
    if (loading) {
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
    loading,
    masterState["submittingGetAll"],
    masterState["successGetAll"],
    masterState["errorGetAll"],
  ]);

  useEffect(() => {
    if (loading) {
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
    loading,
    projectState["submittingTaskDetails"],
    projectState["successTaskDetails"],
    projectState["errorTaskDetails"],
  ]);

  /**
   ** RENDER
   */
  const chatBodyClass = classNames({
    "nk-chat-body": true,
    "profile-shown": view.sideBar && window.innerWidth > 1550,
  });

  return (
    <React.Fragment>
      <Head title={t("project:main_title")} />

      {!loading && !data.task && (
        <Content>
          <Row className="row g-gs preview-icon-svg">
            <Col xs="2" md="2" lg="3">
              <Button
                color="light"
                outline
                className="bg-white d-none d-sm-inline-flex"
                onClick={onGoBack}>
                <Icon name="arrow-left"/>
                <span>{t("common:back")}</span>
              </Button>
              <Button
                color="light"
                outline
                className="btn-icon bg-white d-inline-flex d-sm-none"
                onClick={onGoBack}>
                <Icon name="arrow-left"/>
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

      {!loading && data.task && (
        <ContentAlt>
          <div className={chatBodyClass}>
            <Overview
              isLoading={loading}
              isWrite={isWrite}
              isSidebar={view.sideBar}
              history={history}
              commonState={commonState}
              authState={authState}
              masterState={masterState}
              projectState={projectState}
              onGoBack={onGoBack}
              toggleSideBar={toggleSideBar}
            />

            <SimpleBar className={`nk-chat-profile ${view.sideBar ? "visible" : ""}`}>
              <Activities
                isLoading={loading}
                isWrite={isWrite}
                history={history}
                commonState={commonState}
                authState={authState}
                taskID={data.task.taskID}
                projectState={projectState}
              />
            </SimpleBar>

            {window.innerWidth < 1550 && view.sideBar && (
              <div onClick={toggleSideBar} className="nk-chat-profile-overlay" />
            )}
          </div>
        </ContentAlt>
      )}

      <Loading show={loading} />
    </React.Fragment>
  );
};

export default TaskDetails;
