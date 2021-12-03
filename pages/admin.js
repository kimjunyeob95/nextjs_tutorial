/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";

export default function Admin() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  function checkLogin() {
    axios.get("/api/isLogin").then((res) => {
      if (res.status === 200 && res.data.name) {
        //로그인
        setIsLogin(true);
      } else {
        //비로그인
        router.push("/login");
      }
    });
  }

  function handleLogout() {
    axios.post("/api/logout").then((res) => {
      if (res.status === 200) {
        //로그인
        router.push("/").then((res) => alert("로그아웃 되었습니다."));
      }
    });
  }
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <div>
      admin
      {isLogin && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
}
