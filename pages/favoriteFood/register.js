/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import { Container, Header, Segment, Divider, Button, Form } from "semantic-ui-react";
import DaumPostcode from "react-daum-postcode";
import { useState } from "react";

export default function Tfb_seq({ mSeq }) {
  const router = useRouter();
  const [apiDisplay, setDisplay] = useState(false);
  const searchOption = [
    { key: 1, value: "K", text: "한식" },
    { key: 2, value: "C", text: "중식" },
    { key: 3, value: "U", text: "양식" },
    { key: 4, value: "J", text: "일식" },
  ];
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
      formData.append("tff_cate", $("#tff_cate").val());
      formData.append("tff_title", $("#tff_title").val());
      formData.append("tff_desc", $("#tff_desc").val());
      formData.append("tff_address", $("#tff_address").val());
      formData.append("tff_lat", $("#tff_lat").val());
      formData.append("tff_long", $("#tff_long").val());
      formData.append("tff_tel", $("#tff_tel").val());
      formData.append("tff_regSeq", mSeq);

      axios.post(`${process.env.NEXT_PUBLIC_PHP_API}/favoriteFood/add`, formData).then((res) => {
        if (res.data.code === "TRUE") {
          router.push("/favoriteFood/list").then(() => alert(res.data.msg));
        } else {
          alert(res.data.msg);
        }
      });
    }
  };

  const handleComplete = (event) => {
    $("#tff_address").val(event.address);
    setDisplay(!apiDisplay);
    axios
      .post(
        `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=${event.address}`,
        {},
        {
          headers: { Authorization: "KakaoAK 894cb9106073b928fd3ffaa9ef24db7c" },
        }
      )
      .then((res) => {
        let res_data = res.data.documents[0];
        $("#tff_long").val(res_data.x);
        $("#tff_lat").val(res_data.y);
      });
  };
  return (
    <>
      <Segment>
        <Header as="h2" floated="left">
          맛집 등록{" "}
        </Header>

        <Divider clearing />
        <Container style={{ marginTop: 30 }}>
          <Form>
            <Form.Field label="음식 카테코리" width={2} className="selection" id="tff_cate" control="select" defaultValue={searchOption[0].value}>
              {searchOption.map((element) => (
                <option key={element?.key} value={element.value}>
                  {element.text}
                </option>
              ))}
            </Form.Field>
            <Form.Field>
              <label>제목</label>
              <input id="tff_title" className="chk-validation" title="제목을" placeholder="제목을 입력하세요." />
            </Form.Field>
            <Form.Field>
              <label>설명글</label>
              <textArea id="tff_desc" className="chk-validation" title="설명글을" placeholder="설명글을 입력하세요." />
            </Form.Field>
            <Form.Field>
              <label>상세 주소</label>
              <input
                id="tff_address"
                onClick={() => setDisplay(!apiDisplay)}
                className="chk-validation"
                title="상세 주소를"
                placeholder="상세 주소를 입력하세요."
                readOnly
              />
              {apiDisplay && <DaumPostcode className="post-wrap" onComplete={(e) => handleComplete(e)} autoClose={false} />}
            </Form.Field>
            <Form.Field>
              <label>위도</label>
              <input id="tff_lat" readOnly className="chk-validation" title="위도를" placeholder="위도를 입력하세요." />
            </Form.Field>
            <Form.Field>
              <label>경도</label>
              <input id="tff_long" readOnly className="chk-validation" title="경도를" placeholder="경도를 입력하세요." />
            </Form.Field>
            <Form.Field>
              <label>연락처</label>
              <input id="tff_tel" className="chk-validation" title="연락처를" placeholder="연락처를 입력하세요." />
            </Form.Field>
            <Segment basic textAlign="center">
              <Button primary onClick={() => handleSubmit()}>
                등록하기
              </Button>
              <Button color={"black"} onClick={() => router.push(`/favoriteFood/list`)}>
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
