import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import React from 'react'
import catchErrors from '../utils/catchErrors';

const INITIAL_USER = {
  email: "",
  password: ""
}

function Login() {
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
      console.log(user);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Message
      attached
      icon="privacy"
      header="Welcome!"
      content="Log in with email and password"
      color="blue" />

    <Form loading={loading} error={Boolean(error)} onSubmit={handleSubmit}>
      <Segment>
        <Message
          error
          header="Oops!"
          content={error} />
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
          icon="sign in"
          type="submit"
          color="orange"
          content="Login"
          disabled={disabled || loading} />
      </Segment>
    </Form>
    <Message
      attached="bottom"
      warning>
      <Icon name="help" />
      New user? {" "}
      <Link href="/signup">
        <a>Sign up here</a>
      </Link> {" "} instead.
    </Message>
  </>;
}

export default Login;
