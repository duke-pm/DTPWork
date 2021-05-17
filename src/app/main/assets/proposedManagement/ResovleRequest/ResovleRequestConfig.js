import React from 'react';

const ResovleRequestConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/de-xuat-can-xu-ly',
			component: React.lazy(() => import('./index'))
		}
	]
};

export default ResovleRequestConfig;
