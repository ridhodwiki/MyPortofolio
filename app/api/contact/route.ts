import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// Escape HTML agar input user tidak bisa menyisipkan markup ke email
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Email tujuan — ganti dengan email asli kamu setelah verifikasi domain di Resend
const OWNER_EMAIL = "ridhodwiki768@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validasi input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Semua field harus diisi." },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json(
        { error: "Format data tidak valid." },
        { status: 400 }
      );
    }

    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    // Dibuat saat request (bukan saat build) agar build tidak gagal tanpa env var
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[Contact API error] RESEND_API_KEY belum di-set");
      return NextResponse.json(
        { error: "Server belum dikonfigurasi." },
        { status: 500 }
      );
    }
    const resend = new Resend(apiKey);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Ganti setelah verifikasi domain
      to: [OWNER_EMAIL],
      replyTo: email,
      subject: `Pesan baru dari ${name} — Portfolio`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0d0d1a; color: #fff; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6C63FF, #00E5FF); padding: 28px 32px;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 700;">Pesan Baru dari Portfolio</h1>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #B5B5B5; font-size: 13px; width: 80px;">Nama</td>
                <td style="padding: 10px 0; font-size: 14px; font-weight: 600;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #B5B5B5; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; font-size: 14px;">
                  <a href="mailto:${safeEmail}" style="color: #6C63FF; text-decoration: none;">${safeEmail}</a>
                </td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #ffffff18; margin: 20px 0;" />
            <p style="color: #B5B5B5; font-size: 13px; margin: 0 0 10px;">Pesan:</p>
            <p style="font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <div style="padding: 16px 32px; background: #ffffff08; font-size: 12px; color: #B5B5B5;">
            Dikirim dari form contact ridhodwiki.dev
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend error]", error);
      return NextResponse.json(
        { error: "Gagal mengirim pesan. Coba lagi nanti." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error("[Contact API error]", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
