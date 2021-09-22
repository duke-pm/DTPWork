import React from 'react';

const LevelApprovalConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/quan-tri/cap-quyen/:type/:id',
			component: React.lazy(() => import('./modifyLevelApproval'))
		},
		{
			path: '/quan-tri/cap-quyen',
			component: React.lazy(() => import('./index'))
		}
	]
};

export default LevelApprovalConfig;
