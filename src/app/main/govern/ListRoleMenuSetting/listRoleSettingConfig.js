import React from 'react';

const listRoleSettingConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-tri/phan-quyen-chuc-nang',
			component: React.lazy(() => import('./index'))
		}
	]
};
export default listRoleSettingConfig;
