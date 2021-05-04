import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./footer.css";

const footer = (props) => {
  return (
    <div className="footerBar">
      <a href="https://github.com/arjunkr123">
        {" "}
        <i className="fa fa-copyright" aria-hidden="true"></i>
        <abbr className="username">Made with <span>❤️</span> by  TK</abbr>
      </a>

      <a href="https://github.com/arjunkr123">
        {" "}
        <i className="fa fa-github git icon" aria-hidden="true"></i>
       
      </a>

      <a href="https://github.com/arjunkr123">
        {" "}
        <i className="fa fa-instagram insta icon" aria-hidden="true"></i>
        
      </a>

      <a href="https://github.com/arjunkr123">
        {" "}
        <i className="fa fa-facebook-square" aria-hidden="true"></i>
        
      </a>
    </div>
  );
};
export default footer;
