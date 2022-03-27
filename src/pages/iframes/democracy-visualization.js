import React from 'react';
import { graphql } from 'gatsby';
import CampaignVisualisation from '../../components//CampaignVisualisations';

const democracyVisualisation = ({
  data: {
    allContentfulKampagnenvisualisierung: { edges: campaignVisualisation },
  },
}) => {
  return (
    <div style={{ padding: '0rem 0.25rem', overflow: 'hidden' }}>
      <CampaignVisualisation
        visualisations={campaignVisualisation.map(v => v.node)}
      />
    </div>
  );
};
export default democracyVisualisation;

export const pageQuery = graphql`
  query democracyCampaignVisualisations {
    allContentfulKampagnenvisualisierung(
      filter: { contentful_id: { eq: "3VGsyRfpNJaY3Ci65QmfOI" } }
    ) {
      edges {
        node {
          goal
          goalUnbuffered
          goalInbetweenMultiple
          addToSignatureCount
          minimum
          startDate
          title
          campainCode
        }
      }
    }
  }
`;
