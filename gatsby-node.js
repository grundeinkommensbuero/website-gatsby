const Promise = require('bluebird');
const path = require('path');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const webpack = require('webpack');
const gitRevisionPlugin = new GitRevisionPlugin();

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const staticPage = path.resolve('./src/components/StaticPage/index.js');

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
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
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
      })
    );
  });
};

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(gitRevisionPlugin.version()),
        COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
      }),
    ],
  });
};
