import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as authHelper from "../helpers/authHelper";

export default function PrivateRoute({ component: Component, ...rest }) {
  const hasToken = authHelper.GetTokenFromStorage();
  const hasOrg = authHelper.GetOrgFromStorage();

  return (
    <Route
      {...rest}
      render={(props) => {
        return hasToken && hasOrg ? <Component {...props} /> : <Redirect to="/Auth" />;
      }}
    ></Route>
  );
}
