/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";

import { useRouter } from "next/router";
import { Container, Header, Segment, Divider, Button, Form, Input, Image, textArea } from "semantic-ui-react";

export default function Tfb_seq({ mSeq }) {
  const router = useRouter();
  function handleChange(input) {
    if (input.target.files && input.target.files[0]) {
      // 이미지 파일인지 검사 (생략)
      // FileReader 인스턴스 생성
      const reader = new FileReader();
      // 이미지가 로드가 된 경우
      reader.onload = (e) => {
        const previewImage = document.getElementById("target_img");
        previewImage.src = e.target.result;
      };
      // reader가 이미지 읽도록 하기
      reader.readAsDataURL(input.target.files[0]);
    }
  }

  const handleSubmit = () => {
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
      formData.append("tfb_thumb", $("#inp-img")[0].files[0]);
      formData.append("tfb_title", $("#tfb_title").val());
      formData.append("tfb_content", $("#tfb_content").val());
      formData.append("tfb_regSeq", mSeq);

      axios.post(`${process.env.NEXT_PUBLIC_PHP_API}/freeBoard/addBoard`, formData).then((res) => {
        if (res.data.code === "TRUE") {
          router.push("/freeBoard/list").then(() => alert(res.data.msg));
        } else {
          alert(res.data.msg);
        }
      });
    }
  };
  return (
    <>
      <Segment>
        <Header as="h2" floated="left">
          자유게시판 등록{" "}
        </Header>

        <Divider clearing />
        <Container style={{ marginTop: 30 }}>
          <Form>
            <Form.Field>
              <label>제목</label>
              <input id="tfb_title" className="chk-validation" title="제목을" placeholder="제목을 입력하세요." defaultValue="" />
            </Form.Field>
            <Form.Field>
              <label>내용</label>
              <textArea className="chk-validation" title="내용을" placeholder="내용을 입력하세요." id="tfb_content" />
            </Form.Field>
            <Form.Field>
              <label>이미지</label>
              <Input type="file" id="inp-img" style={{ display: "none" }} onChange={handleChange} />
              <Image id="target_img" width={300} src="/images/defaultThumb.png" />
              <Button onClick={() => $("#inp-img").click()} primary style={{ marginTop: 20 }}>
                사진등록
              </Button>
            </Form.Field>

            <Segment basic textAlign="center">
              <Button primary onClick={() => handleSubmit()}>
                등록하기
              </Button>
              <Button color={"black"} onClick={() => router.push(`/freeBoard/list`)}>
                목록으로
              </Button>
            </Segment>
          </Form>
        </Container>
      </Segment>
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
  } else {
    return { props: { mSeq: seq } };
  }
}
