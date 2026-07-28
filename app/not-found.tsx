import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-sm uppercase tracking-[0.3em] text-text-secondary">
        404
      </span>
      <h1 className="text-3xl font-bold sm:text-4xl">
        Halaman tidak <span className="gradient-text">ditemukan</span>
      </h1>
      <p className="max-w-md text-sm text-text-secondary sm:text-base">
        Halaman yang kamu cari mungkin sudah dipindahkan atau tidak pernah ada.
      </p>
      <Link href="/" className="btn-primary">
        Kembali ke Home
      </Link>
    </div>
  );
}
