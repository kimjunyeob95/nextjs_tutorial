/*
  글로벌 css와 레이아웃을 정의한다.
*/
import ContextStore from "../ContextApi/Context";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import Footer from "../src/component/Footer";
import Top from "../src/component/Top";

import { Container } from "semantic-ui-react";
import ChageRouter from "../src/component/ChageRouter";
function MyApp({ Component, pageProps }) {
  return (
    <ContextStore>
      <Head>
        <title>Nextjs made by junyeob</title>
        <meta name="description" content="nextjs를 이용한 사이트입니다."></meta>
      </Head>
      <ChageRouter />
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
