/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { IconButton, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { DatePicker, Select } from 'antd';
import * as moment from 'moment';
import { ConfirmContext } from '../../ConfirmContext';
import * as actions from '../../_redux/confirmAction';

const { RangePicker } = DatePicker;

const useStyles = makeStyles(theme => ({
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	}
}));

export default function ActionComponent({ actionLoading }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const confirmConext = useContext(ConfirmContext);
	const {
		search,
		setSearch,
		rowPage,
		page,
		setPage,
		setDateEnd,
		setDateStart,
		setStatus,
		status,
		dateEnd,
		dateStart
	} = confirmConext;
	const handleSearch = e => {
		e.preventDefault();
		setPage(0);
		const searchHandle = e.target.value;
		dispatch(actions.searchConfirms(status, rowPage, page, searchHandle, dateStart, dateEnd));
	};
	onkeypress = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			setPage(0);
			dispatch(actions.searchConfirms(status, rowPage, page, search, dateStart, dateEnd));
		}
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			dispatch(actions.searchConfirms(status, rowPage, page, e.target.value, dateStart, dateEnd));
		}
	};
	const handleChangeFilterDate = (date, dateString) => {
		setPage(0);
		dispatch(actions.searchConfirms(status, rowPage, page, search, date && date[0], date && date[1]));
		setDateEnd(date && date[0]);
		setDateStart(date && date[1]);
	};
	const onHandleChangeStatus = value => {
		setStatus(value);
		setPage(0);
		dispatch(actions.searchConfirms(value, rowPage, page, search, dateStart, dateEnd));
	};
	return (
		<>
			<FuseAnimate animation="transition.slideLeftIn" delay={300}>
				<div className="flex flex-col sm:flex-row">
					<Paper component="form" className="w-full sm:w-1/4 flex justify-between">
						<InputBase
							onKeyPress={e => onkeypress(e)}
							onChange={e => onHandleChange(e)}
							className={classes.input}
							value={search}
							placeholder="Tìm kiếm"
							inputProps={{ 'aria-label': 'search google maps' }}
						/>
						<IconButton
							onClick={e => handleSearch(e)}
							type="button"
							className={classes.iconButton}
							aria-label="search"
						>
							<SearchIcon />
						</IconButton>
					</Paper>
					<Paper className="ml-16">
						<RangePicker
							ranges={{
								'Hôm nay': [moment(), moment()],
								'Tháng này': [moment().startOf('month'), moment().endOf('month')]
							}}
							format="DD/MM/YYYY"
							onChange={handleChangeFilterDate}
							style={{ height: '100%' }}
							placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
						/>
					</Paper>
					<Paper style={{ width: '220px' }} className="ml-16">
						<Select
							loading={!!actionLoading}
							onChange={onHandleChangeStatus}
							bordered={false}
							defaultValue="0"
							style={{ width: '100%' }}
						>
							<Select.Option value="0">Tất cả</Select.Option>
							<Select.Option value="1">Chờ phê duyệt</Select.Option>
							<Select.Option value="2">Đã duyệt</Select.Option>
							<Select.Option value="3">Hoàn thành</Select.Option>
							<Select.Option value="4">Từ chối</Select.Option>
						</Select>
					</Paper>
				</div>
			</FuseAnimate>
		</>
	);
}
