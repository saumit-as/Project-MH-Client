/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV;

// const db = "https://backendgvstgs-1-u5913693.deta.app";

const db =
  env === "production"
    ? "https://backendgvstgs-1-u5913693.deta.app"
    : "http://localhost:4201";

const nextConfig = {
  env: {
    db: db,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
