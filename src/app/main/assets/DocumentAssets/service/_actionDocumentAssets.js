import moment from 'moment';
import * as requestFrom from './_crudDocumentAssets';
import { callTypes, documentAssetsSlice } from './documentAssetsSlice';
import { notificationConfig } from '../../../../../@fuse/core/DtpConfig';

const { actions } = documentAssetsSlice;

export const fetchsDocumentAsset = (limit, page, fromDate, toDate, status) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramReq = {
		PageNum: page || 1,
		PageSize: limit || 25,
		TransType: status || 0,
		FromDate: fromDate || moment().startOf('month').format('YYYY/MM/DD'),
		ToDate: toDate || moment().endOf('month').format('YYYY/MM/DD')
	};
	return requestFrom
		.documentAssets(paramReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.fetchsDocumentAssets({ dataRes, total_count }));
			} else {
				dispatch(actions.catchError({ callType: callTypes.list }));
				notificationConfig('warning', 'Faild', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchError({ callType: callTypes.list }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};
export const fetchsDocumentAssetFilter = (limit, page, fromDate, toDate, status) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramReq = {
		PageNum: page || 1,
		PageSize: limit || 25,
		TransType: status || 0,
		FromDate: fromDate || moment().startOf('month').format('YYYY/MM/DD'),
		ToDate: toDate || moment().endOf('month').format('YYYY/MM/DD')
	};
	return requestFrom
		.documentAssets(paramReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				dispatch(actions.fetchsDocumentAssets({ dataRes, total_count }));
			} else {
				dispatch(actions.catchError({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchError({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const fetchDetailDocumentAsset = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchDocumentAssetsDetail({ data }));
};

export const updateDocumentAssetAllocation = (entitiesEdit, data, removeFile) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const formData = new FormData();
	formData.append('AssetID', entitiesEdit.assetID);
	formData.append('LineNum', entitiesEdit.lineNum);
	formData.append('Reasons', data.note);
	formData.append('Lang', 'vi');
	formData.append('TypeUpdate', 'Allocation');
	if (data.file) {
		formData.append('FileUpload', data.file);
	}
	formData.append('IsRemovedFile', removeFile);
	return requestFrom
		.updatedDocumentAssetsAllocation(formData)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.updateAllocationDocumentAssets());
				notificationConfig('success', 'Thành công', 'Cập nhật thành công.');
			} else {
				dispatch(actions.catchError({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild', data.errorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchError({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const updateDocumentAssetRevcovery = (entitiesEdit, data, removeFile) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const formData = new FormData();
	formData.append('AssetID', entitiesEdit.assetID);
	formData.append('LineNum', entitiesEdit.lineNum);
	formData.append('Reasons', data.note);
	formData.append('Lang', 'vi');
	formData.append('TypeUpdate', 'Recovery');
	if (data.file) {
		formData.append('FileUpload', data.file);
	}
	formData.append('IsRemovedFile', removeFile);
	return requestFrom
		.updatedDocumentAssetsRecovery(formData)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.updateRecoveryDocumentAssets());
				notificationConfig('success', 'Thành công', 'Cập nhật thành công.');
			} else {
				dispatch(actions.catchError({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild', data.errorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchError({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};
