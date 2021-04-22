import React from 'react';
import Maps from '../../Maps';
import { contentfulJsonToHtml } from '../../utils/contentfulJsonToHtml';

export const MunicipalityCollectionMap = ({ text, maps }) => {
  return (
    <>
      {text && <div>{contentfulJsonToHtml(text)}</div>}
      {maps && <Maps config={maps} />}
    </>
  );
};
