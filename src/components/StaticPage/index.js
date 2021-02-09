import React, { useContext, useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import { Helmet } from 'react-helmet-async';
import MatomoTrackingStuff from './MatomoTrackingStuff';
import { getStringFromPlaceholderText } from '../utils';
import AuthContext from '../../context/Authentication';
import { MunicipalityContext } from '../../context/Municipality';

const URL = 'https://expedition-grundeinkommen.de';

const getFilteredSections = ({ sections, isAuthenticated }) => {
  return sections.filter(section => {
    if (isAuthenticated) {
      if (section.elements?.includes('SignupsMap')) {
        return false;
      }
    }
    return true;
  });
};

export default ({ data, location, pageContext }) => {
  const page = data.contentfulStaticContent;
  const { municipality } = pageContext;

  const title = getStringFromPlaceholderText(page.title, municipality);
  const description = getStringFromPlaceholderText(
    page.description?.internal?.content,
    municipality
  );

  const { /*customUserData,*/ isAuthenticated } = useContext(AuthContext);
  const municipalityContext = useContext(MunicipalityContext);
  // console.log({ isAuthenticated });
  console.log(municipalityContext.municipalityState);

  const [sections, setSections] = useState(
    getFilteredSections({ sections: page.sections, isAuthenticated })
  );

  useEffect(() => {
    setSections(
      getFilteredSections({ sections: page.sections, isAuthenticated })
    );
  }, [isAuthenticated, pageContext]);

  return (
    <>
      {typeof isAuthenticated !== 'undefined' && (
        <Layout
          location={location}
          title={title}
          sections={sections}
          pageContext={pageContext}
          description={description}
        >
          <Helmet>
            <title>{title}</title>

            {page.description && (
              <meta name="description" content={description} />
            )}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={URL + location.pathname} />
            <script type="text/javascript">{MatomoTrackingStuff}</script>
          </Helmet>
        </Layout>
      )}
    </>
  );
};

export const pageQuery = graphql`
  query StaticPageBySlug($slug: String!) {
    contentfulStaticContent(slug: { eq: $slug }) {
      title
      description {
        internal {
          content
        }
      }
      sections {
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
              eyeCatcherLink
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
            maps {
              name
              state
              config {
                maxBounds
                zoom
                center
              }
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
          ... on ContentfulPageSectionVideo {
            __typename
            videoLink
            title
          }
          ... on ContentfulPageSectionIllustration {
            __typename
            sloganLine1
            sloganLine2
          }
          ... on ContentfulPageSectionIntro {
            __typename
            preTitle
            title
            subTitle
            backgroundImage {
              fluid(maxWidth: 1500, quality: 80) {
                ...GatsbyContentfulFluid
              }
            }
          }
          ... on ContentfulPageSectionGemeindeIntro {
            __typename
            title
            body {
              body
            }
          }
          ... on ContentfulPageSectionMunicipality {
            __typename
            elements
          }
          ... on ContentfulPageSectionDonation {
            __typename
            title
            introText
            theme
            colorScheme
          }
          ... on ContentfulPageSectionTwoColumns {
            __typename
            title
            columnIntroText {
              json
            }
            imageTopLeft {
              fixed(height: 150, quality: 80) {
                ...GatsbyContentfulFixed
              }
            }
            columnTopLeft {
              json
            }
            imageTopRight {
              fixed(height: 150, quality: 80) {
                ...GatsbyContentfulFixed
              }
            }
            columnTopRight {
              json
            }
            imageBottomLeft {
              fixed(height: 150, quality: 80) {
                ...GatsbyContentfulFixed
              }
            }
            columnBottomLeft {
              json
            }
            imageBottomRight {
              fixed(height: 150, quality: 80) {
                ...GatsbyContentfulFixed
              }
            }
            columnBottomRight {
              json
            }
          }
        }
      }
    }
  }
`;
