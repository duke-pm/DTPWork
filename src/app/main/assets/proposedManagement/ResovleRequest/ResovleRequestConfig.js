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
			path: '/tai-san/de-xuat-can-xu-ly',
			component: React.lazy(() => import('./index'))
		}
	]
};

export default ResovleRequestConfig;
