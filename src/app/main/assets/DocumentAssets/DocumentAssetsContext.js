import React, { createContext, useState, useMemo } from 'react';

export const DocumentContext = createContext();
export default function DocumentAssetsContextProvider({ children }) {
	const [search, setSearch] = React.useState('');
	const [page, setPage] = React.useState(0);
	const [rowPage, setRowPage] = React.useState(25);
	const [type, setType] = useState(0);
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);
	const valueMemo = useMemo(() => {
		return {
			setPage,
			page,
			search,
			setSearch,
			rowPage,
			setRowPage,
			type,
			setType,
			fromDate,
			setFromDate,
			toDate,
			setToDate
		};
	}, [
		setPage,
		page,
		search,
		setSearch,
		rowPage,
		setRowPage,
		type,
		setType,
		fromDate,
		setFromDate,
		toDate,
		setToDate
	]);
	return <DocumentContext.Provider value={valueMemo}>{children}</DocumentContext.Provider>;
}
