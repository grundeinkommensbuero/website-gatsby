import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import MailerLite from '../components/MailerLite';
import EmailListForm from '../components/EmailListForm';
import Sections from '../components/Sections';

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const [content] = get(this, 'props.data.allContentfulLandingPage.edges');
    const sections = get(content, 'node.sections');
    return (
      <Layout location={this.props.location}>
        <Sections sections={sections} />
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
            body {
              json
            }
            emailSignup
          }
        }
      }
    }
  }
`;
