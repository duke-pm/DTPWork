import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './_projectCrud';
import { projectSlice, callTypes } from './_projectSlice';

const { actions } = projectSlice;
export const fetchsProject = () => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		Lang: 'vi'
	};
	return requestFrom
		.fetchsProject(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.projectsFetch({ dataRes, total_count }));
			} else {
				notificationConfig('warning', 'Warning', data.errorMessage);
				dispatch(actions.catchErros({ callType: callTypes.list }));
			}
		})
		.catch(error => {
			dispatch(actions.catchErros({ callType: callTypes.list }));
			notificationConfig('warning', 'Warning', 'Server error');
		});
};
export const fetchsProjectFilter = search => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsReq = {
		Search: search || ''
	};
	return requestFrom
		.fetchsProject(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.projectsFetch({ dataRes, total_count }));
			} else {
				notificationConfig('warning', 'Warning', data.errorMessage);
				dispatch(actions.catchErros({ callType: callTypes.action }));
			}
		})
		.catch(error => {
			dispatch(actions.catchErros({ callType: callTypes.action }));
		});
};

export const createdProject = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		PrjID: values.prjID,
		PrjName: values.prjName,
		SectorID: values.sectorID || 0,
		PrjParentID: values.PrjParentID || 0,
		Descr: values.descr,
		IsPublic: values.isPublic,
		Owner: values.owner || 0,
		Lang: 'vi'
	};
	return requestFrom
		.projectModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.createdProject({ dataRes }));
				dispatch(fetchAllProject());
			} else {
				dispatch(actions.catchErros({ callType: callTypes.action }));
				notificationConfig('warning', 'Warning', data.errorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErros({ callType: callTypes.action }));
			notificationConfig('warning', 'Warning', 'Server error');
		});
};
export const setTaskEditProject = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.projectFetch({ value }));
};

export const updatedProject = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		PrjID: values.prjID,
		PrjName: values.prjName,
		SectorID: values.sectorID || 0,
		PrjParentID: values.PrjParentID || 0,
		Descr: values.descr,
		IsPublic: values.isPublic,
		Owner: values.owner || 0,
		Lang: 'vi'
	};
	return requestFrom
		.projectModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(fetchsProjectFilter());
				dispatch(fetchAllProject());
				// dispatch(actions.updatedProject({ dataRes }));
			} else {
				dispatch(actions.catchErros({ callType: callTypes.action }));
				notificationConfig('warning', 'Warning', data.errorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErros({ callType: callTypes.action }));
			notificationConfig('warning', 'Warning', 'Server error');
		});
};
export const deletedProject = item => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		GroupID: item.groupID
	};
	return requestFrom
		.deleteProject(dataReq)
		.then(res => {
			// console.log(res);
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.deletedProject({ dataReq }));
				notificationConfig('success', 'Success', 'Delete project success!!!');
			} else {
				dispatch(actions.catchErros({ callType: callTypes.action }));
				notificationConfig('warning', 'Warning', `${data.errorMessage}`);
			}
		})
		.catch(error => {
			dispatch(actions.catchErros({ callType: callTypes.action }));
			notificationConfig('warning', 'Warning', `Serrver error`);
		});
};

export const fetchOwner = () => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	return requestFrom
		.getOwner()
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
			} else {
				notificationConfig('warning', 'Warning', data.errorMessage);
				dispatch(actions.catchErros({ callType: callTypes.action }));
			}
			return data;
		})
		.catch(() => {});
};
export const fetchAllProject = () => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	return requestFrom
		.getProjectSub()
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.projectsFetchAll({ dataRes }));
			} else {
				notificationConfig('warning', 'Warning', data.errorMessage);
				dispatch(actions.catchErros({ callType: callTypes.action }));
			}
			return data;
		})
		.catch(() => {});
};
