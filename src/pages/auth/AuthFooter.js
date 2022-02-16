import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import moment from "moment";
/** COMPONENTS */
import {Row, Col} from "components/Component";
/** COMMON */
import Constants from "utils/constants";
import EnglishFlag from "images/flags/english.png";
import VietnamFlag from "images/flags/vietnam.png";
/** REDUX */
import * as Actions from "redux/actions";

const AuthFooter = () => {
  const {t, i18n} = useTranslation();

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);

  /**
   ** FUNCTIONS
   */
  const onChangeLanguage = newLang => {
    let curLanguage = commonState["language"];
    if (newLang !== curLanguage) {
      i18n.changeLanguage(newLang);
      dispatch(Actions.changeLanguage(newLang));
      localStorage.setItem(Constants.LS_LANGUAGE, newLang);
    }
  };

  /**
   ** RENDER 
   */
  let vNameLanguage = t("common:language_vietnam");
  if (commonState["language"] === "en") {
    vNameLanguage = t("common:language_english");
  }

  return (
    <div className="nk-footer nk-auth-footer-full">
      <div className="container wide-lg">
        <Row className="g-3">
          <Col lg={6} className="order-lg-last">
            <ul className="nav nav-sm justify-content-center justify-content-lg-end">
              <li className="nav-item ">
                <UncontrolledDropdown direction="up">
                  <DropdownToggle
                    color="transparent"
                    className="dropdown-toggle dropdown-indicator has-indicator nav-link"
                  >
                    <span>{vNameLanguage}</span>
                  </DropdownToggle>
                  <DropdownMenu right className="dropdown-menu-sm">
                    <ul className="language-list">
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onChangeLanguage("en");
                          }}
                          className="language-item"
                        >
                          <img src={EnglishFlag} alt="" className="language-flag" />
                          <span className="language-name">{t("common:language_english")}</span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          tag="a"
                          href="#dropdownitem"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onChangeLanguage("vi");
                          }}
                          className="language-item"
                        >
                          <img src={VietnamFlag} alt="" className="language-flag" />
                          <span className="language-name">{t("common:language_vietnam")}</span>
                        </DropdownItem>
                      </li>
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          </Col>
          <Col lg="6">
            <div className="nk-block-content text-center text-lg-left">
              <p className="text-soft">&copy; {`${moment().year()} DTP Workspace. All Rights Reserved.`}</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default AuthFooter;
