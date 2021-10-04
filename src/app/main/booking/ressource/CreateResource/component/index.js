import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createResouce, updateResouce } from '../../_reduxResourceBooking/resourceBookingActions';
import CustomForm from './CustomForm';

export default function From({ groupBkColor, bkResourceGroup, entitiesEdit, actionLoading, params, ExitPage }) {
	const dispatch = useDispatch();
	const history = useHistory();
	let initital = {
		id: '',
		name: '',
		description: '',
		resourceGroup: null,
		color: 1,
		allowRecurre: true,
		allowAdding: true,
		overlapping: true,
		approval: 1,
		department: [1],
		notification: 1
	};
	if (entitiesEdit) {
		initital = {
			id: entitiesEdit?.resourceID,
			name: entitiesEdit?.resourceName,
			resourceGroup: entitiesEdit?.groupID,
			color: entitiesEdit?.colorID
		};
	}
	useEffect(() => {
		if (params.type === 'updated' && !entitiesEdit) history.goBack();
	}, [entitiesEdit, history, params]);
	const handleSubmitForm = values => {
		if (entitiesEdit && entitiesEdit.resourceID) {
			dispatch(updateResouce(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.booking.resource.edit
					);
					history.goBack();
				}
			});
		} else {
			dispatch(createResouce(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.booking.resource.create
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
				handleSubmitForm={handleSubmitForm}
				groupBkColor={groupBkColor}
				bkResourceGroup={bkResourceGroup}
				initital={initital}
				actionLoading={actionLoading}
			/>
		</>
	);
}
