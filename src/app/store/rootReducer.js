import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import { confirmSlice } from 'app/main/confirm/_redux/confirmSlice';
import fuse from './fuse';
import i18n from './i18nSlice';
import { possesionSlice } from '../main/Possesion/_redux/possesionSlice';
import memberships from './membership/membershipSlice';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		fuse,
		i18n,
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
