import React from 'react';
import GroupUserContextProvider from './GroupUserContext';
import GroupUserPage from './GroupUserPage';

export default function GroupUser() {
	return (
		<GroupUserContextProvider>
			<GroupUserPage />
		</GroupUserContextProvider>
	);
}
