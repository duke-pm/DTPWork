import React from "react";
import {useSelector} from "react-redux";

const PageContainer = ({ ...props }) => {
  /** Use redux */
  const commonState = useSelector(({common}) => common);

  document.body.className = `nk-body bg-lighter npc-default has-sidebar no-touch nk-nio-theme ${commonState["theme"]}-mode`;
  return (
    <React.Fragment>
      <div className="nk-app-root">
        <div className="nk-wrap nk-wrap-nosidebar">
          <div className="nk-content">{props.children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default PageContainer;
