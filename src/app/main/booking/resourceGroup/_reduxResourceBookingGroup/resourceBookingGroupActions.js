import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './resourceBookingGroupCrud';
import { callTypes, resourceBookingGroupSlice } from './resourceBookingGroupSlice';

const { actions } = resourceBookingGroupSlice;
export const fetchResouceBookingGroup = (limit, page) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramReq = {
		page: page || 1,
		limit: limit || 25
	};
	return requestFrom
		.fetchResouceBookingGroup(paramReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.fetchsResourceGroup({ dataRes, total_count }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};
export const fetchResouceBookingGroupFilter = (limit, page, SortColumn, SortDirection, search) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramReq = {
		page: page || 1,
		limit: limit || 25,
		Search: search,
		SortColumn: SortColumn || null,
		SortDirection: SortDirection || 'asc'
	};
	return requestFrom
		.fetchResouceBookingGroup(paramReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.fetchsResourceGroup({ dataRes, total_count }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const setTaskEditResourceGroup = task => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchResourceGroup({ task }));
};

export const createResouceGroup = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		GroupID: '0',
		GroupName: value.name,
		Descr: value.description,
		IconID: value.icon,
		Lang: 'en'
	};
	return requestFrom
		.resourceBookingGroupModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.modifyResourceGroup());
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild!!!', data.systemErrorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};
export const updateResouceGroup = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		GroupID: value.id,
		GroupName: value.name,
		Descr: value.description,
		IconID: value.icon,
		Lang: 'en'
	};
	return requestFrom
		.resourceBookingGroupModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data[0];
				dispatch(actions.modifyResourceGroupEdit({ dataRes }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild!!!', data.systemErrorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const deleteResourceGroup = groupID => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramReq = {
		GroupID: groupID,
		Lang: 'en'
	};
	return requestFrom
		.removeResourceGroup(paramReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.removeResourceGroup({ groupID }));
				notificationConfig('success', 'Success!!!', 'Remove resource group success.');
				dispatch(actions.catchErrors({ callType: callTypes.action }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild!!!', data.systemErrorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Fail', `Serrver error`);
		});
};
