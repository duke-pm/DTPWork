import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	listloading: false,
	actionLoading: false,
	entities: null,
	entitiesEdit: undefined,
	total_count: 0,
	lastErrors: false
};

export const callTypes = {
	list: 'list',
	action: 'actions'
};

export const documentAssetsSlice = createSlice({
	name: 'documentAsset',
	initialState,
	reducers: {
		catchError: (state, action) => {
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
		fetchsDocumentAssets: (state, action) => {
			const { dataRes, total_count } = action.payload;
			state.listloading = false;
			state.error = null;
			state.lastErrors = false;
			state.actionLoading = false;
			state.entities = dataRes;
			state.total_count = total_count;
		},
		fetchDocumentAssetsDetail: (state, action) => {
			const { data } = action.payload;
			state.listloading = false;
			state.actionLoading = false;
			state.error = null;
			state.lastErrors = false;
			state.entitiesEdit = data;
		},
		updateAllocationDocumentAssets: (state, action) => {
			state.actionLoading = false;
		},
		updateRecoveryDocumentAssets: (state, action) => {
			state.actionLoading = false;
		}
	}
});
