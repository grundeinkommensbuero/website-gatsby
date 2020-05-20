import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import s from './style.module.less';
import '../style/base.less';
import Sections, { ContentfulSection } from './Sections';
import { Helmet } from 'react-helmet-async';
import { useStaticQuery, graphql } from 'gatsby';
import { Overlay } from '../Overlay';
import { useGetCrowdfundingDirectly } from '../../hooks/Api/Crowdfunding';

function Template({ children, sections }) {
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
              map
              callToActionLink
              callToActionText
              bodyTextSizeHuge
              emailSignup
              pledgeId
              signaturesId
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

  const visualisationsWithoutCrowdfunding = globalStuff.overlay.campainVisualisations.filter(
    vis => !vis.startnextId
  );

  // Get visualisations that have startnext ID
  const startnextVisualisations = globalStuff.overlay.campainVisualisations.filter(
    vis => vis.startnextId
  );

  // Return list of visualisation definitions with project property
  const visualisationsWithCrowdfunding = startnextVisualisations.map(vis => {
    const [crowdfunding] = useGetCrowdfundingDirectly(vis.startnextId);
    const { project } = crowdfunding ? crowdfunding : {};

    return {
      ...vis,
      project,
    };
  });

  const overlayDefninitionWithCrowdfunding = {
    ...globalStuff.overlay,
    campainVisualisations: [
      ...visualisationsWithCrowdfunding,
      visualisationsWithoutCrowdfunding,
    ],
  };

  return (
    <>
      {globalStuff.overlayActive && globalStuff.overlay && (
        <Overlay delay={globalStuff.overlayDelay}>
          <ContentfulSection section={overlayDefninitionWithCrowdfunding} />
        </Overlay>
      )}
      <Header menu={globalStuff.mainMenu} />
      <Helmet
        defaultTitle={globalStuff.siteTitle}
        titleTemplate={`${globalStuff.siteTitle} - %s`}
      >
        <meta
          name="description"
          content={globalStuff.siteDescription.siteDescription}
        />
        <meta property="og:image" content={globalStuff.ogimage.fixed.src} />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <html lang="de" />
      </Helmet>
      <main className={s.main}>
        {children}
        <Sections sections={sections} />
      </main>
      <Footer
        footerText={globalStuff.footerText}
        footerMenu={globalStuff.footerMenu}
      />
    </>
  );
}

export default Template;
