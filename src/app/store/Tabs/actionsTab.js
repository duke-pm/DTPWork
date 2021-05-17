import { tabsSlice } from './sliceTab';

const { actions } = tabsSlice;

export const changeTabs = value => dispatch => {
	dispatch(actions.updatedTabs({ value }));
};
