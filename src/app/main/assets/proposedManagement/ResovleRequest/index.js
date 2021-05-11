import React from 'react';
import ResovleRequestContext from './ResovleRequestContext';
import ResovleRequestPage from './ResovleRequestPage';

export default function ResovleRequestProvider() {
	return (
		<ResovleRequestContext>
			<ResovleRequestPage />
		</ResovleRequestContext>
	);
}
