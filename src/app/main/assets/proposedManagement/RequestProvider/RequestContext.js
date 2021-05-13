import React, { createContext } from 'react';

const RequestProviderContext = createContext();

export default function RequestContext({ children }) {
	return <RequestProviderContext.Provider value>{children}</RequestProviderContext.Provider>;
}
