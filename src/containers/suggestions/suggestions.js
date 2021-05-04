import React from "react";
import "./suggestions.css";
import axios from "axios";
import Button from "../../components/UI/button/success button";
import Spinner from "../../components/UI/Spinner/spinner";

class Suggestions extends React.Component {
  state = {
    name: "",
    mail: "",
    phone: "",
    suggestion: "",
    nameChange: "",
    mailChange: "",
    phoneChange: "",
    suggestionChange: "",
    result: "",
    loading: false,
  };

  nameChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      nameChange: event.target.value,
    });
  };
  mailChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      mailChange: event.target.value,
    });
  };
  phoneChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      phoneChange: event.target.value,
    });
  };
  suggestionChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      suggestionChange: event.target.value,
    });
  };

  submitHandler = (event) => {
    this.setState({
      loading: true,
    });

    this.setState({
      name: this.state.nameChange,
      mail: this.state.mailChange,
      phone: this.state.phoneChange,
      suggestion: this.state.suggestionChange,
    });
    event.preventDefault();
    const data = {
      nameinput: this.state.nameChange,
      emailinput: this.state.mailChange,
      phoneinput: this.state.phoneChange,
      suggestioninput: this.state.suggestionChange,
    };

    console.log(this.state.nameChange);

    if (
      data.nameinput !== "" &&
      data.emailinput !== "" &&
      data.phoneinput !== "" &&
      data.suggestioninput !== "" &&
      data.nameinput !== ""
    ) {
      axios
        .post("https://covid-kanvas.firebaseio.com/covid-kanvas.json", data)
        .then((response) => {
          this.setState({
            nameChange: "",
            mailChange: "",
            phoneChange: "",
            suggestionChange: "",
            result: (
              <p className="success">
                Your Suggestion Has Been Submitted Successfully
              </p>
            ),
            loading: false,
          });
          document.getElementById("suggestionForm").reset();
        });
    }

    // if( axios.get('https://covid-kanvas.firebaseio.com/suggestions.json')
    //          .then(response=>{
    //     if(response.data.nameinput===data.nameinput){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // })){
    //     this.setState({
    //         result:'You have already submitted a suggestion want to delete it?'
    //     });
    // }
    else {
      this.setState({
        loading: false,
        result: <p className="fail">Please Fill Out All Fields</p>,
      });
    }
  };
  render() {
    let form = (
      <div className="suggestionForm">
        <h3>Please fill in your details and suggestions to fight COVID-19</h3>
        <h5>By everyone's support, we wan defeat corona.</h5>
        <form id="suggestionForm" className="InputFields">
          <p> Your Name : </p>
          <input
            type="text"
            placeholder="Name"
            className="InputElement"
            onChange={this.nameChangeHandler}
          />
          <p>Your E-Mail ID :</p>
          <input
            type="text"
            placeholder="E-Mail"
            className="InputElement"
            onChange={this.mailChangeHandler}
          />
          <p>Your Contact No. :</p>
          <input
            type="text"
            placeholder="Contact No."
            className="InputElement"
            onChange={this.phoneChangeHandler}
          />
          <p>Your Suggestion For Fight Against Coronavirus</p>
          <textarea
            placeholder="Suggestion"
            className="InputElement"
            onChange={this.suggestionChangeHandler}
          />
          <Button className="SubmitButton" clicked={this.submitHandler}>
            SUBMIT
          </Button>
          {this.state.result}
        </form>
      </div>
    );
    if (this.state.loading) {
      form = (
        <div
          className="suggestionForm"
          style={{
            justifyContent: "center",
            textAlign: "center",
            paddingLeft: "15%",
          }}
        >
          <Spinner />
        </div>
      );
    }

    return <div>{form}</div>;
  }
}

export default Suggestions;
