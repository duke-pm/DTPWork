import React, { createContext, useState, useMemo } from 'react';

export const ProjectContext = createContext();

export default function ProjectContextProvider({ children }) {
	const [formProject, setFormProject] = useState({
		open: false,
		title: ''
	});
	const [visible, setVisible] = useState(false);
	const [search, setSearch] = useState('');
	const valueMemo = useMemo(() => {
		return {
			formProject,
			setFormProject,
			search,
			setSearch,
			visible,
			setVisible
		};
	}, [formProject, setFormProject, search, setSearch, visible, setVisible]);
	return <ProjectContext.Provider value={valueMemo}>{children}</ProjectContext.Provider>;
}
