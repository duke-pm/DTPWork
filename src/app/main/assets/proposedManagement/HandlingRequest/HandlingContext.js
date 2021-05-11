import React, { createContext } from 'react';

const HandlingCreateContext = createContext();

export default function HandlingContext({ children }) {
	return <HandlingCreateContext.Provider value>{children}</HandlingCreateContext.Provider>;
}
