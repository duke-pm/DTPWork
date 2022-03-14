import {useTranslation} from "react-i18next";
import React from "react";
import Select from "react-select";

const RSelect = ({ ...props }) => {
  const {t} = useTranslation();
  return (
    <div className="form-control-select">
      <Select
        className={`react-select-container ${props.className ? props.className : ""}`}
        classNamePrefix="react-select"
        noOptionsMessage={() => <span>{t("common:no_data_select")}</span>}
        isClearable={true}
        isSearchable={true}
        backspaceRemovesValue={true}
        {...props}
      />
      {props.error && (
        <span className="invalid">{props.error.message}</span>
      )}
    </div>
  );
};

export default RSelect;
