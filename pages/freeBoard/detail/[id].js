/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { authContext } from "../../../ContextApi/Context";
import { useRouter } from "next/router";
import { Loader, Container, Header, Segment, Divider, Image, Comment, Button, Form } from "semantic-ui-react";

export default function Tfb_seq({ item, comment }) {
  const router = useRouter();
  const [apiData, setApi] = useState();
  const [commentList, setCommentList] = useState(comment);
  const [state] = useContext(authContext);

  useEffect(() => {
    setApi(item);
  }, [state]);
  let sub_query = "";
  if (router.query.page) {
    sub_query += `page=${router.query.page}`;
  } else {
    sub_query += `page=1`;
  }
  if (router.query.searchType) {
    sub_query += `&searchType=${router.query.searchType}`;
  }
  if (router.query.searchValue) {
    sub_query += `&searchValue=${router.query.searchValue}`;
  }

  useEffect(() => {
    if (!item) {
      alert("해당 게시물은 없습니다.");
      return false;
    }
    axios.get(`${process.env.NEXT_PUBLIC_PHP_API}/freeBoard/addView?tfb_seq=${router.query.id}`);
  }, []);

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

    if (!$(e).parent().find("textarea").val()) {
      alert("댓글 내용을 채워주세요.");
      return false;
    }

    const formData = new FormData();
    formData.append("tfc_tfb_seq", router.query.id);
    formData.append("tfc_tm_seq", state.mInfo.tm_seq);
    formData.append("tfc_parents_seq", tfc_parents_seq);
    formData.append("tfc_content", $(e).parent().find("textarea").val());

    axios.post(`${process.env.NEXT_PUBLIC_PHP_API}/freeBoard/addBoardComment`, formData).then((res) => {
      if (res.data.code === "TRUE") {
        alert(res.data.msg);
        $("textarea").val("");
        axios.get(`${process.env.NEXT_PUBLIC_PHP_API}/freeBoard/detail?id=${router.query.id}`).then((res) => {
          if (res.data.code === "TRUE") {
            setApi(res.data.data);
            setCommentList(res.data.comment);
          }
        });
      } else {
        alert(res.data.msg);
      }
    });
  };
  const handleReply = (e) => {
    $(e).parent().next().show();
  };
  const handleRemove = () => {
    axios.get(`${process.env.NEXT_PUBLIC_PHP_API}/freeBoard/removeBoard?tfb_seq=${item.tfb_seq}`).then((res) => {
      if (res.data.code === "TRUE") {
        router.push(`/freeBoard/list?${sub_query}`).then(() => alert(res.data.msg));
      } else {
        alert(res.data.msg);
      }
    });
  };
  return (
    <>
      {apiData && (
        <>
          <Segment>
            <Header as="h2" floated="left">
              자유게시판 상세{" "}
            </Header>
            <Header as="h4" floated="right">
              조회수 : {apiData.tfb_view_count}
            </Header>
            <Header as="h4" floated="right">
              |
            </Header>
            <Header as="h4" floated="right">
              작성자 : {apiData.tm_name}
            </Header>
            <Divider clearing />
            <Container style={{ marginTop: 30 }}>
              <Header as="h3">제목</Header>
              <p>{apiData.tfb_title}</p>
              <Divider hidden />
              <Header as="h3">내용</Header>
              <p>{apiData.tfb_content}</p>
              <Divider hidden />
              <Header as="h3">이미지</Header>
              {apiData.tfb_thumb ? <Image width={300} src={apiData.tfb_thumb} /> : <Image width={300} src="/images/defaultThumb.png" />}
              <Divider hidden />
              <Header as="h3">등록일</Header>
              <p>{apiData.tfb_regDate}</p>
              <Divider hidden />
            </Container>
          </Segment>
          {commentList && (
            <div>
              <Segment>
                <Comment.Group>
                  <Header as="h3" dividing>
                    댓글
                  </Header>

                  {commentList.map((element) => {
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
                    <Form.TextArea />
                    <Button onClick={(e) => handleSubmit(e.currentTarget)} content="댓글 작성하기" labelPosition="left" icon="edit" primary />
                  </Form>
                </Comment.Group>
              </Segment>
              <Segment basic textAlign="center">
                <Button
                  onClick={() => router.push(`/freeBoard/modify/${apiData.tfb_seq}?${sub_query}`)}
                  primary
                  style={{ display: `${state?.mInfo?.tm_seq !== apiData.tfb_regSeq ? "none" : "inline"}` }}
                >
                  게시글 수정
                </Button>
                <Button color={"black"} onClick={() => router.push(`/freeBoard/list?${sub_query}`)}>
                  목록으로
                </Button>
                <Button
                  onClick={() => handleRemove()}
                  color={"red"}
                  style={{ display: `${state?.mInfo?.tm_seq !== apiData.tfb_regSeq ? "none" : "inline"}` }}
                >
                  게시글 삭제
                </Button>
              </Segment>
            </div>
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
    paths: data.slice(0, 10).map((item) => ({
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
  if (!res.data.data) {
    return {
      redirect: {
        destination: "/freeBoard/list",
      },
    };
  }

  return {
    props: {
      item: res.data.data ? res.data.data : null,
      comment: res.data.comment ? res.data.comment : null,
    },
    revalidate: 1,
  };
}
