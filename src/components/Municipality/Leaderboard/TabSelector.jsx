import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';

export const TabSelector = ({ setCurrentDataSet, leaderboardSegments }) => {
  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setCurrentDataSet(leaderboardSegments.hot)}
      >
        Hot
      </div>
      <div
        aria-hidden="true"
        onClick={() =>
          setCurrentDataSet(leaderboardSegments.smallMunicipalities)
        }
      >
        Small
      </div>
      <div
        aria-hidden="true"
        onClick={() =>
          setCurrentDataSet(leaderboardSegments.largeMunicipalities)
        }
      >
        Large
      </div>
      <div
        aria-hidden="true"
        onClick={() => setCurrentDataSet(leaderboardSegments.qualified)}
      >
        Qualified
      </div>
    </>
  );
};
