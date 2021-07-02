import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';
import register from './registerSlice';
import user from './userSlice';
import forgot from './forgotPasswordSlice';

const authReducers = combineReducers({
	user,
	login,
	register,
	forgot
});

export default authReducers;
