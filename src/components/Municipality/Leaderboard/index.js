import React, { useState, useContext } from 'react';
import { fetchPageNumbers, paginate } from './utils';
import { MunicipalityContext } from '../../../context/Municipality/index';

import * as s from './style.module.less';

import { TabSelector } from './Table/TabSelector';
import { Table } from './Table';
import { PageSelector } from './Table/PageSelector';

export const Leaderboard = () => {
  const { leaderboardSegments } = useContext(MunicipalityContext);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentDataSet, setCurrentDataSet] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationInfo = paginate(currentDataSet.length, currentPage);

  const pageControls = fetchPageNumbers({
    currentPage,
    totalPages: paginationInfo.pages.length,
    pageNeighbours: 1,
  });

  const slicedMunicipalities = currentDataSet.slice(
    paginationInfo.startIndex,
    paginationInfo.endIndex + 1
  );

  return (
    <div>
      <p className={s.title}>Schau, wie es in deinem Ort voran geht:</p>
      <div className={s.tabSelectorContainer}>
        <TabSelector
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          setCurrentDataSet={setCurrentDataSet}
          leaderboardSegments={leaderboardSegments}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Table currentTab={currentTab} slicedMunicipalities={slicedMunicipalities} />
      <div className={s.pageSelectorContainer}>
        <PageSelector
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageControls={pageControls}
        />
      </div>
    </div>
  )
}