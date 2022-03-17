const typeTask = {
	PHASE: 1,
	TASK: 2,
	MILESTONE: 3,
};
const typeTaskColor = {
	PHASE: '#FF9500',
	MILESTONE: '#34C759',
	TASK: '#007AFF'
};
const priorityColor = {
	H: "danger",
	M: "info",
	L: "warning",
	N: "primary",
	I: "success",
};

const svgIcon = {
  reCheck: {
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
        <path
          fill="#fff"
          stroke="#6576ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M26 70.78V24.5a7 7 0 017-7h36a9 9 0 019 9v49a7 7 0 01-7 7H16.55s9.17-3.61 9.45-11.72z"
        ></path>
        <path
          fill="#e3e7fe"
          stroke="#6576ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 30.5h19v43.4a8.6 8.6 0 01-8.6 8.6h-3.8A8.6 8.6 0 015 73.9V32.5a2 2 0 012-2z"
        ></path>
        <circle
          cx="71.5"
          cy="21"
          r="13.5"
          fill="#fff"
          stroke="#6576ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></circle>
        <rect width="16" height="8" x="34" y="33.5" fill="#c4cefe" rx="1" ry="1"></rect>
        <path
          fill="none"
          stroke="#c4cefe"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M35 46.5L67 46.5"
        ></path>
        <path
          fill="none"
          stroke="#c4cefe"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M35 53.5L67 53.5"
        ></path>
        <path
          fill="none"
          stroke="#c4cefe"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M35 59.5L67 59.5"
        ></path>
        <path
          fill="none"
          stroke="#c4cefe"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M35 64.5L67 64.5"
        ></path>
        <path
          fill="none"
          stroke="#c4cefe"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M35 71.5L51 71.5"
        ></path>
        <path
          fill="none"
          stroke="#6576ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M75.24 23.79a5.2 5.2 0 01-6.42 2.57 5.78 5.78 0 01-3.26-7.25 5.25 5.25 0 016.8-3.47 5.35 5.35 0 012 1.34l2.75 2.75"
        ></path>
        <path
          fill="none"
          stroke="#6576ff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M77.75 16.61L77.75 20.61 73.75 20.61"
        ></path>
      </svg>
    ),
  }
};

const Constants = {
  DEFAULT_LANGUAGE: "vi",

  /** KEY LOCAL STORAGE */
  LS_LANGUAGE: "LS_LANGUAGE",
  LS_SIGN_IN: "LS_SIGN_IN",
  LS_FROM_TO_REQUEST: "LS_FROM_TO_REQUEST",
  LS_FROM_TO_REQUEST_HANDLE: "LS_FROM_TO_REQUEST_HANDLE",
  LS_FROM_TO_ALL_BOOKINGS: "LS_FROM_TO_ALL_BOOKINGS",
  LS_VIEW_BOOKING: "LS_VIEW_BOOKING",
  LS_FILTER_PROJECTS: "LS_FILTER_PROJECTS",
  LS_FILTER_TASKS: "LS_FILTER_TASKS",
  LS_FILTER_PROJECTS_OVERVIEW: "LS_FILTER_PROJECTS_OVERVIEW",

  DATA_TIME_BOOKING: [
    {value: "00:00", label: "00:00"},
    {value: "00:30", label: "00:30"},
    {value: "01:00", label: "01:00"},
    {value: "01:30", label: "01:30"},
    {value: "02:00", label: "02:00"},
    {value: "02:30", label: "02:30"},
    {value: "03:00", label: "03:00"},
    {value: "03:30", label: "03:30"},
    {value: "04:00", label: "04:00"},
    {value: "04:30", label: "04:30"},
    {value: "05:00", label: "05:00"},
    {value: "05:30", label: "05:30"},
    {value: "06:00", label: "06:00"},
    {value: "06:30", label: "06:30"},
    {value: "07:00", label: "07:00"},
    {value: "07:30", label: "07:30"},
    {value: "08:00", label: "08:00"},
    {value: "08:30", label: "08:30"},
    {value: "09:00", label: "09:00"},
    {value: "09:30", label: "09:30"},
    {value: "10:00", label: "10:00"},
    {value: "10:30", label: "10:30"},
    {value: "11:00", label: "11:00"},
    {value: "11:30", label: "11:30"},
    {value: "12:00", label: "12:00"},
    {value: "12:30", label: "12:30"},
    {value: "13:00", label: "13:00"},
    {value: "13:30", label: "13:30"},
    {value: "14:00", label: "14:00"},
    {value: "14:30", label: "14:30"},
    {value: "15:00", label: "15:00"},
    {value: "15:30", label: "15:30"},
    {value: "16:00", label: "16:00"},
    {value: "16:30", label: "16:30"},
    {value: "17:00", label: "17:00"},
    {value: "17:30", label: "17:30"},
    {value: "18:00", label: "18:00"},
    {value: "18:30", label: "18:30"},
    {value: "19:00", label: "19:00"},
    {value: "19:30", label: "19:30"},
    {value: "20:00", label: "20:00"},
    {value: "20:30", label: "20:30"},
    {value: "21:00", label: "21:00"},
    {value: "21:30", label: "21:30"},
    {value: "22:00", label: "22:00"},
    {value: "22:30", label: "22:30"},
    {value: "23:00", label: "23:00"},
    {value: "23:30", label: "23:30"},
  ],

  TYPE_TASK: typeTask,
  TYPE_TASK_COLOR: typeTaskColor,
  PRIORITY_TASK_COLOR: priorityColor,

  SVG_ICON: {
    RE_CHECK: svgIcon.reCheck.svg,
  }
};

export default Constants;
