import React from 'react';
import '../../index.scss';

const MyBookingConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/booking/list-my-booking',
			component: React.lazy(() => import('./MyBookingPage'))
		},
		{
			path: '/booking/calendar-my-booking',
			component: React.lazy(() => import('./MyBookingCalendar'))
		}
	]
};
export default MyBookingConfig;
