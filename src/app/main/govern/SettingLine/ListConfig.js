import React from 'react';

const ListConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-tri/quyen/:type/:id',
			component: React.lazy(() => import('./modifySettingLine'))
		},
		{
			path: '/quan-tri/quyen',
			component: React.lazy(() => import('./index'))
		}
	]
};

export default ListConfig;
