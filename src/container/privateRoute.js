import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { Dimmer, Loader } from "semantic-ui-react";
import Header from "../components/header";
import ReconciliationPage from "../components/reconciliationPage";
import DashboardPage from "../components/dashboardPage";
import SetupPage from "../components/setupPage";
import * as firebase from "firebase/app";
import CommissionPage from "../components/commissionPage";
import FilterBar from "../components/filterBar";
import { Grid } from "semantic-ui-react";
import {
  kiviTenants,
  mygateTenants,
  TENANTS,
  TENANT_IDs,
} from "../utils/constants";
import HeaderDemo from "../components/demo/headerDemo";

const PrivateRoute = (props) => {
  const { auth, user, userLoading, subDomain, isMygate, isBankit } = props;

  if (false) {
    return (
      <Dimmer active inverted>
        {" "}
        <Loader inverted />{" "}
      </Dimmer>
    );
  } else {
    return (
      <Grid>
        <Grid.Column>
          <Grid.Row>
            <Header
              // firebaseApp={firebase.getApp()}
              // onSignout={null}
              // isMygate={isMygate}
              subDomain={subDomain}
            />
          </Grid.Row>
          <Grid.Row>
            <FilterBar isMygate={isMygate} isBankit subDomain={subDomain} />
          </Grid.Row>
          <Grid.Row style={{ width: "100%" }}>
            <div
              style={{
                paddingLeft: "1.5em",
                paddingRight: "1.5em",
                paddingBottom: "1.5em",
              }}
            >
              <Outlet />
            </div>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
};

export default PrivateRoute;
