import React from 'react';
import SettingMenuContextProvider from './SettingMenuContext';
import SettingMenuPage from './SettingMenuPage';

export default function SettingMenu() {
	return (
		<SettingMenuContextProvider>
			<SettingMenuPage />
		</SettingMenuContextProvider>
	);
}
