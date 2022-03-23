import React from "react";
import {CSSTransition} from 'react-transition-group';
import {Spinner} from "reactstrap";

const Loading = ({show}) => {
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="loading"
      unmountOnExit
    >
      <div className="loading-spinner">
        <Spinner color="primary" />
      </div>
    </CSSTransition>
  )
};

export default Loading;
