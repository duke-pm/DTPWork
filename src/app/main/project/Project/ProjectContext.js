import React, { createContext, useState, useMemo } from 'react';
import * as moment from 'moment';

export const ProjectContext = createContext();

export default function ProjectContextProvider({ children }) {
	const [formProject, setFormProject] = useState({
		open: false,
		title: ''
	});
	const [visible, setVisible] = useState(false);
	const [search, setSearch] = useState('');
	const [dateStart, setDateStart] = useState(moment().format('YYYY'));
	const [ownerFilter, setOwnerFilter] = useState(null);
	const [status, setStatus] = useState(null);
	const [sector, setSector] = useState(null);
	const [page, setPage] = useState(0);
	const [rowPage, setRowPage] = useState(25);
	const [gantt, setGantt] = useState(false);
	const valueMemo = useMemo(() => {
		return {
			formProject,
			setFormProject,
			search,
			setSearch,
			visible,
			setVisible,
			gantt,
			setGantt,
			dateStart,
			setDateStart,
			ownerFilter,
			setOwnerFilter,
			status,
			setStatus,
			sector,
			setSector,
			page,
			setPage,
			rowPage,
			setRowPage
		};
	}, [
		formProject,
		setFormProject,
		search,
		setSearch,
		visible,
		setVisible,
		gantt,
		setGantt,
		dateStart,
		setDateStart,
		ownerFilter,
		setOwnerFilter,
		status,
		setStatus,
		sector,
		setSector,
		page,
		setPage,
		rowPage,
		setRowPage
	]);
	return <ProjectContext.Provider value={valueMemo}>{children}</ProjectContext.Provider>;
}
