import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./demo.css";
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

import { useDispatch, useSelector } from "react-redux";
import { TENANTS } from "../../utils/constants";
import { appNavigateAction } from "../../actions/appActions";

const LoginDemo = ({ userLoading, user, auth }) => {
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
    <section className="login-section">
      <div className="login">
        <div className="kosh-logo">
          <img className="images/logo.png" src="logo.png" alt="logo" />
          <h1>Kosh.ai</h1>
        </div>
        <h2>Log in to your Account</h2>
        <div>{error ? "Login failed, please check email/password" : ""}</div>
        <form
          onSubmit={(event) => onHandleLogin(event)}
          className="flex flex-column"
        >
          <div className="control-form">
            <input type="email" name="email" placeholder="Email Address" />
            <img
              src="images/email.png"
              alt="email"
              width="15.83"
              height="12.5"
            />
          </div>
          <div className="control-form-password">
            <input type="password" name="password" placeholder="Password" />
            <img src="images/lock.png" alt="lock" width="12.5" height="16.25" />
          </div>
          <button className="purple" loading={loading}>
            Continue
          </button>
        </form>
        {/* <p className="or">OR</p> */}
        {/* <button className="h-36">
          <img src="images/google.png" alt="google" width="24" height="24" />{" "}
          <p>Continue with Google</p>
        </button> */}
        {/* <button className="h-36">
          <img src="images/ms.png" alt="ms" width="18" height="18" />
          <p> Continue with Microsoft</p>
        </button> */}
        {/* <button className="h-36">
          <img src="images/apple.png" alt="apple" width="18" height="18" />{" "}
          <p>Continue with Apple</p>
        </button> */}
        <p className="dont-have-account">
          Don't have an account? <span className="blue pointer"> Sign Up</span>
        </p>
      </div>
      <p className="term">
        Terms and Conditions <div></div> Privacy Policy
      </p>
    </section>
  );

  // <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
  //   <Grid.Column style={{ maxWidth: 450 }}>
  //     <div>{error ? "Login failed, please check email/password" : ""}</div>
  //     <Header as='h1' style={{color: '#010047'}} textAlign='center'>
  //       <Image src='/logo.png' /> Kosh.ai
  //     </Header>
  //     <Form size='large' color='violet' onSubmit={onHandleLogin}>
  //         <Form.Input name="email" id="email" fluid icon='userInfo' iconPosition='left' placeholder='E-mail' />
  //         <Form.Input name="password" id="password"
  //           fluid
  //           icon='lock'
  //           iconPosition='left'
  //           placeholder='Password'
  //           type='password'
  //         />

  //         <Button color='violet' fluid size='large' loading={loading}>
  //           Login
  //         </Button>
  //     </Form>
  //     {/* <Message>
  //     New to us? <Link to='register'>Register here</Link>
  //   </Message> */}
  //   </Grid.Column>
  // </Grid>
};

export default LoginDemo;
