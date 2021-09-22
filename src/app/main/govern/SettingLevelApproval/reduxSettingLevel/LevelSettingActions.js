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

export const fetchListLevelsFilter = (limit, page) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsRequest = {
		PageSize: limit || 25,
		PageNum: page || 1
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
		CodeID: '0',
		CodeName: values.codeName,
		Description: values.description
	};
	return requestFrom
		.levelModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.createdLevel({ dataRes }));
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

export const updatedLevel = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		CodeID: values.codeID,
		CodeName: values.codeName,
		Description: values.description
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
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Fail', 'Server error');
		});
};

export const setTaskEditLevel = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchLevel({ value }));
};
export const deletedLevel = item => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		CodeId: item.codeId
	};
	return requestFrom
		.deletedLevel(dataReq)
		.then(res => {
			// console.log(res);
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.deleteLevel({ dataReq }));
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
