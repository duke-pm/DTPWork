import * as requestFromServer from './membershipCrud';
import membershipSlice, { callTypes } from './membershipSlice';

const { actions } = membershipSlice;

export const fetchMemberships = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	return requestFromServer.fetchDataMembership(params).then().catch();
};
