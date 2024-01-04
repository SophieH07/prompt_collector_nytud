/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This will allow production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
    output: 'standalone',
    
}

module.exports = nextConfig
