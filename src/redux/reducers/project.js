import moment from "moment";
import {expiredDate} from "utils/Utils";
import * as types from "../actions/types";

export const initialState = {
  submittingListProject: false,
  submittingCreateProject: false,
  submittingUpdateProject: false,
  submittingRemoveProject: false,
  submittingListTask: false,
  submittingListTaskAll: false,
  submittingCreateTask: false,
  submittingUpdateTask: false,
  submittingUpdateGanttTask: false,
  submittingRemoveTask: false,

  successListProject: false,
  errorListProject: false,
  errorHelperListProject: "",

  successCreateProject: false,
  errorCreateProject: false,
  errorHelperCreateProject: "",

  successUpdateProject: false,
  errorUpdateProject: false,
  errorHelperUpdateProject: "",

  successRemoveProject: false,
  errorRemoveProject: false,
  errorHelperRemoveProject: "",

  successListTask: false,
  errorListTask: false,
  errorHelperListTask: "",

  successListTaskAll: false,
  errorListTaskAll: false,
  errorHelperListTaskAll: "",

  successCreateTask: false,
  errorCreateTask: false,
  errorHelperCreateTask: "",

  successUpdateTask: false,
  errorUpdateTask: false,
  errorHelperUpdateTask: "",

  successUpdateGanttTask: false,
  errorUpdateGanttTask: false,
  errorHelperUpdateGanttTask: "",

  successRemoveTask: false,
  errorRemoveTask: false,
  errorHelperRemoveTask: "",

  projects: [],
  numProjects: [],

  tasks: [],
  ganttTasks: [],
  numTasks: [],
};

