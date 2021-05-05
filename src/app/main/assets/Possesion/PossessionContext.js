import React, { createContext, useState, useMemo } from 'react';

export const PossessionContext = createContext();

export default function PossessionContextProvider({ children }) {
	const [formCycle, setFormCycle] = useState(false);
	const [typeReport] = useState('');
	const [formService, setFormService] = useState(false);
	const [liquiAsset, setLiquiAsset] = useState(false);
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
			liquiAsset,
			setLiquiAsset,
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
			setSort,
			formService,
			setFormService
		};
	}, [
		formCycle,
		page,
		rowPage,
		search,
		typeCycle,
		typeReport,
		value,
		sort,
		setSort,
		liquiAsset,
		setLiquiAsset,
		formService,
		setFormService
	]);
	return <PossessionContext.Provider value={valueMemo}>{children}</PossessionContext.Provider>;
}
