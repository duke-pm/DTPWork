import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import PossesionConfig from 'app/main/Possesion/PossesionConfig';
import LoginConfig from 'app/main/login/LoginConfig';

const routeConfigs = [PossesionConfig, LoginConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/tai-san" />
	}
];

export default routes;
