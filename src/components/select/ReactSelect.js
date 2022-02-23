import React from "react";
import Select from "react-select";

const RSelect = ({ ...props }) => {
  return (
    <div className="form-control-select">
      <Select
        className={`react-select-container ${props.className ? props.className : ""}`}
        classNamePrefix="react-select"
        {...props}
      />
      {props.error && (
        <span className="invalid">{props.error.message}</span>
      )}
    </div>
  );
};

export default RSelect;
