import React, { createContext, useState, useMemo } from 'react';

export const ResovleContext = createContext();

export default function ResovleRequestContext({ children }) {
	const [page, setPage] = useState(0);
	const [rowPage, setRowPage] = React.useState(25);
	const [dateStart, setDateStart] = useState('');
	const [dateEnd, setDateEnd] = useState('');
	const [status, setStatus] = useState(0);
	const [search, setSearch] = useState('');
	const [diaglogAllocation, setDialogAllocation] = useState(false);
	const [diaglogCorrupt, setDialogCorrupt] = useState(false);
	const [typeDialogCorrupt, setTypeDialogCorrupt] = useState(false);
	const [diaglogConfirmGobal, setDialogConfirmGobal] = useState(false);
	const [sort, setSort] = useState({
		direction: 'desc',
		id: null
	});
	const valueMemo = useMemo(() => {
		return {
			diaglogAllocation,
			setDialogAllocation,
			diaglogCorrupt,
			setDialogCorrupt,
			typeDialogCorrupt,
			setTypeDialogCorrupt,
			diaglogConfirmGobal,
			setDialogConfirmGobal,
			search,
			setSearch,
			dateEnd,
			setDateEnd,
			status,
			setStatus,
			dateStart,
			setDateStart,
			page,
			setPage,
			rowPage,
			setRowPage,
			sort,
			setSort
		};
	}, [
		page,
		setPage,
		rowPage,
		setRowPage,
		dateEnd,
		setDateEnd,
		status,
		setStatus,
		dateStart,
		setDateStart,
		search,
		setSearch,
		sort,
		setSort,
		diaglogAllocation,
		setDialogAllocation,
		diaglogCorrupt,
		setDialogCorrupt,
		typeDialogCorrupt,
		setTypeDialogCorrupt,
		diaglogConfirmGobal,
		setDialogConfirmGobal
	]);
	return <ResovleContext.Provider value={valueMemo}>{children}</ResovleContext.Provider>;
}
