import React from 'react';

const SettingMenuConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-tri/thiet-lap-menu/:type',
			component: React.lazy(() => import('./modifyMenuSetting'))
		},
		{
			path: '/quan-tri/thiet-lap-menu',
			component: React.lazy(() => import('./SettingMenu'))
		}
	]
};
export default SettingMenuConfig;
