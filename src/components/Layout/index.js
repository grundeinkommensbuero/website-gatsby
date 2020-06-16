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

function Template({ children, sections }) {
  const { contentfulProjects: projects } = useStaticQuery(graphql`
    query ProjectQuery {
      contentfulProjects {
        project {
          siteTitle
          siteDescription {
            siteDescription
          }
          ogimage {
            fixed(width: 1000) {
              src
            }
          }
          logo {
            fixed(width: 1000) {
              src
            }
            description
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
    }
  `);

 const project = projects.project;

  // Return list of visualisation definitions with project field for the startnext project data
  const visualisationsWithCrowdfunding = buildVisualisationsWithCrowdfunding(
    project.overlay?.campainVisualisations
  );

  // Create new overlay definition
  const overlayDefninitionWithCrowdfunding = {
    ...project.overlay,
    campainVisualisations: visualisationsWithCrowdfunding,
  };

  const favicon = `/favicon-${process.env.PROJECT}.png`;
  return (
    <>
      {project.overlayActive && project.overlay && (
        <Overlay delay={project.overlayDelay}>
          <ContentfulSection section={overlayDefninitionWithCrowdfunding} />
        </Overlay>
      )}
      <Header menu={project.mainMenu} hasOverlay={!!project.overlay} />
      <Helmet
        defaultTitle={project.siteTitle}
        titleTemplate={`${project.siteTitle} - %s`}
      >
        <meta
          name="description"
          content={project.siteDescription.siteDescription}
        />
        <meta property="og:image" content={project.ogimage.fixed.src} />
        <link rel="icon" type="image/png" href= {favicon}/>
        <html lang="de" />
      </Helmet>
      <main className={s.main}>
        {children}
        <Sections sections={sections} />
      </main>
      <Footer
        footerText={project.footerText}
        footerMenu={project.footerMenu}
      />
    </>
  );
}

export default Template;