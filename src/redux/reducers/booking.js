import * as types from "../actions/types";

export const initialState = {
  submittingAll: false,
  submittingCreateBooking: false,
  submittingUpdateBooking: false,
  submittingRemoveBooking: false,
  submittingGroupResrc: false,
  submittingCreateGroupResrc: false,
  submittingUpdateGroupResrc: false,
  submittingRemoveGroupResrc: false,
  submittingResrc: false,
  submittingCreateResrc: false,
  submittingUpdateResrc: false,
  submittingRemoveResrc: false,

  successAll: false,
  errorAll: false,
  errorHelperAll: "",

  successCreateBooking: false,
  errorCreateBooking: false,
  errorHelperCreateBooking: "",

  successUpdateBooking: false,
  errorUpdateBooking: false,
  errorHelperUpdateBooking: "",

  successRemoveBooking: false,
  errorRemoveBooking: false,
  errorHelperRemoveBooking: "",

  successGroupResrc: false,
  errorGroupResrc: false,
  errorHelperGroupResrc: "",

  successCreateGroupResrc: false,
  errorCreateGroupResrc: false,
  errorHelperCreateGroupResrc: "",

  successUpdateGroupResrc: false,
  errorUpdateGroupResrc: false,
  errorHelperUpdateGroupResrc: "",

  successRemoveGroupResrc: false,
  errorRemoveGroupResrc: false,
  errorHelperRemoveGroupResrc: "",

  successResrc: false,
  errorResrc: false,
  errorHelperResrc: "",

  successCreateResrc: false,
  errorCreateResrc: false,
  errorHelperCreateResrc: "",

  successUpdateResrc: false,
  errorUpdateResrc: false,
  errorHelperUpdateResrc: "",

  successRemoveResrc: false,
  errorRemoveResrc: false,
  errorHelperRemoveResrc: "",

  headerBooking: {
    countBooking: 0,
    countHappened: 0,
    countHappening: 0,
    countMyBooking: 0,
    countPending: 0,
  },

  allBookings: [],
  numAllBookings: 0,

  groupResrc: [],
  numGroupResrc: 0,

  resrc: [],
  numResrc: 0,
};

