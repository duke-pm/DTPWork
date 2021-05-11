/* eslint-disable no-shadow */
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
		FromDate: FromDate ? moment(FromDate).format('YYYY/MM/DD') : moment().startOf('month').format('YYYY/MM/DD'),
		ToDate: ToDate ? moment(ToDate).format('YYYY/MM/DD') : moment().endOf('month').format('YYYY/MM/DD')
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
			dispatch(actions.catchError({ callType: callTypes.list }));
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
			dispatch(actions.catchError({ callType: callTypes.list }));
			notificationConfig('warning', 'Thất bại', 'Đã có lỗi xảy ra  vui lòng thử lại sau');
		});
};

export const fetchDataConfirm = data => dispatch => {
	dispatch(actions.startCall({ callTypes: callTypes.list }));
	dispatch(actions.confirmFetch({ data }));
};

export const getInformationCompany = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const paramsReq = {
		ListType: params
	};
	return requestFrom
		.getInformationCompany(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.informationsFetch({ data }));
			} else {
				notificationConfig('warning', 'Thất bại', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchError({ callType: callTypes.list }));
		});
};

export const requestAssetFromUserAction = (data, assets) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const dataReq = {
		EmpCode: data.name,
		DeptCode: data.department,
		RegionCode: data.region,
		JobTitle: data.jobTitle,
		RequestDate: moment(data.dateRequest).format('YYYY-MM-DD'),
		Location: data.locationUse,
		Reason: data.reason,
		DocType: data.assetsCategory,
		IsBudget: data.plan,
		SupplierName: data.supplier,
		Lang: 'vi',
		ListAssets: assets
	};
	return requestFrom
		.requestFromUser(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.requestFromUser());
			} else {
				notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', data.errorMessage);
				dispatch(actions.catchErrors({ callType: callTypes.action }));
			}
			return data;
		})
		.catch(() => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};
// export const updateTypeConfirm = data => dispatch => {
// 	dispatch(actions.startCall({ callTypes: callTypes.action }));
// 	return requestFrom
// 		.approveToUserApi(data)
// 		.then(() => {})
// 		.catch(err => {});
// };
