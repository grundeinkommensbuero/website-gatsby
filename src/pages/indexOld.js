import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Layout from '../components/Layout';
import MainIllustration from '../components/MainIllustration';

class RootIndex extends React.Component {
  render() {
    const [content] = get(this, 'props.data.allContentfulLandingPage.edges');
    const sections = get(content, 'node.sections');

    return (
      <Layout location={this.props.location} sections={sections}>
        <MainIllustration />
      </Layout>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulLandingPage(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          title
          sections {
            title
            titleShort
            body {
              json
            }
            emailSignup
            id
          }
        }
      }
    }
  }
`;
