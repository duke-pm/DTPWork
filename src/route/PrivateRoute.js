import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Redirect, useParams} from "react-router-dom";
/** COMMON */
import FieldsAuth from "configs/fieldsAuth";
import Constants from "utils/constants";
/** REDUX */
import * as Actions from "../redux/actions";

const auth = localStorage.getItem(Constants.LS_SIGN_IN);

const PrivateRoute = ({ exact, component: Component, ...rest }) => {
  const {tokenData} = useParams();

  /** Use redux */
  const dispatch = useDispatch();
  const authState = useSelector(({auth}) => auth);

  /** Use state */
  const [loading, setLoading] = useState(true);

  /**
   ** FUNCTIONS
   */
  const onCheckLocalStorage = () => {
    /** Check language */
    let localLanguage = localStorage.getItem(Constants.LS_LANGUAGE);
    if (localLanguage) {
      dispatch(Actions.changeLanguage(localLanguage));
    }

    /** Check info sign in */
    let localSignIn = localStorage.getItem(Constants.LS_SIGN_IN);
    if (localSignIn && !authState["data"]["accessToken"]) {
      localSignIn = JSON.parse(localSignIn);
      let i, tmpDataLogin = {tokenInfo: {}, lstMenu: {}};
      for (i = 0; i < FieldsAuth.length; i++) {
        tmpDataLogin.tokenInfo[FieldsAuth[i].key] =
          localSignIn[FieldsAuth[i].value];
      }
      tmpDataLogin["lstMenu"] = localSignIn["lstMenu"];
      dispatch(Actions.fSuccessSignIn(tmpDataLogin));
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  /**
   ** LIFE CYCLE 
   */
  useEffect(() => {
    onCheckLocalStorage();
  }, []);

  /**
   ** RENDER
   */
  return (
    <Route
      exact={exact ? true : false}
      rest
      render={(props) =>
        !loading ? (
          auth ? (
            <Component {...props} {...rest}></Component>
          ) : tokenData ? (
            <Redirect to={`${process.env.PUBLIC_URL}/auth-reset/${tokenData}`}></Redirect>
          ) : (
            <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
          )
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status" />
          </div>
        )
      }
    ></Route>
  )
};

export default PrivateRoute;
