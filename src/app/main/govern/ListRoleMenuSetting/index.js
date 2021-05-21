import React from 'react';
import ListRoleSettingPage from './ListRoleSettingPage';
import ListRoleSettingProvider from './ListRoleMenuSettingContext';

export default function ListUser() {
	return (
		<ListRoleSettingProvider>
			<ListRoleSettingPage />
		</ListRoleSettingProvider>
	);
}
