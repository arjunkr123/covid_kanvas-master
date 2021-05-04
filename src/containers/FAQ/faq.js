import React from "react";
import "./faq.css";
import axios from "axios";

class Faq extends React.Component {
  state = {
    faqData: [],
  };

  componentDidMount = () => {
    axios
      .get("https://api.covid19india.org/website_data.json")
      .then((response) => {
        this.setState({
          faqData: response.data.faq,
        });
      });
  };
  render() {
    const faqs = this.state.faqData.map((data) => {
      return (
        <div key={data.qno} className="faq">
          <p className="question">
            <span>Question {+data.qno}:</span> {data.question}
          </p>
          <p className="answer">
            {data.answer}
          </p>
        </div>
      );
    });

    return (
      <div style={{ justifyContent: "center" }}>
        <h3 style={{ textAlign: "center", paddingTop: "5%" }}>
          SOME FREQUENTLY ASKED QUESTIONS
        </h3>
        {faqs}
      </div>
    );
  }
}
export default Faq;
