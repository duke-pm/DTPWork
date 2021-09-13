import React from 'react';
import { useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { useHistory } from 'react-router';
import CustomForm from './CustomForm';
import * as actions from '../../_reduxGroupUser/groupUserActions';

export default function FormComponent({ entitiesEdit, actionLoading }) {
	const history = useHistory();
	const handleCloseFormGroupUser = () => {
		history.goBack();
	};
	const dispatch = useDispatch();
	const handleSubmitFormGroupUser = values => {
		if (entitiesEdit && entitiesEdit.groupID) {
			dispatch(actions.updatedGroupUser(values)).then(data => {
				if (data && !data.isError) {
					handleCloseFormGroupUser();
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.groupUser.updatedGroupUserSuccess
					);
				}
			});
		} else {
			dispatch(actions.createdGroupUser(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.groupUser.createdGroupUserSuccess
					);
					handleCloseFormGroupUser();
				}
			});
		}
	};
	return (
		<>
			<CustomForm
				entitiesEdit={entitiesEdit}
				actionLoading={actionLoading}
				handleCloseFormGroupUser={handleCloseFormGroupUser}
				handleSubmitFormGroupUser={handleSubmitFormGroupUser}
			/>
		</>
	);
}
