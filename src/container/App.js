import React, { Component, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import PrivateRoute from "./privateRoute";
import LoginPage from "../components/loginPage";
import LoginDemo from "../components/demo/loginDemo";
import Header from "../components/header";
import ReconciliationPage from "../components/reconciliationPage";
import DashboardPage from "../components/dashboardPage";
import SetupPage from "../components/setupPage";
// import * as firebase from "firebase/app";
import CommissionPage from "../components/commissionPage";
import Order from "../components/orderPage";
import OrdersBetel from "../components/order";
import TransPage from "../components/trans";
import FilterBar from "../components/filterBar";
import { Grid } from "semantic-ui-react";
import {
  demoTenants,
  indifiTenants,
  intldemoTenants,
  mosaicTestTenants,
  mosaicTenants,
  mygateTenants,
  rotaryTenants,
  treeboTenants,
  kiviTenants,
  TENANTS,
  TENANT_IDs,
  mygateTestTenants,
} from "../utils/constants";
import { useAuthState } from "react-firebase-hooks/auth";

import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";

const isDev =
  window.location.hostname.startsWith("test") ||
  window.location.hostname.startsWith("localhost");
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // apiKey: "AIzaSyC2qSKFn1qN7b4cJfiGIq-CtsXk1kkpBys",
  // authDomain: "kosh-ai.firebaseapp.com",
};

// firebase.initializeApp(firebaseConfig);

function App() {
  const subDomain = window.location.hostname.split(".")[0];

  // const firebaseApp = firebase.getApp();
  // const auth = getAuth(firebaseApp);
  // const [user, userLoading] = useAuthState(auth);

  return (
    // <Authenticator>
    //   {({ signOut, user }) => {
    //     //dispatch(loginUserAction(user));
    //     setLoggedInUserCache(user);

    //     // Promise.all([getConnectors()]).then((data) => {
    //     //   let [addedConnectors] = data;
    //     //   if (addedConnectors) {
    //     //     setAddedConnectorsCache(addedConnectors);
    //     //   }
    //     // });
    //     return (
    //       <>

    //         <HashRouter>
    //           <Header onSignout={signOut}></Header>
    //           <div style={{ padding: '1em', marginTop: '5em', height: '100%' }}>
    //             <Routes>

    //               {/* <Route path='/login' component={LoginPage} />
    //           <Route path='/register' component={RegisterPage} />
    //           <PrivateRoute path='/' component={Home} /> */}
    //               <Route path='/reconciliation' element={<ReconciliationPage />} />
    //               <Route path='/reports' element={<ReportsPage />} />
    //               <Route path='/setup' element={<SetupPage />} />
    //               <Route path='/' element={<DashboardPage />} />

    //             </Routes>
    //           </div>
    //         </HashRouter>
    //       </>
    //     )
    //   }}
    // </Authenticator>

    <>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginDemo />} />
          <Route path="/" element={<PrivateRoute subDomain={subDomain} />}>
            <Route path="/order" element={<Order subDomain={subDomain} />} />
            <Route
              path="/setup"
              element={<SetupPage subDomain={subDomain} />}
            />
            <Route path="/" element={<DashboardPage subDomain={subDomain} />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
