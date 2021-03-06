/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/*
  글로벌 css와 레이아웃을 정의한다.
*/

import Router from "next/router";

const fn_progress = (type) => {
  if (type === "start") {
    $("#container-wrap").addClass("loading");
  } else if (type === "done") {
    $("#container-wrap").removeClass("loading");
  }
};

Router.events.on("routeChangeStart", () => fn_progress("start"));
Router.events.on("routeChangeComplete", () => fn_progress("done"));
Router.events.on("routeChangeError", () => fn_progress("done"));

import ContextStore from "ContextApi/Context";
import "styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import Footer from "src/component/Footer";
import Top from "src/component/Top";
import Login from "pages/login";
import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps, loginFlag }) {
  const router = useRouter();

  if (!loginFlag && Component.privateRoute) {
    setTimeout(() => {
      router.replace(`/login?returnUrl=${encodeURIComponent(router.asPath)}`).then(() => alert("로그인이 필요합니다."));
    }, 0);
  }

  return (
    <ContextStore>
      <Head>
        <title>Nextjs made by junyeob</title>
        <meta name="description" content="nextjs를 이용한 사이트입니다."></meta>
      </Head>
      <Container>
        <Top />
        <div id="container-wrap">{!loginFlag && Component.privateRoute ? <Login /> : <Component {...pageProps} />}</div>
        <Footer />
      </Container>
    </ContextStore>
  );
}
MyApp.getInitialProps = async (appContext) => {
  const loginFlag = (await appContext?.ctx?.req?.cookies?.mInfo) ? true : false;
  return { loginFlag };
};

export default MyApp;

/**
 * 페이지 전환 시 레이아웃을 유지할 수 있습니다.
 * 페이지 전환시 상태값을 유지할 수 있습니다.
 * componentDidCatch를 이용해서 커스텀 에러 핸들링을 할 수 있습니다.
 * 추가적인 데이터를 페이지로 주입시켜주는게 가능합니다.
 * 글로벌 CSS를 이곳에 선언합니다.
 *
 */
