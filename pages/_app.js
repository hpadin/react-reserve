import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies } from 'nookies'

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Layout>
      <Component {...pageProps} />
    </Layout>;
  }
}

export default MyApp;
