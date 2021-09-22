import React, { useState, createContext, useMemo } from 'react';

export const CustomCorruptContext = createContext();

export default function CustomCorruptContextProvider({ children }) {
	const [diaglogConfirmGobal, setDialogConfirmGobal] = useState(false);
	const valueMemo = useMemo(() => {
		return {
			diaglogConfirmGobal,
			setDialogConfirmGobal
		};
	}, [diaglogConfirmGobal, setDialogConfirmGobal]);
	return <CustomCorruptContext.Provider value={valueMemo}>{children}</CustomCorruptContext.Provider>;
}
