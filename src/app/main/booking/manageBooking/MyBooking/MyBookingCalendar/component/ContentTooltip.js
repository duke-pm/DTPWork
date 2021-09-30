/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Grid, Icon } from '@material-ui/core';
import { Avatar, Spin, Tag } from 'antd';
import Text from 'app/components/Text';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router';
import { deleteBooking, setTaskEditBooking } from '../../../_reduxBooking/bookingActions';
import { colorStatus, colorText } from '../../../BookingConfig';

export default function ContentTooltip({ event }) {
	const dispatch = useDispatch();
	const { currentState } = useSelector(state => ({ currentState: state.booking.booking }), shallowEqual);
	const { actionLoading } = currentState;
	const history = useHistory();
	const handleEdit = () => {
		dispatch(setTaskEditBooking(event));
		history.push('/booking/modify-booking/updated');
	};
	const handleDelte = () => {
		dispatch(deleteBooking(event.bookID));
	};
	const handleView = () => {
		dispatch(setTaskEditBooking(event));
		history.push(`/booking/view/${event.bookID}`);
	};
	return (
		<div className="popever-event" style={{ width: '350px' }}>
			<div className="flex justify-between">
				<span className="status" style={{ backgroundColor: colorStatus[event.statusName] }}>
					{' '}
					<Text type="subTitle" style={{ color: colorText[event.statusName] }}>
						{event.statusName}{' '}
					</Text>
				</span>
				{actionLoading ? (
					<Spin />
				) : (
					<div className="flex">
						{event.isUpdated && (
							<span onClick={handleEdit} className="action--button mr-8">
								<Icon fontSize="small">edit</Icon>
							</span>
						)}
						{event.isUpdated && (
							<span onClick={handleDelte} className="action--button mr-8">
								<Icon fontSize="small">delete</Icon>
							</span>
						)}
						<span onClick={handleView} className="action--button mr-8">
							<Icon fontSize="small">visibility</Icon>
						</span>
					</div>
				)}
			</div>
			<div className="content mt-16">
				<Grid container item spacing={2}>
					<Grid item lg={2}>
						{' '}
						<div className="radio" style={{ backgroundColor: event.color }} />{' '}
					</Grid>
					<Grid item lg={10}>
						<Text> {event.title} </Text>
					</Grid>
					<Grid item lg={2}>
						<Icon fontSize="small" color="primary">
							{' '}
							{event.icon}
						</Icon>
					</Grid>
					<Grid item lg={10}>
						<Text> {event.resourceName} </Text>
					</Grid>
					<Grid item lg={2}>
						<Icon fontSize="small" color="primary">
							access_time
						</Icon>
					</Grid>
					<Grid item lg={10}>
						<div className="flex justify-between ">
							<Tag>{moment(event.startDate).format('DD/MM/YYYY')}</Tag>
							<Tag>{event.strStartTime}</Tag>
							<Text color="primary">to </Text>
							<Tag style={{ marginLeft: '8px' }}>{moment(event?.endDate).format('DD/MM/YYYY')}</Tag>
							<Tag>{event.strEndTime}</Tag>
						</div>
					</Grid>
					<Grid item lg={2}>
						<Avatar size="small" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
							{event.ownerNameAlpha}
						</Avatar>{' '}
					</Grid>
					<Grid item lg={10}>
						<div className="flex items-center">
							<Text className="ml-8" type="body">
								{event.ownerName}
							</Text>
						</div>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
