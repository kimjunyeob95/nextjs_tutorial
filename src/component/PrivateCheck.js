import cookie from "react-cookies";
export const PrivateCheck = () => {
  if (!cookie.load("mInfo")) {
    return false;
  } else {
    return true;
  }
};
