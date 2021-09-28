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

export const bookingSlice = createSlice({
	name: 'booking',
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
		fetchsBooking: (state, action) => {
			const { dataRes, total_count } = action.payload;
			state.listLoading = false;
			state.actionLoading = false;
			state.entities = dataRes;
			state.total_count = total_count;
		},
		modifyBooking: (state, action) => {
			state.actionLoading = false;
		},
		modifyBookingEdit: (state, action) => {
			const { dataRes } = action.payload;
			state.entitiesEdit = dataRes;
			state.actionLoading = false;
		},
		fetchBooking: (state, action) => {
			const { task } = action.payload;
			state.actionLoading = false;
			state.entitiesEdit = task;
		},
		removeBooking: (state, action) => {
			const { bookingID } = action.payload;
			state.actionLoading = false;
			const { entities } = state;
			const newArray = entities.lstBooking.filter(item => item.bookID !== bookingID);
			state.entities.lstBooking = newArray;
		}
	}
});
