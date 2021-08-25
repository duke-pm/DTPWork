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

export const levelSettingSlice = createSlice({
	name: 'levelApproval',
	initialState,
	reducers: {
		catchErrors: (state, action) => {
			if (action.payload.callType === callTypes.list) {
				state.listLoading = false;
			} else {
				state.actionLoading = false;
			}
		},
		startCall: (state, action) => {
			if (action.payload.callType === callTypes.list) {
				state.listLoading = true;
			} else {
				state.actionLoading = true;
			}
		},
		fetchListLevels: (state, action) => {
			const { dataRes, total_count } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entities = dataRes;
			state.total_count = total_count;
		},
		createdLevel: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			const { entities } = state;
			const newEntities = [dataRes, ...entities];
			state.entities = newEntities;
		},
		updatedLevel: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			state.entities = state.entities.map(entity => {
				if (entity.lineId === dataRes.lineId) {
					return dataRes;
				}
				return entity;
			});
		},
		fetchLevel: (state, action) => {
			const { item } = action.payload;
			state.actionLoading = false;
			state.entitiesEdit = item;
		},
		deleteLevel: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			const { entities } = state;
			const newEntities = entities.filter(item => item.lineId !== dataRes.lineId);
			state.entities = newEntities;
		}
	}
});
