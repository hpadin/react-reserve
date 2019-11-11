import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import React from 'react'
import catchErrors from '../utils/catchErrors';
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import { handleLogin } from '../utils/auth';

const INITIAL_USER = {
  name: "",
  password: "",
  email: ""
}

function Signup() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    setDisabled(!isUser);
  }, [user])

  function handleChange(event) {
    const { name, value } = event.target
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/signup`;
      const payload = {... user};
      const response = await axios.post(url, payload);
      handleLogin(response);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Message
      attached
      icon="settings"
      header="Get started!"
      content="Create a new account"
      color="teal" />
    <Form loading={loading} error={Boolean(error)} onSubmit={handleSubmit}>
      <Message
        error
        header="Oops!"
        content={error} />
      <Segment>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          label="Name"
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={handleChange} />

        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange} />

        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          value={user.password}
          type="password"
          name="password"
          onChange={handleChange} />

        <Button
          icon="signup"
          type="submit"
          color="orange"
          content="Signup"
          disabled={disabled || loading} />
      </Segment>
    </Form>
    <Message
      attached="bottom"
      warning>
      <Icon name="help" />
      Existing user? {" "}
      <Link href="/login">
        <a>Log in here</a>
      </Link> {" "} instead.
    </Message>
  </>;
}

export default Signup;
