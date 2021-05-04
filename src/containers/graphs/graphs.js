import React from "react";
import "./graph.css";
import TotalCasesGraph from "./totalcasesgraph/totalcasesGraph";
import DeceasedCasesGraph from "./deceasedcasesgraph.js/deceasedcasesgraph";
import RecoveredCasesGraph from "./recovered cases graph/recoveredcasesgraph";

class Graphs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphType: "daily"
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({graphType: e.target.value});
  }

  render() {
    return (
      <div className="Graphs">
        <select
        id = "graphType" 
        onChange={this.handleChange}
        style={{padding: "10px", fontSize: "20px", borderRadius: "3px", backgroundColor: "#eee"}}
        >
          <option value="daily">Daily cases</option>
          <option value="cumulative">Cumulative cases</option>
        </select>
        <h1 style={{fontSize: "50px"}}>{this.props.searchTerm}</h1>
        <div className="graph">
          <TotalCasesGraph searchTerm = {this.props.searchTerm} graphType = {this.state.graphType}/>
        </div>
        <div className="graph">
          <RecoveredCasesGraph searchTerm = {this.props.searchTerm} graphType = {this.state.graphType}/>
        </div>
        <div className="graph">
          <DeceasedCasesGraph searchTerm = {this.props.searchTerm} graphType = {this.state.graphType}/>
        </div>
      </div>
    );
  }
}

export default Graphs;
