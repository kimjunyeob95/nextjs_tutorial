/* eslint-disable @next/next/no-sync-scripts */
/*
  서버에서만 렌더링되며 이벤트 핸들링은 작동하지 않는다.
  import된 Html, Head, Main은 _app.js에서 import된 요소와 다르다.
*/
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <script src="/js/lib/jquery-3.2.1.min.js"></script>
          <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=k9yckb8c1t"></script>
          <script src="/js/lib/MarkerClustering.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
