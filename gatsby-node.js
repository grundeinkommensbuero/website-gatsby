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
      slug,
      name,
      nameUnique,
      longitude,
      latitude,
      zipCodes,
      population,
    } = municipality;
    const goal = getGoal(population);
    municipalitiesForSearch.push({
      ags,
      name,
      zipCodes,
      population,
      slug,
      nameUnique,
    });
    municipalitiesForMap.push({
      ags,
      name,
      coordinates: [longitude, latitude],
      goal,
      population,
      slug,
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

  municipalities.forEach(municipality => {
    createPage({
      path: `/gemeinden/${municipality.slug}`,
      component: require.resolve('./src/components/StaticPage/index.js'),
      context: {
        municipality: { ...municipality },
        isMunicipality: true,
        isSpecificMunicipality: true,
        slug: 'gemeinden',
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
          const isMunicipality = page.node.slug === 'gemeinden';
          createPage({
            path: path,
            component: staticPage,
            context: {
              slug: page.node.slug,
              isMunicipality,
              isSpecificMunicipality: false,
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
              isMunicipality: false,
              isSpecificMunicipality: true,
            },
          });
        });
      })
    );
  });
};

const clientId =
  process.env.NODE_ENV === 'development' ||
    process.env.GATSBY_USE_DEV_BACKEND === 'override'
    ? process.env.DEV_COGNITO_APP_CLIENT_ID
    : process.env.PROD_COGNITO_APP_CLIENT_ID;

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
