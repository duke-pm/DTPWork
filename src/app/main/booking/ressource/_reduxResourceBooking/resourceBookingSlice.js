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

export const resourceBookingSlice = createSlice({
	name: 'resource',
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
		fetchsResource: (state, action) => {
			const { dataRes, total_count } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entities = dataRes;
			state.total_count = total_count;
		},
		modifyResource: (state, action) => {
			state.actionLoading = false;
		},
		modifyResourceEdit: (state, action) => {
			const { dataRes } = action.payload;
			state.entitiesEdit = dataRes;
			state.actionLoading = false;
		},
		fetchResource: (state, action) => {
			const { task } = action.payload;
			state.actionLoading = false;
			state.entitiesEdit = task;
		},
		removeResource: (state, action) => {
			const { resourceID } = action.payload;
			const { entities } = state;
			const newArray = entities.filter(item => item.resourceID !== resourceID);
			state.entities = newArray;
		}
	}
});
