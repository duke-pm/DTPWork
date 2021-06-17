/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { IconButton, Paper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { DatePicker, Select } from 'antd';
import * as moment from 'moment';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import { ResovleContext } from '../ResovleRequestContext';
import * as actions from '../../_redux/confirmAction';

export default function ActionComponent({ actionLoading }) {
	const classes = DtpCustomStyles();
	const dispatch = useDispatch();
	const confirmConext = useContext(ResovleContext);
	const { search, setSearch, rowPage, page, setPage, setDateEnd, setDateStart, status, dateEnd, dateStart, sort } =
		confirmConext;
	const handleSearch = () => {
		setPage(0);
		dispatch(
			actions.searchConfirms(true, status, rowPage, page, 0, sort.id, sort.direction, search, dateStart, dateEnd)
		);
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			dispatch(
				actions.searchConfirms(
					true,
					status,
					rowPage,
					page,
					0,
					sort.id,
					sort.direction,
					e.target.value,
					dateStart,
					dateEnd
				)
			);
		}
	};
	const handleChangeFilterDateStart = date => {
		setDateStart(date);
		setPage(0);
		dispatch(
			actions.searchConfirms(true, status, rowPage, page, 0, sort.id, sort.direction, search, date, dateEnd)
		);
	};
	const handleChangeFilterDateEnd = date => {
		setDateEnd(date);
		setPage(0);
		dispatch(
			actions.searchConfirms(true, status, rowPage, page, 0, sort.id, sort.direction, search, dateStart, date)
		);
	};
	const onHandleChangeType = value => {
		dispatch(
			actions.searchConfirms(
				true,
				status,
				rowPage,
				page,
				value,
				sort.id,
				sort.direction,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	return (
		<>
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				<div className="flex flex-col sm:flex-row justify-between">
					<Typography variant="subtitle1" color="inherit">
						Filter
					</Typography>
				</div>
				<div className="flex flex-col sm:flex-row">
					<Paper className="w-full sm:w-1/4 flex justify-between">
						<DatePicker
							onChange={handleChangeFilterDateStart}
							defaultValue={moment().startOf('month')}
							format="DD/MM/YYYY"
							placeholder="Ngày bắt đầu"
							style={{ width: '100%' }}
						/>
						<DatePicker
							onChange={handleChangeFilterDateEnd}
							defaultValue={moment().endOf('month')}
							format="DD/MM/YYYY"
							placeholder="Ngày kết thúc"
							style={{ width: '100%' }}
						/>
					</Paper>
					<Paper style={{ width: '220px' }} className="ml-16 sm:mb-0 mb-9">
						<Select
							loading={!!actionLoading}
							placeholder="Tìm kiếm theo loại yêu cầu"
							onChange={onHandleChangeType}
							bordered={false}
							style={{ width: '100%' }}
						>
							<Select.Option value="0">Tất cả</Select.Option>
							<Select.Option value="1">Yêu cầu cấp phát</Select.Option>
							<Select.Option value="2">Báo hỏng</Select.Option>
							<Select.Option value="3">Báo mất</Select.Option>
						</Select>
					</Paper>
				</div>
				<div className="flex flex-col sm:flex-row justify-end">
					<Paper className="w-full sm:w-1/4 flex justify-between ">
						<InputBase
							onKeyPress={event => {
								if (event.key === 'Enter') {
									handleSearch();
								}
							}}
							onChange={e => onHandleChange(e)}
							className={classes.input}
							value={search}
							placeholder="Tìm kiếm"
							inputProps={{ 'aria-label': 'search google maps' }}
						/>
						<IconButton
							onClick={handleSearch}
							type="button"
							className={classes.iconButton}
							aria-label="search"
						>
							<SearchIcon />
						</IconButton>
					</Paper>
				</div>
			</FuseAnimateGroup>
		</>
	);
}
