import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createBooking, updateBooking } from '../../../_reduxBooking/bookingActions';
// import moment from 'moment';
import CustomForm from './CustomForm';

export default function From({ bkResource, Users, actionLoading, ExitPage, entitiesEdit }) {
	const dispatch = useDispatch();
	const history = useHistory();
	let initital = {
		id: null,
		resource: null,
		purpose: '',
		description: '',
		participants: [],
		checkBooking: true,
		timeStart: null,
		timeEnd: null,
		timeStartUpdate: null,
		timeEndUpdate: null,
		startDate: null,
		endDate: null
	};
	if (entitiesEdit) {
		initital = {
			id: entitiesEdit?.bookID,
			resource: entitiesEdit?.resourceID,
			purpose: entitiesEdit?.purpose,
			description: entitiesEdit?.remarks,
			participants:
				entitiesEdit && entitiesEdit.listUserIDJoined
					? entitiesEdit.listUserIDJoined.split(',').map(Number)
					: [],
			startDate: entitiesEdit?.startDate,
			endDate: entitiesEdit?.endDate,
			timeStart: entitiesEdit?.strStartTime,
			timeEnd: entitiesEdit?.strEndTime,
			timeStartUpdate: entitiesEdit?.strStartTime,
			timeEndUpdate: entitiesEdit?.strEndTime
		};
	}
	const handleSubmitForm = value => {
		if (entitiesEdit?.bookID) {
			dispatch(updateBooking(value)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.booking.booking.edit
					);
					history.goBack();
				}
			});
		} else {
			dispatch(createBooking(value)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.booking.booking.create
					);
					history.goBack();
				}
			});
		}
	};
	return (
		<>
			<CustomForm
				ExitPage={ExitPage}
				actionLoading={actionLoading}
				handleSubmitForm={handleSubmitForm}
				bkResource={bkResource}
				Users={Users}
				initital={initital}
			/>
		</>
	);
}
