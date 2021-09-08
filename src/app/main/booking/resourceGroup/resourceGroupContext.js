import React, { createContext, useMemo } from 'react';

export const ResourceGroupContext = createContext();

export default function ResourceGroupContextProvider({ children }) {
	const valueMemo = useMemo(() => {
		return {};
	}, []);
	return <ResourceGroupContext.Provider value={valueMemo}>{children}</ResourceGroupContext.Provider>;
}
