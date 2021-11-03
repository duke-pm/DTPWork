import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './resourceBookingCrud';
import { callTypes, resourceBookingSlice } from './resourceBookingSlice';

const { actions } = resourceBookingSlice;
export const fetchResouceBooking = (limit, page) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramReq = {
		PageNum: page || 1,
		PageSize: limit || 25
	};
	return requestFrom
		.fetchResouceBooking(paramReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.fetchsResource({ dataRes, total_count }));
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
export const fetchResouceBookingFilter = (limit, page, SortColumn, SortDirection, search) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramReq = {
		PageNum: page || 1,
		PageSize: limit || 25,
		Search: search,
		SortColumn: SortColumn || null,
		SortDirection: SortDirection || 'asc'
	};
	return requestFrom
		.fetchResouceBooking(paramReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.fetchsResource({ dataRes, total_count }));
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

export const setTaskEditResource = task => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchResource({ task }));
};

export const createResouce = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		ResourceID: '0',
		ResourceName: value.name,
		Descr: value.description,
		GroupID: value.resourceGroup,
		ColorID: value.color,
		Lang: 'en'
	};
	return requestFrom
		.resourceBookingModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.modifyResource());
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
export const updateResouce = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		ResourceID: value.id,
		ResourceName: value.name,
		Descr: value.description,
		GroupID: value.resourceGroup,
		ColorID: value.color,
		Lang: 'en'
	};
	return requestFrom
		.resourceBookingModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data[0];
				dispatch(actions.modifyResourceEdit({ dataRes }));
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

export const deleteResource = resourceID => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramReq = {
		ResourceID: resourceID,
		Lang: 'en'
	};
	return requestFrom
		.removeResource(paramReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.removeResource({ resourceID }));
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
