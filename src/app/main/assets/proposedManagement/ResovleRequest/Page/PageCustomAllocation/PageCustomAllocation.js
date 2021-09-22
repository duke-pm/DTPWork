import React, { useState, createContext, useMemo } from 'react';

export const CustomAllocationContext = createContext();

export default function CustomAllocationContextProvider({ children }) {
	const [diaglogConfirmGobal, setDialogConfirmGobal] = useState(false);
	const valueMemo = useMemo(() => {
		return {
			diaglogConfirmGobal,
			setDialogConfirmGobal
		};
	}, [diaglogConfirmGobal, setDialogConfirmGobal]);
	return <CustomAllocationContext.Provider value={valueMemo}>{children}</CustomAllocationContext.Provider>;
}
