import { Menu } from "semantic-ui-react";

export default function Gnb() {
  const activeItem = "home";
  const handleItemClick = () => {
    console.log("여기");
  };
  return (
    <div>
      <Menu inverted>
        <Menu.Item name="home" active={activeItem === "home"} onClick={handleItemClick} />
        <Menu.Item name="messages" active={activeItem === "messages"} onClick={handleItemClick} />
        <Menu.Item name="friends" active={activeItem === "friends"} onClick={handleItemClick} />
      </Menu>
    </div>
  );
}
