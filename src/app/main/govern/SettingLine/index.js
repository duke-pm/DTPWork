import React from 'react';
import SettingLineContextProvider from './SettingLineContext';
import ContentProvider from './ContentProvider';

export default function Line() {
	return (
		<SettingLineContextProvider>
			<ContentProvider />
		</SettingLineContextProvider>
	);
}
