import { createSlice } from '@reduxjs/toolkit';

const inititalState = {
	listLoading: false,
	actionLoading: false,
	entities: [],
	entitiesEdit: null,
	entitiesAll: [],
	entitiesDetail: [],
	entitiesGantt: [],
	entitiesView: null,
	total_count: 0,
	total_item: null,
	lastErrors: false
};
export const callTypes = {
	list: 'list',
	action: 'actions'
};
export const projectSlice = createSlice({
	name: 'project',
	initialState: inititalState,
	reducers: {
		catchErros: (state, action) => {
			if (action.payload.callType === callTypes.list) {
				state.listLoading = false;
				state.lastErrors = true;
			} else {
				state.actionLoading = false;
			}
		},
		startCall: (state, action) => {
			state.error = null;
			if (action.payload.callType === callTypes.list) {
				state.listLoading = true;
			} else {
				state.actionLoading = true;
			}
		},
		projectsFetch: (state, action) => {
			const { dataRes, total_count } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entities = dataRes;
			state.total_count = total_count;
		},
		projectsFetchAll: (state, action) => {
			const { dataRes } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entitiesAll = dataRes;
		},
		projectFetch: (state, action) => {
			const { value } = action.payload;
			state.actionLoading = false;
			state.entitiesEdit = value;
		},
		createdProject: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			const { entities } = state;
			const newEntities = [...dataRes, ...entities];
			state.entities = newEntities;
		},
		updatedProject: (state, action) => {
			const { dataRes } = action.payload;
			const newDataRes = dataRes[0];
			state.actionLoading = false;
			state.entities = state.entities.map(entity => {
				if (entity.prjID === newDataRes.prjID) {
					return newDataRes;
				}
				return entity;
			});
		},
		deletedProject: (state, action) => {
			const { dataReq } = action.payload;
			state.actionLoading = false;
			const { entities } = state;
			const newEnities = entities.filter(item => item.groupID !== dataReq.GroupID);
			state.entities = newEnities;
		},
		fetchProjectDetail: (state, action) => {
			const { dataRes, total_count } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entitiesDetail = dataRes;
			state.total_count = total_count;
		},
		fetchTaskDetailAll: (state, action) => {
			const { newData } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entitiesGantt = newData;
		},
		fetchTaskView: (state, action) => {
			const { dataRes } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entitiesView = dataRes;
		},
		addTaskActivity: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			const { activities } = state.entitiesView;
			const newData = [...activities, dataRes];
			state.entitiesView.activities = newData;
		},
		addTaskWatcher: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			const { watcher } = state.entitiesView;
			const newData = [dataRes, ...watcher];
			state.entitiesView.watcher = newData;
		}
	}
});
