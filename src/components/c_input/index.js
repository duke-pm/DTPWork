/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {forwardRef, useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {FormGroup} from "reactstrap";
import NumberFormat from 'react-number-format';
import DatePicker from "react-datepicker";
import moment from "moment";
/** COMPONENTS */
import {Icon, RSelect} from "../Component";

const FORMAT_DATE = "DD/MM/YYYY";

const CustomDateInput = forwardRef(({value, onClick, onChange}, ref) => (
  <div onClick={onClick} ref={ref}>
    <div className="form-icon form-icon-left">
      <Icon name="calendar"/>
    </div>
    <input
      className="form-control date-picker"
      type="text"
      value={moment(value).format(FORMAT_DATE)}
      onChange={onChange}
    />
  </div>
));

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
  value = undefined,
  defaultValue = undefined,
  selects = [],
  validate = null,
  register = null,
  errors = {},
  errorsCustom = {},
}) => {
  const {t} = useTranslation();

  /** Use state */
  const [passState, setPassState] = useState(false);
  const [inputValue, setInputValue] = useState(
    ((type === "number" || type === "text" || type === "email" || type === "textarea") &&
      value !== undefined)
      ? value
      : "");
  const [checkValue, setCheckValue] = useState(
    (type === "checkbox" && value !== undefined) ? value : false);
  const [selectValue, setSelectValue] = useState(
    (type === "select" && value !== undefined) ? value : "");
  const [currencyValue, setCurrencyValue] = useState(
    (type === "currency" && value !== undefined) ? value : "");
  const [dateTimeValue, setDateTimeValue] = useState(
    (type === "datetime" && value !== undefined) ? value : new Date());
  
  /**
   ** FUNCTIONS
   */
  const togglePassState = () => {
    setPassState(!passState);
  };

  const onChangeInput = e => {
    setInputValue(e.target.value);
  };

  const onChangeSelect = (next, e) => {
    setSelectValue(e);
  };

  const onChangeCurrency = val => {
    setCurrencyValue(val.floatValue);
  };

  const onChangeDate = val => {
    setDateTimeValue(val);
  };

  const onChangeCheckbox = () => {
    setCheckValue(!checkValue);
  };

  useEffect(() => {
    if (type === "number" || type === "text" || type === "email" || type === "textarea") {
      if (value !== undefined) {
        setInputValue(value);
      }
    }
    if (type === "checkbox") {
      if (value !== undefined) {
        setCheckValue(value);
      }
    }
    if (type === "select") {
      if (value !== undefined) {
        setSelectValue(value);
      }
    }
    if (type === "currency") {
      if (value !== undefined) {
        setCurrencyValue(value);
      }
    }
    if (type === "datetime") {
      if (value !== undefined) {
        setDateTimeValue(value);
      }
    }
  }, [type, value]);

  /**
   ** RENDER
   */
  if (type === "datetime") {
    return (
      <FormGroup>
        <div className="form-label-group">
          <label className="form-label" htmlFor="assetPurchaseDate">
            {t(leftLabel)}
          </label>
        </div>
        <div className="form-control-wrap">
          <div className="form-icon form-icon-left">
            <Icon name="calendar" />
          </div>
          <DatePicker
            ref={inputRef}
            className="form-control date-picker"
            disabled={disabled}
            selected={dateTimeValue}
            value={dateTimeValue}
            onChange={onChangeDate}
            customInput={<CustomDateInput />}
          />
        </div>
      </FormGroup>
    );
  }

  if (type === "currency") {
    return (
      <FormGroup>
        <div className="form-label-group">
          <label className="form-label" htmlFor="assetOriginPrice">
            {t(leftLabel)} {required ? <span className="text-danger">*</span> : null}
          </label>
        </div>
        <div className="form-control-wrap">
          {icon && (
            <div className="form-icon form-icon-left">
              <Icon name={icon} />
            </div>
          )}
          <NumberFormat
            ref={inputRef}
            className="form-control"
            name={id}
            value={currencyValue}
            placeholder={t(holder)}
            thousandSeparator
            prefix=""
            onValueChange={onChangeCurrency}
          />
          {errorsCustom[id] && (
            <span className="invalid">{errorsCustom[id].message}</span>
          )}
        </div>
      </FormGroup>
    );
  }
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
            placeholder={t(holder)}
            onChange={e => onChangeSelect(null, e)}
          />
        </div>
      </FormGroup>
    );
  }

  if (type === "checkbox") {
    return (
      <FormGroup>
        <div className="custom-control custom-checkbox">
          <input
            id={id}
            name={id}
            ref={register({})}
            className="custom-control-input form-control"
            type="checkbox"
            disabled={disabled}
            checked={checkValue}
            onChange={onChangeCheckbox}
          />
          <label className="custom-control-label" htmlFor={id}>
            {t(leftLabel)}
          </label>
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
              ref={validate ? register(validate) : register({})}
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
              value={inputValue}
              defaultValue={defaultValue}
              onChange={onChangeInput}
            />
          ) : (
            <textarea
              ref={register({})}
              className="no-resize form-control"
              id={id}
              name={id}
              type="text"
              disabled={disabled}
              placeholder={t(holder)}
              value={inputValue}
              defaultValue={defaultValue}
              onChange={onChangeInput}
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
