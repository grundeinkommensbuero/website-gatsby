import React, { useEffect } from 'react';
import * as s from '../style.module.less';
import cN from 'classnames';
import tabs from './tabs.json';

export const TabSelector = ({
  currentTab,
  setCurrentTab,
  setCurrentDataSet,
  leaderboardSegments,
  setCurrentPage,
}) => {
  useEffect(() => {
    setCurrentDataSet(leaderboardSegments[tabs[currentTab].dataSet]);
  }, [leaderboardSegments]);

  return tabs.map((tab, tabIndex) => {
    return (
      <button
        key={tab.dataSet}
        className={cN(
          s.linkLikeFormattedButton,
          s.noTextDecoration,
          s.tabSelectorElement,
          {
            [s.activeTabSelector]: tabIndex === currentTab,
          }
        )}
        onClick={() => {
          setCurrentTab(tabIndex);
          setCurrentDataSet(leaderboardSegments[tab.dataSet]);
          setCurrentPage(1);
        }}
      >
        {tab.tabName}
      </button>
    );
  });
};
