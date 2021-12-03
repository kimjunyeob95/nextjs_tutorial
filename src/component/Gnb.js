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
    activeItem = "member";
  }
  const handleGoLink = (e, data) => {
    if (data.name === "home") {
      router.push("/");
    } else if (data.name === "about") {
      router.push("/about");
    } else if (data.name === "contact") {
      router.push("/contact");
    } else if (data.name === "mypage") {
      router.push("/member/mypage");
    }
  };
  return (
    <div>
      <Menu inverted>
        <Menu.Item name="home" active={activeItem === "home"} onClick={handleGoLink} />
        <Menu.Item name="about" active={activeItem === "about"} onClick={handleGoLink} />
        <Menu.Item name="contact" active={activeItem === "contact"} onClick={handleGoLink} />
        <Menu.Item name="mypage" active={activeItem === "member"} onClick={handleGoLink} />
      </Menu>
    </div>
  );
}
