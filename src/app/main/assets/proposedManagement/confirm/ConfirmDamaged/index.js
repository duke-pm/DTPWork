/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import React, { useContext, useEffect } from 'react';
import { Icon, Typography } from '@material-ui/core';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Panigation from '@fuse/core/FusePanigate';
import { DatePicker, Spin } from 'antd';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link, useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import { ConfirmContext } from '../ConfirmContext';
import * as action from '../../_redux/confirmAction';
import TableConfirDamaged from './DamagedComponets/TableConfirDamaged';

const statusType = {
	0: 'Tất cả',
	1: 'Chờ phê duyệt',
	2: 'Đã duyệt',
	3: 'Hoàn thành',
	4: 'Từ chối'
};
export default function ConfirmDamaged(props) {
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
	const location = useLocation();
	const searchLocation = queryString.parse(location.search);
	const dateStartLocation = searchLocation.dateStart
		? searchLocation.dateStart
		: moment().startOf('month').format('YYYY/MM/DD');
	const dateEndLocation = searchLocation.dateEnd
		? searchLocation.dateEnd
		: moment().endOf('month').format('YYYY/MM/DD');
	const { currentState } = useSelector(state => ({ currentState: state.confirm }), shallowEqual);
	const { listloading, entities, total_count, actionLoading } = currentState;
	const dispatch = useDispatch();
	const handleOpenFormEdit = items => {
		history.push('/tai-san/danh-sach-de-xuat/bao-hong');
		dispatch(action.fetchDataConfirm(items));
	};
	const handleOpenTimeLine = item => {
		setTimeLine({
			open: true,
			title: 'báo hư hỏng'
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
				2,
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
				2,
				sort.id,
				sort.direction,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	useEffect(() => {
		setDateStart(dateStartLocation);
		setDateEnd(dateEndLocation);
		dispatch(action.fetchDataConfirms(0, 2, null, dateStartLocation, dateEndLocation));
	}, [dispatch, setDateStart, setDateEnd, dateStartLocation, dateEndLocation]);
	const createSortHandler = (direction, id) => {
		dispatch(action.searchConfirms(false, status, rowPage, page, 2, id, direction, search, dateStart, dateEnd));
		setSort({
			direction,
			id
		});
	};
	const handleChangeFilterDateStart = date => {
		dispatch(
			action.searchConfirms(false, status, rowPage, page, 2, sort.id, sort.direction, search, date, dateEnd)
		);
		history.push(
			`/tai-san/danh-sach-de-xuat?dateStart=${date ? moment(date).format('YYYY/MM/DD') : null}&dateEnd=${dateEnd}`
		);
	};
	const handleChangeFilterDateEnd = date => {
		dispatch(
			action.searchConfirms(false, status, rowPage, page, 2, sort.id, sort.direction, search, dateStart, date)
		);
		history.push(
			`/tai-san/danh-sach-de-xuat?dateStart=${dateStart}&dateEnd=${
				date ? moment(date).format('YYYY/MM/DD') : null
			}`
		);
	};
	const handleClearStatus = () => {
		setStatus(null);
		dispatch(
			action.searchConfirms(false, 0, rowPage, page, 2, sort.id, sort.direction, search, dateStart, dateEnd)
		);
	};
	const handleClearAll = () => {
		setStatus(null);
		setDateStart(moment().startOf('month'));
		setDateEnd(moment().endOf('month'));
		dispatch(action.fetchDataConfirms(0, 2));
	};
	return (
		<>
			<div className="flex flex-col table--tab">
				<div className="flex flex-col ">
					<div className="proposedManagement__subcontent justify-between mb-16">
						<div>
							<Typography variant="subtitle1" color="inherit">
								<AddCircleOutlineIcon style={{ color: '#1890ff' }} />
								<Link style={{ color: '#1890ff' }} to="/tai-san/bao-mat-hong-tai-san?type=bao-hong">
									{' '}
									Báo hỏng tài sản{' '}
								</Link>
							</Typography>
						</div>
						<div className="proposedManagement__subcontent--action">
							<DatePicker
								onChange={handleChangeFilterDateStart}
								value={dateStart !== 'null' ? moment(moment(dateStart), 'YYYY/MM/YYYY') : null}
								placeholder="Ngày bắt đầu"
								style={{ width: '100%' }}
							/>
							<DatePicker
								onChange={handleChangeFilterDateEnd}
								value={dateEnd !== 'null' ? moment(moment(dateEnd), 'YYYY/MM/YYYY') : null}
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
					<TableConfirDamaged
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
