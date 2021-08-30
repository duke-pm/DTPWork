import React from 'react';
import '../index.scss';

const ResourceGroupConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/booking/resource-group/resource-group-page',
			component: React.lazy(() => import('./ResourceGroupPage'))
		},
		{
			path: '/booking/resource-group/create-resource-group',
			component: React.lazy(() => import('./CreateResourceGroup'))
		},
		{
			path: '/booking/resource-group/view/:id',
			component: React.lazy(() => import('./ResourceGroupView'))
		}
	]
};
export default ResourceGroupConfig;
