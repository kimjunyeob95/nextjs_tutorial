import React, { useEffect, useContext } from "react";
import { authContext } from "../../ContextApi/Context";
import { useRouter } from "next/router";
export default function ChageRouter() {
  const router = useRouter();
  const [state, dispatch] = useContext(authContext);
  useEffect(() => {}, [router]);
  return <div></div>;
}
