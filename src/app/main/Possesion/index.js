import React from 'react';
import PossesionPage from './Possesion';
import PossessionContextProvider from './PossessionContext';

export default function PossesionProvider() {
	return (
		<PossessionContextProvider>
			<PossesionPage />
		</PossessionContextProvider>
	);
}
