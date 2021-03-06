import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import PossesionConfig from 'app/main/assets/Possesion/PossesionConfig';
import CheckConfig from 'app/main/assets/proposedManagement/confirm/checkConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import RequestConfig from 'app/main/assets/proposedManagement/RequestProvider/RequestConfig';
import HandlingConfig from 'app/main/assets/proposedManagement/HandlingRequest/HandlingConfig';
import ResovleRequestConfig from 'app/main/assets/proposedManagement/ResovleRequest/ResovleRequestConfig';
import GroupUserConfig from 'app/main/govern/groupUser/GroupUserConfig';
import SettingMenuConfig from 'app/main/govern/settingMenu/SettingMenuConfig';
import ListUserConfig from 'app/main/govern/listUser/listUserConfig';
import listRoleSettingConfig from 'app/main/govern/ListRoleMenuSetting/listRoleSettingConfig';
import ProjectConfig from 'app/main/project/ProjectConfig';
import HomeConfig from 'app/main/Home/HomeConfig';
import Error404PageConfig from 'app/main/error/404/Error404PageConfig';
import ForgotPassConfig from 'app/main/forgotPassword/ForgotPassConfig';
import ChangePassConfig from 'app/main/changePassword/ChangePassConfig';
import ConfimPassConfig from 'app/main/Confirm/ConfimPassConfig';
import CheckLinkConfig from 'app/main/CheckLink/CheckLinkConfig';
import ProjectConfigOverview from 'app/main/project/ProjectConfigOverview';
import ListConfig from 'app/main/govern/SettingLine/ListConfig';
import LevelApprovalConfig from 'app/main/govern/SettingLevelApproval/LevelApprovalConfig';
// Booking
import ResourceConfig from 'app/main/booking/ressource/resourceConfig';
import ResourceGroupConfig from 'app/main/booking/resourceGroup/resourceGroupConfig';
import AllBookingConfig from 'app/main/booking/manageBooking/AllBooking/AllBookingConfig';
import MyBookingConfig from 'app/main/booking/manageBooking/MyBooking/MyBookingConfig';
import ResourceCalendarConfig from 'app/main/booking/manageBooking/CalendarResouce/ResourceCalendarConfig';
import DocumentConfig from '../main/assets/DocumentAssets/DocumentConfig';

const routeConfigs = [
	ResourceConfig,
	ResourceGroupConfig,
	AllBookingConfig,
	MyBookingConfig,
	ResourceCalendarConfig,
	PossesionConfig,
	ForgotPassConfig,
	ChangePassConfig,
	ConfimPassConfig,
	LevelApprovalConfig,
	ListConfig,
	ProjectConfigOverview,
	LoginConfig,
	CheckConfig,
	RequestConfig,
	HandlingConfig,
	ResovleRequestConfig,
	GroupUserConfig,
	SettingMenuConfig,
	ListUserConfig,
	listRoleSettingConfig,
	ProjectConfig,
	CheckLinkConfig,
	Error404PageConfig,
	HomeConfig,
	DocumentConfig
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/trang-chu" />
	},
	{
		component: () => <Redirect to="/error-404" />
	}
];

export default routes;
