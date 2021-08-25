import React from 'react';
import LevelApprovalContextProvider from './LevelApprovalContext';
import ContentProvider from './ContentProvider';

export default function LevelApproval() {
	return (
		<LevelApprovalContextProvider>
			<ContentProvider />
		</LevelApprovalContextProvider>
	);
}
