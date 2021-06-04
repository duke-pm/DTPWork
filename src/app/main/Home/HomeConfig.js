import React from 'react';

const HomeConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/trang-chu',
			component: React.lazy(() => import('./index'))
		}
	]
};
export default HomeConfig;
