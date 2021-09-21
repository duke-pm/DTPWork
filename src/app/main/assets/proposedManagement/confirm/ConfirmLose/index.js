/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import { Icon, Typography } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Panigation from '@fuse/core/FusePanigate';
import { DatePicker, Spin } from 'antd';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { ConfirmContext } from '../ConfirmContext';
import * as action from '../../_redux/confirmAction';
import TableConfirLost from './Components/TableConfirLost';
// import ActionComponent from './DamagedComponets/FilterActionComponent';
const statusType = {
	0: 'Tất cả',
	1: 'Chờ phê duyệt',
	2: 'Đã duyệt',
	3: 'Hoàn thành',
	4: 'Từ chối'
};
export default function ConfirmLose(props) {
	const history = useHistory();
	const ConfirmContextDamage = useContext(ConfirmContext);
	const {
		page,
		rowPage,
		setRowPage,
		status,
		search,
		dateStart,
		dateEnd,
		setPage,
		sort,
		setSort,
		setTimeLine,
		setDateStart,
		setDateEnd,
		setStatus
	} = ConfirmContextDamage;
	const { currentState } = useSelector(state => ({ currentState: state.confirm }), shallowEqual);
	const { listloading, entities, total_count, actionLoading } = currentState;
	const dispatch = useDispatch();
	const handleOpenFormEdit = items => {
		dispatch(action.fetchDataConfirm(items));
		history.push('/tai-san/danh-sach-de-xuat/bao-mat');
	};
	const handleOpenTimeLine = item => {
		setTimeLine({
			open: true,
			title: 'báo mất'
		});
		dispatch(action.timeLineApproval(item));
	};
	const handleRowChange = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(
			action.searchConfirms(
				false,
				status,
				rowPageParse,
				page,
				3,
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
				3,
				sort.id,
				sort.direction,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	useEffect(() => {
		dispatch(action.fetchDataConfirms(0, 3));
	}, [dispatch]);
	const createSortHandler = (direction, id) => {
		dispatch(action.searchConfirms(false, status, rowPage, page, 3, id, direction, search, dateStart, dateEnd));
		setSort({
			direction,
			id
		});
	};
	const handleChangeFilterDateStart = date => {
		setDateStart(date);
		dispatch(
			action.searchConfirms(false, status, rowPage, page, 3, sort.id, sort.direction, search, date, dateEnd)
		);
	};
	const handleChangeFilterDateEnd = date => {
		setDateEnd(date);
		dispatch(
			action.searchConfirms(false, status, rowPage, page, 3, sort.id, sort.direction, search, dateStart, date)
		);
	};
	const handleClearStatus = () => {
		setStatus(null);
		dispatch(
			action.searchConfirms(false, 0, rowPage, page, 3, sort.id, sort.direction, search, dateStart, dateEnd)
		);
	};
	const handleClearAll = () => {
		setStatus(null);
		setDateStart(moment().startOf('month'));
		setDateEnd(moment().endOf('month'));
		dispatch(action.fetchDataConfirms(0, 3));
	};
	return (
		<>
			<div className="flex flex-col table--tab">
				<div className="flex flex-col">
					<div className="proposedManagement__subcontent justify-between mb-16">
						<div>
							<Typography variant="subtitle1" color="inherit">
								<AddCircleOutlineIcon style={{ color: '#1890ff' }} />
								<Link style={{ color: '#1890ff' }} to="/tai-san/bao-mat-hong-tai-san?type=bao-mat">
									{' '}
									Báo mất tài sản{' '}
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
					<TableConfirLost
						handleOpenForm={handleOpenFormEdit}
						handleOpenTimeLine={handleOpenTimeLine}
						createSortHandler={createSortHandler}
						entities={entities}
						listLoading={listloading}
					/>
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
