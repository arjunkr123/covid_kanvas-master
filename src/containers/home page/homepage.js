import React from "react";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/spinner";
import SearchBar from "../../components/UI/search bar/searchBar";
import TimeStamp from "../../components/timestamp/timestamp";
import Graphs from "../../containers/graphs/graphs";
import Table from "../../containers/Table/table";
import Head from "../../components/head/head";
import Map from "../../components/indiaMap/map";
import "./homepage.css";

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      Total: [],
      labels: [],
      loading: true,
      searchTerm: '',
      tableSelectedTerm: '',
      showGraphs: true,
    };

    this.handleSearchGraph = this.handleSearchGraph.bind(this);
    this.handleTableSelectedTerm = this.handleTableSelectedTerm.bind(this);
  }


  handleTableSelectedTerm(term) {
    this.setState({tableSelectedTerm: term});
  }

  handleSearchGraph(term) {
    this.setState({searchTerm: term});
  }

  componentDidMount() {
    axios.get("https://api.covid19india.org/data.json").then((response) => {
      this.setState({ posts: response.data.statewise.slice(1, 38) });
      this.setState({ Total: response.data.statewise.slice(0, 1) });
      this.setState({
        timeStamp: response.data.statewise.slice(0, 1).lastupdatedtime,
      });
      this.setState({ loading: false });
  });
}
  render() {
    let homepage = (
      <div style={{ marginLeft: "49%", marginTop: "20%" }}>
        <Spinner />
      </div>
    );
    if (!this.state.loading) {

      return (homepage = (
        <div className="App">
          <h1 className="heading"><span>COVID-19</span> INDIA TRACKER</h1>
          <div className="map">
            <Map onClick={(term) => this.handleTableSelectedTerm(term)}></Map>
          </div>

          <div
            className="headbox"
            style={{ textAlign: "center", marginLeft: "-75px" }}>
            <Head data={this.state.Total} />
          </div>


          <div className="Content">
            <div style={{ marginTop: "10%"}} className="headerdiv">
              {" "}
              <TimeStamp data={this.state.Total} />
              <SearchBar handleSearchGraph={this.handleSearchGraph} tableSelectedTerm={this.state.tableSelectedTerm}/>
              <Graphs searchTerm={this.state.searchTerm}/>
            </div>
            <Table onClick = {(term) => {this.handleTableSelectedTerm(term)}}/>
          </div>
        </div>
      ));
    }

    return (
      <div>
        <div>{homepage}</div>
      </div>
    );
  }
}
export default Homepage;
