import React from 'react';

const ProjectConfigOverview = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/tong-quan-du-an',
			component: React.lazy(() => import('./ProjectsOverview/index'))
		}
	]
};
export default ProjectConfigOverview;
