const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/tutorial",
                destination: "/proximamente",
                permanent: false,
            },
        ];
    },
};

module.exports = nextConfig;
