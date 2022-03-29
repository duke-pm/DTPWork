/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {FormGroup} from "reactstrap";
/** COMPONENTS */
import {Icon, RSelect} from "../Component";

const CInput = ({
  inputRef = undefined,
  id = "txt_input",
  type = "text",
  required = false,
  disabled = false,
  password = false,
  multi = false,
  icon = null,
  leftLabel = "",
  rightLabel = null,
  holder = "",
  min = undefined,
  max = undefined,
  select = "",
  selects = [],
  validate = null,
  register = null,
  errors = {},
  errorsCustom = {},
}) => {
  const {t} = useTranslation();

  /** Use state */
  const [passState, setPassState] = useState(false);
  const [selectValue, setSelectValue] = useState(select);
  
  /**
   ** FUNCTIONS
   */
  const togglePassState = () => {
    setPassState(!passState);
  };

  const onChangeSelect = (next, e) => {
    setSelectValue(e);
  };

  /**
   ** RENDER
   */
  if (type === "select") {
    return (
      <FormGroup>
        <div className="form-label-group d-flex justify-content-between">
          <label className="form-label" htmlFor={id}>
            {t(leftLabel)} {required ? <span className="text-danger">*</span> : null}
          </label>
          {rightLabel}
        </div>
        <div className="form-control-wrap">
          <RSelect
            inputRef={inputRef}
            name={id}
            isMulti={multi}
            isDisabled={disabled}
            options={selects}
            error={errorsCustom[id]}
            value={selectValue}
            placeholder={t("add_assets:holder_supplier")}
            onChange={e => onChangeSelect(null, e)}
          />
        </div>
      </FormGroup>
    );
  }

  if (type === "number" || type === "text" || type === "email" || type === "textarea") {
    return (
      <FormGroup>
        <div className="form-label-group">
          <label className="form-label" htmlFor={id}>
          {t(leftLabel)} {required ? <span className="text-danger">*</span> : null}
          </label>
          {rightLabel}
        </div>
        <div className="form-control-wrap">
          {icon && (
            <div className="form-icon form-icon-left">
              <Icon name={icon} />
            </div>
          )}
          {password && (
            <a
              onClick={togglePassState}
              className={`form-icon lg form-icon-right passcode-switch cursor-pointer ${passState
                ? "is-hidden"
                : "is-shown"
              }`}
            >
              <Icon name="eye" className="passcode-icon icon-show"/>
              <Icon name="eye-off" className="passcode-icon icon-hide"/>
            </a>
          )}
          {type !== "textarea"
          ? (
            <input
              ref={validate ? register(validate) : undefined}
              className={`form-control ${password
                ? passState ? "is-hidden" : "is-shown"
                : ""
              }`}
              id={id}
              name={id}
              type={password
                ? passState ? "text" : "password"
                : type}
              min={min}
              max={max}
              disabled={disabled}
              placeholder={t(holder)}
            />
          ) : (
            <textarea
              className="no-resize form-control"
              id={id}
              name={id}
              type="text"
              disabled={disabled}
              placeholder={t(holder)}
            />
          )}
          {errors[id] && (
            <span className="invalid">{errors[id].message}</span>
          )}
          {errorsCustom[id] && (
            <span className="invalid">{errorsCustom[id].message}</span>
          )}
        </div>
      </FormGroup>
    );
  }

  return null;
};

export default CInput;
