import React, {Suspense, useLayoutEffect} from "react";
import {Switch, Route} from "react-router-dom";
import Routes from "./routes";
import {RedirectAs404} from "../utils/Utils";
/** COMPONENTS */
import Homepage from "../pages/dtp-work/homepage";

import ChangePassword from "../pages/dtp-work/account/change_password";

import EmployeeGroup from "../pages/dtp-work/management/employee_group";
import EmployeeList from "../pages/dtp-work/management/employee_list";
import MenuManagement from "../pages/dtp-work/management/menu";
import RoleFunctional from "pages/dtp-work/management/role_functional";
import ApprovedLines from "pages/dtp-work/management/approved_lines";
import ApprovedLevels from "pages/dtp-work/management/approved_levels";

import AssetsManagement from "../pages/dtp-work/assets/assets_management";
import RequestAssets from "../pages/dtp-work/assets/list_request";
import RequestAssetsHandle from "../pages/dtp-work/assets/list_request_handle";

import AllBookings from "../pages/dtp-work/booking/list/AllBookings";
import GroupResources from "../pages/dtp-work/booking/resources/GroupsResource";
import Resources from "../pages/dtp-work/booking/resources/Resources";

import ListProjects from "../pages/dtp-work/project/list/Project";
import ListTasks from "pages/dtp-work/project/list/Task";
import GanttTasks from "pages/dtp-work/project/chart/GanttTasks";
import TaskDetails from "pages/dtp-work/project/form/TaskDetails";
import ProjectsOverview from "pages/dtp-work/project/overview_project";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {/** Dashboard route */}
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.dashboard}`} component={Homepage} />

        {/** Account route */}
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.changePassword}`} component={ChangePassword} />

        {/** Management route */}
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.employeeGroup}`} component={EmployeeGroup} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.employeeList}`} component={EmployeeList} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.menuManagement}`} component={MenuManagement} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.roleFunctional}`} component={RoleFunctional} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.approvedLines}`} component={ApprovedLines} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.approvedLevels}`} component={ApprovedLevels} />

        {/** Approved route */}
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.assetsManagement}`} component={AssetsManagement}/>
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.requestsApproved}`} component={RequestAssets} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.requestsApprovedHandle}`} component={RequestAssetsHandle} />

        {/** Booking route */}
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.allBookings}`} component={AllBookings} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.groupResources}`} component={GroupResources} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.resources}`} component={Resources} />

        {/** Project route */}
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.projects}`} component={ListProjects} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.tasks}/:projectID`} component={ListTasks} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.ganttTasks}/:projectID`} component={GanttTasks} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.taskDetails}/:taskID`} component={TaskDetails} />
        <Route exact path={`${process.env.PUBLIC_URL}${Routes.projectsOverview}`} component={ProjectsOverview} />

        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
