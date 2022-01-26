/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Header, Segment, Table, Button, Form } from "semantic-ui-react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getFavoriteType } from "Config/GlobalJs";
import { authContext } from "ContextApi/Context";

export default function List({ list, numbering }) {
  const router = useRouter();
  let sub_query = "";

  useEffect(() => {
    if (router.query.tff_cate) {
      sub_query += `&tff_cate=${router.query.tff_cate}`;
    }
  }, [router.query.tff_cate]);
  const searchOption = [
    { key: 0, value: "", text: "전체" },
    { key: 1, value: "K", text: "한식" },
    { key: 2, value: "C", text: "중식" },
    { key: 3, value: "U", text: "양식" },
    { key: 4, value: "J", text: "일식" },
  ];

  const handleDelete = (seq) => {
    axios.get(`${process.env.NEXT_PUBLIC_PHP_API}/favoriteFood/removeMylist?tff_seq=${seq}`).then((res) => {
      if (res.data.code === "TRUE") {
        router.replace(`/favoriteFood/myList${sub_query}`).then(() => alert(res.data.msg));
      } else {
        alert(res.data.msg);
      }
    });
  };
  const handleChange = (e) => {
    let tff_cate = $(e).val();
    sub_query = "";
    if (tff_cate) {
      sub_query += `?tff_cate=${tff_cate}`;
    }
    router.replace(`/favoriteFood/myList${sub_query}`);
  };

  return (
    <div className="favoriteFood list">
      <Head>
        <title>맛집정보 내 게시글</title>
        <meta name="description" content="맛집정보 내 게시글 페이지입니다."></meta>
      </Head>
      <Segment>
        <Header as="h2" floated="left">
          맛집정보 내 게시글
        </Header>

        <Divider clearing />

        <Form id="searchForm">
          <Form.Group>
            <Form.Field
              width={2}
              className="selection"
              id="searchType"
              control="select"
              defaultValue={router.query.searchType ? router.query.searchType : searchOption[0].value}
              onChange={(e) => handleChange(e.target)}
            >
              {searchOption.map((element) => (
                <option key={element?.key} value={element.value}>
                  {element.text}
                </option>
              ))}
            </Form.Field>
          </Form.Group>
        </Form>

        <Table striped textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>번호</Table.HeaderCell>
              <Table.HeaderCell width={1}>카테고리</Table.HeaderCell>
              <Table.HeaderCell width={2}>제목</Table.HeaderCell>
              <Table.HeaderCell width={3}>내용</Table.HeaderCell>
              <Table.HeaderCell width={2}>주소</Table.HeaderCell>
              <Table.HeaderCell width={1}>추천수</Table.HeaderCell>
              <Table.HeaderCell width={2}>등록일시</Table.HeaderCell>
              <Table.HeaderCell width={1}>처리</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {list.length > 0 ? (
              list?.map((element, index) => (
                <Table.Row key={element.tff_seq}>
                  <Table.Cell>{numbering - index}</Table.Cell>
                  <Table.Cell>{getFavoriteType(element.tff_cate)}</Table.Cell>
                  <Table.Cell>{element.tff_title}</Table.Cell>
                  <Table.Cell>{element.tff_desc}</Table.Cell>
                  <Table.Cell>{element.tff_address}</Table.Cell>
                  <Table.Cell>{element.tff_recommend}</Table.Cell>
                  <Table.Cell>{element.tff_regDate.slice(0, 16)}</Table.Cell>
                  <Table.Cell>
                    <Button type="button" onClick={() => handleDelete(element.tff_seq)} color="red">
                      삭제
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={8}>No Data</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  );
}

export async function getServerSideProps(context) {
  const seq = context.req.cookies.mInfo ? JSON.parse(context.req.cookies.mInfo)?.tm_seq : null;
  let sub_query = "";

  if (context.query.tff_cate) {
    sub_query += `&tff_cate=${context.query.tff_cate}`;
  }
  const API_URL = `${process.env.NEXT_PUBLIC_PHP_API}/favoriteFood/myList?tff_regSeq=${seq}${sub_query}`;
  const res = await axios.get(API_URL);
  return {
    props: {
      list: res.data.list,
      allCount: res.data.allCount,
      numbering: res.data.numbering,
    },
  };
}
