import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import PossesionConfig from 'app/main/Possesion/PossesionConfig';
import CheckConfig from 'app/main/confirm/checkConfig';
import LoginConfig from 'app/main/login/LoginConfig';

const routeConfigs = [PossesionConfig, LoginConfig, CheckConfig];

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
