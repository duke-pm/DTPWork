import React, { createContext, useState, useMemo } from 'react';
import * as moment from 'moment';

export const ConfirmContext = createContext();

export default function ConfirmContextProvider({ children }) {
	const [value, setValue] = useState(1);
	const [page, setPage] = useState(0);
	const [rowPage, setRowPage] = React.useState(25);
	const [formAllocation, setFormAllocation] = useState(false);
	const [formControl, setFormControl] = useState(false);
	const [reasonReject, setReasonReject] = useState(false);
	const [timeLine, setTimeLine] = useState({
		open: false,
		title: ''
	});
	const [type, setType] = useState('');
	const [typeReasonReject, setTypeReasonReject] = useState('');
	const [dateStart, setDateStart] = useState(moment().startOf('month'));
	const [dateEnd, setDateEnd] = useState(moment().endOf('month'));
	const [status, setStatus] = useState(null);
	const [search, setSearch] = useState('');
	const [sort, setSort] = useState({
		direction: 'desc',
		id: null
	});
	const valueMemo = useMemo(() => {
		return {
			timeLine,
			setTimeLine,
			search,
			setSearch,
			dateEnd,
			setDateEnd,
			status,
			setStatus,
			dateStart,
			setDateStart,
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
			setReasonReject,
			page,
			setPage,
			rowPage,
			setRowPage,
			sort,
			setSort
		};
	}, [
		timeLine,
		setTimeLine,
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
		type,
		page,
		setPage,
		rowPage,
		setRowPage,
		dateEnd,
		setDateEnd,
		status,
		setStatus,
		dateStart,
		setDateStart,
		search,
		setSearch,
		sort,
		setSort
	]);
	return <ConfirmContext.Provider value={valueMemo}>{children}</ConfirmContext.Provider>;
}
