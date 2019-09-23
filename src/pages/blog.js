import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import styles from './blog.module.css';
import Layout from '../components/Layout';
import ArticlePreview from '../components/ArticlePreview';
import Amplify from 'aws-amplify';
import authConfig from './../../cognito-config';

//configure AWS Amplify to use Cognito for Authentication
//if there are gonna be more pages in the future, we need to put this somewhere else
//(e.g. a wrapper around all pages (gatsby browser API))
Amplify.configure({
  Auth: {
    region: authConfig.REGION,
    userPoolId: authConfig.USER_POOL_ID,
    userPooldWebClientId: authConfig.APP_CLIENT_ID 
  }
});


class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const posts = get(this, 'props.data.allContentfulBlogPost.edges');

    return (
      <Layout location={this.props.location}>
        <div>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>Campaigns</div>
          <div className="wrapper">
            <h2 className="section-headline">Current campaigns</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
