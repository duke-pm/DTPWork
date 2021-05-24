import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './listRoleMenuSettingCrud';
import { callTypes, listRoleSlice } from './listRoleMenuSlice';

const { actions } = listRoleSlice;
export const fetchsListUser = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		PageSize: 25,
		PageNum: 1
	};
	return requestFrom
		.fetchsListUser(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_result = data.totalRow;
				dispatch(actions.fetchsListUser({ dataRes, total_result }));
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
export const fetchsListFilter = (page, limit, sortColumn, sortDirection, search) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsReq = {
		PageSize: limit || 25,
		PageNum: page || 1,
		SortColumn: sortColumn || null,
		SortDirection: sortDirection || 'desc',
		Search: search || ''
	};
	return requestFrom
		.fetchsListUser(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_result = data.totalRow;
				dispatch(actions.fetchsListUser({ dataRes, total_result }));
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

export const createdListUser = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		UserID: '0',
		UserName: values.userName,
		FirstName: values.firstName,
		LastName: values.lastMiddleName,
		CellPhone: values.cellPhone,
		Email: values.email,
		GroupID: values.userGroup,
		BizLine: values.bizLine.length > 0 ? values.bizLine.toString() : null,
		Region: values.region.length > 0 ? values.region.toString() : null,
		SlpCode: values.salesEmployee || -1,
		EmpCode: values.empSAP,
		LineManager: values.lineManager || -1,
		Inactive: values.inactive,
		Ischange: values.ischangePasswrod,
		Lang: 'vi',
		Legal: values.company.length > 0 ? values.company.toString() : null
	};
	return requestFrom
		.createdListUser(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.createdListUser({ dataRes }));
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

export const setTaskEditListUser = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchListUser({ value }));
};

export const updatedListUser = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		UserID: values.userID,
		UserName: values.userName,
		FirstName: values.firstName,
		LastName: values.lastMiddleName,
		CellPhone: values.cellPhone,
		Email: values.email,
		GroupID: values.userGroup,
		BizLine: values.bizLine.length > 0 ? values.bizLine.toString() : null,
		Region: values.region.length > 0 ? values.region.toString() : null,
		SlpCode: values.salesEmployee || -1,
		EmpCode: values.empSAP,
		LineManager: values.lineManager || -1,
		Inactive: values.inactive,
		Ischange: values.ischangePasswrod,
		Lang: 'vi',
		Legal: values.company.length > 0 ? values.company.toString() : null
	};
	return requestFrom
		.createdListUser(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.updatedListUser({ dataRes }));
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
export const deletedListUser = item => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		UserID: item.userID
	};
	return requestFrom
		.deletedListUser(dataReq)
		.then(res => {
			// console.log(res);
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.deletedListUser({ dataReq }));
				notificationConfig('success', 'Thành công', 'Xoá người dùng thành công');
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
