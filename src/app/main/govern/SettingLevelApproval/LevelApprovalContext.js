import React, { createContext, useState, useMemo } from 'react';

export const LevelApprovalContext = createContext();

export default function LevelApprovalContextProvider({ children }) {
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
	return <LevelApprovalContext.Provider value={valueMemo}>{children}</LevelApprovalContext.Provider>;
}
