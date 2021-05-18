import React from 'react';
import ListUserPage from './ListUserPage';
import ListUserContextProvider from './ListUserContext';

export default function ListUser() {
	return (
		<ListUserContextProvider>
			<ListUserPage />
		</ListUserContextProvider>
	);
}
