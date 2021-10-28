import React from 'react';
import '../index.scss';

const GroupUserConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-tri/nhom-nguoi-dung/:type',
			component: React.lazy(() => import('./modifyGroupUser'))
		},
		{
			path: '/quan-tri/nhom-nguoi-dung',
			component: React.lazy(() => import('./index'))
		}
	]
};
export default GroupUserConfig;
