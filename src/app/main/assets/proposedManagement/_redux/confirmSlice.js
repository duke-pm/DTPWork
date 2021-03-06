import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	listloading: false,
	actionLoading: false,
	entities: null,
	entitiesDetail: null,
	newEntitiesDetail: null,
	entitiesApproval: null,
	newEntitiesApproval: null,
	entitiesEdit: undefined,
	total_count: 0,
	total_items: null,
	lastErrors: false,
	entitiesInformation: null,
	assetsUser: null,
	dateStartGobal: null,
	dateEndGobal: null
};

export const callTypes = {
	list: 'list',
	action: 'actions'
};

export const confirmSlice = createSlice({
	name: 'confirm',
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
		confirmsFetch: (state, action) => {
			const { data } = action.payload;
			state.listloading = false;
			state.error = null;
			state.lastErrors = false;
			state.actionLoading = false;
			state.entitiesDetail = data.data.listRequestDetail;
			state.entities = data.data.listRequest;
			state.entitiesApproval = data.data.listProcessApprove;
			state.total_items = data.data.header;
			state.total_count = data.totalRow;
		},
		informationsFetch: (state, action) => {
			const { data } = action.payload;
			state.listloading = false;
			state.actionLoading = false;
			state.error = null;
			state.lastErrors = false;
			state.entitiesInformation = data.data;
		},
		requestFromUser: (state, action) => {
			state.error = null;
			state.actionLoading = false;
		},
		confirmFetch: (state, action) => {
			const { data } = action.payload;
			state.actionLoading = false;
			state.entitiesEdit = data;
			const { requestID } = data;
			const { entitiesDetail } = state;
			state.newEntitiesDetail = entitiesDetail.filter(item => item.requestID === requestID);
		},
		assetsUsersFetch: (state, action) => {
			const { data } = action.payload;
			const newData = data.data.reduce(
				(arr, curr) => [...arr, { ...curr, label: curr.assetName, value: curr.assetID }],
				[]
			);
			state.listloading = false;
			state.assetsUser = newData;
		},
		reportFromUser: (state, action) => {
			state.error = null;
			state.actionLoading = false;
		},
		approveUpdate: (state, action) => {
			const { dataReq } = action.payload;
			state.error = null;
			state.actionLoading = false;
			state.entities = state.entities.map(entity => {
				if (entity.requestID === dataReq.requestID) {
					return dataReq;
				}
				return entity;
			});
		},
		approveUpdateResolve: (state, action) => {
			const { requestID } = action.payload;
			state.error = null;
			state.actionLoading = false;
			const { entities } = state;
			const newEntities = entities.filter(item => item.requestID !== requestID);
			state.entities = newEntities;
		},
		timeLineApproval: (state, action) => {
			const { id } = action.payload;
			state.actionLoading = false;
			const { entitiesApproval } = state;
			const newTimeLine = entitiesApproval.filter(item => item.requestID === id && item.levelApproval !== null);
			state.newEntitiesApproval = newTimeLine;
		}
	}
});
