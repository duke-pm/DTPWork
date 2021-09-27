import React, { createContext, useMemo, useState } from 'react';

export const ResourceContext = createContext();

export default function ResourceContextProvider({ children }) {
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
	return <ResourceContext.Provider value={valueMemo}>{children}</ResourceContext.Provider>;
}
