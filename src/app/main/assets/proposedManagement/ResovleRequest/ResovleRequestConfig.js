import React from 'react';

const ResovleRequestConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-li-de-xuat/de-xuat-can-xu-ly',
			component: React.lazy(() => import('./index'))
		}
	]
};

export default ResovleRequestConfig;
