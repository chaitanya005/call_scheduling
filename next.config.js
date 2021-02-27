const path = require('path')


const withTM = require('next-transpile-modules')([
  '@fullcalendar'
])

module.exports = withTM({
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  },
  
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    BACKEND_URL: 'http://localhost:3000'
  },
})


// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/user/listings",
//         permanent: false,
//       }
//     ]
//   }
// }