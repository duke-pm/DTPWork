import React from "react";

const PageContainer = ({ ...props }) => {
  document.body.className = "nk-body bg-lighter npc-default has-sidebar no-touch nk-nio-theme";
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
