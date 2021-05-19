import { combineReducers } from '@reduxjs/toolkit';
import { groupUserSlice } from '../groupUser/_reduxGroupUser/groupUserSlice';
import { listUserSlice } from '../listUser/_reduxListUser/listUserSlice';
import { menuSlice } from '../settingMenu/_redux/menuSlice';

const governReducer = combineReducers({
	menu: menuSlice.reducer,
	groupUser: groupUserSlice.reducer,
	listUser: listUserSlice.reducer
});
export default governReducer;
