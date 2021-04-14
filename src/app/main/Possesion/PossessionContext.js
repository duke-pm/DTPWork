import React, { createContext, useState } from 'react';

export const PossessionContext = createContext();

export default function PossessionContextProvider({ children }) {
	const [formCycle, setFormCycle] = useState(false);
	const [formReport, setFormReport] = useState(false);
	const [typeReport, setTypeReport] = useState('');
	const [typeCycle, setTypeCycle] = useState('');
	const [rowPage, setRowPage] = React.useState(2);
	const [page, setPage] = React.useState(0);
	const [value, setValue] = React.useState(0);
	const [search, setSearch] = React.useState('');
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
				setPage,
				value,
				setValue,
				search,
				setSearch
			}}
		>
			{children}
		</PossessionContext.Provider>
	);
}
