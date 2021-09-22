import React from 'react';
import '../index.scss';

const ResovleRequestConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/tai-san/de-xuat-can-xu-ly/:corrupt',
			component: React.lazy(() => import('./Page/PageCustomCorrupt'))
		},
		{
			path: '/tai-san/de-xuat-can-xu-ly-cho-phep',
			component: React.lazy(() => import('./Page/PageCustomAllocation'))
		},
		{
			path: '/tai-san/de-xuat-can-xu-ly',
			component: React.lazy(() => import('./index'))
		}
	]
};

export default ResovleRequestConfig;
