import React from "react";
import {withTranslation} from "react-i18next";
import {Switch, Route, withRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {RedirectAs404} from "./utils/Utils";
import PrivateRoute from "./route/PrivateRoute";

import Layout from "./layout/Index";

import Error404Classic from "./pages/error/404-classic";
import Error404Modern from "./pages/error/404-modern";
import Error504Modern from "./pages/error/504-modern";
import Error504Classic from "./pages/error/504-classic";

import Faq from "./pages/others/Faq";
import Terms from "./pages/others/Terms";

import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import InvoicePrint from "./pages/pre-built/invoice/InvoicePrint";

import './utils/languages/config-i18n';
/** REDUX */
import Store from './redux/store';

const App = (props) => {
  return (
    <Provider store={Store}>
      <Switch>
        {/* Auth Pages */}
        <Route exact path={`${process.env.PUBLIC_URL}/auth-reset`} component={ResetPassword}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/auth-forgot`} component={ForgotPassword}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/auth-login`} component={Login}></Route>

        {/* Print Pages */}
        <Route exact path={`${process.env.PUBLIC_URL}/invoice-print/:id`} component={InvoicePrint}></Route>

        {/* Helper pages */}
        <Route exact path={`${process.env.PUBLIC_URL}/auths/terms`} component={Terms}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/auths/faq`} component={Faq}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/invoice-print`} component={InvoicePrint}></Route>

        {/*Error Pages*/}
        <Route exact path={`${process.env.PUBLIC_URL}/errors/404-classic`} component={Error404Classic}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/errors/504-modern`} component={Error504Modern}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/errors/404-modern`} component={Error404Modern}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/errors/504-classic`} component={Error504Classic}></Route>

        {/*Main Routes*/}
        <PrivateRoute exact path="" component={Layout}></PrivateRoute>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Provider>
  );
};


export default withRouter(withTranslation()(App));
