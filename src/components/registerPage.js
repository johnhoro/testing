import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { registerUserAction } from '../actions/authenticationActions';

import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const RegisterPage = () => {
  const [success, setSuccess] = useState(false);
  const [notification, setNotification] = useState('');
  const dispatch = useDispatch();
  const register = useSelector(state => state.register.response);

  useEffect(() => {
    if (register !== undefined) {
      setSuccess(register.success);
      setNotification(register.message);
    }
  }, [register]);

  const onHandleRegistration = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    dispatch(registerUserAction({
      name,
      email,
      password,
    }));
  }

  useEffect(() => {
    setNotification('');
  }, []);

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    {(!success) ? <div>{notification}</div> : <Navigate to='login' />}
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.png' /> Register
      </Header>
      <Form size='large' onSubmit={onHandleRegistration}>
        <Segment stacked>
          <Form.Input name="name" id="name" fluid icon='user' iconPosition='left' placeholder='Name' />
          <Form.Input name="email" id="email" fluid icon='user' iconPosition='left' placeholder='E-mail' />
          <Form.Input name="password" id="password"
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button color='teal' fluid size='large'>
            Register
          </Button>
        </Segment>
      </Form>
      <Message>
        Already have account? <Link to='login'>Login here</Link>
      </Message>
    </Grid.Column>
  </Grid>
  );
}

export default RegisterPage;
