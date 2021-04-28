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
		possesionsFetch: (state, action) => {
			const { data } = action.payload;
			state.listloading = false;
			state.error = null;
			state.lastErrors = false;
			state.actionLoading = false;
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
			const { dataReq, rowPage } = action.payload;
			state.actionLoading = false;
			state.error = null;
			const { countAll, countNoUseYet } = state.total_items;
			state.total_items.countAll = countAll + dataReq.length;
			state.total_items.countNoUseYet = countNoUseYet + dataReq.length;
			const newArr = [...dataReq, ...state.entities];
			const dataRows = newArr.slice(0, rowPage);
			state.entities = dataRows;
		},
		possesionUpdate: (state, action) => {
			const { dataReq } = action.payload;
			const { entities } = state;
			const index = entities.findIndex(items => items.assetID === dataReq.assetID);
			if (index !== -1) {
				const newList = [...entities.slice(0, index), dataReq, ...entities.slice(index + 1)];
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
		possesionUpdatedUnUsed: (state, action) => {
			const { id } = action.payload;
			const { entities, total_count } = state;
			state.entities = entities.filter(item => item.assetID !== id);
			const { countNoUseYet, countUsing } = state.total_items;
			state.total_items.countNoUseYet = countNoUseYet - 1;
			state.total_items.countUsing = countUsing + 1;
			state.total_count = total_count - 1;
		},
		updatePossesionWithDraw: (state, action) => {
			const { id } = action.payload;
			const { entities, total_count } = state;
			state.entities = entities.filter(item => item.assetID !== id);
			const { countNoUseYet, countUsing } = state.total_items;
			state.total_items.countNoUseYet = countNoUseYet + 1;
			state.total_items.countUsing = countUsing - 1;
			state.total_count = total_count - 1;
		},
		informationsFetch: (state, action) => {
			const { data } = action.payload;
			state.listloading = false;
			state.error = null;
			state.lastErrors = false;
			state.entitiesInformation = data.data;
		},
		requestFromUser: (state, action) => {
			state.error = null;
			state.actionLoading = false;
		},
		reportFromUser: (state, action) => {
			const { dataRes } = action.payload;
			console.log(dataRes);
			const { entities } = state;
			const index = entities.findIndex(items => items.assetID === dataRes.assetID);
			if (index !== -1) {
				const newList = [...entities.slice(0, index), dataRes, ...entities.slice(index + 1)];
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
