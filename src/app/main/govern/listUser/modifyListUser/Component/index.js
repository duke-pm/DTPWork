import React from 'react';
import { useDispatch } from 'react-redux';
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notificationContent } from '@fuse/core/DtpConfig/NotificationContent';
import { useHistory } from 'react-router';
import CustomForm from './CustomForm';
import * as actions from '../../_reduxListUser/listUserActions';

export default function FormComponent({
	entitiesEdit,
	actionLoading,
	arrCompany,
	arrSales,
	arrManag,
	arrSap,
	arrRegion,
	groupUser,
	arrBizLine
}) {
	const history = useHistory();
	const handleCloseFormListUser = () => {
		history.goBack();
	};
	const dispatch = useDispatch();
	const handleSubmitFormListUser = values => {
		if (entitiesEdit && entitiesEdit.userID) {
			dispatch(actions.updatedListUser(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.listUser.updatedListUserSuccess
					);
					history.goBack();
				}
			});
		} else {
			dispatch(actions.createdListUser(values)).then(data => {
				if (data && !data.isError) {
					notificationConfig(
						'success',
						notificationContent.content.vi.success,
						notificationContent.description.setting.listUser.createdListUserSuccess
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
				handleCloseFormListUser={handleCloseFormListUser}
				handleSubmitFormListUser={handleSubmitFormListUser}
				arrCompany={arrCompany}
				arrSales={arrSales}
				arrManag={arrManag}
				arrSap={arrSap}
				arrRegion={arrRegion}
				groupUser={groupUser}
				arrBizLine={arrBizLine}
			/>
		</>
	);
}
