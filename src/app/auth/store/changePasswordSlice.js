import { createSlice } from '@reduxjs/toolkit';
import JwtService from 'app/services/jwtService';

export const changePassword = value => async dispatch => {
	return JwtService.changePassword(value.oldPassword, value.newPassword)
		.then(data => {
			dispatch(changeSuccess());
			return data;
		})
		.catch(error => {
			return error;
		});
};

const initialState = {
	success: false,
	error: null
};
const changePasswordSlice = createSlice({
	name: 'auth/changePass',
	initialState,
	reducers: {
		changeSuccess: (state, action) => {
			state.success = true;
		},
		changeFail: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { changeSuccess, changeFail } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
