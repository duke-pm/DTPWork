/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import Search from 'antd/lib/input/Search';
import { useDispatch } from 'react-redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router';
import TimeLine from '../TimeLine';
import RequestResovelTable from './ComponentResovleRequest';
import { ResovleContext } from './ResovleRequestContext';
import { searchConfirms } from '../_redux/confirmAction';

const requestType = {
	0: 'Tất cả',
	1: 'Yêu cầu cấp phát',
	2: 'Báo hỏng',
	3: 'Báo mất'
};
export default function ResovleRequestPage() {
	const history = useHistory();
	const dispatch = useDispatch();
	const ResovleContextHandle = useContext(ResovleContext);
	const {
		rowPage,
		page,
		status,
		sort,
		setTimeLine,
		timeLine,
		requestTypeId,
		setRequestTypeId,
		dateStart,
		dateEnd,
		search,
		setDateStart,
		setDateEnd,
		setSearch,
		setPage
	} = ResovleContextHandle;
	const handleClearAll = () => {
		dispatch(
			searchConfirms(
				true,
				status,
				rowPage,
				page,
				0,
				sort.id,
				sort.direction,
				search,
				moment().startOf('month').format('YYYY/MM/DD'),
				moment().endOf('month').format('YYYY/MM/DD')
			)
		);
		setRequestTypeId(null);
		setDateStart(moment().startOf('month'));
		setDateEnd(moment().endOf('month'));
	};
	const handleClearType = () => {
		dispatch(searchConfirms(true, status, rowPage, page, 0, sort.id, sort.direction, search, dateStart, dateEnd));
		setRequestTypeId(null);
	};
	const handleChangeFilterDateStart = date => {
		dispatch(
			searchConfirms(true, status, rowPage, page, requestTypeId, sort.id, sort.direction, search, date, dateEnd)
		);
		history.push(
			`/tai-san/de-xuat-can-xu-ly?dateStart=${date ? moment(date).format('YYYY/MM/DD') : null}&dateEnd=${dateEnd}`
		);
	};
	const handleChangeFilterDateEnd = date => {
		dispatch(
			searchConfirms(true, status, rowPage, page, requestTypeId, sort.id, sort.direction, search, dateStart, date)
		);
		history.push(
			`/tai-san/de-xuat-can-xu-ly?dateStart=${dateStart}&dateEnd=${
				date ? moment(date).format('YYYY/MM/DD') : null
			}`
		);
	};
	const handleSearch = () => {
		setPage(0);
		dispatch(
			searchConfirms(
				true,
				status,
				rowPage,
				page,
				requestTypeId,
				sort.id,
				sort.direction,
				search,
				dateStart,
				dateEnd
			)
		);
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			dispatch(
				searchConfirms(
					true,
					status,
					rowPage,
					page,
					requestTypeId,
					sort.id,
					sort.direction,
					e.target.value,
					dateStart,
					dateEnd
				)
			);
		}
	};
	return (
		<>
			<TimeLine setTimeLine={setTimeLine} timeLine={timeLine} />
			<div className="container proposedManagement">
				<div className="proposedManagement__header px-16 shadow-lg">
					<Typography color="primary" variant="h6">
						Đề xuất cần xử lý
					</Typography>
					<div className="proposedManagement__header--action">
						<Search
							onChange={e => onHandleChange(e)}
							onSearch={handleSearch}
							className="input__search"
							placeholder="Search"
						/>
					</div>
				</div>
				<div className="proposedManagement__subcontent px-16 justify-end mt-8">
					<div className="proposedManagement__subcontent--action">
						<DatePicker
							onChange={handleChangeFilterDateStart}
							format="DD/MM/YYYY"
							value={dateStart !== 'null' ? moment(moment(dateStart), 'YYYY/MM/YYYY') : null}
							placeholder="Ngày bắt đầu"
							style={{ width: '100%' }}
						/>
						<DatePicker
							onChange={handleChangeFilterDateEnd}
							format="DD/MM/YYYY"
							value={dateEnd !== 'null' ? moment(moment(dateEnd), 'YYYY/MM/YYYY') : null}
							placeholder="Ngày kết thúc"
							style={{ width: '100%' }}
						/>
					</div>
				</div>
				{requestTypeId ? (
					<div className="projects__filter px-16 mt-20">
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
							{requestTypeId && (
								<div className="control-filter">
									<div className="content flex items-center">
										<Typography className="" color="primary">
											Loại yêu cầu:
										</Typography>
										<Typography color="primary" className="ml-8 value-filter">
											{requestType[requestTypeId]}
										</Typography>
										<div onClick={handleClearType} className="action">
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
				<div className="proposedManagement__content mt-8">
					<div className="proposedManagement__content--table px-16">
						<RequestResovelTable />
					</div>
				</div>
			</div>
		</>
	);
}
