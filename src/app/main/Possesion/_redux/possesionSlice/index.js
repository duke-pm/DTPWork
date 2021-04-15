import { createSlice } from '@reduxjs/toolkit';

const initialPossesionState = {
	listloading: false,
	actionLoading: false,
	entities: null,
	entitiesEdit: undefined,
	entitiesInformation: null,
	total_count: 0,
	total_items: null,
	lastErrors: false
};
export const callTypes = {
	list: 'list',
	action: 'actions'
};

export const possesionSlice = createSlice({
	name: 'possesion',
	initialState: initialPossesionState,
	reducers: {
		catchErrors: (state, action) => {
			if (action.payload.callType === callTypes.list) {
				state.listloading = false;
				state.lastErrors = true;
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
		possesionsFetch: (state, action) => {
			const { data } = action.payload;
			state.listloading = false;
			state.error = null;
			state.lastErrors = false;
			state.entities = data.data.listItem;
			state.total_items = data.data.header;
			state.total_count = data.totalRow;
		},
		possesionFetch: (state, action) => {
			const { data } = action.payload;
			state.actionLoading = false;
			state.entitiesEdit = data;
		},
		possesionCreated: (state, action) => {
			const { data } = action.payload;
			state.actionLoading = false;
			state.error = null;
			const { countAll } = state.total_items;
			state.total_items.countAll = countAll + 1;
			// state.total_items = [...state.total_items, state.total_items.countAll + 1];
			// state.entities = [...state.entities, data];
		},
		possesionUpdate: (state, action) => {
			const { data } = action.payload;
			const { entities } = state;
			const index = entities.findIndex(items => items.id === data.id);
			if (index !== -1) {
				const newList = [...entities.slice(0, index), data, ...entities.slice(index + 1)];
				return {
					...state,
					entities: newList
				};
			}
			state.error = null;
			state.actionLoading = false;
			return {
				...state
			};
		},
		informationsFetch: (state, action) => {
			const { data } = action.payload;
			state.listloading = false;
			state.error = null;
			state.lastErrors = false;
			state.entitiesInformation = data.data;
		}
	}
});
