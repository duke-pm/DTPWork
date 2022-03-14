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
  assetsManagement: "/assets-management",
  requestsApproved: "/list-request",
  requestsApprovedHandle: "/list-request-handle",

  /** Booking routes */
  allBookings: "/booking/bookings",

  groupResources: "/booking/resource-group/resource-group-page",
  resources: "/booking/resource/resource-page",

  /** Project routes */
  projects: "/projects/view",
  tasks: "/projects",
  taskDetails: "/tasks",
};

export default Routes;
