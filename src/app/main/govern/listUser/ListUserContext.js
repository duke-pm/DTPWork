import React, { createContext } from 'react';

export const ListUserContext = createContext();
export default function ListUserContextProvider({ children }) {
	return <ListUserContext.Provider value>{children}</ListUserContext.Provider>;
}
