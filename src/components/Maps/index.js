import React from 'react';
import { ShowMeetups } from './ShowMeetups';

export default ({ config }) => {
  return (
    <>
      {config.map((mapConfig, i) => {
        return <ShowMeetups key={i} mapConfig={mapConfig} />;
      })}
    </>
  );
};
