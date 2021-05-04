import React from "react";
import "./button.css";

const successButton = (props) => {
  return (
    <button className="Button Success" onClick={props.clicked}>
      {props.children}
    </button>
  );
};
export default successButton;
