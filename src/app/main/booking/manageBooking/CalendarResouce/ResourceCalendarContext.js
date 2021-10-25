import React, { createContext, useMemo, useState } from 'react';

export const ResourceCalendarContext = createContext();

export default function ResourceCalendarContextProvider({ children }) {
	const [page, setPage] = useState(0);
	const [rowPage, setRowPage] = useState(25);
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState({
		direction: 'desc',
		id: null
	});
	const valueMemo = useMemo(() => {
		return {
			search,
			setSearch,
			page,
			setPage,
			rowPage,
			setRowPage,
			sort,
			setSort,
			fromDate,
			setFromDate,
			toDate,
			setToDate
		};
	}, [
		search,
		setSearch,
		page,
		setPage,
		rowPage,
		setRowPage,
		sort,
		setSort,
		fromDate,
		setFromDate,
		toDate,
		setToDate
	]);
	return <ResourceCalendarContext.Provider value={valueMemo}>{children}</ResourceCalendarContext.Provider>;
}
