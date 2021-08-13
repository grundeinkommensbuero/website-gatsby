import React from 'react';
import { ShowMeetups } from '../../Maps/ShowMeetups';
import { contentfulJsonToHtml } from '../../utils/contentfulJsonToHtml';

export const MunicipalityCollectionMap = ({ text, maps }) => {
  return (
    <>
      {text && <div>{contentfulJsonToHtml(text)}</div>}
      {maps && <ShowMeetups config={maps} />}
    </>
  );
};

// Default export needed for lazy loading
export default MunicipalityCollectionMap;
