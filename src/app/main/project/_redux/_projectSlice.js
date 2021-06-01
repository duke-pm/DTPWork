import { createSlice } from '@reduxjs/toolkit';

const inititalState = {
	listLoading: false,
	actionLoading: false,
	entities: [],
	entitiesEdit: null,
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
			const { data } = action.payload;
			state.listLoading = false;
			state.entities = data.data;
			state.total_count = data.totalRow;
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
			const newEntities = [dataRes, ...entities];
			state.entities = newEntities;
		},
		updatedProject: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			state.entities = state.entities.map(entity => {
				if (entity.groupID === dataRes.groupID) {
					return dataRes;
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
		}
	}
});
