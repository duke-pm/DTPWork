import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
/** COMPONENTS */
import {TooltipComponent} from "../../../../components/Component";
/** COMMON */
import Constants from "../../../../utils/constants";
/** REDUX */
import * as Actions from "../../../../redux/actions";

const Theme = () => {
	const {t} = useTranslation();

	/** Use redux */
	const dispatch = useDispatch();
	const commonState = useSelector(({common}) => common);

	/**
	 ** FUNCTIONS
		*/
	const onChangeTheme = () => {
		let cTheme = commonState["theme"];
		if (cTheme === Constants.THEME.LIGHT) {
			dispatch(Actions.changeTheme(Constants.THEME.DARK));
			localStorage.setItem(Constants.LS_THEME, Constants.THEME.DARK);
		} else {
			dispatch(Actions.changeTheme(Constants.THEME.LIGHT));
			localStorage.setItem(Constants.LS_THEME, Constants.THEME.LIGHT);
		}
	};

	/**
	 ** RENDER
		*/
	const curTheme = commonState["theme"];;
	return (
		<li onClick={onChangeTheme}>
			<TooltipComponent
				tag="a"
				containerClassName="btn btn-trigger btn-icon"
				id="theme"
				icon={curTheme === Constants.THEME.LIGHT ? "moon" : "sun"}
				direction="bottom"
				text={t(curTheme === Constants.THEME.LIGHT
					? "common:change_to_darkmode"
					: "common:change_to_lightmode"
				)}
			/>
		</li>
	);
};

export default Theme;
