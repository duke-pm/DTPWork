import React, { createContext, useState, useMemo } from 'react';

export const ResovleContext = createContext();

export default function ResovleRequestContext({ children }) {
	const [page, setPage] = useState(0);
	const [rowPage, setRowPage] = React.useState(25);
	const [dateStart, setDateStart] = useState('');
	const [dateEnd, setDateEnd] = useState('');
	const [status, setStatus] = useState(0);
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState({
		direction: 'desc',
		id: null
	});
	const valueMemo = useMemo(() => {
		return {
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
		setSort
	]);
	return <ResovleContext.Provider value={valueMemo}>{children}</ResovleContext.Provider>;
}
