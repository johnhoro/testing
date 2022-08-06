import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
//import { useDispatch, useSelector } from 'react-redux';

//import { loginUserAction } from '../actions/authenticationActions';
//import { checkCookie, setCookie } from '../utils/cookies';

import {
  Button,
  Dimmer,
  Form,
  Grid,
  Header,
  Image,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { TENANTS } from "../utils/constants";
import { appNavigateAction } from "../actions/appActions";

const LoginPage = ({ userLoading, user, auth }) => {
  //const dispatch = useDispatch();
  //const [notification, setNotification] = useState('');
  //const [success, setSuccess] = useState(false);
  //const login = useSelector(state => state.login.response);
  const [hashPath, setHashPath] = useState(window.location.hash);
  const appRoute = useSelector((state) => state.app.route);

  const subDomain = window.location.hostname.split(".")[0];

  auth.tenantId = TENANTS(subDomain); //"test-05pfe";
  const [signInWithEmailAndPassword, userInfo, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const dispatch = useDispatch();

  // const [loggedInUser, loggedInUserLoading] = useAuthState(auth);
  const onHandleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(email, password);

    // dispatch(loginUserAction({
    //   email, password,
    // }));
  };

  useEffect(() => {
    if (user && !userLoading) {
      dispatch(appNavigateAction("/"));
    }
  }, [user]);

  return userLoading ? (
    <Dimmer active inverted>
      {" "}
      <Loader inverted />{" "}
    </Dimmer>
  ) : user ? (
    <Navigate to={appRoute === "/login" ? "/" : appRoute} />
  ) : (
    <Grid textAlign="center" style={{ height: "80vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <div>{error ? "Login failed, please check email/password" : ""}</div>
        <Header as="h1" style={{ color: "#010047" }} textAlign="center">
          <Image src="images/logo.png" /> Kosh.ai
        </Header>
        <Form size="large" color="violet" onSubmit={onHandleLogin}>
          <Form.Input
            name="email"
            id="email"
            fluid
            icon="user"
            iconPosition="left"
            placeholder="E-mail"
          />
          <Form.Input
            name="password"
            id="password"
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />

          <Button color="violet" fluid size="large" loading={loading}>
            Login
          </Button>
        </Form>
        {/* <Message>
          New to us? <Link to='register'>Register here</Link>
        </Message> */}
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
