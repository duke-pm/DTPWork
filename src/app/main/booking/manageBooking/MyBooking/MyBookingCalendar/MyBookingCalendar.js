/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Icon, Typography } from '@material-ui/core';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';

const allViews = Object.keys(Views).map(k => Views[k]);

const { RangePicker } = DatePicker;

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

export default function MyBookingCalendar() {
	const history = useHistory();
	const handleChangeRoute = () => {
		history.push('/booking/create-booking');
	};
	const handleChangeRouteList = () => {
		history.push('/booking/list-my-booking');
	};
	const openEditEventDialog = value => {};
	const openNewEventDialog = value => {};
	function moveEvent({ event, start, end }) {}

	function resizeEvent({ event, start, end }) {
		delete event.type;
		// console.log(object);
	}
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
					<span className="btn__btn--action active mr-16">
						{' '}
						<Icon fontSize="small"> border_all </Icon>{' '}
					</span>
					<span onClick={handleChangeRouteList} className="btn__btn--action">
						{' '}
						<Icon fontSize="small"> list </Icon>{' '}
					</span>
				</div>
			</div>
			<div className="booking__content mt-8">
				{/* <div className="booking__content--table px-16" /> */}
				<DragAndDropCalendar
					className="flex flex-1 container"
					selectable
					localizer={localizer}
					events={[]}
					onEventDrop={moveEvent}
					resizable
					onEventResize={resizeEvent}
					defaultView={Views.MONTH}
					defaultDate={new Date(2020, 3, 1)}
					startAccessor="start"
					endAccessor="end"
					views={allViews}
					step={60}
					showMultiDayTimes
					// components={{
					// 	toolbar: _props => {
					// 		return headerEl.current
					// 			? ReactDOM.createPortal(<CalendarHeader {..._props} />, headerEl.current)
					// 			: null;
					// 	}
					// }}
					// onNavigate={handleNavigate}
					onSelectEvent={event => {
						openEditEventDialog(event);
					}}
					onSelectSlot={slotInfo => openNewEventDialog(slotInfo)}
				/>
			</div>
		</div>
	);
}
