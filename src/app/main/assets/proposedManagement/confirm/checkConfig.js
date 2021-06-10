import React from 'react';

const CheckConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/tai-san/danh-sach-de-xuat',
			component: React.lazy(() => import('./index'))
		}
	]
};
export default CheckConfig;
