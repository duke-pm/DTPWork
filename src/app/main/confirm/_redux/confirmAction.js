import * as requestFrom from './confirmCrud';
import { callTypes, confirmSlice } from './confirmSlice';

const { actions } = confirmSlice;

export const fetchDataConfirm = params => dispatch => {
	dispatch(actions.startCall({ callTypes: callTypes.list }));
	return requestFrom
		.fetchDataConfirmApi(params)
		.then(() => {})
		.catch(err => {});
};
export const updateTypeConfirm = data => dispatch => {
	dispatch(actions.startCall({ callTypes: callTypes.action }));
	return requestFrom
		.approveToUserApi(data)
		.then(() => {})
		.catch(err => {});
};
