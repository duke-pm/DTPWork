import React from "react";

function RowSelectStatus({label, value, customAbbreviation, ...props}) {
  let color = "info";
  switch (value) {
    case 2:
      color = "warning";
      break;
    case 3:
      color = "success";
      break;
    case 4:
      color = "primary";
      break;
    case 5:
      color = "gray";
      break;
    case 6:
      color = "warning";
      break;
    case 7:
      color = "danger";
      break;
    default:
      color = "info";
      break;
  };
  return (
    <div className="d-flex">
      <span className={`text-${color}`}>{label}</span>
      <div style={{marginLeft: "10px", color: "#ccc"}}>
        {customAbbreviation}
      </div>
    </div>
  );
}

export default RowSelectStatus;
