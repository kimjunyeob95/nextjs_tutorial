/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Header, Segment, Table, Image } from "semantic-ui-react";
import $ from "jquery";
import axios from "axios";
import Head from "next/head";
import cookie from "react-cookies";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { authContext } from "../../ContextApi/Context";

export default function List() {
  const [state, dispatch] = useContext(authContext);
  const router = useRouter();

  const handleLocation = (link) => {
    router.push(link);
  };

  return (
    <>
      <Head>
        <title>자유게시판</title>
      </Head>
      <Segment>
        <Header as="h2" floated="left">
          자유게시판
        </Header>

        <Divider clearing />

        <Table striped textAlign="center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>번호</Table.HeaderCell>
              <Table.HeaderCell width={3}>제목</Table.HeaderCell>
              <Table.HeaderCell width={4}>내용</Table.HeaderCell>
              <Table.HeaderCell width={1}>썸네일</Table.HeaderCell>
              <Table.HeaderCell width={1}>추천수</Table.HeaderCell>
              <Table.HeaderCell width={1}>작성자</Table.HeaderCell>
              <Table.HeaderCell width={1}>작성일시</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>안녕하세요</Table.Cell>
              <Table.Cell>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</Table.Cell>
              <Table.Cell>
                <Image width={80} src="/images/defaultThumb.png" />{" "}
              </Table.Cell>
              <Table.Cell>3</Table.Cell>
              <Table.Cell>관ㄹ지ㅏ</Table.Cell>
              <Table.Cell>2020-01-20 11:12</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
      <Segment basic textAlign="center">
        <Button onClick={() => handleLocation("/freeBoard/register")} primary>
          등록하기
        </Button>
      </Segment>
    </>
  );
}
