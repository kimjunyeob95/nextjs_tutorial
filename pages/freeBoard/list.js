/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Header, Segment, Table, Image, Button, Input, Form } from "semantic-ui-react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function List({ allCount, list }) {
  const router = useRouter();
  let sub_query = "";

  useEffect(() => {
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
  }, [router.query]);
  const searchOption = [
    { key: 1, value: "tfb_title", text: "제목" },
    { key: 2, value: "tfb_content", text: "내용" },
    { key: 3, value: "tfb_regSeq", text: "작성자" },
  ];
  const handleLocation = (link) => {
    router.push(link);
  };
  const handleSubmit = (event) => {
    const searchValue = $("#searchValue").val();
    const searchType = $("#searchType").val();
    sub_query = `page=${router.query.page ? router.query.page : 1}&searchType=${searchType ? encodeURI(searchType) : ""}&searchValue=${
      searchValue ? encodeURI(searchValue) : ""
    }`;
    router.replace(`/freeBoard/list?${sub_query}`);
  };
  const handlePageClick = (event) => {
    sub_query = "";
    if (router.query.searchType) {
      sub_query += `&searchType=${encodeURI(router.query.searchType)}`;
    }
    if (router.query.searchValue) {
      sub_query += `&searchValue=${encodeURI(router.query.searchValue)}`;
    }
    router.replace(`/freeBoard/list?page=${event.selected + 1}${sub_query}`);
  };
  return (
    <div className="freeBoard list">
      <Head>
        <title>자유게시판</title>
        <meta name="description" content="자유게시판 페이지입니다."></meta>
      </Head>
      <Segment>
        <Header as="h2" floated="left">
          자유게시판
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
            >
              {searchOption.map((element) => (
                <option key={element?.key} value={element.value}>
                  {element.text}
                </option>
              ))}
            </Form.Field>
            <Form.Field
              width={4}
              className="form-field"
              id="searchValue"
              defaultValue={router.query.searchValue}
              control={Input}
              placeholder="검색어를 입력하세요."
            />
            <Form.Field id="form-button-control-public" control={Button} content="검색" onClick={(e) => handleSubmit(e)} primary />
            <Form.Field width={2} control={Button} content="검색초기화" onClick={(e) => router.replace("/freeBoard/list")} color="black" />
          </Form.Group>
        </Form>

        <Table striped textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>번호</Table.HeaderCell>
              <Table.HeaderCell width={3}>제목</Table.HeaderCell>
              <Table.HeaderCell width={4}>내용</Table.HeaderCell>
              <Table.HeaderCell width={1}>썸네일</Table.HeaderCell>
              <Table.HeaderCell width={1}>조회수</Table.HeaderCell>
              <Table.HeaderCell width={1}>작성자</Table.HeaderCell>
              <Table.HeaderCell width={1}>작성일시</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {list.length > 0 ? (
              list?.map((element, index) => (
                <Table.Row
                  className="cusor pointer"
                  key={element.tfb_seq}
                  onClick={() => router.push(`/freeBoard/detail/${element.tfb_seq}?${sub_query}`)}
                >
                  <Table.Cell>{allCount - index}</Table.Cell>
                  <Table.Cell>{element.tfb_title}</Table.Cell>
                  <Table.Cell>{element.tfb_content}</Table.Cell>
                  <Table.Cell>
                    {element.tfb_thumb ? <Image width={80} src={element.tfb_thumb} /> : <Image width={80} src="/images/defaultThumb.png" />}
                  </Table.Cell>
                  <Table.Cell>{element.tfb_view_count}</Table.Cell>
                  <Table.Cell>{element.tm_name}</Table.Cell>
                  <Table.Cell>{element.tfb_regDate}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={7}>No Data</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        {list.length > 0 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel="다음"
            onPageChange={handlePageClick}
            pageRangeDisplayed={6}
            pageCount={Math.ceil(allCount / 10)}
            previousLabel="이전"
            renderOnZeroPageCount={null}
            initialPage={router.query.page ? router.query.page - 1 : 0}
          />
        )}
      </Segment>
      <Segment basic textAlign="center">
        <Button onClick={() => handleLocation(`/freeBoard/register`)} primary>
          등록하기
        </Button>
      </Segment>
    </div>
  );
}

export async function getServerSideProps(context) {
  let sub_query = "";

  if (context.query.page) {
    sub_query += `page=${context.query.page}`;
  } else {
    sub_query += `page=1`;
  }
  if (context.query.searchType) {
    sub_query += `&searchType=${encodeURI(context.query.searchType)}`;
  } else {
    sub_query += `&searchType=""`;
  }
  if (context.query.searchValue) {
    sub_query += `&searchValue=${encodeURI(context.query.searchValue)}`;
  } else {
    sub_query += `&searchValue=""`;
  }
  const API_URL = `${process.env.NEXT_PUBLIC_PHP_API}/freeBoard/list?${sub_query}`;
  const res = await axios.get(API_URL);

  return {
    props: {
      list: res.data.list,
      allCount: res.data.allCount,
    },
  };
}
