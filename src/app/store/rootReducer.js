import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import { confirmSlice } from 'app/main/assets/proposedManagement/_redux/confirmSlice';
import govern from 'app/main/govern/_redux/index';
import booking from 'app/main/booking/_redux';
import { projectSlice } from 'app/main/project/_redux/_projectSlice';
import fuse from './fuse';
import i18n from './i18nSlice';
import { possesionSlice } from '../main/assets/Possesion/_redux/possesionSlice';
import memberships from './membership/membershipSlice';
import { tabsSlice } from './Tabs/sliceTab';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		fuse,
		i18n,
		govern,
		booking,
		tabs: tabsSlice.reducer,
		possesion: possesionSlice.reducer,
		memberships,
		project: projectSlice.reducer,
		confirm: confirmSlice.reducer,
		...asyncReducers
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === 'auth/user/userLoggedOut') {
		state = undefined;
	}

	return combinedReducer(state, action);
};

export default createReducer;
