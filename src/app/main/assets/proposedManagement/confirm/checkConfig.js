import React from 'react';

const CheckConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-li-de-xuat/xet-duyet',
			component: React.lazy(() => import('./index'))
		}
	]
};
export default CheckConfig;
