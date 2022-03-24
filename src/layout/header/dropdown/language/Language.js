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
/** COMMON */
import Constants from "../../../../utils/constants";
/** REDUX */
import * as Actions from "../../../../redux/actions";

const Language = (props) => {
    const {t, i18n} = useTranslation();

    /** Use redux */
    const dispatch = useDispatch();
    const commonState = useSelector(({common}) => common);

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
        <UncontrolledDropdown direction="down">
            <DropdownToggle
                color="transparent"
                className="dropdown-toggle nk-quick-nav-icon">
                <img id="flag" src={vNameLanguage.image} alt="" className="flag" />
                <UncontrolledTooltip placement="bottom" target="flag">
                    {t(`common:${vNameLanguage.name}`)}
                </UncontrolledTooltip>
            </DropdownToggle>
            <DropdownMenu right className="dropdown-menu-sm  dropdown-menu-s1">
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
                        )
                    })}
                </ul>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default Language;
