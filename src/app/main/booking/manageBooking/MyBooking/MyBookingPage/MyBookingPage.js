/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Icon, Typography } from '@material-ui/core';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { useHistory } from 'react-router-dom';
import TableAllBooking from './component/TableAllBooking';

// const { RangePicker } = DatePicker;

export default function AllBookingPage() {
	const history = useHistory();
	const handleChangeRoute = () => {
		history.push('/booking/create-booking');
	};
	const handleChangeRouteList = () => {
		history.push('/booking/calendar-my-booking');
	};
	return (
		<div className="container booking">
			<div className="booking__header px-16">
				<Typography color="primary" variant="h6">
					My bookings
				</Typography>
				<div className="booking__header--action">
					<Search className="input__search" placeholder="Search" />
					<Button onClick={handleChangeRoute} className="button__create" variant="contained" color="primary">
						{' '}
						<Typography variant="body2"> Create booking </Typography>
					</Button>
				</div>
			</div>
			<div className="booking__subcontent px-16">
				<Typography color="primary" variant="subtitle1">
					{' '}
					9 Booking{' '}
				</Typography>
				<div className="booking__subcontent--action">
					<span onClick={handleChangeRouteList} className="btn__btn--action mr-16">
						{' '}
						<Icon fontSize="small"> border_all </Icon>{' '}
					</span>
					<span className="btn__btn--action active">
						{' '}
						<Icon fontSize="small"> list </Icon>{' '}
					</span>
				</div>
			</div>
			<div className="booking__content mt-8">
				<div className="booking__content--table px-16">
					<TableAllBooking />
				</div>
			</div>
		</div>
	);
}
