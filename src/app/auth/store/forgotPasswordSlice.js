import { createSlice } from '@reduxjs/toolkit';
import JwtService from 'app/services/jwtService';

export const forgotPassword =
	({ email }) =>
	async dispatch => {
		return JwtService.forgotPassword(email)
			.then(data => {
				dispatch(forgotSuccess());
				return data;
			})
			.catch(error => {
				return error;
			});
	};
export const changePasswordPublic = (value, token) => async dispatch => {
	return JwtService.changePasswordPublic(value.password, token)
		.then(data => {
			dispatch(changeForgotSuccss());
			return data;
		})
		.catch(error => {
			return error;
		});
};
export const checkToken = token => async dispatch => {
	return JwtService.checkTokenExp(token)
		.then(data => {
			return data;
		})
		.catch(error => {
			return error;
		});
};
const initialState = {
	success: false,
	error: null,
	changeForgotSuccess: false,
	errorChangeForgotFail: false
};
const forgotPasswordSlice = createSlice({
	name: 'auth/forgotPass',
	initialState,
	reducers: {
		forgotSuccess: (state, action) => {
			state.success = true;
		},
		forgotFail: (state, action) => {
			state.success = false;
			state.error = action.payload;
		},
		changeForgotSuccss: (state, action) => {
			state.changeForgotSuccess = true;
		},
		errorChangeForgotFail: (state, action) => {
			state.changeForgotSuccess = false;
			state.errorChangeForgotFail = false;
		}
	},
	extraReducers: {}
});

export const { forgotSuccess, forgotFail, errorChangeForgotFail, changeForgotSuccss } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
