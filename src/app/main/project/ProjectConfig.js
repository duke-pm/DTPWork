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
			path: '/projects/task/:detail',
			component: React.lazy(() => import('./Project/index'))
		},
		{
			path: '/projects/modify-task/:category/:id/:type',
			component: React.lazy(() => import('./Project/CreateProject'))
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
