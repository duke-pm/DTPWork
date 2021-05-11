import { combineReducers } from '@reduxjs/toolkit';
import { menuSlice } from '../settingMenu/_redux/menuSlice';

const governReducer = combineReducers({
	menu: menuSlice.reducer
});
export default governReducer;
