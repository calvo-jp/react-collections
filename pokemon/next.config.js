/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pokemons",
        permanent: true,
        statusCode: 301,
      },
    ];
  },
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
