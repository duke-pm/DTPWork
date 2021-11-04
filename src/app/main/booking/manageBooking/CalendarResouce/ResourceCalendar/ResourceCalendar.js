/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Icon, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'moment/locale/vi';
import moment from 'moment';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Popover, Spin, Tooltip } from 'antd';
import Text from 'app/components/Text';
import CustomToolbar from './component/CustomToolbar';
import { fetchsResourceCalendar, setTaskEditBooking } from '../../_reduxBooking/bookingActions';
import { ResourceCalendarContext } from '../ResourceCalendarContext';
import ContentTooltip from './component/ContentTooltip';
import { colorStatus } from '../../BookingConfig';
import { getInformationCompany } from '../../../../assets/Possesion/_redux/possesionActions';
// import { colorStatus } from '../../BookingCo';

const allViews = Object.keys(Views).map(k => Views[k]);
const MonthEvent = ({ event }) => {
	return (
		<Popover content={<ContentTooltip event={event} />}>
			<div className="container--content flex items-center" style={{ backgroundColor: event.color }}>
				<span style={{ backgroundColor: colorStatus[event.statusName] }} className="tag" />
				<div className="ml-8 time-content">{event.startTime}</div>
				<div className="ml-8 title-content truncate">{event.title}</div>
			</div>
		</Popover>
	);
};

// const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
export default function ResourceCalendarPage(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const params = useParams();
	const paramsReq = 'BKResource';
	useEffect(() => {
		dispatch(getInformationCompany(paramsReq));
	}, [dispatch, paramsReq]);
	const resourceCalendarContext = useContext(ResourceCalendarContext);
	const { setToDate, setFromDate, search } = resourceCalendarContext;
	const handleChangeRoute = () => {
		dispatch(setTaskEditBooking(null));
		if (params.id) {
			history.push(`/booking/modify-booking/created?resource=${params.id}`);
		} else {
			history.push(`/booking/modify-booking/created`);
		}
	};
	useEffect(() => {
		dispatch(fetchsResourceCalendar(params?.id));
	}, [dispatch, params?.id]);
	const { currentState } = useSelector(state => ({ currentState: state.booking.booking }), shallowEqual);
	const { entitiesCalendar, listLoading, actionLoading } = currentState;
	const openEditEventDialog = value => {
		// console.log(value);
	};
	const openNewEventDialog = value => {};
	// function moveEvent({ event, start, end }) {}

	// function resizeEvent({ event, start, end }) {
	// 	delete event.type;
	// console.log(object);
	// }
	const handleNavigate = value => {
		const startOfMonth = moment(value).startOf('month').format('YYYY/MM/DD');
		const endOfMonth = moment(value).endOf('month').format('YYYY/MM/DD');
		setFromDate(startOfMonth);
		setToDate(endOfMonth);
		dispatch(fetchsResourceCalendar(params?.id, startOfMonth, endOfMonth));
	};
	const ExitPage = () => history.goBack();
	return (
		<div className="container booking">
			<div className="booking__header px-16">
				<Typography color="primary" variant="h6">
					Tài nguyên
				</Typography>
				<div className="booking__header--action">
					<Button
						onClick={handleChangeRoute}
						className="button__create--xs mr-8"
						variant="contained"
						color="primary"
					>
						{' '}
						<Text type="button" color="white">
							{' '}
							Tạo booking{' '}
						</Text>
					</Button>
					<Tooltip placement="bottom" title="Exit">
						<span onClick={ExitPage} className="action--button">
							<Icon fontSize="small">close</Icon>
						</span>
					</Tooltip>
				</div>
			</div>
			<Spin spinning={listLoading || actionLoading}>
				<div className="booking__content mt-8 px-16">
					{/* <div className="booking__content--table px-16" /> */}
					<Calendar
						className="flex flex-1 container"
						selectable
						localizer={localizer}
						events={entitiesCalendar}
						// onEventDrop={moveEvent}
						resizable
						allDayAccessor
						// onEventResize={resizeEvent}
						defaultView={Views.MONTH}
						// defaultDate={new Date(2020, 3, 1)}
						startAccessor={event => new Date(Date.parse(event.start))}
						endAccessor={event => new Date(Date.parse(event.end))}
						views={allViews}
						step={60}
						showMultiDayTimes
						components={{ toolbar: CustomToolbar, event: MonthEvent }}
						onNavigate={handleNavigate}
						onSelectEvent={event => {
							openEditEventDialog(event);
						}}
						onSelectSlot={slotInfo => openNewEventDialog(slotInfo)}
					/>
				</div>
			</Spin>
		</div>
	);
}
