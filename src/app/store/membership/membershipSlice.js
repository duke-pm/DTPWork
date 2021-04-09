import { createSlice } from '@reduxjs/toolkit';

const initialPossesionState = {
	listloading: false,
	actionLoading: false,
	entities: null,
	entitiesEdit: undefined,
	total_count: 0,
	lastErrors: null
};
export const callTypes = {
	list: 'list',
	action: 'actions'
};

const membershipSlice = createSlice({
	name: 'membership',
	initialState: initialPossesionState,
	reducers: {
		catchErrors: (state, action) => {
			if (action.payload.callType === callTypes.list) {
				state.listloading = false;
			} else {
				state.actionLoading = true;
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
		membershipsFetch: (state, action) => {
			const { data, total_result } = action.payload;
			state.listloading = false;
			state.error = null;
			state.entities = data;
			state.total_count = total_result;
		}
	}
});
export default membershipSlice.reducer;
