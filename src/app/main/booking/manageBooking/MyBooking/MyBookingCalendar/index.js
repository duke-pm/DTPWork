import React from 'react';
import BookingContextProvider from '../MyBookingContext';
import MyBookingCalen from './MyBookingCalendar';

export default function MyBookingCalendar() {
	return (
		<BookingContextProvider>
			<MyBookingCalen />
		</BookingContextProvider>
	);
}
