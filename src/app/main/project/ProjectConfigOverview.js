import React from 'react';
import './index.scss';

const ProjectConfigOverview = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/projects/projects-overview',
			component: React.lazy(() => import('./ProjectsOverview/index'))
		}
	]
};
export default ProjectConfigOverview;
