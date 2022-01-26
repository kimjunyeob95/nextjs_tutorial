/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/*
  글로벌 css와 레이아웃을 정의한다.
*/
import ContextStore from "ContextApi/Context";
import "styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import Footer from "src/component/Footer";
import Top from "src/component/Top";
import Login from "pages/login";
import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import { PrivateCheck } from "src/component/PrivateCheck";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (!PrivateCheck() && Component.privateRoute) {
    //로그인필요
    useEffect(() => {
      router.replace(`/login?returnUrl=${encodeURIComponent(router.asPath)}`);
    }, []);
    return (
      <ContextStore>
        <Head>
          <title>Nextjs made by junyeob</title>
          <meta name="description" content="nextjs를 이용한 사이트입니다."></meta>
        </Head>
        <Container>
          <Top />
          <Login />
          <Footer />
        </Container>
      </ContextStore>
    );
  }
  return (
    <ContextStore>
      <Head>
        <title>Nextjs made by junyeob</title>
        <meta name="description" content="nextjs를 이용한 사이트입니다."></meta>
      </Head>
      <Container>
        <Top />
        <Component {...pageProps} />
        <Footer />
      </Container>
    </ContextStore>
  );
}

export default MyApp;

/**
 * 페이지 전환 시 레이아웃을 유지할 수 있습니다.
 * 페이지 전환시 상태값을 유지할 수 있습니다.
 * componentDidCatch를 이용해서 커스텀 에러 핸들링을 할 수 있습니다.
 * 추가적인 데이터를 페이지로 주입시켜주는게 가능합니다.
 * 글로벌 CSS를 이곳에 선언합니다.
 *
 */
