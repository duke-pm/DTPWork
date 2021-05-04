import React, { createContext, useState, useMemo } from 'react';

export const PossessionContext = createContext();

export default function PossessionContextProvider({ children }) {
	const [formCycle, setFormCycle] = useState(false);
	const [typeReport, setTypeReport] = useState('');
	const [typeCycle, setTypeCycle] = useState('');
	const [rowPage, setRowPage] = React.useState(25);
	const [page, setPage] = React.useState(0);
	const [value, setValue] = React.useState(0);
	const [search, setSearch] = React.useState('');
	const [sort, setSort] = React.useState({
		direction: 'asc',
		id: null
	});
	const handleOpenFormCycle = type => {
		setFormCycle(true);
		setTypeCycle(type);
	};
	const handleCloseFormCycle = () => setFormCycle(false);
	const valueMemo = useMemo(() => {
		return {
			formCycle,
			handleOpenFormCycle,
			handleCloseFormCycle,
			setRowPage,
			setPage,
			setValue,
			setSearch,
			typeCycle,
			typeReport,
			rowPage,
			page,
			value,
			search,
			sort,
			setSort
		};
	}, [formCycle, page, rowPage, search, typeCycle, typeReport, value, sort, setSort]);
	return <PossessionContext.Provider value={valueMemo}>{children}</PossessionContext.Provider>;
}
