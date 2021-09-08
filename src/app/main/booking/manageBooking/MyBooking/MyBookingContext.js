import React, { createContext, useMemo } from 'react';

export const BookingContext = createContext();

export default function BookingContextProvider({ children }) {
	const valueMemo = useMemo(() => {
		return {};
	}, []);
	return <BookingContext.Provider value={valueMemo}>{children}</BookingContext.Provider>;
}
