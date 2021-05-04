import React from 'react';
import HandlingContext from './HandlingContext';
import HandlingPage from './HandlingPage';

export default function HandlingProvider() {
	return (
		<HandlingContext>
			<HandlingPage />
		</HandlingContext>
	);
}
