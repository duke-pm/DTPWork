import React from 'react';
import '../../index.scss';

const AllBookingConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/booking/all-booking',
			component: React.lazy(() => import('./AllBookingPage'))
		},
		{
			path: '/booking/modify-booking/:type',
			component: React.lazy(() => import('./AllBookingCreate'))
		},
		{
			path: '/booking/view/:id',
			component: React.lazy(() => import('./AllBookingView'))
		}
	]
};
export default AllBookingConfig;
