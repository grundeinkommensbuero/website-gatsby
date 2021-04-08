import React, { useState } from 'react';
import * as s from './style.module.less';
import cN from 'classnames';
import tabs from './tabs.json';

export const TabSelector = ({
  setCurrentDataSet,
  leaderboardSegments,
  defaultDataSet = 'hot',
}) => {
  const [currentTab, setCurrentTab] = useState(defaultDataSet);

  return tabs.map(tab => {
    return (
      <div
        key={tab.dataSet}
        aria-hidden="true"
        className={cN(s.tabSelectorElement, {
          [s.activeTabSelector]: tab.dataSet === currentTab,
        })}
        onClick={() => {
          console.log(tab);
          setCurrentTab(tab.dataSet);
          setCurrentDataSet(leaderboardSegments[tab.dataSet]);
        }}
      >
        <b>{tab.tabName}</b>
      </div>
    );
  });
};
