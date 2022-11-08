const { i18n } = require('./next-i18next.config')

const { hostname } = new URL(process.env.NEXT_PUBLIC_MEDIA_URL)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // outputStandalone: true,
    // externalDir: true // https://github.com/vercel/next.js/pull/22867
  },
  i18n,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['localhost', 'estil.kz', 'media-photos.depop.com', hostname]
  }
}

module.exports = nextConfig
