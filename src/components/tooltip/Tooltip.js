import React from "react";
import { UncontrolledTooltip } from "reactstrap";
import Icon from "../icon/Icon";

const TooltipComponent = ({ iconClass, icon, content, id, direction, text, containerClassName, ...props }) => {
  return (
    <React.Fragment>
      {!content ? (
        props.tag ? (
          <props.tag className={containerClassName} id={id}>
            {" "}
            <Icon className={`${iconClass ? iconClass : ""}`} name={icon}/>
          </props.tag>
        ) : (
          <Icon className={`${iconClass ? iconClass : ""}`} name={icon} id={id}/>
        )
      ) : content}
      <UncontrolledTooltip autohide={false} placement={direction} target={id}>
        {text}
      </UncontrolledTooltip>
    </React.Fragment>
  );
};
export default TooltipComponent;
