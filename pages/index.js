import axios from "axios";
import Head from "next/head";
import { Divider, Header } from "semantic-ui-react";
import ItemList from "../src/component/Home/ItemList";
import styles from "../styles/Home.module.css";

export default function Home({ list }) {
  return (
    <>
      <Head>
        <title>HOME | Nextjs</title>
        <meta name="description" content="넥스트 홈입니다."></meta>
      </Head>
      <>
        <Header as="h3" style={{ paddingTop: 40 }}>
          베스트 상품
        </Header>
        <Divider />
        <ItemList list={list.slice(0, 9)} />
        <Header as="h3" style={{ paddingTop: 40 }}>
          신상품
        </Header>
        <Divider />
        <ItemList list={list.slice(9)} />
      </>
    </>
  );
}

export async function getStaticProps() {
  const API_URL = process.env.NEXT_PUBLIC_LIST_API;
  const res = await axios.get(API_URL);
  const data = res.data;

  return {
    props: {
      list: data,
      name: process.env.name,
    },
  };
}
