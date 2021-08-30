import React from 'react';
import '../index.scss';

const ResourceConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/booking/resource/resource-page',
			component: React.lazy(() => import('./ResourcePage/index'))
		},
		{
			path: '/booking/resource/create-resource',
			component: React.lazy(() => import('./CreateResource/index'))
		},
		{
			path: '/booking/resource/view/:id',
			component: React.lazy(() => import('./ResourceView/index'))
		}
	]
};
export default ResourceConfig;
