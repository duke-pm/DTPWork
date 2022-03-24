import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import moment from "moment";
/** COMPONENTS */
import {Row, Col} from "../../components/Component";
/** COMMON */
import Constants from "../../utils/constants";
/** REDUX */
import * as Actions from "../../redux/actions";

const AuthFooter = () => {
  const {t, i18n} = useTranslation();
  const TITLE_FOOTER = `${moment().year()} DTP Workspace. All Rights Reserved.`;

  /** Use redux */
  const dispatch = useDispatch();
  const commonState = useSelector(({common}) => common);

  /** Use state */
  const [language, setLanguage] = useState(0);

  /**
   ** FUNCTIONS
   */
  const onChangeLanguage = idx => {
    let curLanguage = commonState["language"];
    let itemLang = Constants.LANGUAGE[idx];
    if (itemLang.code !== curLanguage) {
      i18n.changeLanguage(itemLang.code);
      dispatch(Actions.changeLanguage(itemLang.code));
      localStorage.setItem(Constants.LS_LANGUAGE, itemLang.code);
      setLanguage(idx);
    }
  };

  /**
   ** LIFE CYCLE 
    */
  useEffect(() => {
    let localLang = localStorage.getItem(Constants.LS_LANGUAGE);
    if (localLang) {
      let fIndex = Constants.LANGUAGE.findIndex(f => f.code === localLang);
      setLanguage(fIndex);
    }
  }, []);

  /**
   ** RENDER 
   */
  let vNameLanguage = Constants.LANGUAGE[language];
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
                    className="dropdown-toggle"
                  >
                    <img id="flag" src={vNameLanguage.image} alt="" className="language-flag" />
                    <UncontrolledTooltip placement="bottom" target="flag">
                      {t(`common:${vNameLanguage.name}`)}
                    </UncontrolledTooltip>
                  </DropdownToggle>
                  <DropdownMenu right className="dropdown-menu-sm">
                    <ul className="language-list">
                      {Constants.LANGUAGE.map((item, index) => {
                        return (
                          <li key={item.code}>
                            <DropdownItem
                              tag="a"
                              onClick={(ev) => {
                                  ev.preventDefault();
                                  onChangeLanguage(index);
                              }}
                              className="language-item cursor-pointer"
                            >
                              <img src={item.image} alt="" className="language-flag" />
                              <span className="language-name">
                                  {t(item.name)}
                              </span>
                            </DropdownItem>
                          </li>
                        );
                    })}
                    </ul>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </li>
            </ul>
          </Col>
          <Col lg="6">
            <div className="nk-block-content text-center text-lg-left">
              <p className="text-soft">&copy; {TITLE_FOOTER}</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default AuthFooter;
