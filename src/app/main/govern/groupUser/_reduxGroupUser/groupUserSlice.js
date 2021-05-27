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
export const groupUserSlice = createSlice({
	name: 'groupUser',
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
		fetchsGroupUser: (state, action) => {
			const { dataRes, total_count } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entities = dataRes;
			state.total_count = total_count;
		},
		createdGroupUser: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			const { entities } = state;
			const newEntities = [dataRes, ...entities];
			state.entities = newEntities;
		},
		updatedGroupUser: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			state.entities = state.entities.map(entity => {
				if (entity.groupID === dataRes.groupID) {
					return dataRes;
				}
				return entity;
			});
		},
		fetchGroupUser: (state, action) => {
			const { value } = action.payload;
			state.actionLoading = false;
			state.entitiesEdit = value;
		},
		deletedGroupUser: (state, action) => {
			const { dataReq } = action.payload;
			state.actionLoading = false;
			const { entities } = state;
			const newEnities = entities.filter(item => item.groupID !== dataReq.GroupID);
			state.entities = newEnities;
		}
	}
});
