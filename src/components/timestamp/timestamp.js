import React from "react";
import "./timestamp.css";

const timestamp = (props) => {
  return props.data.map((info) => {
    return (
      <div key={info.statecode} className="TimeStamp">
        <strong>Last Updated On:{info.lastupdatedtime} </strong>{" "}
      </div>
    );
  });
};

export default timestamp;
