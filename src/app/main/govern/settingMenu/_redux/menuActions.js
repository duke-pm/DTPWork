import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './menuCrud';
import { callTypes, menuSlice } from './menuSlice';

const { actions } = menuSlice;
export const fetchsListMenuSettings = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	return requestFrom
		.fetchDataMenuApi(params)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.listItems;
				dispatch(actions.fetchsListMenuSettings({ dataRes }));
			}
		})
		.catch(error => {});
};
export const createdMenuSettings = dataReq => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	return requestFrom
		.createdMenuSettingsApi(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.createdMenuSettings({ dataRes }));
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};

export const updateMenuSetting = dataReq => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	return requestFrom
		.updateMenuSettingsApi(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.updatedMenuSettings({ data }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};
