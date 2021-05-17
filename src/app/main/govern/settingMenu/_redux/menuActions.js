import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './menuCrud';
import { callTypes, menuSlice } from './menuSlice';

const { actions } = menuSlice;
export const fetchsListMenuSettings = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		PageSize: 25,
		PageNum: 1
	};
	return requestFrom
		.fetchDataMenuApi(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_result = data.totalPage;
				dispatch(actions.fetchsListMenuSettings({ dataRes, total_result }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.list }));
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('danger', 'Thất bại', 'Đã có lỗi xảy ra');
		});
};
export const fetchsListMenuSettingAll = params => dispatch => {
	const paramsReq = {
		PageSize: 105,
		PageNum: 1
	};
	return requestFrom
		.fetchDataMenuApi(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_result = data.totalPage;
				dispatch(actions.fetchsListMenuSettingALl({ dataRes, total_result }));
			} else {
				// dispatch(actions.catchErrors({ callType: callTypes.list }));
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('danger', 'Thất bại', 'Đã có lỗi xảy ra');
		});
};
export const fetchsListMenuSettingParams = (limit, page, direction, id, search) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsReq = {
		PageSize: limit || 25,
		PageNum: page || 1,
		SortColumn: id || '',
		SortDirection: direction || 'desc',
		Search: search || ''
	};
	return requestFrom
		.fetchDataMenuApi(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_result = data.totalPage;
				dispatch(actions.fetchsListMenuSettings({ dataRes, total_result }));
				dispatch(actions.catchErrors({ callType: callTypes.action }));
			}
		})
		.catch(error => {
			dispatch(actions.startCall({ callType: callTypes.action }));
		});
};
export const createdMenuSettings = dataReq => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReqApi = {
		MenuID: 0,
		MenuName: dataReq.menuName,
		TypeID: dataReq.typeID,
		LevelID: 0,
		ParentID: dataReq.parentID || null,
		Url: dataReq.url || null,
		Icon: dataReq.icon || null,
		DirectionIcon: dataReq.directionIcon || null,
		MName: dataReq.mName || null,
		MIcon: dataReq.mIcon || null,
		IsWeb: dataReq.isWeb,
		IsMobile: dataReq.isMobile,
		VisOrder: dataReq.visOrder,
		Inactive: dataReq.inactive,
		Lang: 'vi'
	};
	return requestFrom
		.createdMenuSettingsApi(dataReqApi)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.createdMenuSettings({ dataRes }));
			} else {
				notificationConfig('warning', 'Thất bại', 'Đã có lỗi xảy ra vui lòng thử lại sau !!!');
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};

export const setTaskEditMenuSetting = items => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchListMenuSetting({ items }));
};

export const updatedMenuSettings = dataReq => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReqApi = {
		MenuID: dataReq.menuID,
		MenuName: dataReq.menuName,
		TypeID: dataReq.typeID,
		LevelID: dataReq.levelID,
		ParentID: dataReq.parentID,
		Url: dataReq.url,
		Icon: dataReq.icon,
		DirectionIcon: dataReq.directionIcon,
		MName: dataReq.mName,
		MIcon: dataReq.mIcon,
		IsWeb: dataReq.isWeb,
		IsMobile: dataReq.isMobile,
		VisOrder: dataReq.visOrder,
		Inactive: dataReq.inactive,
		Lang: 'vi'
	};
	return requestFrom
		.createdMenuSettingsApi(dataReqApi)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.updatedMenuSettings({ dataRes }));
			} else {
				notificationConfig('warning', 'Thất bại', 'Đã có lỗi xảy ra vui lòng thử lại sau !!!');
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};
