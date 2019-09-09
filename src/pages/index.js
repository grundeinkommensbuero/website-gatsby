import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/Layout'
import ArticlePreview from '../components/ArticlePreview'
import EmailListForm from '../components/email-list-form'

class RootIndex extends React.Component {
  // add mailerlite code
  componentDidMount() {
    let r
    window['MailerLiteObject'] = 'ml'
    function f() {
      var c = {
        a: arguments,
        q: [],
      }
      var r = this.push(c)
      return 'number' != typeof r ? r : f.bind(c.q)
    }
    f.q = f.q || []
    window['ml'] = window['ml'] || f.bind(f.q)
    window['ml'].q = window['ml'].q || f.q
    r = document.createElement('script')
    var _ = document.getElementsByTagName('script')[0]
    r.async = 1
    r.src =
      'https://static.mailerlite.com/js/universal.js?v' +
      ~~(new Date().getTime() / 1000000)
    _.parentNode.insertBefore(r, _)

    window['ml_account'] = window.ml(
      'accounts',
      '1629538',
      'k8n3g9j9x8',
      'load'
    )
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const [content] = get(this, 'props.data.allContentfulLandingPage.edges')
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <Hero data={content.node} />
          <div className="wrapper">
            <h2 className="section-headline" id="anliegen">
              Unser Anliegen
            </h2>
            <p>{content.node.anliegen.anliegen}</p>
          </div>
        </div>
        <div className="section-gray">
          <div className="wrapper">
            <h2 className="section-headline" id="vorhaben">
              Wie machen wir das?
            </h2>
            <p>{content.node.vorhaben.vorhaben}</p>
          </div>
        </div>
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h2 className="section-headline" id="newsletter">
              Bist du dabei? Dann trage dich in unser Newsletter ein!
            </h2>
            <p>
              Trage dich in unsere Mailingliste ein und erhalte regelmäßig alle
              Neuigkeiten zum Projekt.
            </p>
            <EmailListForm />
          </div>
        </div>
        <div className="section-gray">
          <div className="wrapper">
            <ul className="article-list">
              <li key="map">
                <a
                  target="_blank"
                  href="https://www.openstreetmap.org/?mlat=52.4831&mlon=13.4310#map=15/52.4831/13.4310&layers=H"
                >
                  <img alt="Bildbeschreibungs-Text" src="geb.png" border="0" />
                </a>
              </li>
              <li key="sumary">
                <p>
                  Fragen? Antworten? Schreib uns! <br />{' '}
                  info@grundeinkommensbüro.de <br />
                  <br />
                  <br />
                  Grundeinkommensbüro
                  <br />
                  Karl-Marx-Strasse 50
                  <br />
                  12043 Berlin
                </p>
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
    allContentfulLandingPage(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          title
          vorhaben {
            vorhaben
          }
          anliegen {
            anliegen
          }
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
