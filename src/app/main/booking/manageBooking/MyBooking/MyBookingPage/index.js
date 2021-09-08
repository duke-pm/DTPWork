import React from 'react';
import BookingContextProvider from '../MyBookingContext';
import AllBookingPage from './MyBookingPage';

export default function AllBooking() {
	return (
		<BookingContextProvider>
			<AllBookingPage />
		</BookingContextProvider>
	);
}
