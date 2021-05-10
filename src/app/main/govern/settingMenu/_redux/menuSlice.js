import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	listLoading: false,
	actionLoading: false,
	entities: null,
	total_count: 0,
	total_items: null,
	lastErrors: false
};
export const callTypes = {
	list: 'list',
	action: 'actions'
};
export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		catchErrors: (state, action) => {
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
		}
	}
});
