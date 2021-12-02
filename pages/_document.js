/*
  서버에서만 렌더링되며 이벤트 핸들링은 작동하지 않는다.
  import된 Html, Head, Main은 _app.js에서 import된 요소와 다르다.
*/
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
