import React, { createContext } from 'react';

export const GroupUserContext = createContext();
export default function GroupUserContextProvider({ children }) {
	return <GroupUserContext.Provider>{children}</GroupUserContext.Provider>;
}
