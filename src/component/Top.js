import { Header } from "semantic-ui-react";
import Image from "next/image";
import Gnb from "./Gnb";

export default function Top() {
  return (
    <div>
      <div style={{ display: "flex", padding: "20px 0" }}>
        <div style={{ flex: "100px 0 0" }}>
          <Image src="/images/logo.png" alt="logo" width={80} height={80} />
        </div>
        <Header as="h1">Nextjs made by junyeob</Header>
      </div>
      <Gnb />
    </div>
  );
}
