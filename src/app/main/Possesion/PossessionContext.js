import React, { createContext, useState, useMemo } from 'react';

export const PossessionContext = createContext();

export default function PossessionContextProvider({ children }) {
	const [formCycle, setFormCycle] = useState(false);
	const [formReport, setFormReport] = useState(false);
	const [typeReport, setTypeReport] = useState('');
	const [typeCycle, setTypeCycle] = useState('');
	const [rowPage, setRowPage] = React.useState(25);
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
	const valueMemo = useMemo(() => {
		return {
			formCycle,
			handleOpenFormReport,
			handleOpenFormCycle,
			handleCloseFormCycle,
			handleCloseFormReport,
			setRowPage,
			setPage,
			setValue,
			setSearch,
			typeCycle,
			typeReport,
			formReport,
			rowPage,
			page,
			value,
			search
		};
	}, [formCycle, formReport, page, rowPage, search, typeCycle, typeReport, value]);
	return <PossessionContext.Provider value={valueMemo}>{children}</PossessionContext.Provider>;
}
