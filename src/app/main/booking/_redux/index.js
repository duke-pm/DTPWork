import { combineReducers } from 'redux';
import { resourceBookingGroupSlice } from '../resourceGroup/_reduxResourceBookingGroup/resourceBookingGroupSlice';
import { resourceBookingSlice } from '../ressource/_reduxResourceBooking/resourceBookingSlice';

const bookingReducer = combineReducers({
	resourceGroup: resourceBookingGroupSlice.reducer,
	resource: resourceBookingSlice.reducer
});
export default bookingReducer;
