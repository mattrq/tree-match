import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.auth0.com',
            },
            {
                protocol: 'https',
                hostname: '*.gravatar.com',
            },
            {
                protocol: 'https',
                hostname: '*.com',
            },
        ],
    },
};

export default nextConfig;
