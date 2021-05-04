import React from "react";
import axios from "axios";
import { Link } from "react-scroll";
import "font-awesome/css/font-awesome.min.css";
import "./searchBar.css";
import Searchresult from "./searchhandler/searchresult";

class SearchBar extends React.Component {
  state = {
    district: "",
    input: "",
    ifSearched: false,
    filteredSuggestions: [],
    showSuggestion: false,
    suggestions: [],
  };

  changeHandler = (event) => {
    event.preventDefault();
    const filteredSuggestions = this.state.suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
    );
    this.setState({
      input: event.target.value,
      filteredSuggestions: filteredSuggestions,
      showSuggestion: true,
    });
  };

  suggestionClickHandler = (event) => {
    this.setState({
      filteredSuggestions: [],
      showSuggestion: false,
      input: event.target.innerText,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.setState({ district: this.state.input, showSuggestion: false });
    document.getElementById("searchfield").value = "";
  };

  ifSearchedHandler = (searchTerm) => {
    this.setState({ ifSearched: true });
    this.props.handleSearchGraph(searchTerm);
  };
  componentDidMount() {
    let suggestions = [];
    axios.get("https://api.covid19india.org/data.json").then((response) => {
      response.data.statewise.map((state) => {
        return suggestions.push(state.state);
      });
    });
    this.setState({
      suggestions: suggestions,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.tableSelectedTerm !== prevProps.tableSelectedTerm &&
      this.props.tableSelectedTerm !== ""
    ) {
      this.setState({ district: this.props.tableSelectedTerm });
    }
  }

  render() {
    let suggestionList;
    if (this.state.showSuggestion && this.state.input) {
      if (this.state.filteredSuggestions.length) {
        suggestionList = (
          <ul
            className="suggestionList"
            style={{ width: "50%", marginLeft: "19%" }}>
            {this.state.filteredSuggestions.map((suggestion, index) => {
              return (
                <li
                  key={suggestion}
                  onClick={this.suggestionClickHandler}
                  className="suggestionListItem"
                  style={{ marginLeft: "-50px" }}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }
    }
    if (this.state.input && this.state.showSuggestion) {
      if (this.state.filteredSuggestions.length === 0) {
        suggestionList = (
          <p style={{ textAlign: "center", fontSize: "25px" }}>
            State Not Found
          </p>
        );
      }
    }
    return (
      <div className="Search">
        <form>
          <input
            type="text"
            className="SearchBar"
            placeholder="Search For Your State"
            value={this.state.input}
            onChange={this.changeHandler}
            id="searchfield"
          />

          <Link to="foot">
            <button
              className="placeholder"
              onClick={this.submitHandler}
              style={{ backgroundColor: "transparent" }}
            >
              <i className="fa fa-search fa-2x"></i>
            </button>
          </Link>
        </form>
        {suggestionList}
        <Searchresult
          searched={this.state.district}
          ifSearched={this.ifSearchedHandler}
        />
        <p name="foot"></p>
      </div>
    );
  }
}

export default SearchBar;
