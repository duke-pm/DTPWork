import React from 'react';
import '../index.scss';

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
