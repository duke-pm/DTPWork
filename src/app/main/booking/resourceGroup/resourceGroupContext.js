import React, { createContext, useMemo, useState } from 'react';

export const ResourceGroupContext = createContext();

export default function ResourceGroupContextProvider({ children }) {
	const [page, setPage] = useState(0);
	const [rowPage, setRowPage] = useState(25);
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState({
		direction: 'asc',
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
			setSort
		};
	}, [search, setSearch, page, setPage, rowPage, setRowPage, sort, setSort]);
	return <ResourceGroupContext.Provider value={valueMemo}>{children}</ResourceGroupContext.Provider>;
}
