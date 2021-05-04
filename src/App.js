import React from "react";
import HomePage from "./containers/home page/homepage";
import NavBar from "./components/UI/navbar/navbar";
import Suggestion from "./containers/suggestions/suggestions";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./containers/about covid 19/about";
import FAQ from "./containers/FAQ/faq";
import Footer from "./components/foot/footer";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div style={{ textAlign: "center" }}>
          <NavBar />

          <Switch>
            <Route path="/suggestion/" component={Suggestion} />
            <Route path="/faq/" component={FAQ} />
            <Route path="/about/" component={About} />
            <Route path="/" component={HomePage} />
          </Switch>
          <h1 style={{ marginTop: "100px" }} className="footBanner">
            STAY HOME, STAY SAFE!
          </h1>
          <div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
