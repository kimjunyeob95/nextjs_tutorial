/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-sync-scripts */
import { Table } from "semantic-ui-react";
import axios from "axios";

import { HeadInfo } from "src/component/HeadInfo";

export default function List({ list }) {
  return (
    <div className="favoriteFood list">
      <HeadInfo title="맛집정보" desc="맛집정보 페이지입니다." />
      <Table striped textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>번호</Table.HeaderCell>
            <Table.HeaderCell width={3}>제목</Table.HeaderCell>
            <Table.HeaderCell width={4}>내용</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {list.data2.usage_list.length > 0 ? (
            list.data2.usage_list?.map((element, index) => (
              <Table.Row className="cusor pointer" key={element.history_id}>
                <Table.Cell>{element.history_id}</Table.Cell>
                <Table.Cell>{element.date}</Table.Cell>
                <Table.Cell>{element.title}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={3}>No Data</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export async function getServerSideProps() {
  const header_config = {
    headers: {
      "X-dalkomm-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVTFTb0I4TXhTUWxMREc0YmtWUjBmRFB0UkxnaTRtd05pK0wwQjJMb1Q2Z3lUallKQlRHcnhkeElmYVZEZHRwQSIsImF1ZCI6IkRBTEtPTU1fQVBQIiwidW5pb25fdXNlcl9pZCI6InE3bEU3SHFKdUdWbEhjNDhld21FOThyRUhaQ1lXU09tcVpXZFFtUEZlUTdJTkNZbXBmaFJxckZjcXNjdDRPRngiLCJpc3MiOiJEQUxLT01NIiwidXNlcl9sb2dpbl90eXBlIjoiRCIsImlhdCI6MTY0MDA0OTY2Mn0.OYjLsuDZpQL0-NPu70HbNQb-3w6wxYzeEv4SZOT7YE8",
      Authorization: "Basic ZGFsa29tbTpkYWxrb21tX2FwcDszNjdjZjUxMjFkM2I3NTc5ZGVlMDA3YTliODcwNTJiYmU3ZDNhNmY2OzIwMjExMjIxMTEyMDM2",
    },
  };
  const res = await axios
    .all([
      axios.post(`https://dev-app.dalkomm.com/app/api/v2/membership`, {}, header_config),
      axios.post(`https://dev-app.dalkomm.com/app/api/v2/chargecard/usage`, { card_number: 8980180000750183 }, header_config),
    ])
    .then(
      axios.spread((res1, res2) => {
        let res1_data = res1.data.data;
        let res2_data = res2.data.data;

        return { data1: res1_data, data2: res2_data };
      })
    );
  return {
    props: {
      list: res,
    },
  };
}
