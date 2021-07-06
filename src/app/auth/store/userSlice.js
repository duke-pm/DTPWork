import { createSlice } from '@reduxjs/toolkit';
import 'firebase/auth';
import history from '@history';
import { setInitialSettings } from 'app/store/fuse/settingsSlice';
import { removeCookies, removeLocalStorage } from '@fuse/core/DtpConfig';

export const setUserData = user => async (dispatch, getState) => {
	/*
        You can redirect the logged-in user to a specific route depending on his role
         */

	history.location.state = {
		redirectUrl: '/' // for example 'apps/academy'
	};
	/*
    Set User Settings
     */
	// dispatch(setDefaultSettings(user.data.settings));

	dispatch(setUser(user));
};

export const logoutUser = () => async (dispatch, getState) => {
	// removeLocalStorage();
	removeCookies();
	history.push({
		pathname: '/login'
	});
	dispatch(setInitialSettings());

	return dispatch(userLoggedOut());
};
export const logoutUserDoneRedirect = () => async (dispatch, getState) => {
	// removeLocalStorage();
	removeCookies();
	// dispatch(setInitialSettings());

	// return dispatch(userLoggedOut());
};
const initialState = {
	role: [], // guest
	data: {
		displayName: 'John Doe',
		photoURL: 'assets/images/avatars/Velazquez.jpg',
		email: 'johndoe@withinpixels.com',
		shortcuts: ['calendar', 'mail', 'contacts', 'todo']
	}
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => action.payload,
		userLoggedOut: (state, action) => initialState
	},
	extraReducers: {}
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
