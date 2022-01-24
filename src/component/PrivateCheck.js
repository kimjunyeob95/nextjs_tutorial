export const PrivateCheck = (context) => {
  if (!context.req.cookies.mInfo) {
    return false;
  } else {
    return true;
  }
};
