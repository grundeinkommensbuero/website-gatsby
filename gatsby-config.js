require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
};

const config = {
  siteMetadata: {
    title: 'Grundeinkommensb&uuml;ro',
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
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
  console.log('Contentful spaceId and the access token need to be provided.');
}

module.exports = config;
