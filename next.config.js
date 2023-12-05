/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "ik.imagekit.io",
      "adbacklist.s3.ap-southeast-1.amazonaws.com",
      "dk3vy6fruyw6l.cloudfront.net",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
};

module.exports = nextConfig;