export default function (state = initialState, action = {}) {
  const {type, payload} = action;

  switch (type) {
    case types.RESET_PROJECT:
      return {
        ...state,
        submittingListProject: false,
        successListProject: false,
        errorListProject: false,
        errorHelperListProject: "",

        submittingCreateProject: false,
        successCreateProject: false,
        errorCreateProject: false,
        errorHelperCreateProject: "",

        submittingUpdateProject: false,
        successUpdateProject: false,
        errorUpdateProject: false,
        errorHelperUpdateProject: "",

        submittingRemoveProject: false,
        successRemoveProject: false,
        errorRemoveProject: false,
        errorHelperRemoveProject: "",
      };
    
    case types.RESET_TASK:
    return {
      ...state,
      submittingListTask: false,
      successListTask: false,
      errorListTask: false,
      errorHelperListTask: "",

      submittingListTaskAll: false,
      successListTaskAll: false,
      errorListTaskAll: false,
      errorHelperListTaskAll: "",

      submittingCreateTask: false,
      successCreateTask: false,
      errorCreateTask: false,
      errorHelperCreateTask: "",

      submittingUpdateTask: false,
      successUpdateTask: false,
      errorUpdateTask: false,
      errorHelperUpdateTask: "",

      submittingUpdateGanttTask: false,
      successUpdateGanttTask: false,
      errorUpdateGanttTask: false,
      errorHelperUpdateGanttTask: "",

      submittingRemoveTask: false,
      successRemoveTask: false,
      errorRemoveTask: false,
      errorHelperRemoveTask: "",
    };

    /** Projects - List */
    case types.START_LIST_PROJECT:
      return {
        ...state,
        submittingListProject: true,
        successListProject: false,
        errorListProject: false,
        errorHelperListProject: "",
      };

    case types.ERROR_LIST_PROJECT:
      return {
        ...state,
        submittingListProject: false,
        successListProject: false,
        errorListProject: true,
        errorHelperListProject: payload,
      };

    case types.SUCCESS_LIST_PROJECT:
      return {
        ...state,
        submittingListProject: false,
        successListProject: true,
        errorListProject: false,
        errorHelperListProject: "",

        projects: payload.data,
        numProjects: payload.count,
      };

    case types.START_CREATE_PROJECT:
      return {
        ...state,
        submittingCreateProject: true,
        successCreateProject: false,
        errorCreateProject: false,
        errorHelperCreateProject: "",
      };

    case types.ERROR_CREATE_PROJECT:
      return {
        ...state,
        submittingCreateProject: false,
        successCreateProject: false,
        errorCreateProject: true,
        errorHelperCreateProject: payload,
      };

    case types.SUCCESS_CREATE_PROJECT:
      return {
        ...state,
        submittingCreateProject: false,
        successCreateProject: true,
        errorCreateProject: false,
        errorHelperCreateProject: "",
      };

    case types.START_UPDATE_PROJECT:
      return {
        ...state,
        submittingUpdateProject: true,
        successUpdateProject: false,
        errorUpdateProject: false,
        errorHelperUpdateProject: "",
      };

    case types.ERROR_UPDATE_PROJECT:
      return {
        ...state,
        submittingUpdateProject: false,
        successUpdateProject: false,
        errorUpdateProject: true,
        errorHelperUpdateProject: payload,
      };

    case types.SUCCESS_UPDATE_PROJECT:
      return {
        ...state,
        submittingUpdateProject: false,
        successUpdateProject: true,
        errorUpdateProject: false,
        errorHelperUpdateProject: "",
      };
  
    case types.START_REMOVE_PROJECT:
      return {
        ...state,
        submittingRemoveProject: true,
        successRemoveProject: false,
        errorRemoveProject: false,
        errorHelperRemoveProject: "",
      };

    case types.ERROR_REMOVE_PROJECT:
      return {
        ...state,
        submittingRemoveProject: false,
        successRemoveProject: false,
        errorRemoveProject: true,
        errorHelperRemoveProject: payload,
      };

    case types.SUCCESS_REMOVE_PROJECT:
      return {
        ...state,
        submittingRemoveProject: false,
        successRemoveProject: true,
        errorRemoveProject: false,
        errorHelperRemoveProject: "",
      };
  
    /** Tasks - List */
    case types.START_LIST_TASK:
      return {
        ...state,
        submittingListTask: true,
        successListTask: false,
        errorListTask: false,
        errorHelperListTask: "",
      };

    case types.ERROR_LIST_TASK:
      return {
        ...state,
        submittingListTask: false,
        successListTask: false,
        errorListTask: true,
        errorHelperListTask: payload,
      };

    case types.SUCCESS_LIST_TASK:
      return {
        ...state,
        submittingListTask: false,
        successListTask: true,
        errorListTask: false,
        errorHelperListTask: "",

        tasks: payload.data,
        numTasks: payload.count,
      };

    case types.START_LIST_TASK_ALL:
      return {
        ...state,
        submittingListTaskAll: true,
        successListTaskAll: false,
        errorListTaskAll: false,
        errorHelperListTaskAll: "",
      };

    case types.ERROR_LIST_TASK_ALL:
      return {
        ...state,
        submittingListTaskAll: false,
        successListTaskAll: false,
        errorListTaskAll: true,
        errorHelperListTaskAll: payload,
      };

    case types.SUCCESS_LIST_TASK_ALL:
      let newTasks = payload;
      newTasks = newTasks.reduce(
        (arr, curr) => [
          ...arr,
          {
            ...curr,
            id: JSON.stringify(curr.taskID),
            name: curr.taskName,
            start: moment(curr.startDate).format('YYYY-MM-DD'),
            end: moment(curr.endDate).format('YYYY-MM-DD'),
            progress: curr.percentage,
            dependencies: curr.parentID === 0 ? '' : JSON.stringify(curr.parentID),
            custom_class:
              expiredDate(curr.endDate) > 0 &&
              curr.statusID !== 5 &&
              curr.statusID !== 6 &&
              curr.statusID !== 7 &&
              curr.typeName === 'TASK'
                ? 'DURATION'
                : curr.typeName,
          },
        ],
        [],
      );

      return {
        ...state,
        submittingListTaskAll: false,
        successListTaskAll: true,
        errorListTaskAll: false,
        errorHelperListTaskAll: "",

        ganttTasks: newTasks,
      };

    case types.START_CREATE_TASK:
      return {
        ...state,
        submittingCreateTask: true,
        successCreateTask: false,
        errorCreateTask: false,
        errorHelperCreateTask: "",
      };

    case types.ERROR_CREATE_TASK:
      return {
        ...state,
        submittingCreateTask: false,
        successCreateTask: false,
        errorCreateTask: true,
        errorHelperCreateTask: payload,
      };

    case types.SUCCESS_CREATE_TASK:
      return {
        ...state,
        submittingCreateTask: false,
        successCreateTask: true,
        errorCreateTask: false,
        errorHelperCreateTask: "",
      };

    case types.START_UPDATE_TASK:
      return {
        ...state,
        submittingUpdateTask: true,
        successUpdateTask: false,
        errorUpdateTask: false,
        errorHelperUpdateTask: "",
      };

    case types.ERROR_UPDATE_TASK:
      return {
        ...state,
        submittingUpdateTask: false,
        successUpdateTask: false,
        errorUpdateTask: true,
        errorHelperUpdateTask: payload,
      };

    case types.SUCCESS_UPDATE_TASK:
      let tmpTask = state.projects;
      let fIdxTask = tmpTask.findIndex(f => f.taskID === payload[0].taskID);
      if (fIdxTask !== -1) {
        tmpTask[fIdxTask] = payload[0];
      } else {
        tmpTask.push(payload[0]);
      }

      return {
        ...state,
        submittingUpdateTask: false,
        successUpdateTask: true,
        errorUpdateTask: false,
        errorHelperUpdateTask: "",

        tasks: tmpTask,
      };


    case types.START_UPDATE_GANTT_TASK:
      return {
        ...state,
        submittingUpdateGanttTask: true,
        successUpdateGanttTask: false,
        errorUpdateGanttTask: false,
        errorHelperUpdateGanttTask: "",
      };

    case types.ERROR_UPDATE_GANTT_TASK:
      return {
        ...state,
        submittingUpdateGanttTask: false,
        successUpdateGanttTask: false,
        errorUpdateGanttTask: true,
        errorHelperUpdateGanttTask: payload,
      };

    case types.SUCCESS_UPDATE_GANTT_TASK:
      return {
        ...state,
        submittingUpdateGanttTask: false,
        successUpdateGanttTask: true,
        errorUpdateGanttTask: false,
        errorHelperUpdateGanttTask: "",
      };

    case types.START_REMOVE_TASK:
      return {
        ...state,
        submittingRemoveTask: true,
        successRemoveTask: false,
        errorRemoveTask: false,
        errorHelperRemoveTask: "",
      };

    case types.ERROR_REMOVE_TASK:
      return {
        ...state,
        submittingRemoveTask: false,
        successRemoveTask: false,
        errorRemoveTask: true,
        errorHelperRemoveTask: payload,
      };

    case types.SUCCESS_REMOVE_TASK:
      return {
        ...state,
        submittingRemoveTask: false,
        successRemoveTask: true,
        errorRemoveTask: false,
        errorHelperRemoveTask: "",
      };
    
    default:
      return state;
  };
};
