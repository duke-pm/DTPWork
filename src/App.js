import React from "react";
import {Provider} from 'react-redux';
import {Switch, Route, withRouter} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/** COMPONENTS */
import Error404Classic from "./pages/error/404-classic";
import Error404Modern from "./pages/error/404-modern";
import Error504Modern from "./pages/error/504-modern";
import Error504Classic from "./pages/error/504-classic";
import Layout from "./layout/Index";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
/** COMMON */
import {RedirectAs404} from "./utils/Utils";
import PrivateRoute from "./route/PrivateRoute";
/** REDUX */
import Store from './redux/store';

// Attach to window. Can be useful to debug
window.toast = toast;

const App = (props) => {
  return (
    <Provider store={Store}>
      <Switch>
        {/* Auth Pages */}
        <Route exact path={`${process.env.PUBLIC_URL}/auth-reset/:tokenData`} component={ResetPassword}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/auth-forgot`} component={ForgotPassword}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/auth-login`} component={Login}></Route>

        {/*Error Pages*/}
        <Route exact path={`${process.env.PUBLIC_URL}/errors/404-classic`} component={Error404Classic}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/errors/504-modern`} component={Error504Modern}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/errors/404-modern`} component={Error404Modern}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/errors/504-classic`} component={Error504Classic}></Route>

        {/*Main Routes*/}
        <PrivateRoute exact path="" component={Layout}></PrivateRoute>
        <Route component={RedirectAs404}></Route>
      </Switch>
      <ToastContainer
        theme="colored"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
      />
    </Provider>
  );
};


export default withRouter(App);
