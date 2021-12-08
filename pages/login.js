import axios from "axios";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import { authContext } from "../ContextApi/Context";

export default function Login() {
  const [state, dispatch] = useContext(authContext);
  const router = useRouter();

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
        expires.setDate(expires.getDate() + 1);
        if (!cookie.load("mInfo")) {
          cookie.save("mInfo", res.data.mInfo, {
            path: "/",
            expires,
          });
        }

        dispatch({ type: "login", mInfo: res.data.mInfo });
        router.push("/member/mypage").then(() => alert(res.data.msg));
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
