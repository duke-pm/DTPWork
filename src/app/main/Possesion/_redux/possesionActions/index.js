/* eslint-disable no-shadow */
import { notificationConfig } from '@fuse/core/DtpConfig';
import { notification } from 'antd';
import * as moment from 'moment';
import * as requestFrom from '../posseionCruds';
import { callTypes, possesionSlice } from '../possesionSlice';

const { actions } = possesionSlice;

// =========================== Action PossesionGobale =========================== //
export const reportFailurePossesion = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	return requestFrom
		.updateDataPossesion(data)
		.then(() => {})
		.catch(() => {});
};
export const getInformationCompany = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const paramsReq = {
		ListType: params
	};
	return requestFrom
		.getInformationCompany(paramsReq)
		.then(res => {
			console.log(res);
			const { data } = res;
			console.log(data);
			if (!data.isError) {
				dispatch(actions.informationsFetch({ data }));
			} else {
				notification.success({
					message: 'Đã có lỗi xảy ra vui lòng thử lại',
					description: `${data.errorMessage}`,
					onClick: () => {
						console.log('Notification Clicked!');
					}
				});
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
		});
};
export const reportLosePossesion = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	return requestFrom
		.updateDataPossesion(data)
		.then(() => {})
		.catch(() => {});
};
export const cyclePossesion = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	return requestFrom
		.updateDataPossesion(data)
		.then(() => {})
		.catch(() => {});
};

export const searchPossesion = (value, search, limit, page) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const paramsReq = {
		Search: search,
		StatusID: value,
		PageSize: limit || 25,
		PageNum: page || 1
	};
	return requestFrom
		.fetchDataPossesion(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.possesionsFetch({ data }));
			} else {
				notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', err);
		});
};

// export const fetchPersonal = ()=>{}

// =========================== PossesionAll ============================= //

// fetch
export const fetchPossesionAll = (value, limit, page, search) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		StatusID: value,
		PageSize: limit || 25,
		PageNum: page || 1,
		Search: search || ''
	};
	return requestFrom
		.fetchDataPossesion(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.possesionsFetch({ data }));
			} else {
				notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', err);
		});
};
export const setTaskEditPossesionAll = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	dispatch(actions.possesionFetch({ data }));
};

export const createdPossesionAll = (data, prefix, rowPage) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	// dispatch(actions.possesionCreated({ data }));
	const dataReq = {
		Qty: data.qty,
		Lang: 'vi',
		AssetName: data.assetName,
		Suppiler: data.suppiler,
		WarrantyPeriod: data.warrantyPeriod,
		EffectiveDate: data.effectiveDate && moment(data.effectiveDate).format('YYYY-MM-DD'),
		PurchaseDate: moment(data.purchaseDate).format('YYYY-MM-DD'),
		DepreciationPeriod: data.depreciationPeriod,
		OriginalPrice: data.originalPrice,
		DeptCode: data.deptCodeManager,
		Descr: data.descr,
		CmpnID: data.company,
		AssetTypeID: data.category,
		AssetGroupID: data.group,
		PreAssetCode: prefix,
		AssetGroupDetailID: data.asset
	};
	return requestFrom
		.createdDataPossesion(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataReq = data.data;
				dispatch(actions.possesionCreated({ dataReq, rowPage }));
			} else {
				notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', data.errorMessage);
			}
			return data;
		})
		.catch(() => {});
};

export const updatedPossesionAll = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	// dispatch(actions.possesionCreated({ data }));
	const dataReq = {
		Lang: 'vi',
		AssetID: data.assetID,
		AssetName: data.assetName,
		Suppiler: data.suppiler,
		WarrantyPeriod: data.warrantyPeriod,
		EffectiveDate: data.effectiveDate && moment(data.effectiveDate).format('YYYY-MM-DD'),
		PurchaseDate: moment(data.purchaseDate).format('YYYY-MM-DD'),
		DepreciationPeriod: data.depreciationPeriod,
		OriginalPrice: data.originalPrice,
		DeptCode: data.deptCodeManager,
		Descr: data.descr
	};
	return requestFrom
		.updateDataPossesion(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataReq = data.data[0];
				dispatch(actions.possesionUpdate({ dataReq }));
			} else {
				notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', data.errorMessage);
			}
			return data;
		})
		.catch(() => {});
};

// =========================== PossionUnUsed ============================= //

export const addPersonalPossesion = (data, id) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const formData = new FormData();
	formData.append('AssetID', id);
	formData.append('EmpCode', data.customer);
	formData.append('DeptCode', data.department);
	formData.append('RegionCode', data.location);
	formData.append('Reasons', data.note);
	formData.append('JobTitle', data.position);
	formData.append('FileUpload', data.file);
	formData.append('TypeUpdate', 'Allocation');
	formData.append('TransDate', moment(data.date).format('YYYY-MM-DD'));
	return requestFrom
		.updateTypeAsset(formData)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.possesionUpdatedUnUsed({ id }));
			} else {
				notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', data.errorMessage);
			}
			return data;
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			// notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', error);
		});
};

// =========================== Possesion Used ============================= //
export const fetchPossesionUsed = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		StatusID: value
	};
	return requestFrom
		.fetchDataPossesion(paramsReq)
		.then(() => {})
		.catch(() => {});
};
export const withdrawPossesion = (data, entitiesEdit) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const formData = new FormData();
	formData.append('AssetID', entitiesEdit.assetID);
	formData.append('EmpCode', entitiesEdit.empCode);
	formData.append('DeptCode', entitiesEdit.deptCodeManager);
	formData.append('RegionCode', entitiesEdit.regionCode);
	formData.append('JobTitle', entitiesEdit.jobTitle);
	formData.append('Reasons', data.note);
	formData.append('TransDate', moment(data.date).format('YYYY-MM-DD'));
	formData.append('FileUpload', data.file || data.file);
	formData.append('TypeUpdate', 'Recovery');
	return requestFrom
		.updateTypeAsset(formData)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const id = entitiesEdit.assetID;
				dispatch(actions.updatePossesionWithDraw({ id }));
			} else {
				notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', data.errorMessage);
			}
			return data;
		})
		.catch(error => {
			notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', error);
		});
};
// =========================== Possesion Repair ============================= //

export const fetchPossesionRepair = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	return requestFrom
		.fetchDataPossesion(params)
		.then(() => {})
		.catch(() => {});
};
export const repairPossesion = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	return requestFrom
		.updateDataPossesion(data)
		.then(() => {})
		.catch(() => {});
};
// =========================== Possesion Occupt ============================= //
export const fetchPossesionOccupt = params => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	return requestFrom
		.fetchDataPossesion(params)
		.then(() => {})
		.catch(() => {});
};
export const acceptPossesion = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	return requestFrom
		.updateDataPossesion(data)
		.then(() => {})
		.catch(() => {});
};
