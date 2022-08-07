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

const mygateDesignSubDomains = ["mygate", "demo", "mygatetest"];
const bankitDesignSubDomains = ["bankit", "bankittest"];
const mosaicDesignSubDomains = ["mosaic"];
const mosaicTestDesignSubDomains = ["mosaictest"];
const indifiDesignSubDomains = ["indifitest"];
const kiviDesignSubDomains = ["kivi", "kivitest", "localhost"];
const treeboDesignSubDomains = ["treebo", "treebotest", "localhost"];
const eatfitSubDomains = ["eatfittest", "localhost"];

function App() {
  const subDomain = window.location.hostname.split(".")[0];
  // const isMygate = subDomain === "mygate" ? true : false;
  const isMygate = mygateDesignSubDomains.some(
    (domain) => domain === subDomain
  );
  const isBankit = bankitDesignSubDomains.some(
    (domain) => domain === subDomain
  );

  const isMosaic = mosaicDesignSubDomains.some(
    (domain) => domain === subDomain
  );

  const isMosaicTest = mosaicTestDesignSubDomains.some(
    (domain) => domain === subDomain
  );

  const isIndifi = indifiDesignSubDomains.some(
    (domain) => domain === subDomain
  );

  const isTreebo = treeboDesignSubDomains.some(
    (domain) => domain === subDomain
  );

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
          {/* <Route
            path="/login"
            element={
              <LoginPage user={user} userLoading={userLoading} auth={auth} />
            }
          /> */}
          {demoTenants.includes(TENANTS(subDomain)) ||
          mygateTestTenants.includes(TENANTS(subDomain)) ||
          intldemoTenants.includes(TENANTS(subDomain)) ||
          indifiTenants.includes(TENANTS(subDomain)) ||
          rotaryTenants.includes(TENANTS(subDomain)) ||
          treeboTenants.includes(TENANTS(subDomain)) ||
          kiviTenants.includes(TENANTS(subDomain)) ? (
            <Route path="/login" element={<LoginDemo />} />
          ) : (
            <Route path="/login" element={<LoginPage />} />
            // <Route path="/login" element={<DashboardPage />} />
          )}
          <Route
            path="/"
            element={
              <PrivateRoute
                isMygate={isMygate}
                subDomain={subDomain}
                // auth={auth}
                // user={user}
                // userLoading={userLoading}
              />
            }
          >
            <Route
              path="/reconciliation"
              element={<ReconciliationPage subDomain={subDomain} />}
            />
            {mygateTenants.includes(TENANTS(subDomain)) && (
              <Route
                path="/commission"
                element={<CommissionPage subDomain={subDomain} />}
              />
            )}

            {(demoTenants.includes(TENANTS(subDomain)) ||
              mygateTestTenants.includes(TENANTS(subDomain)) ||
              intldemoTenants.includes(TENANTS(subDomain))) && (
              <Route
                path="/commission"
                element={<CommissionPage subDomain={subDomain} />}
              />
            )}

            {(mosaicTenants.includes(TENANTS(subDomain)) ||
              mosaicTestTenants.includes(TENANTS(subDomain))) && (
              <Route
                path="/order"
                element={<Order isMosaic={isMosaic} subDomain={subDomain} />}
              />
            )}
            {/* {(mosaicTenants.includes(TENANTS(subDomain)) ||
              mosaicTestTenants.includes(TENANTS(subDomain))) && (
              <Route path="/order" element={<OrdersBetel />} />
            )} */}
            {indifiTenants.includes(TENANTS(subDomain)) && (
              <Route
                path="/transaction"
                element={
                  <TransPage isIndifi={isIndifi} subDomain={subDomain} />
                }
              />
            )}
            {/* <Route path='/reports' element={<ReportsPage />} /> */}
            <Route
              path="/setup"
              element={<SetupPage isMygate={isMygate} subDomain={subDomain} />}
            />
            <Route
              path="/"
              element={
                <DashboardPage
                  // isMygate={isMygate}
                  // isBankit={isBankit}
                  // isMosaic={isMosaic}
                  // isTreebo={isTreebo}
                  // isMosaicTest={isMosaicTest}
                  subDomain={subDomain}
                />
              }
            />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
