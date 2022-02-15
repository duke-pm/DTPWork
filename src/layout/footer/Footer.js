import React from "react";
import moment from "moment";

const Footer = () => {
  return (
    <div className="nk-footer">
      <div className="container-fluid">
        <div className="nk-footer-wrap">
          <div className="nk-footer-copyright">
            {" "}
            &copy; {`${moment().year()} DTP Workspace by `} <a href="https://dtp-education.com">DTP Education Solutions</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
