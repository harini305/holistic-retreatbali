/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },

  // Photos in public/images change only when scripts/build-images.py is re-run,
  // so browsers and the CDN can reuse them instead of revalidating on every visit.
  // (Hashed /_next/static files are already cached as immutable by Next.js.)
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
