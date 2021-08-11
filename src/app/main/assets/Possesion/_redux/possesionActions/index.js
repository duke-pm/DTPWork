/* eslint-disable no-shadow */
import { notificationConfig } from '@fuse/core/DtpConfig';
import * as moment from 'moment';
import FileDownload from 'js-file-download';
import * as requestFrom from '../posseionCruds';
import { callTypes, possesionSlice } from '../possesionSlice';

const { actions } = possesionSlice;

// =========================== Action PossesionGobale =========================== //
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
				dispatch(actions.catchErrors({ callType: callTypes.list }));
				notificationConfig('warning', 'Thất bại', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
		});
};

export const searchPossesion = (value, search, limit, page, id, directtion) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const paramsReq = {
		Search: search,
		StatusID: value,
		PageSize: limit || 25,
		PageNum: page || 1,
		SortColumn: id || '',
		SortDirection: directtion || 'desc'
	};
	return requestFrom
		.fetchDataPossesion(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.possesionsFetch({ data }));
			} else {
				notificationConfig('error', 'Thất bại', data.errorMessage);
				dispatch(actions.catchErrors({ callType: callTypes.list }));
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('error', 'Thất bại', 'Đã xảy ra lỗi vui lòng thử lại sau');
		});
};

// =========================== PossesionAll ============================= //

// fetch
export const fetchPossesionAll = (value, limit, page, search) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
		StatusID: value,
		PageSize: limit || 25,
		PageNum: page || 1,
		Search: search || '',
		SortColumn: '',
		SortDirection: 'desc'
	};
	return requestFrom
		.fetchDataPossesion(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.possesionsFetch({ data }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.list }));
				notificationConfig('error', 'Thất bại', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('error', 'Thất bại', 'Đã có lỗi xảy ra vui lòng thử lại');
		});
};
export const fetchPossesionAllPanigate = (value, limit, page, search, id, directtion) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const paramsReq = {
		StatusID: value,
		PageSize: limit || 25,
		PageNum: page || 1,
		Search: search || '',
		SortColumn: id || '',
		SortDirection: directtion || 'desc'
	};
	return requestFrom
		.fetchDataPossesion(paramsReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.possesionsFetch({ data }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.list }));
				notificationConfig('error', 'Thất bại', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('error', 'Thất bại', 'Đã có lỗi xảy ra vui lòng thử lại');
		});
};
export const setTaskEditPossesionAll = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	dispatch(actions.possesionFetch({ data }));
};

export const createdPossesionAll = (data, prefix, rowPage) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
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
		AssetGroupDetailID: data.asset,
		Inactive: false
	};
	return requestFrom
		.createdDataPossesion(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataReq = data.data;
				dispatch(actions.possesionCreated({ dataReq, rowPage }));
			}
			return data;
		})
		.catch(() => {
			notificationConfig('error', 'Thất bại', 'Đã có lỗi xảy ra');
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};

export const updatedPossesionAll = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
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
		Descr: data.descr,
		Inactive: data.inactive
	};
	return requestFrom
		.updateDataPossesion(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataReq = data.data[0];
				dispatch(actions.possesionUpdate({ dataReq }));
			} else {
				// notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', data.errorMessage);
			}
			return data;
		})
		.catch(() => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
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
	formData.append('FileUpload', data.file || '');
	formData.append('TypeUpdate', 'Allocation');
	formData.append('TransDate', moment(data.date).format('YYYY-MM-DD'));
	return requestFrom
		.updateTypeAsset(formData)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.possesionUpdatedUnUsed({ id }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
			}
			return data;
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};

// =========================== Possesion Used ============================= //
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
	formData.append('FileUpload', data.file || '');
	formData.append('TypeUpdate', 'Recovery');
	return requestFrom
		.updateTypeAsset(formData)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const id = entitiesEdit.assetID;
				dispatch(actions.updatePossesionWithDraw({ id }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
			}
			return data;
		})
		.catch(error => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};

// =========================== Possesion Repair ============================= //

