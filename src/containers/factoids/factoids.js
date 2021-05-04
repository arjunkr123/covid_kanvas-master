import React from "react";
import "./factoids.css";
import axios from "axios";

class Factoids extends React.Component {
  state = {
    banners: [],
  };
  componentDidMount = () => {
    axios
      .get("https://api.covid19india.org/website_data.json")
      .then((response) => {
        this.setstate({
          banners: response.data.map((res) => {
            return <p key={res.factoids.id}>{res.factoids.banner}}</p>;
          }),
        });
      });
  };

  render() {
    return (
      <div>
        <marquee>{this.state.banners}</marquee>
      </div>
    );
  }
}
export default Factoids;
