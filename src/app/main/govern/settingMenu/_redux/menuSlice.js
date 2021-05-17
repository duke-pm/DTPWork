import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	listLoading: false,
	actionLoading: false,
	entities: null,
	entitiesAll: null,
	entitiesEdit: null,
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
				state.actionLoading = false;
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
		fetchsListMenuSettings: (state, action) => {
			const { dataRes, total_result } = action.payload;
			state.listLoading = false;
			state.lastErrors = false;
			state.entities = dataRes;
			state.total_count = total_result;
		},
		fetchsListMenuSettingALl: (state, action) => {
			const { dataRes } = action.payload;
			state.listLoading = false;
			state.lastErrors = false;
			state.entitiesAll = dataRes;
		},
		fetchListMenuSetting: (state, action) => {
			const { items } = action.payload;
			state.actionLoading = false;
			state.entitiesEdit = items;
		},
		createdMenuSettings: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			state.error = null;
			const newArr = [dataRes, ...state.entities];
			state.entities = newArr;
		},
		updatedMenuSettings: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			state.entities = state.entities.map(entity => {
				if (entity.menuID === dataRes.menuID) {
					return dataRes;
				}
				return entity;
			});
		},
		deletedMenuSettings: (state, action) => {
			const { id } = action.payload;
			const { entities } = state;
			const newEntities = entities.filter(item => item.menuID !== id);
			state.entities = newEntities;
		}
	}
});
