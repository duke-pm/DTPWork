import { Button, Typography } from '@material-ui/core';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';

const { RangePicker } = DatePicker;

export default function MyBookingCalendar() {
	const history = useHistory();
	const handleChangeRoute = () => {
		history.push('/booking/create-booking');
	};
	return (
		<div className="container booking">
			<div className="booking__header px-16">
				<Typography color="primary" variant="h6">
					My Booking
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
				<div className="booking__subcontent--action">{/* <span> <Icon>  </Icon> </span> */}</div>
			</div>
			<div className="booking__content mt-8">
				<div className="booking__content--table px-16" />
			</div>
		</div>
	);
}
