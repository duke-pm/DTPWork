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
		},
		fetchsListMenuSettings: (state, action) => {
			const { data } = action.payload;
			state.listLoading = false;
			state.lastErrors = false;
			state.entities = data;
			// state.total_count
		},
		createdMenuSettings: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			state.error = null;
			const newArr = [...dataRes, ...state.entities];
			state.entities = newArr;
		},
		updatedMenuSettings: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			state.entities = state.entities.map(entity => {
				if (entity.assetID === dataRes.assetID) {
					return dataRes;
				}
				return entity;
			});
		}
	}
});
