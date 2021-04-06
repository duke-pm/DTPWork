import React, { createContext, useState } from 'react';

export const PossessionContext = createContext();

export default function PossessionContextProvider({ children }) {
	const [formCycle, setFormCycle] = useState(false);
	const [typeCycle, setTypeCycle] = useState('');
	const handleOpenFormCycle = type => {
		setFormCycle(true);
		setTypeCycle(type);
	};
	const handleCloseFormCycle = () => {
		setFormCycle(false);
	};
	return (
		<PossessionContext.Provider value={{ handleOpenFormCycle, handleCloseFormCycle, formCycle, typeCycle }}>
			{children}
		</PossessionContext.Provider>
	);
}
