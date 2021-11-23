import React from 'react';
import './index.scss';

const DocumentConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/tai-san/tai-lieu',
			exact: true,
			component: React.lazy(() => import('./index'))
		},
		{
			path: '/tai-san/tai-lieu/cap-phat',
			exact: true,
			component: React.lazy(() => import('./DocumentAssetsPage/PageAllocation'))
		},
		{
			path: '/tai-san/tai-lieu/thu-hoi',
			exact: true,
			component: React.lazy(() => import('./DocumentAssetsPage/PageRecovery'))
		}
		// {
		// 	path: '/tai-san/tai-lieu/thu-phat',
		// 	exact: true,
		// 	component: React.lazy(() => import('./DocumentAssetsPage/PageAllocation'))
		// }
	]
};
export default DocumentConfig;
