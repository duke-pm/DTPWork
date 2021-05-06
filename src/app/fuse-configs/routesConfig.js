import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import PossesionConfig from 'app/main/assets/Possesion/PossesionConfig';
import CheckConfig from 'app/main/assets/proposedManagement/confirm/checkConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import RequestConfig from 'app/main/assets/proposedManagement/RequestProvider/RequestConfig';
import HandlingConfig from 'app/main/assets/proposedManagement/HandlingRequest/HandlingConfig';
import ResovleRequestConfig from 'app/main/assets/proposedManagement/ResovleRequest/ResovleRequestConfig';

const routeConfigs = [PossesionConfig, LoginConfig, CheckConfig, RequestConfig, HandlingConfig, ResovleRequestConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'nganhk', 'ducpt', 'huyenndh', 'vyttt']),
	{
		path: '/',
		component: () => <Redirect to="/tai-san" />
	}
	// {
	// 	path: '/xet-duyet',
	// 	component: () => <Redirect to="/xet-duyet" />
	// }
];

export default routes;
