import React, { createContext, useState, useMemo } from 'react';

export const SettingmenuContext = createContext();

export default function SettingMenuContextProvider({ children }) {
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState('');
	const [rowPage, setRowPage] = useState(25);
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
	return <SettingmenuContext.Provider value={valueMemo}>{children}</SettingmenuContext.Provider>;
}
