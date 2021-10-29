/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Icon, Typography } from '@material-ui/core';
import { Badge, DatePicker, Select, Spin } from 'antd';
// import Panigation from '@fuse/core/FusePanigate';
// import Search from 'antd/lib/input/Search';
import Text from 'app/components/Text';
import React, { useContext, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { fetchsBookingFilter, fetchsResourceCalendar, setTaskEditBooking } from '../../_reduxBooking/bookingActions';
import TableAllBooking from './component/TableResourceBooking';
import { ResourceCalendarContext } from '../ResourceCalendarContext';
import { getInformationCompany } from '../../../../assets/Possesion/_redux/possesionActions';

const { RangePicker } = DatePicker;

export default function ResourceCalendarBookingPage() {
	const history = useHistory();
	const dispatch = useDispatch();
	const bookingContex = useContext(ResourceCalendarContext);
	const {
		page,
		rowPage,
		// setPage,
		// setRowPage,
		setFromDate,
		setToDate,
		// sort,
		search,
		setSort,
		fromDate,
		toDate
		// setSearch
	} = bookingContex;
	const params = useParams();
	const paramsReq = 'BKResource';
	useEffect(() => {
		dispatch(getInformationCompany(paramsReq));
	}, [dispatch, paramsReq]);
	const parseParam = params?.id ? parseInt(params?.id) : null;
	const [resource, setResouce] = useState(parseParam);

	const handleChangeRoute = () => {
		dispatch(setTaskEditBooking(null));
		history.push(`/booking/modify-booking/created?resource=${params.id}`);
	};
	const handleChangeRouteList = () => {
		history.push(`/booking/resource-calendar/calendar/${params.id}`);
	};
	useEffect(() => {
		dispatch(fetchsResourceCalendar(params?.id));
	}, [dispatch, params]);
	const { currentState, inforCompany } = useSelector(
		state => ({ currentState: state.booking.booking, inforCompany: state.possesion }),
		shallowEqual
	);
	const { entities, listLoading } = currentState;
	const { entitiesInformation } = inforCompany;
	const bkResource = entitiesInformation?.bkReSource
		? entitiesInformation.bkReSource.reduce(
				(arr, curr) => [...arr, { value: curr.resourceID, label: curr.resourceName }],
				[]
		  )
		: [];
	// const handleChangePage = (event, newPage) => {
	// 	setPage(newPage);
	// 	dispatch(fetchsBookingFilter(true, rowPage, newPage + 1, sort.id, sort.direction, search, fromDate, toDate));
	// };
	// const handleRowPage = e => {
	// 	const rowPageParse = parseInt(e.target.value, 10);
	// 	setRowPage(rowPageParse);
	// 	dispatch(fetchsBookingFilter(true, rowPageParse, page, sort.id, sort.direction, search, fromDate, toDate));
	// };
	const createSortHandler = (direction, id) => {
		dispatch(fetchsBookingFilter(true, rowPage, page, id, direction, search, fromDate, toDate));
		setSort({
			direction,
			id
		});
	};
	// const handleSearch = () => {
	// 	setPage(0);
	// 	dispatch(fetchsBookingFilter(true, rowPage, page, sort.id, sort.direction, search, fromDate, toDate));
	// };
	// const onHandleChange = e => {
	// 	setSearch(e.target.value);
	// 	setPage(0);
	// 	if (e.target.value.length <= 0) {
	// 		dispatch(
	// 			fetchsBookingFilter(true, rowPage, page, sort.id, sort.direction, e.target.value, fromDate, toDate)
	// 		);
	// 	}
	// };
	const handleChange = (date, dateString) => {
		setFromDate(date && moment(date[0]).format('YYYY/MM/DD'));
		setToDate(date && moment(date[1]).format('YYYY/MM/DD'));
		dispatch(
			fetchsResourceCalendar(
				params?.id,
				date && moment(date[0]).format('YYYY/MM/DD'),
				date && moment(date[1]).format('YYYY/MM/DD')
			)
		);
	};
	const handleChangeResource = value => {
		setResouce(value);
		history.push(`/booking/resource-calendar/list/${value}`);
	};
	return (
		<div className="container booking">
			<div className="booking__header px-16">
				<Typography color="primary" variant="h6">
					Tài nguyên
				</Typography>
				<div className="booking__header--action">
					{/* <Search
						onChange={e => onHandleChange(e)}
						onSearch={handleSearch}
						className="input__search"
						placeholder="Search"
					/> */}
					<Button
						onClick={handleChangeRoute}
						className="button__create--sm"
						variant="contained"
						color="primary"
					>
						{' '}
						<Text type="button" color="white">
							{' '}
							Tạo booking{' '}
						</Text>
					</Button>
				</div>
			</div>
			<div className="booking__subcontent px-16">
				<div className="flex justify-between">
					<Text color="primary" type="subTitle">
						{entities?.header?.[0].countMyBooking} Booking{' '}
					</Text>
					<Badge
						style={{ marginLeft: '12px' }}
						color="#069662"
						text={`${entities?.header?.[0].countHappening} Đang xảy ra`}
					/>
					<Badge
						style={{ marginLeft: '12px' }}
						color="#d71d31"
						text={`${entities?.header?.[0].countHappened} Đã xảy ra`}
					/>
					<Badge
						style={{ marginLeft: '12px' }}
						color="#f1b228"
						text={`${entities?.header?.[0].countPending} Chưa xảy ra`}
					/>
				</div>
				<div className="booking__subcontent--action">
					<div className="form-item-input mr-8">
						<Select value={resource} onChange={handleChangeResource} style={{ width: '200px' }}>
							{bkResource.map(p => (
								<Select.Option key={p.value} value={p.value}>
									{p.label}
								</Select.Option>
							))}
						</Select>
					</div>
					<RangePicker format="DD/MM/YYYY" onChange={handleChange} />
					<span onClick={handleChangeRouteList} className="btn__btn--action mr-8">
						{' '}
						<Icon fontSize="small" color="primary">
							{' '}
							border_all{' '}
						</Icon>{' '}
					</span>
					<span className="btn__btn--action active">
						{' '}
						<Icon fontSize="small" color="primary">
							{' '}
							list{' '}
						</Icon>{' '}
					</span>
				</div>
			</div>
			<div className="booking__content mt-8">
				<div className="booking__content--table px-16">
					<TableAllBooking
						listLoading={listLoading}
						entities={entities}
						createSortHandler={createSortHandler}
					/>
					{/* {entities?.lstBooking?.length !== 0 && (
						<div className="flex flex-row items-center justify-end">
							{actionLoading && <Spin />}
							<Panigation
								page={page}
								handleChangePage={handleChangePage}
								rowPage={rowPage}
								handleChangeRowsPerPage={handleRowPage}
								count={total_count}
							/>
						</div>
					)} */}
				</div>
			</div>
		</div>
	);
}
