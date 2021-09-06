import React from 'react';
import './index.scss';

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
			path: '/quan-ly-du-an-tao-moi',
			component: React.lazy(() => import('./Projects/CreateProjects'))
		},
		{
			path: '/projects/modify/:type',
			component: React.lazy(() => import('./Projects/CreateProjects'))
		},
		{
			path: '/projects/chart/:detail',
			component: React.lazy(() => import('./Projects/ChartPageProjects'))
		},
		{
			path: '/projects/view',
			component: React.lazy(() => import('./Projects/index'))
		}
	]
};

export default ProjectConfig;
