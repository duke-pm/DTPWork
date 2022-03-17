import React, {useRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import classNames from "classnames";
import SimpleBar from "simplebar-react";
import {Spinner} from "reactstrap";
import {toast} from "react-toastify";
import moment from "moment";
import "moment/locale/vi";
import "moment/locale/en-sg";
/** COMPONENTS */
import {
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
} from "components/Component";
import {
  MeChat,
  MetaChat,
  YouChat,
} from "../components/CommentPartials";
/** COMMON */
import {log} from "utils/Utils";
/** REDUX */
import * as Actions from "redux/actions";

function Activities(props) {
  const {t} = useTranslation();
  const {
    isLoading,
    isWrite,
    history,
    commonState,
    authState,
    taskID,
    projectState,
  } = props;
  moment.locale(commonState["language"]);

  const messagesEndRef = useRef(null);

  /** Use redux */
  const dispatch = useDispatch();

  /** Use state */
  const [loading, setLoading] = useState({
    submit: false,
  });
  const [chatView, setChatView] = useState(false);
  const [data, setData] = useState({
    activities: [],
  });
  const [inputText, setInputText] = useState("");

  /**
   ** FUNCTIONS
   */
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const scrollHeight = messagesEndRef.current.scrollHeight;
      const height = messagesEndRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messagesEndRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  const onChangeInput = e => {
    setInputText(e.target.value);
  };

  const onStartComment = () => {
    setChatView(true);
  };

  const onTextSubmit = () => {
    if (inputText.trim() !== "") {
      setLoading({submit: true});
      setInputText("");
      let params = {
        LineNum: 0,
        TaskID: taskID,
        Comments: inputText.trim(),
        RefreshToken: authState["data"]["refreshToken"],
        Lang: commonState["language"],
      };
      dispatch(Actions.fFetchCreateComment(params, history));
    }
  };

  const onPrepareComment = () => {
    let tmpActivities = [], newCm = {}, tmpPrevItem, tmpCurrItem, tmpNextItem;
    for (let i = 0; i < projectState.activities.length; i++) {
      newCm = {};
      tmpPrevItem = projectState.activities[i - 1];
      tmpCurrItem = projectState.activities[i];
      tmpNextItem = projectState.activities[i + 1];

      if (tmpNextItem) {
        if (moment(tmpCurrItem.timeUpdate.split(" - ")[0], "DD/MM/YYYY").isBefore(
            moment(tmpNextItem.timeUpdate.split(" - ")[0], "DD/MM/YYYY")
          , "days")) {
          newCm.meta = {
            metaID: "meta_" + i,
            metaText: moment(tmpNextItem.timeUpdate, "DD/MM/YYYY - HH:mm").format("dddd - DD/MM/YYYY"),
          };
        }
      }

      if (tmpPrevItem && tmpPrevItem.userName === tmpCurrItem.userName && !tmpActivities[i - 1].meta) {
        newCm.chat = tmpActivities[i - 1].chat.concat([tmpCurrItem.comments]);
        newCm.show = true;
        tmpActivities[i - 1].show = false;
      } else {
        newCm.chat = [tmpCurrItem.comments];
        newCm.show = true;
        
      }
      if (authState["data"]["userName"] === tmpCurrItem.userName) {
        newCm.me = true;
      } else {
        newCm.me = false;
      }
      newCm.id = tmpCurrItem.rowNum;
      newCm.fullName = tmpCurrItem.fullName;
      newCm.date = tmpCurrItem.timeUpdate;
      tmpActivities.push(newCm);
    }
    setData({activities: tmpActivities});
    setChatView(true);
  };

  const onSuccess = type => {
    if (type === "Comment") {
      dispatch(Actions.resetTask());
      onPrepareComment();
      setLoading({submit: false});
    }
  };

  const onError = error => {
    log('[LOG] === onError ===> ', error);
    dispatch(Actions.resetTask());
    toast(error, {type: "error"});
    setLoading({submit: false});
  };

  /**
   ** LIFE CYCLE
   */
  useEffect(() => {
    scrollToBottom();
  }, [data.activities]);

  useEffect(() => {
    if (projectState) {
      if (projectState.activities.length > 0) {
        onPrepareComment();
      } else {
        setData({activities: []});
        setChatView(false);
      }
    }
  }, [
    projectState,
    projectState.activities,
  ]);

  useEffect(() => {
    if (loading.submit) {
      if (!projectState["submittingCreateComment"]) {
        if (projectState["successCreateComment"] && !projectState["errorCreateComment"]) {
          return onSuccess("Comment");
        }
        if (!projectState["successCreateComment"] && projectState["errorCreateComment"]) {
          return onError(projectState["errorHelperCreateComment"]);
        }
      }
    }
  }, [
    loading.submit,
    projectState["submittingCreateComment"],
    projectState["successCreateComment"],
    projectState["errorCreateComment"],
  ]);

  /**
   ** RENDER
   */
  const disabled = isLoading || loading.submit || !isWrite;
  if (isLoading) {
    return (
      <React.Fragment>
        <div className="text-center my-2">
          <Spinner color="primary" size="sm" />
        </div>
      </React.Fragment>
    );
  };
  const chatBodyClass = classNames({
    "nk-chat-body": true,
    "show-chat": false,
  });
  return (
    <div className="nk-chat">
      {!chatView && data.activities.length === 0 && (
        <div className="nk-chat-body">
          <div className="nk-chat-blank">
            <div className="nk-chat-blank-icon">
              <Icon name="chat" className="icon-circle icon-circle-xxl bg-white"></Icon>
            </div>
            <div className="nk-chat-blank-btn">
              <Button color="primary" disabled={disabled} onClick={onStartComment}>
                {t("task_details:start_comment")}
              </Button>
            </div>
          </div>
        </div>
      )}
      {chatView && (
        <div className={chatBodyClass}>
          <div className="nk-chat-editor border-bottom">
            <BlockHead size="sm">
              <BlockHeadContent>
                <BlockTitle tag="h4">{t("task:activities")}</BlockTitle>
              </BlockHeadContent>
            </BlockHead>
          </div>
          <SimpleBar className="nk-chat-panel" scrollableNodeProps={{ ref: messagesEndRef }}>
            {data.activities.map((item, idx) => {
              if (!item.show && !item.meta) return;
              if (item.me) {
                return (
                  <div key={item.id + "_" + idx}>
                    <MeChat idx={idx} item={item}></MeChat>
                    {item.meta && <MetaChat item={item.meta.metaText}></MetaChat>}
                  </div>
                );
              } else {
                return (
                  <div key={item.id + "_" + idx}>
                    <YouChat idx={idx} item={item}></YouChat>
                    {item.meta && <MetaChat item={item.meta.metaText}></MetaChat>}
                  </div>
                );
              }
            })}
          </SimpleBar>
          <div className="nk-chat-editor">
            <div className="nk-chat-editor-form">
              <div className="form-control-wrap">
                <textarea
                  className="form-control form-control-simple no-resize"
                  rows="1"
                  disabled={disabled}
                  id="inputComment"
                  name="inputComment"
                  value={inputText}
                  placeholder={t("task_details:holder_message")}
                  onKeyDown={(e) => {
                    e.code === "Enter" && onTextSubmit();
                  }}
                  onChange={onChangeInput}
                ></textarea>
              </div>
            </div>
            <ul className="nk-chat-editor-tools g-2">
              <li>
                <Button
                  color="primary"
                  disabled={disabled}
                  className="btn-round btn-icon"
                  onClick={onTextSubmit}>
                  <Icon name="send-alt"></Icon>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
