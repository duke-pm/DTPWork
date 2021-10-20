/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Icon, Typography } from '@material-ui/core';
import { Badge, DatePicker, Dropdown, Spin } from 'antd';
import Panigation from '@fuse/core/FusePanigate';
import Search from 'antd/lib/input/Search';
import Text from 'app/components/Text';
import React, { useContext, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { getInformationCompany } from 'app/main/assets/Possesion/_redux/possesionActions';
import { fetchsBooking, fetchsBookingFilter, setTaskEditBooking } from '../../_reduxBooking/bookingActions';
import TableAllBooking from './component/TableAllBooking';
import { BookingContext } from '../MyBookingContext';

const { RangePicker } = DatePicker;

export default function AllBookingPage() {
	const history = useHistory();
	const dispatch = useDispatch();
	const bookingContex = useContext(BookingContext);
	const {
		page,
		rowPage,
		setPage,
		setRowPage,
		setFromDate,
		setToDate,
		sort,
		search,
		setSort,
		fromDate,
		toDate,
		setSearch,
		resource,
		setResource
	} = bookingContex;
	const handleChangeRoute = () => {
		dispatch(setTaskEditBooking(null));
		history.push('/booking/modify-booking/created');
	};
	const handleChangeRouteList = () => {
		history.push('/booking/calendar-my-booking');
	};
	useEffect(() => {
		dispatch(fetchsBooking(true));
	}, [dispatch]);
	const paramsReq = 'BKResource';
	useEffect(() => {
		dispatch(getInformationCompany(paramsReq));
	}, [dispatch, paramsReq]);
	const { currentState, inforCompany } = useSelector(
		state => ({ currentState: state.booking.booking, inforCompany: state.possesion }),
		shallowEqual
	);
	const { entities, listLoading, actionLoading, total_count } = currentState;
	const { entitiesInformation } = inforCompany;
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		dispatch(fetchsBookingFilter(true, rowPage, newPage + 1, sort.id, sort.direction, search, fromDate, toDate));
	};
	const handleRowPage = e => {
		const rowPageParse = parseInt(e.target.value, 10);
		setRowPage(rowPageParse);
		dispatch(fetchsBookingFilter(true, rowPageParse, page, sort.id, sort.direction, search, fromDate, toDate));
	};
	const createSortHandler = (direction, id) => {
		dispatch(fetchsBookingFilter(true, rowPage, page, id, direction, search, fromDate, toDate));
		setSort({
			direction,
			id
		});
	};
	const handleSearch = () => {
		setPage(0);
		dispatch(fetchsBookingFilter(true, rowPage, page, sort.id, sort.direction, search, fromDate, toDate));
	};
	const onHandleChange = e => {
		setSearch(e.target.value);
		setPage(0);
		if (e.target.value.length <= 0) {
			dispatch(
				fetchsBookingFilter(true, rowPage, page, sort.id, sort.direction, e.target.value, fromDate, toDate)
			);
		}
	};
	const handleChange = (date, dateString) => {
		setFromDate(date && moment(date[0]).format('YYYY/MM/DD'));
		setToDate(date && moment(date[1]).format('YYYY/MM/DD'));
		dispatch(
			fetchsBookingFilter(
				true,
				rowPage,
				page,
				sort.id,
				sort.direction,
				search,
				date && moment(date[0]).format('YYYY/MM/DD'),
				date && moment(date[1]).format('YYYY/MM/DD')
			)
		);
	};
	const bkResource = entitiesInformation?.bkReSource
		? entitiesInformation.bkReSource.reduce(
				(arr, curr) => [...arr, { value: curr.resourceID, label: curr.resourceName }],
				[]
		  )
		: [];
	const newArrayResource = bkResource?.filter(e => resource?.includes(e.value));
	const handleFilterResource = item => {
		const resourceClear = resource.filter(it => it !== item.value);
		setResource(resourceClear);
		dispatch(
			fetchsBookingFilter(
				true,
				rowPage,
				page,
				sort.id,
				sort.direction,
				search,
				fromDate,
				toDate,
				resourceClear?.toString()
			)
		);
	};
	const handleClearResource = () => {
		setResource(null);
		dispatch(fetchsBookingFilter(true, rowPage, page, sort.id, sort.direction, search, fromDate, toDate, null));
	};
	const handleClearAll = () => {
		setResource(null);
		dispatch(fetchsBookingFilter(true, rowPage, page, sort.id, sort.direction, search, fromDate, toDate, null));
	};
	return (
		<div className="container booking">
			<div className="booking__header px-16">
				<Typography color="primary" variant="h6">
					Booking của tôi
				</Typography>
				<div className="booking__header--action">
					<Search
						onChange={e => onHandleChange(e)}
						onSearch={handleSearch}
						className="input__search"
						placeholder="Search"
					/>
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
						text={`${entities?.header?.[0].countHappening} Happening`}
					/>
					<Badge
						style={{ marginLeft: '12px' }}
						color="#d71d31"
						text={`${entities?.header?.[0].countHappened} Happened`}
					/>
					<Badge
						style={{ marginLeft: '12px' }}
						color="#f1b228"
						text={`${entities?.header?.[0].countPending} Not yet happen`}
					/>
				</div>
				<div className="booking__subcontent--action">
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
			{resource?.length > 0 ? (
				<div className="projects__filter px-16 mt-20">
					<div className="title_filter flex">
						<Icon fontSize="small" color="primary">
							tune
						</Icon>
					</div>
					<div className="content_filter">
						{resource?.length > 0 && (
							<div className="control-filter">
								<div className="content flex items-center">
									<Text color="primary">Status:</Text>
									<Text color="primary" className="ml-8">
										{newArrayResource?.[0].label}
									</Text>
								</div>
								<div className="action">
									<Dropdown
										overlay={
											<div className="action__dropdown">
												{newArrayResource?.map(item => (
													<div key={item.value} className="dropdown--list">
														<Text color="primary">{item.label}</Text>
														<Icon
															onClick={() => handleFilterResource(item)}
															className="btn-icon"
															fontSize="small"
															color="primary"
														>
															clear
														</Icon>
													</div>
												))}
											</div>
										}
										placement="bottomRight"
										arrow
									>
										<Icon className="cursor-pointer btn-icon" color="primary">
											{' '}
											arrow_drop_down{' '}
										</Icon>
									</Dropdown>
									<Icon onClick={handleClearResource} className="btn-icon" color="primary">
										clear
									</Icon>
								</div>
							</div>
						)}
					</div>
					<div className="action-filter">
						<Text color="primary" onClick={handleClearAll} type="caption" className="cursor-pointer">
							Delete all
						</Text>
					</div>
				</div>
			) : null}
			<div className="booking__content mt-8">
				<div className="booking__content--table px-16">
					<TableAllBooking
						listLoading={listLoading}
						entities={entities}
						createSortHandler={createSortHandler}
						resource={resource}
						bkResource={bkResource}
						setResource={setResource}
					/>
					{entities?.lstBooking?.length !== 0 && (
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
					)}
				</div>
			</div>
		</div>
	);
}
