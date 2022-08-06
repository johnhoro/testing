import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch, useNavigate } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import { addDays, lightFormat, startOfMonth, endOfMonth } from "date-fns";
import {
  Segment,
  Menu,
  Container,
  Button,
  Image,
  Icon,
  Label,
  Modal,
} from "semantic-ui-react";
import {
  loginUserAction,
  logoutUserAction,
} from "../../actions/authenticationActions";
import { setFilterAction } from "../../actions/queryDataActions";

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { setLoggedInUserCache } from "../../container/ApplicationsCache";
import FilterBar from "../filterBar";
import { appNavigateAction } from "../../actions/appActions";
import { mygateTenants, TENANTS, TENANT_IDs } from "../../utils/constants";

const HeaderDemo = (props) => {
  //const userState = useSelector(state => state.login.user);
  const auth = getAuth(props.firebaseApp);
  const [user, loading, error] = useAuthState(auth);
  const appRoute = useSelector((state) => state.app.route);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { isMygate, subDomain } = props;

  useEffect(() => {
    setLoggedInUserCache(user ? user.accessToken : "");
  }, [user]);

  const onHandleLogout = (event) => {
    event.preventDefault();
    dispatch(appNavigateAction("/login"));
    //dispatch(logoutUserAction({}));
    //props.onSignout();
    signOut(auth);
  };

  const onMenuClick = (route) => {
    dispatch(appNavigateAction(route));
    navigate(route);
  };

  return (
    <div>
      <Menu inverted fixed="top" style={{ background: "#392E48" }} size="large">
        <Image
          src="logo.png"
          size="mini"
          style={{ width: "30px", height: "30px", margin: "10px" }}
        />

        <Menu.Item
          active={appRoute === "/"}
          onClick={() => {
            onMenuClick("/");
          }}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          active={appRoute === "/reconciliation"}
          onClick={() => {
            onMenuClick("/reconciliation");
          }}
        >
          Reconciliation
        </Menu.Item>

        {mygateTenants.includes(TENANTS(subDomain)) && (
          <Menu.Item
            active={appRoute === "/commission"}
            onClick={() => {
              onMenuClick("/commission");
            }}
          >
            Commission
          </Menu.Item>
        )}

        <Menu.Item
          active={appRoute === "/setup"}
          onClick={() => {
            onMenuClick("/setup");
          }}
        >
          Configuration
        </Menu.Item>
        <Menu.Item position="right">
          <Button as="a" onClick={onHandleLogout}>
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default HeaderDemo;
