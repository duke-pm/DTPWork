import React, { createContext, useState, useMemo } from 'react';

export const ConfirmContext = createContext();

export default function ConfirmContextProvider({ children }) {
	const [value, setValue] = useState(0);
	const [formAllocation, setFormAllocation] = useState(false);
	const [formControl, setFormControl] = useState(false);
	const [type, setType] = useState('');
	const [typeReasonReject, setTypeReasonReject] = useState('');
	const [reasonReject, setReasonReject] = useState(false);
	const valueMemo = useMemo(() => {
		return {
			formAllocation,
			setFormAllocation,
			formControl,
			setFormControl,
			value,
			setValue,
			type,
			setType,
			typeReasonReject,
			setTypeReasonReject,
			reasonReject,
			setReasonReject
		};
	}, [
		value,
		setValue,
		formControl,
		setFormControl,
		setFormAllocation,
		formAllocation,
		typeReasonReject,
		setTypeReasonReject,
		reasonReject,
		setReasonReject,
		type
	]);
	return <ConfirmContext.Provider value={valueMemo}>{children}</ConfirmContext.Provider>;
}
