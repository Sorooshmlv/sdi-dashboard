import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 10, // تعداد درخواست مجاز
  duration: 60, // هر ۶۰ ثانیه
});

export async function GET(req: NextRequest) {
  // گرفتن IP از هدر x-forwarded-for
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  try {
    await rateLimiter.consume(ip); // هر درخواست یک امتیاز مصرف می‌کنه
  } catch {
    return NextResponse.json(
      { error: "Too many requests. لطفا بعدا تلاش کنید." },
      { status: 429 }
    );
  }

  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.MY_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = `http://localhost:8080${req.nextUrl.pathname.replace(
    "/api/proxy",
    ""
  )}${req.nextUrl.search}`;

  const frostRes = await fetch(url, {
    method: "GET",
    headers: req.headers,
  });

  const data = await frostRes.text();
  return new NextResponse(data, { status: frostRes.status });
}
