import React, { createContext, useState, useMemo } from 'react';

export const ProjectContext = createContext();

export default function ProjectContextProvider({ children }) {
	const [formProject, setFormProject] = useState({
		open: false,
		title: ''
	});
	const [visible, setVisible] = useState(false);
	const [search, setSearch] = useState('');
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
			setGantt
		};
	}, [formProject, setFormProject, search, setSearch, visible, setVisible, gantt, setGantt]);
	return <ProjectContext.Provider value={valueMemo}>{children}</ProjectContext.Provider>;
}
