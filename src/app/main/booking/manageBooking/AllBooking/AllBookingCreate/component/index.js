import React from 'react';
import moment from 'moment';
import CustomForm from './CustomForm';

export default function index() {
	const initital = {
		resource: [],
		purpose: '',
		description: '',
		participants: [],
		checkBooking: true,
		booking: {
			timeStart: null,
			timeEnd: null,
			startDate: null,
			endDate: null
		}
	};
	return (
		<>
			<CustomForm initital={initital} />
		</>
	);
}
