/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-sync-scripts */
import { Divider, Header, Segment, Grid, Container, Button } from "semantic-ui-react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFavoriteType } from "../../Config/GlobalJs";
import { HeadInfo } from "../../src/component/HeadInfo";

export default function List({ list }) {
  const router = useRouter();
  const [selectData, setSelect] = useState(false);
  let sub_query = "";

  function getClickHandler(idx) {
    var result = list.filter((element) => element.tff_seq == idx)[0];
    setSelect(result);
  }

  const initMap = () => {
    let markers = [];
    var map = new naver.maps.Map("map", {
      zoom: 9,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_LEFT,
        style: naver.maps.ZoomControlStyle.SMALL,
      },
    });

    var htmlMarker1 = {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
      size: N.Size(40, 40),
      anchor: N.Point(20, 20),
    };

    for (var i = 0, ii = list.length; i < ii; i++) {
      var spot = list[i],
        latlng = new naver.maps.LatLng(spot.tff_lat, spot.tff_long),
        marker = new naver.maps.Marker({
          position: latlng,
          draggable: false,
          data_idx: spot.tff_seq,
        });

      markers.push(marker);
      naver.maps.Event.addListener(markers[i], "click", function (e) {
        getClickHandler(e.overlay.data_idx);
      });
    }

    var markerClustering = new MarkerClustering({
      minClusterSize: 1,
      maxZoom: 12,
      map: map,
      markers: markers,
      disableClickZoom: false,
      gridSize: 120,
      icons: [htmlMarker1],
      indexGenerator: [10, 100, 200, 500, 1000],
      stylingFunction: function (clusterMarker, count) {
        $(clusterMarker.getElement()).find("div:first-child").text(count);
      },
    });
  };
  //useEffect hook을 사용하여 초기 페이지가 로딩될때 맵을 생성합니다.
  useEffect(() => {
    initMap();
  }, [router.query.tff_cate]);

  useEffect(() => {
    if (router.query.tff_cate) {
      sub_query += `&tff_cate=${router.query.tff_cate}`;
    }
  }, [router.query]);

  const handleLocation = (link) => {
    router.push(link);
  };
  const handleChange = (tff_cate) => {
    if (tff_cate) {
      sub_query = `tff_cate=${tff_cate}`;
    } else {
      sub_query = "";
    }
    setSelect(false);
    router.replace(`/favoriteFood/list?${sub_query}`);
  };
  return (
    <div className="favoriteFood list">
      <HeadInfo title="맛집정보" desc="맛집정보 페이지입니다." />

      <Segment>
        <Header as="h2" floated="left">
          맛집정보
        </Header>

        <Divider clearing />
        <Button content="전체" onClick={(e) => handleChange()} primary />
        <Button content="한식" onClick={(e) => handleChange("K")} color="olive" />
        <Button content="중식" onClick={(e) => handleChange("C")} color="red" />
        <Button content="양식" onClick={(e) => handleChange("U")} color="purple" />
        <Button content="일식" onClick={(e) => handleChange("J")} color="black" />
      </Segment>
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <div id="map" style={{ width: "100%", height: 500 }}></div>
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            {selectData ? (
              <Container>
                <Header as="h3">제목 </Header>
                <p>{selectData.tff_title}</p>
                <Header as="h3">설명글 </Header>
                <p>{selectData.tff_desc}</p>
                <Header as="h3">전화번호 </Header>
                <p>{selectData.tff_tel}</p>
                <Header as="h3">상세 주소 </Header>
                <p>{selectData.tff_address}</p>
                <Header as="h3">음식 카테고리 </Header>
                <p>{getFavoriteType(selectData.tff_cate)}</p>
                <Header as="h3">추천수 </Header>
                <p>{selectData.tff_recommend}</p>
                <Header as="h3">등록일 </Header>
                <p>{selectData.tff_regDate}</p>
                <Header as="h3">등록자 </Header>
                <p>{selectData.tm_name}</p>
              </Container>
            ) : (
              <Container>
                <Header as="h2">지도에 공유되어져 있는 맛집을 클릭해보세요!</Header>
              </Container>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment basic textAlign="center">
        <Button onClick={() => handleLocation(`/favoriteFood/register`)} primary>
          맛집 등록하기
        </Button>
        <Button onClick={() => handleLocation(`/favoriteFood/myList`)} color="black">
          내 맛집 보러가기
        </Button>
      </Segment>
    </div>
  );
}

export async function getServerSideProps(context) {
  let sub_query = "";
  if (context.query.tff_cate) {
    sub_query += `&tff_cate=${context.query.tff_cate}`;
  } else {
    sub_query += `&tff_cate=""`;
  }
  const API_URL = `${process.env.NEXT_PUBLIC_PHP_API}/favoriteFood/list?${sub_query}`;
  const res = await axios.get(API_URL);
  return {
    props: {
      list: res.data.list,
    },
  };
}
