import React from 'react';
import DocumentAssetsContextProvider from './DocumentAssetsContext';
import DocumentAssetsPage from './DocumentAssetsPage';

export default function DocumentAssetsProvider() {
	return (
		<DocumentAssetsContextProvider>
			<DocumentAssetsPage />
		</DocumentAssetsContextProvider>
	);
}