export const repairPossesion = (data, entitiesEdit, typeFormService) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const formData = new FormData();
	formData.append('AssetID', entitiesEdit.assetID);
	formData.append('EmpCode', entitiesEdit.empCode);
	formData.append('DeptCode', entitiesEdit.deptCodeManager);
	formData.append('RegionCode', entitiesEdit.regionCode);
	formData.append('JobTitle', entitiesEdit.jobTitle);
	formData.append('Reasons', data.note);
	formData.append('TransDate', moment(data.date).format('YYYY-MM-DD'));
	formData.append('SupplierRepair', data.nameService);
	formData.append('TypeUpdate', 'Repair');
	formData.append('ExpCost', data.price);
	return requestFrom
		.updateTypeAsset(formData)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const id = entitiesEdit.assetID;
				dispatch(actions.repairAssets({ id, typeFormService }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', data.errorMessage);
			}
			return data;
		})
		.catch(() => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};
export const liquidationAsset = (data, entitiesEdit, typeliquiAsset) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const formData = new FormData();
	formData.append('AssetID', entitiesEdit.assetID);
	formData.append('EmpCode', entitiesEdit.empCode);
	formData.append('DeptCode', entitiesEdit.deptCodeManager);
	formData.append('RegionCode', entitiesEdit.regionCode);
	formData.append('JobTitle', entitiesEdit.jobTitle);
	formData.append('Reasons', data.note);
	formData.append('TransDate', moment(data.date).format('YYYY-MM-DD'));
	formData.append('TypeUpdate', 'Liquidate');
	return requestFrom
		.updateTypeAsset(formData)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const id = entitiesEdit.assetID;
				dispatch(actions.liquiAssets({ id, typeliquiAsset }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('error', 'Đã có lỗi xảy ra vui lòng thử lại', data.errorMessage);
			}
			return data;
		})
		.catch(() => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};
export const assetReuse = (data, entitiesEdit) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const formData = new FormData();
	formData.append('AssetID', entitiesEdit.assetID);
	formData.append('EmpCode', entitiesEdit.empCode);
	formData.append('DeptCode', entitiesEdit.deptCodeManager);
	formData.append('RegionCode', entitiesEdit.regionCode);
	formData.append('JobTitle', entitiesEdit.jobTitle);
	formData.append('Reasons', data.note);
	formData.append('TransDate', moment(data.date).format('YYYY-MM-DD'));
	formData.append('EndRepairDate', moment(data.dateEnd).format('YYYY-MM-DD'));
	formData.append('SupplierRepair', data.nameService);
	formData.append('TypeUpdate', 'Reuse');
	formData.append('ActCost', data.price);
	return requestFrom
		.updateTypeAsset(formData)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const id = entitiesEdit.assetID;
				dispatch(actions.resuseAssets({ id }));
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
export const getAssetHistory = id => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const paramsReq = {
		ID: id
	};
	return requestFrom
		.getAssetHistory(paramsReq)
		.then(res => {
			const { data } = res;
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
		});
};

export const addNewsSupplier = values => dispatch => {
	dispatch(actions.catchErrors({ callType: callTypes.action }));
	const dataReq = {
		SupplierID: 0,
		SupplierName: values.nameSupplier,
		Address: values.address,
		Email: values.email,
		Phone: values.phone,
		CnctName: values.contact,
		CnctPhone: values.phoneContact,
		Inactive: values.inactive
	};
	return requestFrom
		.addNewsSupplier(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				console.log(dataRes);
				dispatch(actions.addNewsSupplierSlice({ dataRes }));
			} else {
				notificationConfig('warning', 'Thất bại', data.errorMessage);
			}
			return data;
		})
		.catch(err => {
			notificationConfig('warning', 'Thất bại', 'Đã có lỗi xảy ra ');
		});
};

export const exportToExcel = () => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	const paramsReq = {
		CountryID: 1,
		RegionID: 123,
		StatusID: 'abc'
	};
	return requestFrom
		.exportExcel(paramsReq)
		.then(response => {
			FileDownload(response.data, 'report.csv');
		})
		.catch(err => console.log(err));
};
