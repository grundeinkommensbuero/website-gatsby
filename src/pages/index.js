import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview';
import EmailListForm from '../components/email-list-form';

class RootIndex extends React.Component {
  // add mailerlite code
  componentDidMount() {
    let r;
    window['MailerLiteObject'] = 'ml';
    function f() {
      var c = {
        a: arguments,
        q: []
      };
      var r = this.push(c);
      return ("number" != typeof r) ? r : f.bind(c.q);
    }
    f.q = f.q || [];
    window['ml'] = window['ml'] || f.bind(f.q);
    window['ml'].q = window['ml'].q || f.q;
    r = document.createElement('script');
    var _ = document.getElementsByTagName('script')[0];
    r.async = 1;
    r.src = 'https://static.mailerlite.com/js/universal.js?v' + (~~(new Date().getTime()/1000000));
    _.parentNode.insertBefore(r, _);

    window['ml_account'] = window.ml('accounts', '1629538', 'k8n3g9j9x8', 'load');
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Hero data={author.node} />
          <div className="wrapper">
            <h2 className="section-headline">Current campaigns</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="section-gray">
          <div className="wrapper">
            <h2 className="section-headline">Bist du dabei? Dann trage dich in unser Newsletter ein!</h2>
            <p>Trage dich in unsere Mailingliste ein und erhalte regelmäßig alle Neuigkeiten zum Projekt.</p>
            <EmailListForm/>
          </div>
        </div>
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h2 className="section-headline">Unterstuetzen</h2>
            <p>Wir sind ein gemeinnuetziger Verein und sind auf Spenden angewiesen. Mit jeder Spende unterstuetzt du unsere Kampagnenarbeit mit dem Ziel unser Anliegen zu verbreiten.</p>
            <button type="button">Jetzt spenden!</button>
          </div>
        </div>
        <div className="section-gray">
          <div className="wrapper">
            <ul className="article-list">
              <li key="map">
                <a target="_blank" href="https://www.openstreetmap.org/?mlat=52.4831&mlon=13.4310#map=15/52.4831/13.4310&layers=H"><img alt="Bildbeschreibungs-Text" src="geb.png" border="0"/></a>
              </li>
              <li key="sumary">
                <p>Fragen? Antworten? Schreib uns! <br/> info@grundeinkommensbuero.de <br/><br/><br/>Grundeinkommensbüro<br/>Karl-Marx-Strasse 50<br/>12043 Berlin</p>
              </li>
            </ul>
          </div>
        </div>
        <div style={{ background: '#fff' }}>
          <div>
            <h2 className="section-headline"></h2>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
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
    allContentfulPerson(filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
