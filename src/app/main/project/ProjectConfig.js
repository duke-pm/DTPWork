import React from 'react';

const ProjectConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-ly-du-an',
			component: React.lazy(() => import('./index'))
		}
	]
};

export default ProjectConfig;