export default function (state = initialState, action = {}) {
  const {type, payload} = action;

  switch (type) {
    case types.RESET_BOOKING:
      return {
        ...state,
        submittingAll: false,
        successAll: false,
        errorAll: false,
        errorHelperAll: "",

        submittingCreateBooking: false,
        successCreateBooking: false,
        errorCreateBooking: false,
        errorHelperCreateBooking: "",

        submittingUpdateBooking: false,
        successUpdateBooking: false,
        errorUpdateBooking: false,
        errorHelperUpdateBooking: "",

        submittingRemoveBooking: false,
        successRemoveBooking: false,
        errorRemoveBooking: false,
        errorHelperRemoveBooking: "",
      };

    case types.RESET_RESOURCE:
      return {
        ...state,
        submittingGroupResrc: false,
        successGroupResrc: false,
        errorGroupResrc: false,
        errorHelperGroupResrc: "",

        submittingCreateGroupResrc: false,
        successCreateGroupResrc: false,
        errorCreateGroupResrc: false,
        errorHelperCreateGroupResrc: "",

        submittingUpdateGroupResrc: false,
        successUpdateGroupResrc: false,
        errorUpdateGroupResrc: false,
        errorHelperUpdateGroupResrc: "",

        submittingRemoveGroupResrc: false,
        successRemoveGroupResrc: false,
        errorRemoveGroupResrc: false,
        errorHelperRemoveGroupResrc: "",

        submittingResrc: false,
        successResrc: false,
        errorResrc: false,
        errorHelperResrc: "",

        submittingCreateResrc: false,
        successCreateResrc: false,
        errorCreateResrc: false,
        errorHelperCreateResrc: "",

        submittingUpdateResrc: false,
        successUpdateResrc: false,
        errorUpdateResrc: false,
        errorHelperUpdateResrc: "",

        submittingRemoveResrc: false,
        successRemoveResrc: false,
        errorRemoveResrc: false,
        errorHelperRemoveResrc: "",
      };
    
    /** Bookings - list */
    case types.START_ALL_BOOKING:
      return {
        ...state,
        submittingAll: true,
        successAll: false,
        errorAll: false,
        errorHelperAll: "",
      };

    case types.ERROR_ALL_BOOKING:
      return {
        ...state,
        submittingAll: false,
        successAll: false,
        errorAll: true,
        errorHelperAll: payload,
      };

    case types.SUCCESS_ALL_BOOKING:
      return {
        ...state,
        submittingAll: false,
        successAll: true,
        errorAll: false,
        errorHelperAll: "",

        headerBooking: payload.header || state.headerBooking,

        allBookings: payload.data,
        numAllBookings: payload.count,
      };

    case types.START_CREATE_BOOKING:
      return {
        ...state,
        submittingCreateBooking: true,
        successCreateBooking: false,
        errorCreateBooking: false,
        errorHelperCreateBooking: "",
      };

    case types.ERROR_CREATE_BOOKING:
      return {
        ...state,
        submittingCreateBooking: false,
        successCreateBooking: false,
        errorCreateBooking: true,
        errorHelperCreateBooking: payload,
      };

    case types.SUCCESS_CREATE_BOOKING:
      return {
        ...state,
        submittingCreateBooking: false,
        successCreateBooking: true,
        errorCreateBooking: false,
        errorHelperCreateBooking: "",
      };

    case types.START_UPDATE_BOOKING:
      return {
        ...state,
        submittingUpdateBooking: true,
        successUpdateBooking: false,
        errorUpdateBooking: false,
        errorHelperUpdateBooking: "",
      };

    case types.ERROR_UPDATE_BOOKING:
      return {
        ...state,
        submittingUpdateBooking: false,
        successUpdateBooking: false,
        errorUpdateBooking: true,
        errorHelperUpdateBooking: payload,
      };

    case types.SUCCESS_UPDATE_BOOKING:
      let tmpBooking = state.allBookings;
      let fIdxBooking = tmpBooking.findIndex(f => f.bookID === payload[0].bookID);
      if (fIdxBooking !== -1) {
        tmpBooking[fIdxBooking] = payload[0];
      } else {
        tmpBooking.push(payload[0]);
      }

      return {
        ...state,
        submittingUpdateBooking: false,
        successUpdateBooking: true,
        errorUpdateBooking: false,
        errorHelperUpdateBooking: "",

        allBookings: tmpBooking,
      };

    case types.START_REMOVE_BOOKING:
      return {
        ...state,
        submittingRemoveBooking: true,
        successRemoveBooking: false,
        errorRemoveBooking: false,
        errorHelperRemoveBooking: "",
      };

    case types.ERROR_REMOVE_BOOKING:
      return {
        ...state,
        submittingRemoveBooking: false,
        successRemoveBooking: false,
        errorRemoveBooking: true,
        errorHelperRemoveBooking: payload,
      };

    case types.SUCCESS_REMOVE_BOOKING:
      return {
        ...state,
        submittingRemoveBooking: false,
        successRemoveBooking: true,
        errorRemoveBooking: false,
        errorHelperRemoveBooking: "",
      };
    /** Bookings - Group Resource */
    case types.START_GROUP_RESOURCE:
      return {
        ...state,
        submittingGroupResrc: true,
        successGroupResrc: false,
        errorGroupResrc: false,
        errorHelperGroupResrc: "",
      };

    case types.ERROR_GROUP_RESOURCE:
      return {
        ...state,
        submittingGroupResrc: false,
        successGroupResrc: false,
        errorGroupResrc: true,
        errorHelperGroupResrc: payload,
      };

    case types.SUCCESS_GROUP_RESOURCE:
      return {
        ...state,
        submittingGroupResrc: false,
        successGroupResrc: true,
        errorGroupResrc: false,
        errorHelperGroupResrc: "",

        groupResrc: payload.data,
        numGroupResrc: payload.count,
      };

    case types.START_CREATE_GROUP_RESOURCE:
      return {
        ...state,
        submittingCreateGroupResrc: true,
        successCreateGroupResrc: false,
        errorCreateGroupResrc: false,
        errorHelperCreateGroupResrc: "",
      };

    case types.ERROR_CREATE_GROUP_RESOURCE:
      return {
        ...state,
        submittingCreateGroupResrc: false,
        successCreateGroupResrc: false,
        errorCreateGroupResrc: true,
        errorHelperCreateGroupResrc: payload,
      };

    case types.SUCCESS_CREATE_GROUP_RESOURCE:
      return {
        ...state,
        submittingCreateGroupResrc: false,
        successCreateGroupResrc: true,
        errorCreateGroupResrc: false,
        errorHelperCreateGroupResrc: "",
      };

    case types.START_UPDATE_GROUP_RESOURCE:
      return {
        ...state,
        submittingUpdateGroupResrc: true,
        successUpdateGroupResrc: false,
        errorUpdateGroupResrc: false,
        errorHelperUpdateGroupResrc: "",
      };

    case types.ERROR_UPDATE_GROUP_RESOURCE:
      return {
        ...state,
        submittingUpdateGroupResrc: false,
        successUpdateGroupResrc: false,
        errorUpdateGroupResrc: true,
        errorHelperUpdateGroupResrc: payload,
      };

    case types.SUCCESS_UPDATE_GROUP_RESOURCE:
      let tmpgroupResrc = state.groupResrc;
      let fIdxGroupResrc = tmpgroupResrc.findIndex(f => f.groupID === payload[0].groupID);
      if (fIdxGroupResrc !== -1) {
        tmpgroupResrc[fIdxGroupResrc] = payload[0];
      } else {
        tmpgroupResrc.push(payload[0]);
      }

      return {
        ...state,
        submittingUpdateGroupResrc: false,
        successUpdateGroupResrc: true,
        errorUpdateGroupResrc: false,
        errorHelperUpdateGroupResrc: "",

        groupResrc: tmpgroupResrc,
      };

    case types.START_REMOVE_GROUP_RESOURCE:
      return {
        ...state,
        submittingRemoveGroupResrc: true,
        successRemoveGroupResrc: false,
        errorRemoveGroupResrc: false,
        errorHelperRemoveGroupResrc: "",
      };

    case types.ERROR_REMOVE_GROUP_RESOURCE:
      return {
        ...state,
        submittingRemoveGroupResrc: false,
        successRemoveGroupResrc: false,
        errorRemoveGroupResrc: true,
        errorHelperRemoveGroupResrc: payload,
      };

    case types.SUCCESS_REMOVE_GROUP_RESOURCE:
      let tmpGR = state.groupResrc,
        tmpNumGR = state.numGroupResrc;
      let fGR = tmpGR.findIndex(f => f.groupID === payload.groupID);
      if (fGR !== -1) {
        tmpGR.splice(fGR, 1);
        tmpNumGR -= 1;
      }

      return {
        ...state,
        submittingRemoveGroupResrc: false,
        successRemoveGroupResrc: true,
        errorRemoveGroupResrc: false,
        errorHelperRemoveGroupResrc: "",

        groupResrc: tmpGR,
        numGroupResrc: tmpNumGR,
      };
 
    /** Bookings - Resource */
    case types.START_RESOURCE:
      return {
        ...state,
        submittingResrc: true,
        successResrc: false,
        errorResrc: false,
        errorHelperResrc: "",
      };

    case types.ERROR_RESOURCE:
      return {
        ...state,
        submittingResrc: false,
        successResrc: false,
        errorResrc: true,
        errorHelperResrc: payload,
      };

    case types.SUCCESS_RESOURCE:
      return {
        ...state,
        submittingResrc: false,
        successResrc: true,
        errorResrc: false,
        errorHelperResrc: "",

        resrc: payload.data,
        numResrc: payload.count,
      };

    case types.START_CREATE_RESOURCE:
      return {
        ...state,
        submittingCreateResrc: true,
        successCreateResrc: false,
        errorCreateResrc: false,
        errorHelperCreateResrc: "",
      };

    case types.ERROR_CREATE_RESOURCE:
      return {
        ...state,
        submittingCreateResrc: false,
        successCreateResrc: false,
        errorCreateResrc: true,
        errorHelperCreateResrc: payload,
      };

    case types.SUCCESS_CREATE_RESOURCE:
      return {
        ...state,
        submittingCreateResrc: false,
        successCreateResrc: true,
        errorCreateResrc: false,
        errorHelperCreateResrc: "",
      };

    case types.START_UPDATE_RESOURCE:
      return {
        ...state,
        submittingUpdateResrc: true,
        successUpdateResrc: false,
        errorUpdateResrc: false,
        errorHelperUpdateResrc: "",
      };

    case types.ERROR_UPDATE_RESOURCE:
      return {
        ...state,
        submittingUpdateResrc: false,
        successUpdateResrc: false,
        errorUpdateResrc: true,
        errorHelperUpdateResrc: payload,
      };

    case types.SUCCESS_UPDATE_RESOURCE:
      let tmpResrc = state.resrc;
      let fIdxResrc = tmpResrc.findIndex(f => f.resourceID === payload[0].resourceID);
      if (fIdxResrc !== -1) {
        tmpResrc[fIdxResrc] = payload[0];
      } else {
        tmpResrc.push(payload[0]);
      }

      return {
        ...state,
        submittingUpdateResrc: false,
        successUpdateResrc: true,
        errorUpdateResrc: false,
        errorHelperUpdateResrc: "",

        resrc: tmpResrc,
      };

    case types.START_REMOVE_RESOURCE:
      return {
        ...state,
        submittingRemoveResrc: true,
        successRemoveResrc: false,
        errorRemoveResrc: false,
        errorHelperRemoveResrc: "",
      };

    case types.ERROR_REMOVE_RESOURCE:
      return {
        ...state,
        submittingRemoveResrc: false,
        successRemoveResrc: false,
        errorRemoveResrc: true,
        errorHelperRemoveResrc: payload,
      };

    case types.SUCCESS_REMOVE_RESOURCE:
      let tmpR = state.resrc,
        tmpNumR = state.numResrc;
      let fR = tmpR.findIndex(f => f.resourceID === payload.resourceID);
      if (fR !== -1) {
        tmpR.splice(fR, 1);
        tmpNumR -= 1;
      }

      return {
        ...state,
        submittingRemoveResrc: false,
        successRemoveResrc: true,
        errorRemoveResrc: false,
        errorHelperRemoveResrc: "",

        groupResrc: tmpR,
        numGroupResrc: tmpNumR,
      };

    default:
      return state;
  };
};
