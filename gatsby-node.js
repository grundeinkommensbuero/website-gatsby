const fs = require('fs');
const Promise = require('bluebird');
const path = require('path');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const webpack = require('webpack');
const gitRevisionPlugin = new GitRevisionPlugin();

const raw = fs.readFileSync('./content/municipalities.json', 'utf8');
let municipalities = JSON.parse(raw);

// Should this be in a file?
const getAndStoreDataVariations = municipalities => {
  const roundTo = (number, factor) => {
    return Math.round(number / factor) * factor;
  };

  const prettifyNumber = number => {
    let pretty = number;
    let steps = [
      { threshold: 20, roundTo: 1 },
      { threshold: 50, roundTo: 5 },
      { threshold: 150, roundTo: 10 },
      { threshold: 400, roundTo: 50 },
      { threshold: 4000, roundTo: 100 },
      { threshold: 10000, roundTo: 500 },
      { threshold: 40000, roundTo: 1000 },
      { threshold: 100000, roundTo: 5000 },
      { threshold: Infinity, roundTo: 10000 },
    ];
    const step = steps.find(x => number < x.threshold);
    pretty = roundTo(number, step.roundTo);
    return pretty;
  };

  const getGoal = (population, minGoal = 7, goalFactor = 0.01) => {
    let goal = population * goalFactor;
    goal = Math.max(minGoal, prettifyNumber(goal));
    return goal;
  };

  // Create versions of the data
  // only with the necessary info
  // for each component
  const municipalitiesForSearch = [];
  const municipalitiesForMap = [];
  const municipalitiesForPage = [];
  for (const municipality of municipalities) {
    const {
      ags,
      name,
      longitude,
      latitude,
      zipCodes,
      population,
    } = municipality;
    const goal = getGoal(population);
    municipalitiesForSearch.push({ ags, name, zipCodes });
    municipalitiesForMap.push({
      ags,
      name,
      coordinates: [longitude, latitude],
      goal,
      population,
    });
    // The page has access to all information including the goal
    municipalitiesForPage.push({ ...municipality, goal });
  }

  fs.writeFileSync(
    './src/components/Municipality/MunicipalityMap/data/municipalitiesForMap.json',
    JSON.stringify(municipalitiesForMap)
  );
  fs.writeFileSync(
    './src/components/Forms/SearchPlaces/municipalitiesForSearch.json',
    JSON.stringify(municipalitiesForSearch)
  );

  return municipalitiesForPage;
};

municipalities = getAndStoreDataVariations(municipalities);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  // NOTE: these cases are handled more modular in the database in the future
  const agsStates = [
    { ags: '11000000', slug: 'berlin' },
    { ags: '04011000', slug: 'bremen' },
    { ags: '02000000', slug: 'hamburg' },
  ];
  // const agsQualified = ['08121000'];

  municipalities.forEach(municipality => {
    // Type 'qualifying';
    let slug = 'gemeinden';
    const stateCampaign = agsStates.find(s => s.ags === municipality.ags);
    if (stateCampaign) {
      // Type 'state';
      slug = stateCampaign.slug;
    }
    // else if (agsQualified.includes(municipality.ags)) {
    //   // Type 'collecting';
    //   slug = 'gemeinden-sammelphase';
    // }

    createPage({
      path: `/gemeinden/${municipality.ags}`,
      component: require.resolve('./src/components/StaticPage/index.js'),
      context: {
        municipality: { ...municipality },
        slug,
      },
    });
  });

  return new Promise((resolve, reject) => {
    const staticPage = path.resolve('./src/components/StaticPage/index.js');
    const blogPost = path.resolve('./src/components/BlogPost/index.js');

    resolve(
      graphql(
        `
          {
            allContentfulStaticContent {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allWordpressPost {
              edges {
                node {
                  path
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }

        const pages = result.data.allContentfulStaticContent.edges;
        pages.forEach(page => {
          const path = page.node.slug === '/' ? '/' : `/${page.node.slug}/`;
          createPage({
            path: path,
            component: staticPage,
            context: {
              slug: page.node.slug,
            },
          });
        });

        const blogPosts = result.data.allWordpressPost.edges;

        blogPosts.forEach(post => {
          createPage({
            path: post.node.path,
            component: blogPost,
            context: {
              slug: post.node.path,
            },
          });
        });
      })
    );
  });
};

const clientId = process.env.COGNITO_APP_CLIENT_ID;

console.log({ clientId });

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(gitRevisionPlugin.version()),
        COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
        APP_CLIENT_ID: JSON.stringify(clientId),
        'process.env': {
          STATIC: stage === 'build-html',
        },
      }),
    ],
  });
};

/**
 * Allows routes for user profile pages, and serves the user profile pages to those routes
 */
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/mensch/)) {
    page.matchPath = '/mensch/*';
    page.component = path.resolve('src/pages/mensch/index.js');
    createPage(page);
  }
};
