import { createSlice } from '@reduxjs/toolkit';
import jwtService from 'app/services/jwtService';
import { setUserData } from './userSlice';

export const submitLogin = ({ email, password }) => async dispatch => {
	return jwtService
		.signInWithEmailAndPassword(email, password)
		.then(user => {
			dispatch(setUserData(user));
			return user;
		})
		.catch(error => {
			return dispatch(loginError('Vui lòng nhập đúng tài khoản và mật khẩu'));
		});
};

const initialState = {
	success: false,
	error: null
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
		},
		loginError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
