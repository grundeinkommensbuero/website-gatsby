import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import CampaignVisualisations from '../../CampaignVisualisations';
import * as s from './style.module.less';

export const CampainScanVisualisation = ({ campaignCode, triggerUpdate }) => {
  const {
    allContentfulKampagnenvisualisierung: { edges: campaignVisualisations },
  } = useStaticQuery(graphql`
    query campaignVisualisations {
      allContentfulKampagnenvisualisierung {
        edges {
          node {
            hint {
              hint
            }
            goal
            goalInbetween
            goalUnbuffered
            minimum
            startDate
            title
            addToSignatureCount
            campainCode
          }
        }
      }
    }
  `);

  const campaignVisualisationsMapped = campaignVisualisations
    .map(({ node }) => node)
    .filter(({ campainCode: campaignCodeVisualisation }) => {
      return campaignCodeVisualisation === campaignCode;
    });

  return (
    <>
      {campaignVisualisationsMapped.length && (
        <div className={s.campaignVisualisations}>
          <CampaignVisualisations
            visualisations={campaignVisualisationsMapped}
            triggerUpdate={triggerUpdate}
          />
        </div>
      )}
    </>
  );
};
