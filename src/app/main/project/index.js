import React from 'react';
import ProjectContextProvider from './ProjectContext';
import ProjectPage from './ProjectPage';

export default function Project() {
	return (
		<ProjectContextProvider>
			<ProjectPage />
		</ProjectContextProvider>
	);
}
