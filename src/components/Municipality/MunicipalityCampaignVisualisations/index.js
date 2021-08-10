import React from 'react';
import CampaignVisualisations from '../../CampaignVisualisations';

import { contentfulJsonToHtml } from '../../utils/contentfulJsonToHtml';

export const MunicipalityCampaignVisualisations = ({
  text,
  campaignVisualisations,
}) => {
  return (
    <>
      {text && <div>{contentfulJsonToHtml(text)}</div>}
      {campaignVisualisations && (
        <CampaignVisualisations visualisations={campaignVisualisations} />
      )}
    </>
  );
};

// Default export needed for lazy loading
export default MunicipalityCampaignVisualisations;
