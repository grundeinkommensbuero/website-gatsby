import React from 'react';
import Map from './Map';

export default ({ config }) => {
  return (
    <>
      {config.map(map => {
        return <Map config={map} />;
      })}
    </>
  );
};
