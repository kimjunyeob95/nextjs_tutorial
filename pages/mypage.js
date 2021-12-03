/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Header, Segment, Grid, Image } from "semantic-ui-react";
import axios from "axios";
import Head from "next/head";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";
import { Button } from "semantic-ui-react";
import { authContext } from "../ContextApi/Context";

export default function Mypage({ userData }) {
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
    if (!userData?.tm_seq) {
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
            {userData.mInfo.tm_name}님 환영합니다!
          </Header>

          <Divider clearing />
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={3}>
                {!userData.mInfo.tm_img ? <Image src="/images/daniel.jpg" /> : <Image src={userData.mInfo.tm_img} />}
              </Grid.Column>
              <Grid.Column width={13}>
                <Header size="medium">Id : {userData.mInfo.tm_id}</Header>
                <Header size="medium">Password : {userData.mInfo.tm_pw?.replace(/.{3}$/gi, "***")}</Header>
                <Header size="medium">Email : {userData.mInfo.tm_email}</Header>
                <Header size="medium">방문 횟수 : {userData.mInfo.tm_join_count}</Header>
                <Header size="medium">회원 가입일 : {userData.mInfo.tm_regDate}</Header>
                <Header size="medium">마지막 접속 IP : {userData.mInfo.tm_lastip}</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const seq = JSON.parse(context.req.cookies.mInfo)?.tm_seq;
  const apiUrl = `${process.env.NEXT_PUBLIC_PHP_API}/userinfo?tm_seq=${seq}`;
  const res = await axios.get(apiUrl);
  const data = res?.data;

  return {
    props: {
      userData: data,
    },
  };
}
