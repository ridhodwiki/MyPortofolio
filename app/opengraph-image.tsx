import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ridho Dwiki Zakaria - Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0B1020",
          color: "#FAFAF8",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "radial-gradient(#FAFAF8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 1 }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "#6366F1",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "#818CF8",
              textTransform: "uppercase",
            }}
          >
            Portfolio & Engineering Showcase
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 1 }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Ridho Dwiki Zakaria
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#94A3B8",
              margin: 0,
              maxWidth: "900px",
            }}
          >
            Informatics Engineering · Web & Mobile Development · UI/UX
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1E293B",
            paddingTop: "24px",
            zIndex: 1,
          }}
        >
          <span style={{ fontSize: "20px", color: "#64748B" }}>
            ridhodwiki.dev
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#10B981",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ● Available for Opportunities
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
