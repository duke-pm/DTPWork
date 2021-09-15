/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import React, { useContext, useState, useEffect } from 'react';
import Panigation from '@fuse/core/FusePanigate';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { DatePicker, Spin } from 'antd';
import DtpCustomStyles from '@fuse/core/DtpConfig/DtpCustomStyles';
import { Icon, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ConfirmContext } from '../ConfirmContext';
import * as action from '../../_redux/confirmAction';
import HistoryAllocation from './Components/HistoryAllocation';
import TableConfirmAll from './Components/TableCofirmAll';

const statusType = {
	0: 'Tất cả',
	1: 'Chờ phê duyệt',
	2: 'Đã duyệt',
	3: 'Hoàn thành',
	4: 'Từ chối'
};
export default function ConfrimAllocation(props) {
	const dispatch = useDispatch();
	const [history, setHistory] = useState(false);
	const AllocationContext = useContext(ConfirmContext);
	const {
		setFormAllocation,
		setPage,
		status,
		page,
		rowPage,
		setRowPage,
		search,
		dateStart,
		dateEnd,
		sort,
		setSort,
		setTimeLine,
		setStatus,
		setDateStart,
		setDateEnd
	} = AllocationContext;
	const { currentState } = useSelector(state => ({ currentState: state.confirm }), shallowEqual);
	const { listloading, entities, lastErrors, total_count, actionLoading } = currentState;
	const classes = DtpCustomStyles(props);
	const handleOpenHistory = () => setHistory(true);
	const handleCloseHistory = () => setHistory(false);
	const handleOpenTimeLine = item => {
		setTimeLine({
			open: true,
			title: 'cấp phát'
		});
		dispatch(action.timeLineApproval(item));
	};
	const handleOpenForm = items => {
		dispatch(action.fetchDataConfirm(items));
		setFormAllocation(true);
	};
	useEffect(() => {
		dispatch(action.fetchDataConfirms(0, 1));
	}, [dispatch]);
	const handleRowChange = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(
			action.searchConfirms(
				false,
				status,
				rowPageParse,
				page,
				1,
				sort.id,
				sort.direction,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(
			action.searchConfirms(
				false,
				status,
				rowPage,
				newPage + 1,
				1,
				sort.id,
				sort.direction,
				search,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	const handleChangeFilterDateStart = date => {
		setDateStart(date);
		dispatch(
			action.searchConfirms(false, status, rowPage, page, 1, sort.id, sort.direction, search, date, dateEnd)
		);
	};
	const handleChangeFilterDateEnd = date => {
		setDateEnd(date);
		dispatch(
			action.searchConfirms(false, status, rowPage, page, 1, sort.id, sort.direction, search, dateStart, date)
		);
	};
	const createSortHandler = property => event => {
		const id = property;
		let direction = 'desc';

		if (sort.id === property && sort.direction === 'desc') {
			direction = 'asc';
		}
		dispatch(action.searchConfirms(false, status, rowPage, page, 1, id, direction, search, dateStart, dateEnd));
		setSort({
			direction,
			id
		});
	};
	const handleClearStatus = () => {
		setStatus(null);
		dispatch(
			action.searchConfirms(false, 0, rowPage, page, 1, sort.id, sort.direction, search, dateStart, dateEnd)
		);
	};
	const handleClearAll = () => {
		setStatus(null);
		setDateStart(moment().startOf('month'));
		setDateEnd(moment().endOf('month'));
		dispatch(action.fetchDataConfirms(0, 1));
	};
	return (
		<>
			<HistoryAllocation handleCloseHistory={handleCloseHistory} open={history} />
			<div className="flex flex-col table--tab">
				{/* <ActionComponent actionLoading={actionLoading} /> */}
				<div className="flex flex-col">
					<div className="proposedManagement__subcontent justify-between mb-16">
						<div>
							<Typography variant="subtitle1" color="inherit">
								<AddCircleOutlineIcon style={{ color: '#1890ff' }} />
								<Link style={{ color: '#1890ff' }} to="/tai-san/yeu-cau-cap-phat">
									{' '}
									Tạo yêu cầu cấp phát{' '}
								</Link>
							</Typography>
						</div>
						<div className="proposedManagement__subcontent--action">
							<DatePicker
								onChange={handleChangeFilterDateStart}
								value={dateStart}
								placeholder="Ngày bắt đầu"
								style={{ width: '100%' }}
							/>
							<DatePicker
								onChange={handleChangeFilterDateEnd}
								value={dateEnd}
								placeholder="Ngày kết thúc"
								style={{ width: '100%' }}
							/>
						</div>
					</div>
					{status ? (
						<div className="projects__filter mt-8 mb-8">
							<div className="title_filter flex">
								<Icon fontSize="small" color="primary">
									tune
								</Icon>
								<Typography variant="body1" color="primary" className="ml-8 title">
									{' '}
									Filter
								</Typography>
							</div>
							<div className="content_filter">
								{status && (
									<div className="control-filter">
										<div className="content flex items-center">
											<Typography className="" color="primary">
												Thành công
											</Typography>
											<Typography color="primary" className="ml-8 value-filter">
												{statusType[status]}
											</Typography>
											<div onClick={handleClearStatus} className="action">
												<Icon className="btn-icon" color="primary">
													clear
												</Icon>
											</div>
										</div>
									</div>
								)}
							</div>
							<div className="action-filter">
								<Typography
									onClick={handleClearAll}
									variant="subtitle2"
									color="primary"
									className="cursor-pointer"
								>
									{' '}
									Delete all{' '}
								</Typography>
							</div>
						</div>
					) : null}
					<TableConfirmAll entities={entities} listLoading={listloading} />
					{entities?.length !== 0 && (
						<div className="flex flex-row items-center justify-end">
							{actionLoading && <Spin />}
							<Panigation
								page={page}
								handleChangePage={handleChangePage}
								rowPage={rowPage}
								handleChangeRowsPerPage={handleRowChange}
								count={total_count}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
