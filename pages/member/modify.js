/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Segment } from "semantic-ui-react";
import $ from "jquery";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "semantic-ui-react";

export default function Modify({ userData }) {
  const router = useRouter();

  useEffect(() => {
    if (!userData?.tm_seq) {
      //비로그인
      router.push("/login");
    }
  }, []);

  const handleLocation = (link) => {
    router.push(link);
  };

  function handleChange(input) {
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
      const formData = new FormData();
      formData.append("tm_pw", $("#tm_pw").val());
      formData.append("tm_name", $("#tm_name").val());
      formData.append("type", "modify_info");
      formData.append("tm_seq", userData.tm_seq);

      axios.post(`${process.env.NEXT_PUBLIC_PHP_API}/user/modify`, formData).then((res) => {
        if (res.data.code === "TRUE") {
          router.push("/member/mypage").then(() => alert(res.data.msg));
        } else {
          alert(res.data.msg);
        }
      });
    }
  }
  return (
    <>
      <Head>
        <title>Modify | Nextjs made by junyeob</title>
      </Head>
      {userData?.tm_seq && (
        <Form style={{ marginTop: 30 }}>
          <Form.Field>
            <label>Id</label>
            <input placeholder="아이디를 입력하세요." disabled defaultValue={userData.mInfo.tm_id} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" className="chk-validation" title="비밀번호를" placeholder="비밀번호를 입력하세요." id="tm_pw" />
          </Form.Field>
          <Form.Field>
            <label>별명</label>
            <input placeholder="별명을 입력하세요." className="chk-validation" title="별명을" id="tm_name" defaultValue={userData.mInfo.tm_name} />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder="이메일을 입력하세요." disabled defaultValue={userData.mInfo.tm_email} />
          </Form.Field>
          <Segment basic textAlign="center">
            <Button onClick={handleChange} primary>
              수정
            </Button>
            <Button onClick={() => handleLocation("/member/mypage")} color={"black"}>
              취소
            </Button>
          </Segment>
        </Form>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const seq = context.req.cookies.mInfo ? JSON.parse(context.req.cookies.mInfo)?.tm_seq : null;
  const apiUrl = `${process.env.NEXT_PUBLIC_PHP_API}/user/userinfo?tm_seq=${seq}`;
  const res = await axios.get(apiUrl);
  const data = res?.data;

  return {
    props: {
      userData: data,
    },
  };
}
