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
		fetchsListUser: (state, action) => {
			const { dataRes, total_result } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entities = dataRes;
			state.total_count = total_result;
		},
		createdListUser: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			const { entities } = state;
			const newEntities = [dataRes, ...entities];
			state.entities = newEntities;
		},
		updatedListUser: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			state.entities = state.entities.map(entity => {
				if (entity.userID === dataRes.userID) {
					return dataRes;
				}
				return entity;
			});
		},
		fetchListUser: (state, action) => {
			const { value } = action.payload;
			state.actionLoading = false;
			state.entitiesEdit = value;
		},
		deletedListUser: (state, action) => {
			const { dataReq } = action.payload;
			const { entities } = state;
			state.actionLoading = false;
			const newEntities = entities.filter(item => item.userID !== dataReq.UserID);
			state.entities = newEntities;
		}
	}
});
