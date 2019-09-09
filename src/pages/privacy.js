import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'

class Privacy extends React.Component {
  render() {
    const [content] = get(this.props, 'data.allContentfulStaticContent.edges')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
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
  query PrivacyQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulStaticContent(
      filter: { contentful_id: { eq: "4EVOtD0augmhLxaQRbSpzO" } }
    ) {
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
