import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../Layout';
import { Helmet } from 'react-helmet-async';
import MatomoTrackingStuff from './MatomoTrackingStuff';
import { ShowOnlyOnceOverlay } from '../Overlay';

const URL = 'https://expedition-grundeinkommen.de';

export default ({ data, location }) => {
  const page = data.contentfulStaticContent;

  return (
    <Layout location={location} title={page.title} sections={page.sections}>
      <ShowOnlyOnceOverlay title="Titel, der etwas länger ist.">
        <p>Hier ist Inhalt.</p>
        <p>
          Der Begriff umfasst sowohl physische Inhalte (beispielsweise der Wein
          in einer Weinflasche), messbare Eigenschaften (beispielsweise die
          Kubatur eines Bauwerks) als auch nicht physische (abstrakte) Inhalte
          (beispielsweise der Inhalt eines Buches, eines Schriftstücks oder
          eines Datenspeichers). Physische Inhalte sind materielle Güter, die
          sich in einem Behälter befinden, etwa zur Lagerung oder für den
          Transport. Bei nicht-physischen Inhalten handelt es sich meist um
          Daten, Informationen oder um Wissen, Erfahrungen und Meinungen. Sie
          können beispielsweise in einer Datei, Nachricht oder einem Bild
          enthalten sein oder auch durch Literatur oder ein Kunstwerk vermittelt
          werden. Medieninhalte, insbesondere die der Neuen Medien, erfassen den
          Informationsgehalt, für den auch der Anglizismus „Content“ (englisch
          für „Inhalt, Gehalt“) benutzt wird.
        </p>
      </ShowOnlyOnceOverlay>
      <Helmet>
        <title>{page.title}</title>

        {page.description && (
          <meta
            name="description"
            content={page.description.internal.content}
          />
        )}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL + location.pathname} />
        <script type="text/javascript">{MatomoTrackingStuff}</script>
      </Helmet>
    </Layout>
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
          ... on ContentfulPageSectionVideo {
            __typename
            videoLink
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
        }
      }
    }
  }
`;
