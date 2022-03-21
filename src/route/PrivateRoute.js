import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Redirect, useParams} from "react-router-dom";
import {Spinner} from "reactstrap";
/** COMMON */
import FieldsAuth from "configs/fieldsAuth";
import Constants from "utils/constants";
import {encodeData, decodeData, log} from "utils/Utils";
/** REDUX */
import * as Actions from "../redux/actions";

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
    let lEncodeSignin = localStorage.getItem(Constants.LS_U_P);
    if (lEncodeSignin && !authState["data"]["accessToken"]) {
      lEncodeSignin = decodeData(lEncodeSignin);
      onSubmitLogin(lEncodeSignin.userName, lEncodeSignin.password);
    } else {
      localStorage.removeItem(Constants.LS_SIGN_IN);
      setLoading(false);
    }
  };

  const onSubmitLogin = (userName, password) => {
    let params = {
      Username: userName,
      Password: password,
      TypeLogin: 1,
      Lang: "vi",
    }
    dispatch(Actions.fFetchSignIn(params));
  };

  const onSaveLocalData = () => {
    let encodeSI = encodeData(authState["data"]);
    localStorage.setItem(Constants.LS_SIGN_IN, encodeSI);
    setLoading(false);
  };

  /**
   ** LIFE CYCLE 
   */
  useEffect(() => {
    onCheckLocalStorage();
  }, []);

  useEffect(() => {
    if (loading) {
      if (!authState["submitting"]) {
        if (authState["successSignIn"] && !authState["errorSignIn"]) {
          return onSaveLocalData();
        }

        if (!authState["successSignIn"] && authState["errorSignIn"]) {
          localStorage.removeItem(Constants.LS_U_P);
          localStorage.removeItem(Constants.LS_SIGN_IN);
          return setLoading(false);
        }
      }
    }
  }, [
    loading,
    authState["submitting"],
    authState["successSignIn"],
    authState["errorSignIn"]
  ]);

  /**
   ** RENDER
   */
  const auth = localStorage.getItem(Constants.LS_SIGN_IN);
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
          <div className="text-center">
            <Spinner size="sm" color="primary" />
          </div>
        )
      }
    ></Route>
  )
};

export default PrivateRoute;
