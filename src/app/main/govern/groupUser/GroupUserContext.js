import React, { createContext, useState, useMemo } from 'react';

export const GroupUserContext = createContext();
export default function GroupUserContextProvider({ children }) {
	const [page, setPage] = useState(0);
	const [rowPage, setRowPage] = useState(25);
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
			setSort
		};
	}, [page, setPage, rowPage, setRowPage, sort, setSort, search, setSearch]);
	return <GroupUserContext.Provider value={valueMemo}>{children}</GroupUserContext.Provider>;
}
