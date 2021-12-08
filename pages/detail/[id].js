/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import axios from "axios";
import Item from "../../src/component/Home/Item";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";

export default function Post({ item }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div style={{ padding: "100px 0" }}>
        <Loader active inline="centered">
          Loading
        </Loader>
      </div>
    );
  }
  return <></>;
}

// export async function getStaticPaths() {
//   const API_URL = process.env.NEXT_PUBLIC_LIST_API;
//   const res = await axios.get(API_URL);
//   const data = res.data;
//   return {
//     paths: data.slice(0, 9).map((item) => ({
//       params: {
//         id: item.id.toString(),
//       },
//     })),
//     fallback: true,
//   };
// }

// export async function getStaticProps(context) {
//   const id = context.params.id;
//   const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
//   const res = await axios.get(apiUrl);
//   const data = res.data;

//   return {
//     props: {
//       item: data,
//       name: process.env.name,
//     },
//   };
// }
