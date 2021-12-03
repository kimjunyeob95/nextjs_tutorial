/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Header, Segment } from "semantic-ui-react";
import axios from "axios";
import Head from "next/head";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { Button } from "semantic-ui-react";
import { authContext } from "../../ContextApi/Context";

export default function Mypage() {
  const [state, dispatch] = useContext(authContext);
  const router = useRouter();
  function handleLogout() {
    const formData = new FormData();
    formData.append("tm_id", state.mInfo.tm_id);
    formData.append("tm_pw", state.mInfo.tm_pw);
    dispatch({ type: "logout" });
    axios.post(`${process.env.NEXT_PUBLIC_PHP_API}/logout`, formData).then((res) => {
      if (res.data.code === "TRUE") {
        //로그아웃 성공
        cookie.save("mInfo", null);
        dispatch({ type: "logout" });
        router.push("/").then(() => alert(res.data.msg));
      } else {
        alert(res.data.msg);
      }
    });
  }
  useEffect(() => {
    if (!state.loginFlag) {
      //비로그인
      router?.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>signup | Nextjs made by junyeob</title>
      </Head>

      <div>
        <Segment>
          <Header as="h2" floated="left">
            {state.loginFlag && <>{state.mInfo.tm_name}님 환영합니다!</>}
          </Header>

          <Divider clearing />
        </Segment>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const API_URL = process.env.NEXT_PUBLIC_LIST_API;
  const res = await axios.get(API_URL);
  const data = res.data;
  return {
    paths: data.slice(0, 9).map((item) => ({
      params: {
        id: item.id.toString(),
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name,
    },
  };
}
