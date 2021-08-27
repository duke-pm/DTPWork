import React from 'react';
import ResourceContextProvider from '../resourceContext';
import ResourcePage from './ResourcePage';

export default function Resource() {
	return (
		<ResourceContextProvider>
			<ResourcePage />
		</ResourceContextProvider>
	);
}
