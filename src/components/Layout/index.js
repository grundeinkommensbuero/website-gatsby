import React from 'react';
import Header from './Header';
import Footer from './Footer';
import s from './style.module.less';
import '../style/base.less';
import Sections, { ContentfulSection } from './Sections';
import { Helmet } from 'react-helmet-async';
import { useStaticQuery, graphql } from 'gatsby';
import { Overlay } from '../Overlay';
import { buildVisualisationsWithCrowdfunding } from '../../hooks/Api/Crowdfunding';

function Template({ children, sections, pageContext, title, description }) {
  const { contentfulGlobalStuff: globalStuff } = useStaticQuery(graphql`
    query SiteTitleQuery {
      contentfulGlobalStuff(contentful_id: { eq: "3mMymrVLEHYrPI9b6wgBzg" }) {
        siteTitle
        siteDescription {
          siteDescription
        }
        ogimage {
          fixed(width: 1000) {
            src
          }
        }
        footerText
        footerMenu {
          slug
          title
        }
        mainMenu {
          ... on Node {
            ... on ContentfulStaticContent {
              __typename
              slug
              title
              shortTitle
            }
            ... on ContentfulMenuOberpunkt {
              __typename
              title
              internalLink
              externalLink
              contentfulchildren {
                title
                slug
                shortTitle
              }
            }
          }
        }
        overlayActive
        overlayDelay
        overlay {
          ... on Node {
            ... on ContentfulPageSection {
              __typename
              title
              titleShort
              campainVisualisations {
                campainCode
                goal
                startDate
                title
                minimum
                maximum
                addToSignatureCount
                ctaLink
                eyeCatcher {
                  json
                }
                goalUnbuffered
                goalInbetweenMultiple
                startnextId
                hint {
                  hint
                }
              }
              body {
                json
              }
              callToActionLink
              callToActionText
              bodyTextSizeHuge
              signUpForm
              emailSignup
              pledgeId
              signaturesId
              disableRequestListsByMail
              callToActionReference {
                slug
                title
                shortTitle
              }
              teamMembers {
                image {
                  fluid(maxWidth: 200, quality: 80) {
                    ...GatsbyContentfulFluid
                  }
                }
                name
                twitter
                linkedin
                website
                role
              }
              twitterFeed
              backgroundIllustration
              socialMediaButtons
              blogTeaser
              questionUbi
              bodyAtTheEnd {
                json
              }
            }
          }
        }
      }
    }
  `);

  // Return list of visualisation definitions with project field for the startnext project data
  const visualisationsWithCrowdfunding = buildVisualisationsWithCrowdfunding(
    globalStuff?.overlay?.campainVisualisations
  );

  // Create new overlay definition
  const overlayDefninitionWithCrowdfunding = {
    ...globalStuff.overlay,
    campainVisualisations: visualisationsWithCrowdfunding,
  };

  const municipality = pageContext?.municipality;
  let ogImage = globalStuff.ogimage.fixed.src;
  // TODO og:image based on municipality ags
  // console.log(municipality);
  // create img url based on ags
  // ogImage = municipality ? getOgImageLink(municipality.ags) : ogImage

  const ogTitle = title ? title : globalStuff.siteTitle;
  const ogDescription = description
    ? description
    : globalStuff.siteDescription.siteDescription;

  // console.log(ogImage, ogTitle, ogDescription);
  // ---
  return (
    <>
      {globalStuff.overlayActive && globalStuff.overlay && (
        <Overlay delay={globalStuff.overlayDelay}>
          <ContentfulSection section={overlayDefninitionWithCrowdfunding} />
        </Overlay>
      )}
      <Header menu={globalStuff.mainMenu} hasOverlay={!!globalStuff?.overlay} />
      <Helmet
        defaultTitle={globalStuff.siteTitle}
        titleTemplate={`${globalStuff.siteTitle} - %s`}
      >
        <meta name="description" content={ogDescription} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <html lang="de" />
      </Helmet>
      <main className={s.main}>
        {children}
        <Sections sections={sections} pageContext={pageContext} />
      </main>
      <Footer
        footerText={globalStuff.footerText}
        footerMenu={globalStuff.footerMenu}
      />
    </>
  );
}

export default Template;
