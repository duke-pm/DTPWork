import React from 'react';
import BookingContextProvider from '../bookingAllContext';
import AllBookingPage from './AllBookingPage';

export default function AllBooking() {
	return (
		<BookingContextProvider>
			<AllBookingPage />
		</BookingContextProvider>
	);
}
