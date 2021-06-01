import { notificationConfig } from '@fuse/core/DtpConfig';
import * as requestFrom from './_projectCrud';
import { projectSlice, callTypes } from './_projectSlice';

const { actions } = projectSlice;
export const fetchsProject = () => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		PageSize: 25,
		PageNum: 1
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
				dispatch(actions.catchErrors({ callType: callTypes.list }));
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('warning', 'Warning', 'Server error');
		});
};
export const fetchsProjectFilter = (page, limit, sortColumn, sortDirection, search) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsReq = {
		PageNum: page || 1,
		PageSize: limit || 25,
		SortColumn: sortColumn || '',
		SortDirection: sortDirection || 'desc',
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
				dispatch(actions.catchErrors({ callType: callTypes.action }));
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};

export const createdProject = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		nameProject: values.nameProject,
		sector: values.sector,
		subProject: values.subProject,
		public: values.public,
		owner: values.owner,
		Lang: 'vi'
	};
	return requestFrom
		.projectModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.createdProject({ dataRes }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Warning', data.errorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
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
		nameProject: values.nameProject,
		sector: values.sector,
		subProject: values.subProject,
		public: values.public,
		owner: values.owner,
		Lang: 'vi'
	};
	return requestFrom
		.projectModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.updatedProject({ dataRes }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Warning', data.errorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
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
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Warning', `${data.errorMessage}`);
			}
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Warning', `Serrver error`);
		});
};
