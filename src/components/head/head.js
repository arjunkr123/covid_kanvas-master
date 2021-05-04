import React from "react";

import "./head.css";

const head = (props) => {
  const header = props.data.map((info) => {
    return (
      <div className="Head" key={info.statecode}>
        <div className="ConfirmedData section">
          <h1 className="label">Confirmed</h1>
          <h3 className="delta-numbers">[+{info.deltaconfirmed}]</h3>
          <div className="numbers">{info.confirmed}</div>
        </div>
        <div className="ActiveData section">
          <h1 className="label">Active</h1>
          <br></br><br></br>
          <div className="numbers">{info.active}</div>
        </div>
        <div className="RecoveredData section">
          <h1 className="label">Recovered</h1>
          <h3 className="delta-numbers">[+{info.deltarecovered}]</h3>
          <div className="numbers">{info.recovered}</div>
        </div>
        <div className="DeathsData section">
          <h1 className="label">Deaths</h1>
          <h3 className="delta-numbers">[+{info.deltadeaths}]</h3>
          <div className="numbers">{info.deaths}</div>
        </div>
      </div>
    );
  });
  return <div className="Header">{header}</div>;
};

export default head;
