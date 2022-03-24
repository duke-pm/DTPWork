import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Redirect, useParams} from "react-router-dom";
import {Spinner} from "reactstrap";
/** COMMON */
import FieldsAuth from "configs/fieldsAuth";
import Constants from "utils/constants";
import {decodeData} from "utils/Utils";
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

    /** Check theme */
    let localTheme = localStorage.getItem(Constants.LS_THEME);
    if (localTheme) {
      dispatch(Actions.changeTheme(localTheme));
    }

    /** Check info sign in */
    let localSignIn = localStorage.getItem(Constants.LS_SIGN_IN);
    if (localSignIn && !authState["data"]["accessToken"]) {
      localSignIn = decodeData(localSignIn);
      let i, tmpDataLogin = {tokenInfo: {}, lstMenu: {}};
      for (i = 0; i < FieldsAuth.length; i++) {
        tmpDataLogin.tokenInfo[FieldsAuth[i].key] =
          localSignIn[FieldsAuth[i].value];
      }
      tmpDataLogin["lstMenu"] = localSignIn["lstMenu"];
      dispatch(Actions.fSuccessSignIn(tmpDataLogin));
      setLoading(false);
    } else {
      localStorage.removeItem(Constants.LS_U_P);
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
