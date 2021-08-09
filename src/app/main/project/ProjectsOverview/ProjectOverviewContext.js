import React, { createContext, useState, useMemo } from 'react';
import * as moment from 'moment';

export const ProjectOverviewContext = createContext();

export default function ProjectOverviewContextProvider({ children }) {
	const [formProject, setFormProject] = useState(false);
	const [title, setTitle] = useState('');
	const [search, setSearch] = useState('');
	const [dateStart, setDateStart] = useState(moment().format('YYYY'));
	const [dateEnd, setDateEnd] = useState(moment().add(5, 'year').format('YYYY'));
	const [ownerFilter, setOwnerFilter] = useState(null);
	const [status, setStatus] = useState(null);
	const [sector, setSector] = useState(null);
	const [page, setPage] = useState(0);
	const [rowPage, setRowPage] = useState(25);
	const valueMemo = useMemo(() => {
		return {
			title,
			setTitle,
			formProject,
			setFormProject,
			search,
			setSearch,
			dateStart,
			setDateStart,
			dateEnd,
			setDateEnd,
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
		title,
		setTitle,
		dateStart,
		setDateStart,
		dateEnd,
		setDateEnd,
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
	return <ProjectOverviewContext.Provider value={valueMemo}> {children} </ProjectOverviewContext.Provider>;
}
