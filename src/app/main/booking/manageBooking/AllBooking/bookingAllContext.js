import React, { createContext, useMemo, useState } from 'react';

export const BookingContext = createContext();

export default function BookingContextProvider({ children }) {
	const [page, setPage] = useState(0);
	const [rowPage, setRowPage] = useState(25);
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);
	const [resource, setResource] = useState(null);
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
			setToDate,
			resource,
			setResource
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
		setToDate,
		resource,
		setResource
	]);
	return <BookingContext.Provider value={valueMemo}>{children}</BookingContext.Provider>;
}
