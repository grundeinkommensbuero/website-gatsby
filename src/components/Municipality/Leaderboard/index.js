import React, { useState, useContext } from 'react';
import { fetchPageNumbers, paginate } from './utils';
import { MunicipalityContext } from '../../../context/Municipality/index';

import s from './style.module.less';

import { TabSelector } from './TabSelector';
import { TableHeader } from './TableHeader';
import { TableData } from './TableData';
import { PageSelector } from './PageSelector';

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
      <h3 className={s.title}>Schau wo deine Gemeinde steht!</h3>
      <div className={s.tabSelectorContainer}>
        <TabSelector
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          setCurrentDataSet={setCurrentDataSet}
          leaderboardSegments={leaderboardSegments}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <table className={s.tableBody}>
        <tbody>
          <tr>
            <TableHeader />
          </tr>
          <TableData slicedMunicipalities={slicedMunicipalities} />
        </tbody>
      </table>
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