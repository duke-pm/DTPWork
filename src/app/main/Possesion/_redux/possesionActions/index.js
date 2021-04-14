import { notification } from 'antd';
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
			notification.success({
				message: 'Đã có lỗi xảy ra vui lòng thử lại',
				description: `${err}`,
				onClick: () => {
					console.log('Notification Clicked!');
				}
			});
		});
};

// export const fetchPersonal = ()=>{}

// =========================== PossesionAll ============================= //

// fetch
export const fetchPossesionAll = (value, limit, page) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramsReq = {
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
			notification.success({
				message: 'Đã có lỗi xảy ra vui lòng thử lại',
				description: `${err}`,
				onClick: () => {
					console.log('Notification Clicked!');
				}
			});
		});
};
export const createdPossesionAll = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	return requestFrom
		.createdDataPossesion()
		.then(() => {})
		.catch(() => {});
};

// =========================== PossionUnUsed ============================= //

export const addPersonalPossesion = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	return requestFrom
		.updateDataPossesion(data)
		.then(() => {})
		.catch(() => {});
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
export const withdrawPossesion = data => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.actions }));
	return requestFrom
		.updateDataPossesion(data)
		.then(() => {})
		.catch(() => {});
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
