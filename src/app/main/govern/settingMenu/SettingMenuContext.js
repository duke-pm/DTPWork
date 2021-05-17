import React, { createContext, useState, useMemo } from 'react';

export const SettingmenuContext = createContext();

export default function SettingMenuContextProvider({ children }) {
	const [page, setPage] = useState(0);
	const [rowPage, setRowPage] = useState(25);
	const [sort, setSort] = useState({
		direction: 'desc',
		id: null
	});
	const valueMemo = useMemo(() => {
		return {
			page,
			setPage,
			rowPage,
			setRowPage,
			sort,
			setSort
		};
	}, [page, setPage, rowPage, setRowPage, sort, setSort]);
	return <SettingmenuContext.Provider value={valueMemo}>{children}</SettingmenuContext.Provider>;
}
