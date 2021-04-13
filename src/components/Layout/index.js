import React, { useState, useContext, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import s from './style.module.less';
import '../style/base.less';
import Sections, { ContentfulSection } from './Sections';
import { Helmet } from 'react-helmet-async';
import { useStaticQuery, graphql } from 'gatsby';
import { Overlay } from '../Overlay';
import { OnboardingOverlay } from '../Overlay/OverlayOnboarding';
import { StickyBannerContext } from '../../context/StickyBanner';
import AuthContext from '../../context/Authentication';
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
            ... on ContentfulPageSectionOneColumn {
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

  // State of onboarding overlay
  const [showOnboardingOverlay, setShowOnboardingOverlay] = useState(true);

  // Return list of visualisation definitions with project field for the startnext project data
  const visualisationsWithCrowdfunding = buildVisualisationsWithCrowdfunding(
    globalStuff?.overlay?.campainVisualisations
  );

  // Create new overlay definition
  const overlayDefninitionWithCrowdfunding = {
    ...globalStuff.overlay,
    campainVisualisations: visualisationsWithCrowdfunding,
  };

  const { stickyBannerVisible } = useContext(StickyBannerContext);

  const variableMarginClass = () => {
    return stickyBannerVisible ? 'withStickyBanner' : 'withoutStickyBanner';
  };

  const checkUrlProtocolIdentifier = url => {
    if (typeof url === 'string' && !url.includes('https://')) {
      const updatedUrl = `https:${url}`;
      return updatedUrl;
    }
    return url;
  };

  // Modify section color scheme, when none is set from contentful
  // keyVisual component excluded, because its already violet
  const addColorScheme = sections => {
    if (sections && sections.length !== 0) {
      const colorSchemes = ['white', 'violet', 'aqua'];
      let counter = 0;
      const modSections = [...sections];
      for (let i = 0; i < modSections.length; i++) {
        if (modSections[i] && !modSections[i].colorScheme) {
          modSections[i].colorScheme = colorSchemes[counter];
        }
        counter++;
        if (counter === 3 || modSections[i].keyVisual) {
          counter = 0;
        }
      }
      return modSections;
    }
    return undefined;
  };
  const sectionsWithColorScheme = addColorScheme(sections);

  // Hacky solution for additional menu entry linking to users most recent campaign
  const { customUserData } = useContext(AuthContext);
  const [modifiedMainMenu, setModifiedMainMenu] = useState(globalStuff.mainMenu);
  const getMostRecentMunicipality = municipalities => {
    return municipalities.reduce((a, b) => (a.createdAt > b.createdAt ? a : b));
  };
  useEffect(() => {
    if (customUserData.municipalities) {
      const mainMenu = [...modifiedMainMenu];
      const mostRecentMunicipalitiy = getMostRecentMunicipality(customUserData.municipalities);
      const indexToMod = mainMenu.findIndex(el => el.title === 'Mitmachen');
      if (mainMenu[indexToMod].contentfulchildren[0].title !== "Mein Ort") {
        mainMenu[indexToMod].contentfulchildren.unshift({
          title: 'Mein Ort',
          slug: `gemeinden/${mostRecentMunicipalitiy.slug}`,
          shortTitle: null
        });
      }
      setModifiedMainMenu(mainMenu);
    }
  }, [customUserData]);

  return (
    <>
      {globalStuff.overlayActive && globalStuff.overlay && (
        <Overlay delay={globalStuff.overlayDelay}>
          <ContentfulSection section={overlayDefninitionWithCrowdfunding} />
        </Overlay>
      )}

      <OnboardingOverlay
        isOpen={showOnboardingOverlay}
        toggleOverlay={setShowOnboardingOverlay}
      />

      <Header
        menu={modifiedMainMenu}
        hasOverlay={!!globalStuff?.overlay}
        stickyBannerVisible={stickyBannerVisible}
      />
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
        <Sections sections={sectionsWithColorScheme} pageContext={pageContext} />
      </main>
      <Footer
        footerText={globalStuff.footerText}
        footerMenu={globalStuff.footerMenu}
      />
    </>
  );
}

export default Template;
