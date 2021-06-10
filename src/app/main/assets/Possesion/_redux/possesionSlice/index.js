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
			state.error = null;
			state.actionLoading = false;
			const { entities } = state;
			if (dataReq.inactive) {
				const newData = entities.filter(item => item.assetID !== dataReq.assetID);
				const { countNoUseYet, countAll } = state.total_items;
				state.total_items.countNoUseYet = countNoUseYet - 1;
				state.total_items.countAll = countAll - 1;
				state.entities = newData;
			} else {
				state.entities = state.entities.map(entity => {
					if (entity.assetID === dataReq.assetID) {
						return dataReq;
					}
					return entity;
				});
			}
		},
		possesionUpdatedUnUsed: (state, action) => {
			const { id } = action.payload;
			const { entities, total_count } = state;
			state.entities = entities.filter(item => item.assetID !== id);
			const { countNoUseYet, countUsing } = state.total_items;
			state.total_items.countNoUseYet = countNoUseYet - 1;
			state.total_items.countUsing = countUsing + 1;
			state.total_count = total_count - 1;
			state.actionLoading = false;
		},
		updatePossesionWithDraw: (state, action) => {
			const { id } = action.payload;
			const { entities, total_count } = state;
			state.entities = entities.filter(item => item.assetID !== id);
			const { countNoUseYet, countUsing } = state.total_items;
			state.total_items.countNoUseYet = countNoUseYet + 1;
			state.total_items.countUsing = countUsing - 1;
			state.total_count = total_count - 1;
			state.actionLoading = false;
		},
		repairAssets: (state, action) => {
			const { id, typeFormService } = action.payload;
			const { entities } = state;
			state.entities = entities.filter(item => item.assetID !== id);
			const { countDamaged, countWarrantyRepair, countUsing } = state.total_items;
			if (typeFormService === 'use') {
				state.total_items.countUsing = countUsing - 1;
			} else {
				state.total_items.countDamaged = countDamaged - 1;
			}
			state.total_items.countWarrantyRepair = countWarrantyRepair + 1;
			state.actionLoading = false;
		},
		resuseAssets: (state, action) => {
			const { id } = action.payload;
			const { entities } = state;
			state.entities = entities.filter(item => item.assetID !== id);
			const { countNoUseYet, countWarrantyRepair } = state.total_items;
			state.total_items.countNoUseYet = countNoUseYet + 1;
			state.total_items.countWarrantyRepair = countWarrantyRepair - 1;
			state.actionLoading = false;
		},
		liquiAssets: (state, action) => {
			const { id, typeliquiAsset } = action.payload;
			const { entities } = state;
			state.entities = entities.filter(item => item.assetID !== id);
			const { countLiquidation, countWarrantyRepair, countDamaged } = state.total_items;
			if (typeliquiAsset === 'damage') {
				state.total_items.countDamaged = countDamaged - 1;
			} else {
				state.total_items.countWarrantyRepair = countWarrantyRepair - 1;
			}
			state.total_items.countLiquidation = countLiquidation + 1;
			state.actionLoading = false;
		},
		informationsFetch: (state, action) => {
			const { data } = action.payload;
			state.listloading = false;
			state.error = null;
			state.lastErrors = false;
			state.entitiesInformation = data.data;
		},
		addNewsSupplierSlice: (state, action) => {
			const { dataRes } = action.payload;
			state.actionLoading = false;
			const { entitiesInformation } = state;
			const { supplier } = entitiesInformation;
			const newSupplier = [dataRes, ...supplier];
			state.entitiesInformation.supplier = newSupplier;
		}
	}
});
