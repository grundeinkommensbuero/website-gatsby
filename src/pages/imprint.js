import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

class Privacy extends React.Component {
  render() {
    const [content] = get(this.props, 'data.allContentfulStaticContent.edges');
    console.log('bla:', content);
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    console.log('blub:', siteTitle);

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">
            <h1 className="section-headline">{content.node.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {content.node.lastModified}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: content.node.body.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Privacy

export const pageQuery = graphql`
  query ImprintQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulStaticContent(filter: { contentful_id: { eq: "rVBTpGJjFFozBimXkdfvx" } }) {
      edges {
        node {
          title
          lastModified(formatString: "MMMM Do, YYYY")
          body {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
