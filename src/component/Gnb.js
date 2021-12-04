import { useRouter } from "next/dist/client/router";
import { Menu } from "semantic-ui-react";

export default function Gnb() {
  const router = useRouter();
  let activeItem;
  if (router.pathname === "/") {
    activeItem = "home";
  } else if (router.pathname === "/about") {
    activeItem = "about";
  } else if (router.pathname.indexOf("member") > 0) {
    activeItem = "회원페이지";
  } else if (router.pathname.indexOf("freeBoard") > 0) {
    activeItem = "자유게시판";
  }

  const handleGoLink = (e, data) => {
    if (data.name === "home") {
      router.push("/");
    } else if (data.name === "about") {
      router.push("/about");
    } else if (data.name === "자유게시판") {
      router.push("/freeBoard/list");
    } else if (data.name === "회원페이지") {
      router.push("/member/mypage");
    }
  };
  return (
    <div>
      <Menu inverted>
        <Menu.Item name="home" active={activeItem === "home"} onClick={handleGoLink} />
        <Menu.Item name="about" active={activeItem === "about"} onClick={handleGoLink} />
        <Menu.Item name="자유게시판" active={activeItem === "자유게시판"} onClick={handleGoLink} />
        <Menu.Item name="회원페이지" active={activeItem === "회원페이지"} onClick={handleGoLink} />
      </Menu>
    </div>
  );
}
