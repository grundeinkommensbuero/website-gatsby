require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: 'Grundeinkommensb&uuml;ro',
    menuLinks:[
      {
         name:'Anliegen',
         link:'/#anliegen'
      },
      {
         name:'Vorhaben',
         link:'/#vorhaben'
      },
      {
         name:'Newsletter',
         link:'/#newsletter'
      },
      {
         name:'Unterstuetzen',
         link:'/support'
      }
    ]
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },{
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-145625294-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "xn--grundeinkommensbro-16b.de",
      },
    }
  ],
}
