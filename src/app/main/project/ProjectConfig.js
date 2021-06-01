import React from 'react';

const ProjectConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-ly-du-an/:detail',
			component: React.lazy(() => import('./Project/index'))
		},
		{
			path: '/quan-ly-du-an',
			component: React.lazy(() => import('./Projects/index'))
		}
	]
};

export default ProjectConfig;
