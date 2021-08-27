import React, { createContext, useMemo } from 'react';

export const ResourceContext = createContext();

export default function ResourceContextProvider({ children }) {
	const valueMemo = useMemo(() => {
		return {};
	}, []);
	return <ResourceContext.Provider value={valueMemo}>{children}</ResourceContext.Provider>;
}
