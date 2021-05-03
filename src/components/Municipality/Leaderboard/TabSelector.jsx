import React, { useEffect } from 'react';
import * as s from './style.module.less';
import cN from 'classnames';
import tabs from './tabs.json';

export const TabSelector = ({
  currentTab,
  setCurrentTab,
  setCurrentDataSet,
  leaderboardSegments,
}) => {
  useEffect(() => {
    setCurrentDataSet(leaderboardSegments[tabs[currentTab].dataSet]);
  }, [leaderboardSegments]);

  return tabs.map((tab, tabIndex) => {
    return (
      <div
        key={tab.dataSet}
        aria-hidden="true"
        className={cN(s.tabSelectorElement, {
          [s.activeTabSelector]: tabIndex === currentTab,
        })}
        onClick={() => {
          setCurrentTab(tabIndex);
          setCurrentDataSet(leaderboardSegments[tab.dataSet]);
        }}
      >
        {tab.tabName}
      </div>
    );
  });
};
