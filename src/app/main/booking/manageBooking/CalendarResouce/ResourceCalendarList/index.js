import React from 'react';
import ResourceCalendarContextProvider from '../ResourceCalendarContext';
import ResourceCalendarBookingPage from './ResourceCalendarBookingPage';

export default function ResourceCalendarList() {
	return (
		<ResourceCalendarContextProvider>
			<ResourceCalendarBookingPage />
		</ResourceCalendarContextProvider>
	);
}
