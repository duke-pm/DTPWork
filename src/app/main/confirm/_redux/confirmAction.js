import { notificationConfig } from '@fuse/core/DtpConfig';
import * as moment from 'moment';
import * as requestFrom from './confirmCrud';
import { callTypes, confirmSlice } from './confirmSlice';

const { actions } = confirmSlice;

export const fetchDataConfirms = (status, limit, page, search, FromDate, ToDate) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		Search: search || '',
		StatusID: status || 0,
		PageSize: limit || 25,
		PageNum: page || 1,
		FromDate: FromDate ? moment(FromDate).format('YYYY/MM/DD') : null,
		ToDate: ToDate ? moment(ToDate).format('YYYY/MM/DD') : null
	};
	return requestFrom
		.listProvideRequest(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.confirmsFetch({ data }));
			}
		})
		.catch(err => {
			notificationConfig('warning', 'Thất bại', 'Đã có lỗi xảy ra  vui lòng thử lại sau');
		});
};
export const searchConfirms = (value, limit, page, search, FromDate, ToDate) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramsReq = {
		Search: search || '',
		StatusID: value,
		PageSize: limit || 25,
		PageNum: page || 1,
		FromDate: FromDate ? moment(FromDate).format('YYYY/MM/DD') : null,
		ToDate: ToDate ? moment(ToDate).format('YYYY/MM/DD') : null
	};
	return requestFrom
		.listProvideRequest(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.confirmsFetch({ data }));
			}
		})
		.catch(err => {
			notificationConfig('warning', 'Thất bại', 'Đã có lỗi xảy ra  vui lòng thử lại sau');
		});
};

export const fetchDataConfirm = data => dispatch => {
	dispatch(actions.startCall({ callTypes: callTypes.list }));
	dispatch(actions.confirmFetch({ data }));
};

// export const updateTypeConfirm = data => dispatch => {
// 	dispatch(actions.startCall({ callTypes: callTypes.action }));
// 	return requestFrom
// 		.approveToUserApi(data)
// 		.then(() => {})
// 		.catch(err => {});
// };
