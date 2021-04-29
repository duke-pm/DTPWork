import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import PossesionConfig from 'app/main/assets/Possesion/PossesionConfig';
import CheckConfig from 'app/main/assets/proposedManagement/confirm/checkConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import RequestConfig from 'app/main/assets/proposedManagement/RequestProvider/RequestConfig';

const routeConfigs = [PossesionConfig, LoginConfig, CheckConfig, RequestConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin']),
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
