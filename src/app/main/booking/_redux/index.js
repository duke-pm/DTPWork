import { combineReducers } from 'redux';
import { bookingSlice } from '../manageBooking/_reduxBooking/bookingSlice';
import { resourceBookingGroupSlice } from '../resourceGroup/_reduxResourceBookingGroup/resourceBookingGroupSlice';
import { resourceBookingSlice } from '../ressource/_reduxResourceBooking/resourceBookingSlice';

const bookingReducer = combineReducers({
	resourceGroup: resourceBookingGroupSlice.reducer,
	resource: resourceBookingSlice.reducer,
	booking: bookingSlice.reducer
});
export default bookingReducer;
