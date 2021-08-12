import React from 'react';
import CampaignVisualisations from '../../CampaignVisualisations';
import * as s from './style.module.less';

import { contentfulJsonToHtml } from '../../utils/contentfulJsonToHtml';

export const MunicipalityCampaignVisualisations = ({
  title,
  text,
  campaignVisualisations,
}) => {
  return (
    <div className={s.municipalitySignatureBarContainer}>
      {campaignVisualisations && (
        <CampaignVisualisations visualisations={campaignVisualisations} />
      )}
      {title && <h2 className={s.municipalitySignatureBarTitle}>{title}</h2>}
      {text && <div>{contentfulJsonToHtml(text)}</div>}
    </div>
  );
};

// Default export needed for lazy loading
export default MunicipalityCampaignVisualisations;
