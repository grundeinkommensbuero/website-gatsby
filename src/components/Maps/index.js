import React from 'react';
import { ShowMeetups } from './ShowMeetups';
import * as s from './style.module.less';
import cN from 'classnames';

export default ({ config }) => {
  return (
    <>
      {config.map((mapConfig, i) => {
        return (
          <ShowMeetups
            key={i}
            mapConfig={mapConfig}
            // Needed for overflowing popup if there is two maps (e.g. in Bremen)
            className={cN({
              [s.mapSection]: config.length > 1 && i === 0,
            })}
          />
        );
      })}
    </>
  );
};
