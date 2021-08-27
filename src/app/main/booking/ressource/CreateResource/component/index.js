import React from 'react';
import CustomForm from './CustomForm';

export default function index() {
	const initital = {
		name: '',
		description: '',
		color: '#ffe0b2',
		allowRecurre: true,
		allowAdding: true,
		overlapping: true,
		approval: 1,
		department: [1],
		notification: 1
	};
	return (
		<>
			<CustomForm initital={initital} />
		</>
	);
}
