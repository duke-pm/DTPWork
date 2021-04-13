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

export const possesionSlice = createSlice({
	name: 'possesion',
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
		possesionsFetch: (state, action) => {
			const { data, total_result } = action.payload;
			state.listloading = false;
			state.error = null;
			state.entities = data;
			state.total_count = total_result;
		},
		possesionCreated: (state, action) => {
			const { data } = action.payload;
			state.actionLoading = false;
			state.error = null;
			state.entities = [...state.entities, data];
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
		}
	}
});
