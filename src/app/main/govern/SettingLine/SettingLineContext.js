import React, { createContext, useState, useMemo } from 'react';

export const SettingLineContext = createContext();

export default function SettingLineContextProvider({ children }) {
	const [form, setForm] = useState(false);
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(0);
	const [rowPage, setRowPage] = useState(25);
	const valueMemo = useMemo(() => {
		return {
			form,
			setForm,
			search,
			setSearch,
			page,
			setPage,
			rowPage,
			setRowPage
		};
	}, [form, setForm, search, setSearch, page, setPage, rowPage, setRowPage]);
	return <SettingLineContext.Provider value={valueMemo}>{children}</SettingLineContext.Provider>;
}
