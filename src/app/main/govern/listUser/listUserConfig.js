import React from 'react';

const ListUserConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-tri/danh-sach-nguoi-dung',
			component: React.lazy(() => import('./index'))
		}
	]
};
export default ListUserConfig;
