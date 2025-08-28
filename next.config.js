const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  env: {
    AIRTABLE_PERSONAL_ACCESS_TOKEN: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
    AIRTABLE_BASE_KEY: process.env.AIRTABLE_BASE_KEY,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    RESTRICTED_GOOGLE_MAPS_API_KEY: process.env.RESTRICTED_GOOGLE_MAPS_API_KEY,
  },
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    )
    return config
  },
})
