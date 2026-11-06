import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const LIMIT = 20;

// Public read: only name, message, and timestamp leave the server. Email stays
// private so it is never exposed to the browser.
export async function GET() {
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
