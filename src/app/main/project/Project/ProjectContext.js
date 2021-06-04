import React, { createContext, useState, useMemo } from 'react';

export const ProjectContext = createContext();

export default function ProjectContextProvider({ children }) {
	const [formProject, setFormProject] = useState({
		open: false,
		title: ''
	});
	const [search, setSearch] = useState('');
	const valueMemo = useMemo(() => {
		return {
			formProject,
			setFormProject,
			search,
			setSearch
		};
	}, [formProject, setFormProject, search, setSearch]);
	return <ProjectContext.Provider value={valueMemo}>{children}</ProjectContext.Provider>;
}
