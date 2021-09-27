import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { createResouceGroup, updateResouceGroup } from '../../_reduxResourceBookingGroup/resourceBookingGroupActions';
import CustomForm from './CustomForm';

export default function From({ bkIcon, actionLoading, entitiesEdit, params }) {
	const dispatch = useDispatch();
	const history = useHistory();
	let initital = {
		id: '',
		name: '',
		description: '',
		icon: null
	};
	useEffect(() => {
		if (params.type === 'updates' && !entitiesEdit) history.goBack();
	}, [entitiesEdit, history]);

	if (entitiesEdit) {
		const icon = bkIcon?.filter(item => item.icon === entitiesEdit?.icon);
		initital = {
			id: entitiesEdit?.groupID,
			name: entitiesEdit?.groupName,
			description: entitiesEdit?.descr,
			icon: icon.length ? icon[0].value : null
		};
	}
	const handleSubmitForm = values => {
		if (entitiesEdit && entitiesEdit.groupID) {
			dispatch(updateResouceGroup(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.booking.resourcesGroup.edit
					);
					history.goBack();
				}
			});
		} else {
			dispatch(createResouceGroup(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.en.success,
						notificationContent.description.booking.resourcesGroup.create
					);
					history.goBack();
				}
			});
		}
	};
	return (
		<>
			<CustomForm
				handleSubmitForm={handleSubmitForm}
				bkIcon={bkIcon}
				initital={initital}
				actionLoading={actionLoading}
			/>
		</>
	);
}
