require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { htmlToText } = require('html-to-text');

const url = 'https://expedition-grundeinkommen.de';

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  forceFullSync: true,
};

const config = {
  plugins: [
    'gatsby-plugin-react-helmet-async',
    'gatsby-plugin-netlify',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-plugin-eslint',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site: contentfulGlobalStuff(contentful_id: { eq: "3mMymrVLEHYrPI9b6wgBzg" }) {
              siteTitle
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { allWpPost } }) => {
              return allWpPost.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: htmlToText(edge.node.excerpt),
                  date: edge.node.date,
                  url: url + edge.node.path,
                  guid: url + edge.node.path,
                  custom_elements: [{ 'content:encoded': edge.node.content }],
                });
              });
            },
            query: `
              {
                allWpPost(
                  sort: { fields: date, order: DESC }
                  filter: {tags: {nodes: {elemMatch: {name: {ne: "unlisted"}}}}}
                ) {
                  edges {
                    node {
                      id
                      title
                      excerpt
                      slug
                      link
                      date
                      content
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Expedition Grundeinkommen – Blog',
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: '^/blog/',
          },
        ],
      },
    },
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
        url: 'https://xbge.uber.space/graphql',
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
    //   resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
    //   options: {
    //     analyzerPort: 3000,
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
  /* eslint-disable no-console */
  console.log(
    `Contentful spaceId and the access token need to be provided in .env.${process.env.NODE_ENV}`
  );
  /* eslint-enable */
}

module.exports = config;
