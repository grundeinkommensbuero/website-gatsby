import React, { useState, useEffect, useContext } from 'react';
import { fetchPageNumbers, paginate } from '../../utils/pagination';
import { MunicipalityContext } from '../../../context/Municipality/index';

import * as s from './style.module.less';

import { Table } from './Table';
import { PageSelector } from './Table/PageSelector';

export const QualifiedBoard = () => {
  const { leaderboardSegments, statsInDays } = useContext(MunicipalityContext);
  const [currentDataSet, setCurrentDataSet] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationInfo = paginate(currentDataSet.length, currentPage);

  useEffect(() => {
    setCurrentDataSet(leaderboardSegments.qualified);
  }, [leaderboardSegments]);

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
      <Table
        currentTab={3}
        slicedMunicipalities={slicedMunicipalities}
        statsInDays={statsInDays}
      />
      <div className={s.pageSelectorContainer}>
        <PageSelector
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageControls={pageControls}
        />
      </div>
    </div>
  );
};
