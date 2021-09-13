import React from 'react';
import { useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { useHistory } from 'react-router';
import CustomForm from './CustomForm';
import * as actions from '../../_redux/menuActions';

export default function FormComponent({ entitiesEdit, actionLoading, menuParent }) {
	const history = useHistory();
	const handleCloseFormListUser = () => {
		history.goBack();
	};
	const dispatch = useDispatch();
	const handleSubmitCreatedMenu = values => {
		if (entitiesEdit && entitiesEdit.menuID) {
			dispatch(actions.updatedMenuSettings(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.menu.updatedMenuSuccess
					);
					history.goBack();
				}
			});
		} else {
			dispatch(actions.createdMenuSettings(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.menu.createdMenuSuccess
					);
					history.goBack();
				}
			});
		}
	};
	return (
		<>
			<CustomForm
				entitiesEdit={entitiesEdit}
				actionLoading={actionLoading}
				menuParent={menuParent}
				handleCloseFormListUser={handleCloseFormListUser}
				handleSubmitCreatedMenu={handleSubmitCreatedMenu}
			/>
		</>
	);
}
