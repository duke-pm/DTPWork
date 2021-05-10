import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import { confirmSlice } from 'app/main/assets/proposedManagement/_redux/confirmSlice';
import govern from 'app/main/govern/_redux/index';
import fuse from './fuse';
import i18n from './i18nSlice';
import { possesionSlice } from '../main/assets/Possesion/_redux/possesionSlice';
import memberships from './membership/membershipSlice';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		fuse,
		i18n,
		govern,
		possesion: possesionSlice.reducer,
		memberships,
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
