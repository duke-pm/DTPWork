import React, { createContext, useState } from 'react';

export const PossessionContext = createContext();

export default function PossessionContextProvider({ children }) {
	const [formCycle, setFormCycle] = useState(false);
	const [formReport, setFormReport] = useState(false);
	const [typeReport, setTypeReport] = useState('');
	const [typeCycle, setTypeCycle] = useState('');
	const [rowPage, setRowPage] = React.useState(25);
	const [page, setPage] = React.useState(0);
	const handleOpenFormCycle = type => {
		setFormCycle(true);
		setTypeCycle(type);
	};
	const handleOpenFormReport = type => {
		setFormReport(true);
		setTypeReport(type);
	};
	const handleCloseFormCycle = () => setFormCycle(false);
	const handleCloseFormReport = () => setFormReport(false);
	return (
		<PossessionContext.Provider
			value={{
				handleOpenFormReport,
				handleOpenFormCycle,
				handleCloseFormCycle,
				handleCloseFormReport,
				formCycle,
				typeCycle,
				typeReport,
				formReport,
				rowPage,
				setRowPage,
				page,
				setPage
			}}
		>
			{children}
		</PossessionContext.Provider>
	);
}
