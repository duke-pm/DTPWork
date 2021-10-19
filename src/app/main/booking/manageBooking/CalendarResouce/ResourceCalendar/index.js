import React from 'react';
import ResourceCalendarContextProvider from '../ResourceCalendarContext';
import ResourceCalendarPage from './ResourceCalendar';

export default function ResourceCalendar() {
	return (
		<ResourceCalendarContextProvider>
			<ResourceCalendarPage />
		</ResourceCalendarContextProvider>
	);
}
