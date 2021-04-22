import React, { createContext, useState, useMemo } from 'react';

export const ConfirmContext = createContext();

export default function ConfirmContextProvider({ children }) {
	const [value, setValue] = useState(0);
	const [formControl, setFormControl] = useState(false);
	const [type, setType] = useState('');
	const valueMemo = useMemo(() => {
		return {
			formControl,
			setFormControl,
			value,
			setValue,
			type,
			setType
		};
	}, [value, setValue, formControl, setFormControl]);
	return <ConfirmContext.Provider value={valueMemo}>{children}</ConfirmContext.Provider>;
}
