import React from "react";

//this function return the alert component
const Alert = (props) => {
  // we make a capitalize function this will capitalize our alert type and alert message
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    //the div is always present there
    <div style={{ height: "50px" }}>
      
      {/* only if props.alert is not null */}
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)} : </strong>
          {capitalize(props.alert.message)}
        </div>
      )}
    </div>
  );
};

export default Alert;
