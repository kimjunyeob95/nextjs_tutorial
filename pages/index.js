import React, { useContext } from "react";
import Head from "next/head";
import { Divider, Header } from "semantic-ui-react";

export default function Home({ list }) {
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
        {/* <ItemList list={list.slice(0, 9)} /> */}
        <Header as="h3" style={{ paddingTop: 40 }}>
          신상품
        </Header>
        <Divider />
        {/* <ItemList list={list.slice(9)} /> */}
      </>
    </>
  );
}

// export async function getStaticProps() {
//   const API_URL = process.env.NEXT_PUBLIC_LIST_API;
//   const res = await axios.get(API_URL);
//   const data = res.data;

//   return {
//     props: {
//       list: data,
//       name: process.env.name,
//     },
//   };
// }
