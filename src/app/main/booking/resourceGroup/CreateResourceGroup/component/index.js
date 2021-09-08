import React from 'react';
import CustomForm from './CustomForm';

export default function index() {
	const initital = {
		name: '',
		description: '',
		icon: ''
	};
	return (
		<>
			<CustomForm initital={initital} />
		</>
	);
}
