import React from 'react';
import ConfirmPage from './Confirm';
import ConfirmContextProvider from './ConfirmContext';

export default function ConfirmProvider() {
	return (
		<ConfirmContextProvider>
			<ConfirmPage />
		</ConfirmContextProvider>
	);
}
