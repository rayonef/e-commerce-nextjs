import React from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchError from '../utils/catchErrors';
import { handleLogin } from '../utils/auth';

const INITIAL_USER = {
  email: '',
  password: ''
}

function Login() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const isValid = Object.values(user).every(el => Boolean(el));
    isValid ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange() {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit() {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      const url = `${baseUrl}/login`;
      const payload = { ...user }
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchError(error, setError)
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Message
      attached
      icon="privacy"
      header="Welcome Back!"
      content="Login with email & password"
      color="blue"
    />
    <Form 
      error={Boolean(error)}
      onSubmit={handleSubmit}
    >
      <Message
        error
        header="Oops!"
        content={error}
      />
      <Segment>
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button
          disabled={disabled || loading}
          icon="sign in"
          type="submit"
          color="orange"
          content="Login"
        />
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help"/>
      New user?{" "}
      <Link href="/signup">
        <a>Sign up here</a>
      </Link>{" "}instead.
    </Message>
  </>;
}

export default Login;
