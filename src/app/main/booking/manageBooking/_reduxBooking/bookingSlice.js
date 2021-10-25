import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	entities: null,
	entitiesCalendar: [],
	entitiesEdit: null,
	total_count: 0,
	listLoading: false,
	actionLoading: false,
	idResource: null
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
			const { dataRes, total_count, dataCalender } = action.payload;
			state.listLoading = false;
			state.entitiesCalendar = dataCalender;
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
			const { entities, entitiesCalendar } = state;
			const newArrayCalendar = entitiesCalendar.filter(item => item.bookID !== bookingID);
			const newArray = entities.lstBooking.filter(item => item.bookID !== bookingID);
			state.entities.lstBooking = newArray;
			state.entitiesCalendar = newArrayCalendar;
		}
	}
});
