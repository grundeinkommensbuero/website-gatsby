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
import cN from 'classnames';

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
              colorScheme
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

  const donationBarVisible = false; // TODO: reactive from context, to adapt, when user clicks bar away

  const variableMarginClass = () => {
    if (donationBarVisible) {
      return 'withDonationBar';
    } else {
      return 'withoutDonationBar';
    }
  }

  const checkUrlProtocolIdentifier = url => {
    if (typeof url === 'string' && !url.includes('https://')) {
      const updatedUrl = `https:${url}`;
      return updatedUrl;
    } else {
      return url;
    }
  };

  // Temporary modify section color scheme, when none is set from contentful
  const modifiedSections = (sections) => {
    const colorSchemes = ['white', 'pink', 'green'];
    let counter = 0;
    const modSections = [...sections];
    for (let i = 0; i < modSections.length; i++) {
      if (modSections[i] && !modSections[i].colorScheme) {
        modSections[i].colorScheme = colorSchemes[counter];
      }
      counter++;
      if (counter === 3) {
        counter = 0;
      }
    }
    return modSections;
  };

  return (
    <>
      {globalStuff.overlayActive && globalStuff.overlay && (
        <Overlay delay={globalStuff.overlayDelay}>
          <ContentfulSection section={overlayDefninitionWithCrowdfunding} />
        </Overlay>
      )}
      <Header menu={globalStuff.mainMenu} hasOverlay={!!globalStuff?.overlay} donationBarVisible={donationBarVisible} />
      <Helmet
        defaultTitle={globalStuff.siteTitle}
        titleTemplate={`${globalStuff.siteTitle} - %s`}
      >
        <meta
          name="description"
          content={globalStuff.siteDescription.siteDescription}
        />
        <meta property="og:title" content={globalStuff.siteTitle} />
        <meta
          property="og:description"
          content={globalStuff.siteDescription.siteDescription}
        />
        <meta
          property="og:image"
          content={checkUrlProtocolIdentifier(globalStuff.ogimage.fixed.src)}
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <html lang="de" />
      </Helmet>
      <main className={cN(s[variableMarginClass()])}>
        {children}
        <Sections sections={modifiedSections(sections)} pageContext={pageContext} />
      </main>
      <Footer
        footerText={globalStuff.footerText}
        footerMenu={globalStuff.footerMenu}
      />
    </>
  );
}

export default Template;
