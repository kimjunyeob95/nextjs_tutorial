import { useCookies } from "react-cookie";
export const PrivateCheck = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  if (!cookies.mInfo) {
    return false;
  } else {
    return true;
  }
};
