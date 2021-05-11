import React from 'react';

const GroupUserConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-tri/nhom-nguoi-dung',
			component: React.lazy(() => import('./index'))
		}
	]
};
export default GroupUserConfig;
