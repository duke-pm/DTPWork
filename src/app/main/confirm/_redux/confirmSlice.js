import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	listloading: false,
	actionLoading: false,
	entities: null,
	entitiesEdit: undefined,
	total_count: 0,
	total_items: null,
	lastErrors: false
};

export const callTypes = {
	list: 'list',
	action: 'actions'
};

export const confirmSlice = createSlice({
	name: 'confirm',
	initialState,
	reducers: {
		catchError: (state, action) => {
			if (action.payload.callType === callTypes.list) {
				state.listloading = false;
				state.lastErrors = true;
			} else {
				state.actionLoading = false;
			}
		},
		startCall: (state, action) => {
			state.error = null;
			if (action.payload.callType === callTypes.list) {
				state.listloading = true;
			} else {
				state.actionLoading = true;
			}
		},
		confirmsFetch: (state, action) => {
			// const { data } = action.payload;
			state.listloading = false;
			state.error = null;
			state.lastErrors = false;
			state.actionLoading = false;
		}
	}
});
