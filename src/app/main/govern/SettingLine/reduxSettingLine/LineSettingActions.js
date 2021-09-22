import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './LineSettingCrud';
import { callTypes, lineSettingSlice } from './LineSettingSlice';

const { actions } = lineSettingSlice;
export const fetchListLines = (limit, page) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsRequest = {
		PageSize: 25,
		PageNum: 1
	};
	return requestFrom
		.fetchLines(paramsRequest)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.fetchListLines({ dataRes, total_count }));
			} else {
				notificationConfig('warning', 'Fail', data.errorMessage);
				dispatch(actions.catchErrors({ callType: callTypes.list }));
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('warning', 'Fail', 'Server error');
		});
};

export const fetchListLinesFilter = (limit, page, search) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsRequest = {
		PageSize: limit || 25,
		PageNum: page || 1,
		Search: search || ''
	};
	return requestFrom
		.fetchLines(paramsRequest)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalPage;
				dispatch(actions.fetchListLines({ dataRes, total_count }));
			} else {
				notificationConfig('warning', 'Fail', data.errorMessage);
				dispatch(actions.catchErrors({ callType: callTypes.action }));
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Fail', 'Server error');
		});
};
export const createdLine = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		RoleID: '0',
		RoleCode: values.roleCode,
		RoleName: values.roleName,
		Inactive: values.inactive,
		Lang: 'vi'
		// Description: values.description
	};
	return requestFrom
		.lineModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.createdLine({ dataRes }));
			} else {
				notificationConfig('warning', 'Fail', data.errorMessage);
				dispatch(actions.catchErrors({ callType: callTypes.action }));
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Fail', 'Server error');
		});
};

export const updatedLine = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		RoleID: values.id,
		RoleCode: values.roleCode,
		RoleName: values.roleName,
		Inactive: values.inactive,
		Lang: 'vi'
	};
	return requestFrom
		.lineModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.updatedLine({ dataRes }));
			} else {
				notificationConfig('warning', 'Fail', data.errorMessage);
				dispatch(actions.catchErrors({ callType: callTypes.action }));
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Fail', 'Server error');
		});
};

export const setTaskEditLine = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchLine({ value }));
};
export const deletedLine = item => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		CodeId: item.codeId
	};
	return requestFrom
		.deletedLine(dataReq)
		.then(res => {
			// console.log(res);
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.deletedGroupUser({ dataReq }));
				notificationConfig('success', 'Success', 'Delete success');
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Fail', `${data.errorMessage}`);
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Fail', `Serrver error`);
		});
};
