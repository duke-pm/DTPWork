import React, { createContext, useState, useMemo } from 'react';

export const ProjectContext = createContext();

export default function ProjectContextProvider({ children }) {
	const [formProject, setFormProject] = useState(false);
	const valueMemo = useMemo(() => {
		return {
			formProject,
			setFormProject
		};
	}, [formProject, setFormProject]);
	return <ProjectContext.Provider value={valueMemo}> {children} </ProjectContext.Provider>;
}
