require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
};

const config = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-image',
    {
      resolve: `gatsby-plugin-less`,
      options: {
        strictMath: true,
      },
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '1',
        matomoUrl: 'https://expeditiongrundeinkommen.matomo.cloud',
        siteUrl: 'https://www.expedition-grundeinkommen.de',
        disableCookies: true,
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        /*
         * The base URL of the WordPress site without the trailingslash and the protocol. This is required.
         * Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
         */
        baseUrl: 'xbge.uber.space',
        protocol: 'http',
        hostingWPCOM: false,
        useACF: false,
        acfOptionPageIds: [],
        verboseOutput: false,
        perPage: 100,
        concurrentRequests: 10,
        includedRoutes: [
          // "**/categories",
          '**/posts',
          // "**/pages",
          '**/media',
          '**/tags',
          // "**/taxonomies",
          // "**/users",
        ],
      },
    },
    // {
    //   resolve: 'gatsby-plugin-webpack-bundle-analyzer',
    //   options: {
    //     analyzerPort: 3000,
    //     production: true,
    //   },
    // },
  ],
};

if (contentfulConfig.spaceId || contentfulConfig.accessToken) {
  config.plugins.push({
    resolve: 'gatsby-source-contentful',
    options: contentfulConfig,
  });
} else {
  console.log(
    `Contentful spaceId and the access token need to be provided in .env.${process.env.NODE_ENV}`
  );
}

module.exports = config;
