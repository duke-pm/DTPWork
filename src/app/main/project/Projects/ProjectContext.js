import React, { createContext, useState, useMemo } from 'react';

export const ProjectContext = createContext();

export default function ProjectContextProvider({ children }) {
	const [formProject, setFormProject] = useState(false);
	const [title, setTitle] = useState('');
	const [search, setSearch] = useState('');
	const valueMemo = useMemo(() => {
		return {
			title,
			setTitle,
			formProject,
			setFormProject,
			search,
			setSearch
		};
	}, [formProject, setFormProject, search, setSearch, title, setTitle]);
	return <ProjectContext.Provider value={valueMemo}> {children} </ProjectContext.Provider>;
}
