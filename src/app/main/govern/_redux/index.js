import { combineReducers } from '@reduxjs/toolkit';
import { groupUserSlice } from '../groupUser/_reduxGroupUser/groupUserSlice';
import { listRoleSlice } from '../ListRoleMenuSetting/_reduxListRoleMenu/listRoleMenuSlice';
import { listUserSlice } from '../listUser/_reduxListUser/listUserSlice';
import { levelSettingSlice } from '../SettingLevelApproval/reduxSettingLevel/LevelSettingSlice';
import { lineSettingSlice } from '../SettingLine/reduxSettingLine/LineSettingSlice';
import { menuSlice } from '../settingMenu/_redux/menuSlice';

const governReducer = combineReducers({
	menu: menuSlice.reducer,
	groupUser: groupUserSlice.reducer,
	listUser: listUserSlice.reducer,
	listRole: listRoleSlice.reducer,
	listLines: lineSettingSlice.reducer,
	listLevel: levelSettingSlice.reducer
});
export default governReducer;
