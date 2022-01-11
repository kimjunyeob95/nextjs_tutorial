import React from "react";
import Head from "next/head";
import { Divider, Header } from "semantic-ui-react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Nextjs made by junyeob</title>
      </Head>
      <>
        <Header as="h3" style={{ paddingTop: 40 }}>
          베스트 상품
        </Header>
        <Divider />

        <Header as="h3" style={{ paddingTop: 40 }}>
          신상품
        </Header>
        <Divider />
      </>
    </>
  );
}
