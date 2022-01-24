// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", "mInfo=Mike;Max-Age=3600");
    res.statusCode = 200;
    res.json({ message: "ok" });
  }
}
