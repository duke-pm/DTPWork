import React from 'react';

const CheckConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/xet-duyet',
			component: React.lazy(() => import('./index'))
		}
	]
};
export default CheckConfig;
