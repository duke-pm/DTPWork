import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './LevelSettingCrud';
import { callTypes, levelSettingSlice } from './LevelSettingSlice';

const { actions } = levelSettingSlice;
export const fetchListLevels = (limit, page) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsRequest = {
		PageSize: 25,
		PageNum: 1
	};
	return requestFrom
		.fetchLevels(paramsRequest)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.fetchListLevels({ dataRes, total_count }));
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

export const fetchListLevelsFilter = (limit, page, search) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsRequest = {
		PageSize: limit || 25,
		PageNum: page || 1,
		Search: search || ''
	};
	return requestFrom
		.fetchLevels(paramsRequest)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalPage;
				dispatch(actions.fetchListLevels({ dataRes, total_count }));
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
export const createdLevel = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		AbsID: '0',
		GroupID: values.groupID,
		RoleID: values.roleID,
		Notes: values.notes,
		IsChanged: values.isChanged,
		Levels: values.levels
	};
	return requestFrom
		.levelModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				// const dataRes = data.data;
				// dispatch(actions.createdLevel({ dataRes }));
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

export const updatedLevel = (values, isChanged) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		AbsID: values.id,
		GroupID: values.groupID,
		RoleID: values.roleID,
		Notes: values.notes,
		IsChanged: isChanged,
		Levels: values.levels
	};
	return requestFrom
		.levelModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.updatedLevel({ dataRes }));
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

export const setTaskEditLevel = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchLevel({ value }));
	console.log(value);
};
export const deletedLevel = item => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		AbsID: item.absID,
		Lang: 'vi'
	};
	return requestFrom
		.deletedLevel(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.deleteLevel({ dataReq }));
				notificationConfig('success', 'Success', 'Xoá thành công');
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
