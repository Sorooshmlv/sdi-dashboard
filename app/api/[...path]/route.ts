import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const ip = req.headers.get("x-forwarded-for") ?? "";

  try {
    await rateLimiter.consume(ip);
  } catch {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const path = params.path.join("/");
  const targetUrl = `http://localhost:8080/FROST-Server/v1.0/${path}${req.nextUrl.search}`;

  const res = await fetch(targetUrl, {
    headers: req.headers,
  });

  const data = await res.text();
  return new NextResponse(data, { status: res.status });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const ip = req.headers.get("x-forwarded-for") ?? "";

  try {
    await rateLimiter.consume(ip);
  } catch {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const path = params.path.join("/");
  const targetUrl = `http://localhost:8080/FROST-Server/v1.0/${path}${req.nextUrl.search}`;

  const res = await fetch(targetUrl, {
    method: "POST",
    headers: req.headers,
    body: req.body,
  });

  const data = await res.text();
  return new NextResponse(data, { status: res.status });
}
