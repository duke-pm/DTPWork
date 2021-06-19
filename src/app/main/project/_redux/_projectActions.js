import { notificationConfig } from '@fuse/core/DtpConfig';
import * as moment from 'moment';
import * as requestFrom from './_projectCrud';
import { projectSlice, callTypes } from './_projectSlice';

const { actions } = projectSlice;
const TaskType = {
	Phase: 1,
	Task: 2,
	Miltestone: 3
};
export const fetchsProject = () => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		Lang: 'vi',
		pageSize: 25,
		pageNum: 1,
		StatusID: null,
		OwnerID: null,
		Year: null,
		Search: null
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
export const fetchsProjectFilter = (limit, page, status, owner, year, search) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsReq = {
		Lang: 'vi',
		pageSize: limit || 25,
		pageNum: page || 1,
		StatusID: status || null,
		OwnerID: owner || null,
		Year: year || null,
		Search: search || null
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
		PrjID: '0',
		PrjName: values.prjName,
		PrjParentID: values.prjParentID || 0,
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
				// const dataRes = data.data;
				// dispatch(actions.createdProject({ dataRes }));
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
		PrjParentID: values.prjParentID || 0,
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
export const deleteProject = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		PrjID: values
	};
	return requestFrom
		.deleteProject(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				// const dataRes = data.data;
				dispatch(fetchAllProject());
				notificationConfig('success', 'Success', 'Delete project success');
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
export const fetchOwner = () => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	return requestFrom
		.getOwner()
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				// const dataRes = data.data;
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
export const fetchAllSubTask = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsReq = {
		PrjID: params
	};
	return requestFrom
		.getTaskSub(paramsReq)
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

export const fetchProjectDetail = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		PrjID: params,
		OwnerID: null,
		pageSize: 25,
		pageNum: 1,
		statusID: null,
		Year: null,
		Search: null,
		Lang: 'vi'
	};
	return requestFrom
		.fetchProjectDetail(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.fetchProjectDetail({ dataRes, total_count }));
			} else {
				notificationConfig('warning', 'Warning', data.errorMessage);
				dispatch(actions.catchErros({ callType: callTypes.list }));
			}
		})
		.catch(() => {
			dispatch(actions.catchErros({ callType: callTypes.list }));
			notificationConfig('warning', 'Warning', 'Server error');
		});
};
export const fetchProjectDetailFilter =
	(params, pageSize, pageNum, owner, status, year, sector, search) => dispatch => {
		dispatch(actions.startCall({ callType: callTypes.action }));
		const paramsReq = {
			PrjID: params,
			OwnerID: owner || null,
			pageSize: pageSize || 25,
			pageNum: pageNum || 1,
			statusID: status || null,
			Year: year || null,
			Search: search || null,
			Lang: 'vi',
			SectorID: sector || null
		};
		return requestFrom
			.fetchProjectDetail(paramsReq)
			.then(res => {
				const { data } = res;
				if (!data.isError) {
					const dataRes = data.data;
					const total_count = data.totalRow;
					dispatch(actions.fetchProjectDetail({ dataRes, total_count }));
				} else {
					notificationConfig('warning', 'Warning', data.errorMessage);
					dispatch(actions.catchErros({ callType: callTypes.action }));
				}
			})
			.catch(() => {
				dispatch(actions.catchErros({ callType: callTypes.action }));
				notificationConfig('warning', 'Warning', 'Server error');
			});
	};

