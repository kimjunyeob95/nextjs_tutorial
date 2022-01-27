import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Head from "next/head";
import { Button, Checkbox, Form, Header, Container } from "semantic-ui-react";
import { authContext } from "ContextApi/Context";

export default function Signup() {
  const [state, dispatch] = useContext(authContext);
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();

  useEffect(() => {
    if (cookies.mInfo) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit() {
    let validation = true;
    $(".chk-validation").each(function (i, e) {
      if ($(e).val() === "") {
        validation = false;
        alert(`${$(e).attr("title")} 입력하세요.`);
        $(e).focus();
        return false;
      }
    });

    if (validation) {
      if (!$("#agreeFlag").is(":checked")) {
        validation = false;
        alert(`회원가입 동의를 체크해주세요.`);
        $("#agreeFlag").focus();
        return false;
      }
      const formData = new FormData();
      formData.append("tm_id", $("#tm_id").val());
      formData.append("tm_pw", $("#tm_pw").val());
      formData.append("tm_name", $("#tm_name").val());
      formData.append("tm_email", $("#tm_email").val());
      axios.post(`${process.env.NEXT_PUBLIC_PHP_API}/user/signup`, formData).then((res) => {
        if (res.data.code === "TRUE") {
          //로그인 성공
          const expires = new Date();
          //1*60*1000 => 1분
          expires.setTime(expires.getTime() + 2 * 60 * 60 * 1000); //2시간
          setCookie("mInfo", res.data.mInfo, {
            path: "/",
            expires,
            samesite: "none",
            secure: true,
          });

          dispatch({ type: "login", mInfo: res.data.mInfo });
          router.push("/member/mypage").then(() => alert(res.data.msg));
        } else if (res.data.code !== "TRUE") {
          alert(res.data.msg);
          return false;
        }
      });
    }
  }
  return (
    <>
      <Head>
        <title>signup | Nextjs made by junyeob</title>
      </Head>
      <Container style={{ marginTop: "2vw" }}>
        <Header as="h2">회원가입</Header>
        <Form>
          <Form.Field>
            <label>Id</label>
            <input type="text" className="chk-validation" title="아이디를" id="tm_id" placeholder="아이디를 입력하세요." />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" className="chk-validation" title="비밀번호를" id="tm_pw" placeholder="비밀번호를 입력하세요." />
          </Form.Field>
          <Form.Field>
            <label>Nickname</label>
            <input type="text" className="chk-validation" title="별명을" id="tm_name" placeholder="별명을 입력하세요." />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input type="email" className="chk-validation" title="이메일을" id="tm_email" placeholder="이메일을 입력하세요." />
          </Form.Field>
          <Form.Field>
            <Checkbox id="agreeFlag" className="chk-agree" label="회원가입에 동의 합니다." />
          </Form.Field>
          <Button type="submit" primary onClick={handleSubmit}>
            회원가입
          </Button>
        </Form>
      </Container>
    </>
  );
}
