import React from 'react';
import ResourceGroupContextProvider from '../resourceGroupContext';
import ResourceGroupPage from './ResourceGroupPage';

export default function ResourceGroup() {
	return (
		<ResourceGroupContextProvider>
			<ResourceGroupPage />
		</ResourceGroupContextProvider>
	);
}
