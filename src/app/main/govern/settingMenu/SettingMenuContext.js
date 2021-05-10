import React, { createContext } from 'react';

export const SettingmenuContext = createContext();

export default function SettingMenuContextProvider({ children }) {
	return <SettingmenuContext.Provider>{children}</SettingmenuContext.Provider>;
}
