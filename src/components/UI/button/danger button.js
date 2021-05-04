import React from "react";

const dangerButton = (props) => {
  return (
    <button className="Button Danger" onClick={props.clicked}>
      {props.children}
    </button>
  );
};
export default dangerButton;
