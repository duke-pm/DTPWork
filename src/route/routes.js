const Routes = {
  /** Dashboard routes */
  dashboard: "/",
  
  /** Account routes */
  changePassword: "/change-password",

  /** Management routes */
  employeeGroup: "/employee-groups",
  employeeList: "/employees",
  menuManagement: "/menu-configs",
  roleFunctional: "/role-configs",
  approvedLines: "/approved-lines",
  approvedLevels: "/approved-levels",

  /** Approved routes */
  assetsManagement: "/assets/assets-management",
  requestsApproved: "/assets/list-request",
  requestsApprovedHandle: "/assets/list-request-handle",

  /** Booking routes */
  allBookings: "/booking/bookings",
  groupResources: "/booking/resource-groups",
  resources: "/booking/resources",

  /** Project routes */
  projects: "/project/projects",
  projectsOverview: "/project/projects-overview",
  tasks: "/project/tasks",
  ganttTasks: "/project/gantt-chart",
  taskDetails: "/project/task",
};

export default Routes;
