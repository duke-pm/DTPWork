import React from 'react';

const ListConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-tri/phe-duyet',
			component: React.lazy(() => import('./index'))
		}
	]
};

export default ListConfig;
