import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	entities: [],
	entitiesEdit: null,
	total_count: 0,
	listLoading: false,
	actionLoading: false
};
export const callTypes = {
	list: 'list',
	action: 'actions'
};
export const listRoleSlice = createSlice({
	name: 'listRole',
	initialState,
	reducers: {
		catchErrors: (state, action) => {
			if (action.payload.callType === callTypes.list) {
				state.actionLoading = false;
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
		fetchsListRoleMenu: (state, action) => {
			const { dataRes } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entities = dataRes;
		},
		updatedRoleSetting: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			state.entities = dataRes;
		}
	}
});
