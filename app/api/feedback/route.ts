import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

// Only accept requests from the same origin that served the page. This blocks
// cross-site POSTs while keeping local development working.
function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return origin === new URL(req.url).origin;
  } catch {
    return false;
  }
}

// In-memory rate limiting: max 3 requests per 60 seconds per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (record.count >= 3) {
    return true;
  }
  record.count += 1;
  return false;
}

const LIMIT = 20;

// Public read: only name, message, and timestamp leave the server. Email stays
// private so it is never exposed to the browser.
export async function GET(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ error: "Origin tidak diizinkan." }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
      { status: 429 }
    );
  }

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ items: [] });

  const { data, error } = await supabase
    .from("feedback")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false })
    .limit(LIMIT);

  if (error) {
    console.error("[Feedback API error]", error);
    return NextResponse.json({ error: "Gagal memuat feedback." }, { status: 500 });
  }

  return NextResponse.json({
    items: (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      message: row.message,
      createdAt: row.created_at,
    })),
  });
}
