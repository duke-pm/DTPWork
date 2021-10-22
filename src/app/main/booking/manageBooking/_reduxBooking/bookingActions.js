import { notificationConfig, parseIntTime } from '@fuse/core/DtpConfig';
import moment from 'moment';
import * as requestFrom from './bookingCrud';
import { callTypes, bookingSlice } from './bookingSlice';

const { actions } = bookingSlice;
export const fetchsBooking = (isMyBooking, limit, page) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramReq = {
		page: page || 1,
		limit: limit || 25,
		IsMyBooking: isMyBooking || false
	};
	return requestFrom
		.fetchsBooking(paramReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				const dataCalender = dataRes?.lstBooking.reduce(
					(arr, curr) => [
						...arr,
						{
							bookID: curr.bookID,
							id: curr.bookID,
							title: curr.purpose,
							purpose: curr.purpose,
							color: curr.color,
							ownerName: curr.ownerName,
							ownerNameAlpha: curr.ownerNameAlpha,
							statusName: curr.statusName,
							resourceName: curr.resourceName,
							resourceID: curr.resourceID,
							groupName: curr.groupName,
							startTime: curr.strStartTime,
							endTime: curr.strEndTime,
							start: `${curr.startDate.split('T')[0]}T${curr.strStartTime}`,
							end: `${curr.endDate.split('T')[0]}T${curr.strEndTime}`,
							remarks: curr.remarks,
							listUserIDJoined: curr.listUserIDJoined,
							lstUserJoined: curr.lstUserJoined,
							startDate: curr.startDate,
							endDate: curr.endDate,
							strStartTime: curr.strStartTime,
							strEndTime: curr.strEndTime,
							icon: curr.icon,
							isUpdated: curr.isUpdated,
							isOneTimeBooking: curr.isOneTimeBooking,
							strOneTimeBooking: curr.strOneTimeBooking
						}
					],
					[]
				);
				dispatch(actions.fetchsBooking({ dataRes, total_count, dataCalender }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const fetchsResourceCalendar = (resourceID, fromDate, toDate) => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.list }));
	const paramReq = {
		ResourceID: resourceID,
		FromDate: fromDate || null,
		ToDate: toDate || null
	};
	return requestFrom
		.fetchsResourceCalendar(paramReq)
		.then(res => {
			const { data } = res;
			console.log(data);
			if (!data.isError) {
				const dataRes = data.data;
				const total_count = data.totalRow;
				const dataCalender = dataRes?.lstBooking.reduce(
					(arr, curr) => [
						...arr,
						{
							bookID: curr.bookID,
							id: curr.bookID,
							title: curr.purpose,
							purpose: curr.purpose,
							color: curr.color,
							ownerName: curr.ownerName,
							ownerNameAlpha: curr.ownerNameAlpha,
							statusName: curr.statusName,
							resourceName: curr.resourceName,
							groupName: curr.groupName,
							startTime: curr.strStartTime,
							endTime: curr.strEndTime,
							start: `${curr.startDate.split('T')[0]}T${curr.strStartTime}`,
							end: `${curr.endDate.split('T')[0]}T${curr.strEndTime}`,
							remarks: curr.remarks,
							startDate: curr.startDate,
							endDate: curr.endDate,
							strStartTime: curr.strStartTime,
							strEndTime: curr.strEndTime,
							icon: curr.icon
						}
					],
					[]
				);
				dispatch(actions.fetchsBooking({ dataRes, total_count, dataCalender }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild', data.errorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.list }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};
export const fetchsBookingFilter =
	(isMyBooking, limit, page, SortColumn, SortDirection, search, fromDate, toDate, resourceID) => dispatch => {
		dispatch(actions.startCall({ callType: callTypes.action }));
		const paramReq = {
			page: page || 1,
			limit: limit || 25,
			Search: search,
			SortColumn: SortColumn || null,
			SortDirection: SortDirection || 'asc',
			IsMyBooking: isMyBooking || false,
			FromDate: fromDate || null,
			ToDate: toDate || null,
			ResourceID: resourceID || null
		};
		return requestFrom
			.fetchsBooking(paramReq)
			.then(res => {
				const { data } = res;
				if (!data.isError) {
					const dataRes = data.data;
					const total_count = data.totalRow;
					const dataCalender = dataRes?.lstBooking.reduce(
						(arr, curr) => [
							...arr,
							{
								id: curr.bookID,
								bookID: curr.bookID,
								title: curr.purpose,
								purpose: curr.purpose,
								color: curr.color,
								ownerName: curr.ownerName,
								ownerNameAlpha: curr.ownerNameAlpha,
								statusName: curr.statusName,
								resourceName: curr.resourceName,
								resourceID: curr.resourceID,
								groupName: curr.groupName,
								startTime: curr.strStartTime,
								endTime: curr.strEndTime,
								start: `${curr.startDate.split('T')[0]}T${curr.strStartTime}`,
								end: `${curr.endDate.split('T')[0]}T${curr.strEndTime}`,
								remarks: curr.remarks,
								listUserIDJoined: curr.listUserIDJoined,
								lstUserJoined: curr.lstUserJoined,
								startDate: curr.startDate,
								endDate: curr.endDate,
								strStartTime: curr.strStartTime,
								strEndTime: curr.strEndTime,
								icon: curr.icon,
								isUpdated: curr.isUpdated,
								isOneTimeBooking: curr.isOneTimeBooking,
								strOneTimeBooking: curr.strOneTimeBooking
							}
						],
						[]
					);
					dispatch(actions.fetchsBooking({ dataRes, total_count, dataCalender }));
				} else {
					dispatch(actions.catchErrors({ callType: callTypes.action }));
					notificationConfig('warning', 'Faild', data.errorMessage);
				}
			})
			.catch(err => {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Thất bại', 'Server error');
			});
	};

export const setTaskEditBooking = task => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	dispatch(actions.fetchBooking({ task }));
};

export const createBooking = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const StartTime = moment(value.timeStart).format('HH:mm');
	const EndTime = moment(value.timeEnd).format('HH:mm');
	const dataReq = {
		BookID: '0',
		ResourceID: value.resource,
		Purpose: value.purpose,
		Remarks: value.description,
		IsOneTimeBooking: value.checkBooking,
		StartDate: moment(value.startDate).format('YYYY/MM/DD'),
		EndDate: moment(value.endDate).format('YYYY/MM/DD'),
		StartTime: parseIntTime(StartTime),
		EndTime: parseIntTime(EndTime),
		ListParticipant: value.participants.length > 0 ? value.participants.toString() : null,
		Lang: 'en'
	};
	return requestFrom
		.bookingModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.modifyBooking());
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild!!!', data.systemErrorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};
export const updateBooking = value => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const StartTime = moment(value.timeStart).format('HH:mm');
	const EndTime = moment(value.timeEnd).format('HH:mm');
	const timeStartUpdate = parseIntTime(value.timeStartUpdate);
	const timeEndUpdate = parseIntTime(value.timeEndUpdate);
	const dataReq = {
		BookID: value.id,
		ResourceID: value.resource,
		Purpose: value.purpose,
		Remarks: value.description,
		IsOneTimeBooking: value.checkBooking,
		StartDate: moment(value.startDate).format('YYYY/MM/DD'),
		EndDate: moment(value.endDate).format('YYYY/MM/DD'),
		StartTime: !parseIntTime(StartTime) ? timeStartUpdate : parseIntTime(StartTime),
		EndTime: !parseIntTime(EndTime) ? timeEndUpdate : parseIntTime(EndTime),
		ListParticipant: value.participants.length > 0 ? value.participants.toString() : null,
		Lang: 'en'
	};
	return requestFrom
		.bookingModify(dataReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				const dataRes = data.data[0];
				dispatch(actions.modifyBookingEdit({ dataRes }));
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild!!!', data.systemErrorMessage);
			}
			return data;
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Thất bại', 'Server error');
		});
};

export const deleteBooking = bookingID => dispatch => {
	dispatch(actions.startCall({ callType: callTypes.action }));
	const paramReq = {
		BookID: bookingID,
		Lang: 'en'
	};
	return requestFrom
		.removeBooking(paramReq)
		.then(res => {
			const { data } = res;
			if (!data.isError) {
				dispatch(actions.removeBooking({ bookingID }));
				notificationConfig('success', 'Success!!!', 'Remove booking success.');
			} else {
				dispatch(actions.catchErrors({ callType: callTypes.action }));
				notificationConfig('warning', 'Faild!!!', data.systemErrorMessage);
			}
		})
		.catch(err => {
			dispatch(actions.catchErrors({ callType: callTypes.action }));
			notificationConfig('warning', 'Fail', `Serrver error`);
		});
};
