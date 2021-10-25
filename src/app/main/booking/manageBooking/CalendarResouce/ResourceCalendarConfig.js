import React from 'react';
import '../../index.scss';

const ResourceCalendarConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/booking/resource-calendar/list/:id',
			component: React.lazy(() => import('./ResourceCalendarList'))
		},
		{
			path: '/booking/resource-calendar/calendar/:id',
			component: React.lazy(() => import('./ResourceCalendar/index'))
		}
	]
};
export default ResourceCalendarConfig;
