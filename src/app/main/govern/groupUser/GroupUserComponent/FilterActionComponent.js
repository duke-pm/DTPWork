/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { IconButton, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
// import { DatePicker, Select } from 'antd';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
// import * as moment from 'moment';
import 'antd/dist/antd.css';

export default function ActionComponent({ actionLoading }) {
	// const classes = useStyles();
	// const dispatch = useDispatch();
	const mainTheme = useSelector(selectMainTheme);
	// const handleSearch = e => {
	// 	e.preventDefault();
	// 	setPage(0);
	// 	dispatch(
	// 		actions.searchConfirms(true, status, rowPage, page, 0, sort.id, sort.direction, search, dateStart, dateEnd)
	// 	);
	// };
	// onkeypress = e => {
	// 	if (e.key === 'Enter') {
	// 		e.preventDefault();
	// 		setPage(0);
	// 		dispatch(
	// 			actions.searchConfirms(
	// 				true,
	// 				status,
	// 				rowPage,
	// 				page,
	// 				0,
	// 				sort.id,
	// 				sort.direction,
	// 				search,
	// 				dateStart,
	// 				dateEnd
	// 			)
	// 		);
	// 	}
	// };
	// const onHandleChange = e => {
	// 	setSearch(e.target.value);
	// 	setPage(0);
	// 	if (e.target.value.length <= 0) {
	// 		dispatch(
	// 			actions.searchConfirms(
	// 				true,
	// 				status,
	// 				rowPage,
	// 				page,
	// 				0,
	// 				sort.id,
	// 				sort.direction,
	// 				e.target.value,
	// 				dateStart,
	// 				dateEnd
	// 			)
	// 		);
	// 	}
	// };
	// const handleChangeFilterDateStart = date => {
	// 	setDateStart(date);
	// 	setPage(0);
	// 	dispatch(
	// 		actions.searchConfirms(true, status, rowPage, page, 0, sort.id, sort.direction, search, date, dateEnd)
	// 	);
	// };
	// const handleChangeFilterDateEnd = date => {
	// 	setDateEnd(date);
	// 	setPage(0);
	// 	dispatch(
	// 		actions.searchConfirms(true, status, rowPage, page, 0, sort.id, sort.direction, search, dateStart, date)
	// 	);
	// };
	// const onHandleChangeStatus = value => {
	// 	setStatus(value);
	// 	setPage(0);
	// 	dispatch(
	// 		actions.searchConfirms(true, value, rowPage, page, 0, sort.id, sort.direction, search, dateStart, dateEnd)
	// 	);
	// };
	// const onHandleChangeType = value => {
	// 	dispatch(
	// 		actions.searchConfirms(
	// 			true,
	// 			value,
	// 			rowPage,
	// 			page,
	// 			value,
	// 			sort.id,
	// 			sort.direction,
	// 			search,
	// 			dateStart,
	// 			dateEnd
	// 		)
	// 	);
	// };
	return (
		<ThemeProvider theme={mainTheme}>
			<Paper component="form" style={{ height: '33px' }} className="w-full sm:w-1/4 h-31 flex justify-between">
				<InputBase
					onKeyPress={e => onkeypress(e)}
					// onChange={e => onHandleChange(e)}
					// className={classes.input}
					// value={search}
					placeholder="Tìm kiếm"
					inputProps={{ 'aria-label': 'search google maps' }}
				/>
				<IconButton
					// onClick={e => handleSearch(e)}
					type="button"
					// className={classes.iconButton}
					aria-label="search"
				>
					<SearchIcon />
				</IconButton>
			</Paper>
		</ThemeProvider>
	);
}
