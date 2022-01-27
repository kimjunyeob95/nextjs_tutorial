import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import { authContext } from "ContextApi/Context";
import { useCookies } from "react-cookie";

export default function Login() {
  const [state, dispatch] = useContext(authContext);
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();

  useEffect(() => {
    if (cookies.mInfo) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function login() {
    if (!$("#tm_id").val()) {
      alert("아이디를 입력하세요.");
      $("#tm_id").focus();
      return false;
    }
    if (!$("#tm_pw").val()) {
      alert("비밀번호를 입력하세요.");
      $("#tm_pw").focus();
      return false;
    }
    const formData = new FormData();
    formData.append("tm_id", $("#tm_id").val());
    formData.append("tm_pw", $("#tm_pw").val());
    axios.post(`${process.env.NEXT_PUBLIC_PHP_API}/user/login`, formData).then((res) => {
      
      if (res.data.code === "TRUE") {
        
        //로그인 성공
        const expires = new Date();
        //1*60*1000 => 1분
        expires.setTime(expires.getTime() + 2 * 60 * 60 * 1000); //2시간
        setCookie("mInfo", res.data.mInfo, {
          path: "/",
          expires,
        });
        dispatch({ type: "login", mInfo: res.data.mInfo });
        if (router.query.returnUrl) {
          router.push(router.query.returnUrl).then(() => alert(res.data.msg));
        } else {
          router.push("/member/mypage").then(() => alert(res.data.msg));
        }
      } else if (res.data.code !== "TRUE") {
        alert(res.data.msg);
        return false;
      }
    });
  }

  const handleDetail = (path) => {
    router.push(path);
  };
  return (
    <>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Input icon="user" id="tm_id" iconPosition="left" label="Id" placeholder="Id" />
              <Form.Input icon="lock" id="tm_pw" iconPosition="left" label="Password" type="password" placeholder="Password" />

              <Button content="Login" primary onClick={login} />
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Button onClick={() => handleDetail("/member/signup")} content="Sign up" icon="signup" size="big" />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </>
  );
}
