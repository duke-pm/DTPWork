import React from 'react';
import ProjectOverviewContextProvider from './ProjectOverviewContext';
import ProjectOverviewPage from './ProjectOverviewPage';

export default function ProjectOverView() {
	return (
		<ProjectOverviewContextProvider>
			<ProjectOverviewPage />
		</ProjectOverviewContextProvider>
	);
}
