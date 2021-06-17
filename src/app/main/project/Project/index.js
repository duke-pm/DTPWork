import React from 'react';
import ProjectContextProvider from './ProjectContext';
import ContentProvider from './ContentProvider';

export default function Project() {
	return (
		<ProjectContextProvider>
			<ContentProvider />
		</ProjectContextProvider>
	);
}
