/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";

import { useContext } from "react";
import { authContext } from "../../../ContextApi/Context";
import { useRouter } from "next/router";
import { Loader, Container, Header, Segment, Divider, Image, Comment, Button, Form } from "semantic-ui-react";

export default function Tfb_seq({ item, comment }) {
  const router = useRouter();
  const [state] = useContext(authContext);

  if (router.isFallback) {
    return (
      <div style={{ padding: "100px 0" }}>
        <Loader active inline="centered">
          Loading
        </Loader>
      </div>
    );
  }

  const handleSubmit = (e, tfc_parents_seq = 0) => {
    if (!state.loginFlag) {
      router.push("/login").then(() => alert("로그인을 해주세요."));
      return false;
    }

    if (!$("#tfc_content").val()) {
      alert("댓글 내용을 채워주세요.");
      return false;
    }

    const formData = new FormData();
    formData.append("tfc_tfb_seq", router.query.id);
    formData.append("tfc_tm_seq", state.mInfo.tm_seq);
    formData.append("tfc_parents_seq", tfc_parents_seq);
    formData.append("tfc_content", $("#tfc_content").val());

    axios.post(`${process.env.NEXT_PUBLIC_PHP_API}/freeBoard/addBoard`, formData).then((res) => {
      if (res.data.code === "TRUE") {
        alert(res.data.msg);
        router.reload(window.location.pathname);
      } else {
        alert(res.data.msg);
      }
    });
  };
  const handleReply = (e) => {
    $(e).parent().next().show();
  };
  return (
    <>
      {item && (
        <>
          <Segment>
            <Header as="h2" floated="left">
              자유게시판 상세
            </Header>
            <Header as="h4" floated="right">
              추천수 : {item.tfb_favorite_count}
            </Header>
            <Header as="h4" floated="right">
              |
            </Header>
            <Header as="h4" floated="right">
              작성자 : {item.tm_name}
            </Header>

            <Divider clearing />
            <Container style={{ marginTop: 30 }}>
              <Header as="h3">제목</Header>
              <p>{item.tfb_title}</p>
              <Divider hidden />
              <Header as="h3">내용</Header>
              <p>{item.tfb_content}</p>
              <Divider hidden />
              <Header as="h3">이미지</Header>
              {item.tfb_thumb ? <Image width={300} src={item.tfb_thumb} /> : <Image width={300} src="/images/defaultThumb.png" />}
              <Divider hidden />
              <Header as="h3">등록일</Header>
              <p>{item.tfb_regDate}</p>
              <Divider hidden />
            </Container>
          </Segment>
          {comment && (
            <Segment>
              <Comment.Group>
                <Header as="h3" dividing>
                  댓글
                </Header>

                {comment.map((element) => {
                  return (
                    <Comment key={element?.tfc_seq}>
                      {element?.tm_img ? <Comment.Avatar src={element?.tm_img} /> : <Comment.Avatar src="/images/daniel.jpg" />}

                      <Comment.Content>
                        <Comment.Author as="span">{element.tm_name}</Comment.Author>
                        <Comment.Metadata>
                          <div>{element.tfc_regDate.slice(0, 16)}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                          <p>{element.tfc_content}</p>
                        </Comment.Text>

                        <Comment.Actions>
                          <Comment.Action onClick={(e) => handleReply(e.currentTarget)}>Reply</Comment.Action>
                        </Comment.Actions>
                        <Form reply hidden>
                          <Form.TextArea />
                          <Button
                            onClick={(e) => handleSubmit(e.currentTarget, element?.tfc_seq)}
                            content="리플달기"
                            labelPosition="left"
                            icon="edit"
                            primary
                          />
                        </Form>
                      </Comment.Content>
                      {element?.children &&
                        element.children.map((element2) => (
                          <Comment.Group key={element2?.tfc_seq}>
                            <Comment>
                              {element2?.tm_img ? <Comment.Avatar src={element2?.tm_img} /> : <Comment.Avatar src="/images/daniel.jpg" />}
                              <Comment.Content>
                                <Comment.Author as="span">{element2.tm_name}</Comment.Author>
                                <Comment.Metadata>
                                  <div>{element2.tfc_regDate.slice(0, 16)}</div>
                                </Comment.Metadata>
                                <Comment.Text>{element2.tfc_content}</Comment.Text>
                              </Comment.Content>
                            </Comment>
                          </Comment.Group>
                        ))}
                    </Comment>
                  );
                })}

                <Form reply>
                  <Form.TextArea id="tfc_content" />
                  <Button onClick={(e) => handleSubmit(e.currentTarget)} content="댓글 작성하기" labelPosition="left" icon="edit" primary />
                </Form>
              </Comment.Group>
            </Segment>
          )}
        </>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const API_URL = `${process.env.NEXT_PUBLIC_PHP_API}/freeBoard/list`;
  const res = await axios.get(API_URL);
  const data = res.data.list;

  return {
    paths: data.slice(0, 9).map((item) => ({
      params: {
        id: item.tfb_seq.toString(),
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const apiUrl = `${process.env.NEXT_PUBLIC_PHP_API}/freeBoard/detail?id=${id}`;
  const res = await axios.get(apiUrl);

  return {
    props: {
      item: res.data.data ? res.data.data : null,
      comment: res.data.comment ? res.data.comment : null,
    },
  };
}
