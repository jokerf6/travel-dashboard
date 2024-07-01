/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    removeConsole: true,
  },
  images: {
    domains: ["*", "localhost", "127.0.0.1"], // Add the hostname(s) here
  },
};
