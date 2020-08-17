import React from 'react';
import Map from './Map';

export default ({ config }) => {
  return (
    <>
      {config.map((mapConfig, i) => {
        return <Map key={i} mapConfig={mapConfig} />;
      })}
    </>
  );
};
