import React, { createContext, useState, useMemo } from 'react';

export const ListRoleMenuSettingContext = createContext();
export default function ListRoleSettingProvider({ children }) {
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
	return <ListRoleMenuSettingContext.Provider value={valueMemo}>{children}</ListRoleMenuSettingContext.Provider>;
}
