/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Header, Segment, Grid, Image, Input } from "semantic-ui-react";
import $ from "jquery";
import axios from "axios";
import Head from "next/head";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Button } from "semantic-ui-react";
import { authContext } from "../../ContextApi/Context";

export default function Mypage({ userData }) {
  const [state, dispatch] = useContext(authContext);
  const router = useRouter();

  function handleLogout() {
    const formData = new FormData();
    formData.append("tm_id", state.mInfo.tm_id);
    formData.append("tm_pw", state.mInfo.tm_pw);

    axios.post(`${process.env.NEXT_PUBLIC_PHP_API}/user/logout`, formData).then((res) => {
      if (res.data.code === "TRUE") {
        //로그아웃 성공
        cookie.remove("mInfo", { path: "/" });
        dispatch({ type: "logout" });
        router.push("/").then(() => alert(res.data.msg));
      } else {
        alert(res.data.msg);
      }
    });
  }
  const handleLocation = (link) => {
    router.push(link);
  };

  function handleChange(input) {
    const formData = new FormData();
    formData.append("tm_img", $("#inp-img")[0].files[0]);
    formData.append("type", "modify_img");
    formData.append("tm_seq", userData.tm_seq);

    axios.post(`${process.env.NEXT_PUBLIC_PHP_API}/user/modify`, formData).then((res) => {
      if (res.data.code === "TRUE") {
        alert(res.data.msg);
        if (input.target.files && input.target.files[0]) {
          // 이미지 파일인지 검사 (생략)
          // FileReader 인스턴스 생성
          const reader = new FileReader();
          // 이미지가 로드가 된 경우
          reader.onload = (e) => {
            const previewImage = document.getElementById("user-img");
            previewImage.src = e.target.result;
          };
          // reader가 이미지 읽도록 하기
          reader.readAsDataURL(input.target.files[0]);
        }
      } else {
        alert(res.data.msg);
      }
    });
  }
  return (
    <>
      <Head>
        <title>회원페이지</title>
      </Head>
      {userData?.tm_seq && (
        <div>
          <Segment>
            <Header as="h2" floated="left">
              {userData.mInfo.tm_name}님 환영합니다!
            </Header>

            <Divider clearing />
            <Grid celled>
              <Grid.Row>
                <Grid.Column width={3} textAlign={"center"} verticalAlign="middle">
                  {!userData.mInfo.tm_img ? <Image id="user-img" src="/images/daniel.jpg" /> : <Image id="user-img" src={userData.mInfo.tm_img} />}
                  <Input type="file" id="inp-img" style={{ display: "none" }} onChange={handleChange} />

                  <Button onClick={() => $("#inp-img").click()} primary style={{ marginTop: 20 }}>
                    사진변경
                  </Button>
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
          <Segment basic textAlign="center">
            <Button onClick={() => handleLocation("/member/modify")} primary>
              회원정보수정
            </Button>
            <Button onClick={handleLogout} color={"black"}>
              로그아웃
            </Button>
          </Segment>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const seq = context.req.cookies.mInfo ? JSON.parse(context.req.cookies.mInfo)?.tm_seq : null;
  if (!seq) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  const apiUrl = `${process.env.NEXT_PUBLIC_PHP_API}/user/userinfo?tm_seq=${seq}`;
  const res = await axios.get(apiUrl);
  let data = res?.data;

  return {
    props: {
      userData: data,
    },
  };
}
