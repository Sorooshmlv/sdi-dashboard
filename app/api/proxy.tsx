import type { NextApiRequest, NextApiResponse } from "next";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 10, // تعداد درخواست مجاز
  duration: 60, // هر ۶۰ ثانیه
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ip =
    (req.headers["x-forwarded-for"] as string) ||
    req.socket.remoteAddress ||
    "";

  try {
    await rateLimiter.consume(ip); // هر درخواست یک امتیاز مصرف می‌کنه
  } catch (_err) {
    return res
      .status(429)
      .json({ error: "Too many requests. لطفا بعدا تلاش کنید." });
  }

  const apiKey = req.headers["x-api-key"] as string | undefined;
  if (!apiKey || apiKey !== process.env.MY_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const url = `http://localhost:8080${
    req.url?.replace("/api/proxy", "") || ""
  }`;

  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") headers[key] = value;
    else if (Array.isArray(value)) headers[key] = value.join(",");
  }
  headers["host"] = "localhost:8080";

  const frostRes = await fetch(url, {
    method: req.method,
    headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
  });

  const data = await frostRes.text();
  res.status(frostRes.status).send(data);
}
