import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from "next/router";
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();


function Header() {
  const router = useRouter();
  const user = false;

  function isActive(route) {
    return route === router.pathname;
  }

  return (<Menu stackable fluid id="menu" inverted>
    <Container text>
      <Link href="/">
        <Menu.Item header active={isActive('/')}>
          <Image
            size="mini"
            src="/static/logo.svg"
            style={{ marginRight: "1em" }} />
          React Reserve
        </Menu.Item>
      </Link>

      <Link href="/cart">
        <Menu.Item header active={isActive('/cart')}>
          <Icon
            size="large"
            name="cart"
          />
          Cart
        </Menu.Item>
      </Link>

      {user && <Link href="/create">
        <Menu.Item header active={isActive('/create')}>
          <Icon
            size="large"
            name="add square"
          />
          Create
        </Menu.Item>
      </Link>}
      {user ? (
        <>
          <Link href="/account">
            <Menu.Item header active={isActive('/account')}>
              <Icon
                size="large"
                name="user"
              />
              Account
        </Menu.Item>
          </Link>

          <Menu.Item header>
            <Icon
              size="large"
              name="sign out"
            />
            Log out
      </Menu.Item>
        </>
      )
        : (
          <>
            <Link href="/login">
              <Menu.Item header active={isActive('/login')}>
                <Icon
                  size="large"
                  name="sign in"
                />
                Login
        </Menu.Item>
            </Link>

            <Link href="/signup">
              <Menu.Item header active={isActive('/signup')}>
                <Icon
                  size="large"
                  name="signup"
                />
                Signup
        </Menu.Item>
            </Link>
          </>)}
    </Container>
  </Menu>
  )
};

export default Header;