export const createdTask = (values, prjID, taskType) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const formData = new FormData();
	formData.append('TaskID', 0);
	formData.append('TaskName', values.taskName);
	formData.append('TaskTypeID', TaskType[taskType]);
	formData.append('PrjID', prjID);
	formData.append('ParentID', values.project || 0);
	formData.append('Descr', values.descr);
	formData.append('StartDate', moment(values.startDate).format('YYYY-MM-DD'));
	formData.append('EndDate', moment(values.endDate).format('YYYY-MM-DD'));
	formData.append('Owner', values.owner);
	formData.append('Priority', values.priority);
	formData.append('StatusID', values.status);
	formData.append('SectorID', values.sectorID || 0);
	formData.append('Grade', values.grade || 0);
	formData.append('Author', values.author);
	formData.append('Component', values.component || 0);
	formData.append('OriginPublisher', values.originPublisher);
	formData.append('OwnershipDTP', values.ownership);
	formData.append('AttachFiles', values.file || '');
	formData.append('Lang', 'vi');
	formData.append('Percentage', values.percentage);
	formData.append('Version', values.version);
	return requestFrom
		.taskModify(formData)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(fetchProjectDetailFilter(prjID));
				dispatch(fetchAllSubTask(prjID));
				dispatch(getTaskDetailAll(prjID));
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
export const updatedTask = values => dispatch => {
	console.log(values);
	dispatch(actions.startCall({ callType: callTypes.action }));
	const formData = new FormData();
	formData.append('TaskID', values.taskID);
	formData.append('TaskName', values.taskName);
	formData.append('TaskTypeID', values.taskType);
	formData.append('PrjID', values.prjID);
	formData.append('ParentID', values.project || 0);
	formData.append('Descr', values.descr);
	formData.append('StartDate', moment(values.startDate).format('YYYY-MM-DD'));
	formData.append('EndDate', moment(values.endDate).format('YYYY-MM-DD'));
	formData.append('SectorID', values.sectorID || 0);
	formData.append('Owner', values.owner);
	formData.append('Priority', values.priority);
	formData.append('StatusID', values.status);
	formData.append('Grade', values.grade || 0);
	formData.append('Author', values.author);
	formData.append('Component', values.component || 0);
	formData.append('OriginPublisher', values.originPublisher);
	formData.append('OwnershipDTP', values.ownership);
	if (values.file) {
		formData.append('AttachFiles', values.file);
	}
	formData.append('Lang', 'vi');
	formData.append('Percentage', values.percentage);
	formData.append('Version', values.version);
	return requestFrom
		.taskModify(formData)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(fetchAllSubTask(values.prjID));
				dispatch(getTaskDetailAll(values.prjID));
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
export const updatedTaskStatus = (values, status, percent) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		TaskID: values.taskID,
		StatusID: status,
		Percentage: percent || values.percentage,
		Lang: 'Vi'
	};
	return requestFrom
		.updateStatusTask(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				// const dataRes = data.data;
				// dispatch(fetchProjectDetailFilter(values.prjID));
				dispatch(fetchAllSubTask(values.prjID));
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

export const getTaskViewDetail = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsReq = {
		taskID: params
	};
	return requestFrom
		.getTaskViewDetail(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.fetchTaskView({ dataRes }));
			} else {
				dispatch(actions.catchErros({ callType: callTypes.action }));
				notificationConfig('warning', 'Warning', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErros({ callType: callTypes.action }));
			notificationConfig('warning', 'Warning', 'Server error');
		});
};
export const getTaskDetailAll = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsReq = {
		PrjID: params,
		Lang: 'vi',
		Search: ''
	};
	return requestFrom
		.getTaskDetailAll(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data.listTask;
				const newData = dataRes.reduce(
					(arr, curr) => [
						...arr,
						{
							id: JSON.stringify(curr.taskID),
							name: curr.taskName,
							start: moment(curr.startDate).format('YYYY-MM-DD'),
							end: moment(curr.endDate).format('YYYY-MM-DD'),
							progress: curr.percentage,
							dependencies: curr.parentID === 0 ? '' : JSON.stringify(curr.parentID),
							custom_class: curr.typeName
						}
					],
					[]
				);
				dispatch(actions.fetchTaskDetailAll({ newData }));
			} else {
				dispatch(actions.catchErros({ callType: callTypes.action }));
				notificationConfig('warning', 'Warning', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErros({ callType: callTypes.action }));
			notificationConfig('warning', 'Warning', 'Server error');
		});
};
export const addTaskActivity = (id, comment) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		taskID: id,
		LineNum: '0',
		Comments: comment,
		Lang: 'vi'
	};
	return requestFrom
		.addTaskActivity(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.addTaskActivity({ dataRes }));
			} else {
				dispatch(actions.catchErros({ callType: callTypes.action }));
				notificationConfig('warning', 'Warning', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErros({ callType: callTypes.action }));
			notificationConfig('warning', 'Warning', 'Server error');
		});
};
export const addTaskWatcher = id => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		LineNum: 0,
		TaskID: id,
		Lang: 'en'
	};
	return requestFrom
		.addTaskWatch(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				dispatch(actions.addTaskWatcher({ dataRes }));
			} else {
				dispatch(actions.catchErros({ callType: callTypes.action }));
				notificationConfig('warning', 'Warning', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErros({ callType: callTypes.action }));
			notificationConfig('warning', 'Warning', 'Server error');
		});
};
export const deleteTask = values => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		TaskID: values.taskID
	};
	return requestFrom
		.deleteTask(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(fetchAllSubTask(values.taskID));
				notificationConfig('success', 'Success', 'Delete project success');
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
