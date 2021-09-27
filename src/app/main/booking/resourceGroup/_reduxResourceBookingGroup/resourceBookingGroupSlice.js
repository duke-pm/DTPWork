import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	entities: null,
	entitiesEdit: null,
	total_count: 0,
	listLoading: false,
	actionLoading: false
};

export const callTypes = {
	list: 'list',
	action: 'actions'
};

export const resourceBookingGroupSlice = createSlice({
	name: 'resourceGroup',
	initialState,
	reducers: {
		catchErrors: (state, action) => {
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
		fetchsResourceGroup: (state, action) => {
			const { dataRes, total_count } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entities = dataRes;
			state.total_count = total_count;
		},
		modifyResourceGroup: (state, action) => {
			state.actionLoading = false;
		},
		modifyResourceGroupEdit: (state, action) => {
			const { dataRes } = action.payload;
			state.entitiesEdit = dataRes;
			state.actionLoading = false;
		},
		fetchResourceGroup: (state, action) => {
			const { task } = action.payload;
			state.actionLoading = false;
			state.entitiesEdit = task;
		},
		removeResourceGroup: (state, action) => {
			const { groupID } = action.payload;
			const { entities } = state;
			const newArray = entities.filter(item => item.groupID !== groupID);
			state.entities = newArray;
		}
	}
});
