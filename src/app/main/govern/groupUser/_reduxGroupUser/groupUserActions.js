import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './groupUserCrud';
import { callTypes, groupUserSlice } from './groupUserSlice';

const { actions } = groupUserSlice;
export const fetchsGroupUser = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsRequest = {
		PageSize: 25,
		PageNum: 1
	};
	return requestFrom
		.fetchsGroupUser(paramsRequest)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.fetchsGroupUser({ dataRes, total_count }));
			} else {
				notificationConfig('warning', 'Thất bại', data.errorMessage);
				dispatch(actions.catchErrors({ callType: callTypes.list }));
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};
export const filterGroupUser = (page, limit, sortColumn, sortDirection, search) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsRequest = {
		PageNum: page || 1,
		PageSize: limit || 25,
		SortColumn: sortColumn || '',
		SortDirection: sortDirection || 'desc',
		Search: search || ''
	};
	return requestFrom
		.fetchsGroupUser(paramsRequest)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.fetchsGroupUser({ dataRes, total_count }));
			} else {
				notificationConfig('warning', 'Thất bại', data.errorMessage);
				dispatch(actions.catchErrors({ callType: callTypes.action }));
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const createdGroupUser = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		GroupID: '0',
		GroupName: values.groupName,
		Description: values.description,
		Inactive: values.inactive,
		Lang: 'vi'
	};
	return requestFrom
		.groupUserModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.createdGroupUser({ dataRes }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Thất bại', data.errorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const setTaskEditGroupUser = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchGroupUser({ value }));
};

export const updatedGroupUser = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		GroupID: values.groupID,
		GroupName: values.groupName,
		Description: values.description,
		Inactive: values.inactive,
		Lang: 'vi'
	};
	return requestFrom
		.groupUserModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.updatedGroupUser({ dataRes }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Thất bại', data.errorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const deletedGroupUser = item => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		GroupID: item.groupID
	};
	return requestFrom
		.deletedGroupUser(dataReq)
		.then(res => {
			// console.log(res);
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.deletedGroupUser({ dataReq }));
				notificationConfig('success', 'Thành công', 'Xoá nhóm thành công');
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Thất bại', `${data.errorMessage}`);
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', `Serrver error`);
		});
};
