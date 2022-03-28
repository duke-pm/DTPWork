import React from "react";

const InputSwitch = ({ disabled, label, id, checked, onChange }) => {
  return (
    <div className="custom-control custom-control-sm custom-checkbox">
      <input
        className="custom-control-input form-control"
        id={id}
        name={id}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default InputSwitch;
