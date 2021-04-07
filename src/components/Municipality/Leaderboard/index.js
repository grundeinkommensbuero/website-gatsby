import React, { useState, useContext } from 'react';
import { fetchPageNumbers, paginate } from './utils';
import { MunicipalityContext } from '../../../context/Municipality/index';

import s from './style.module.less';

import { TableHeader } from './TableHeader';
import { TableData } from './TableData';
import { PageSelector } from './PageSelector';

export const Leaderboard = () => {
  const { municipalitiesGoalSignup } = useContext(MunicipalityContext);
  const [currentPage, setCurrentPage] = useState(1);
  const paginated = paginate(municipalitiesGoalSignup.length, currentPage);

  const pageControls = fetchPageNumbers({
    currentPage,
    totalPages: paginated.pages.length,
    pageNeighbours: 2,
  });

  const slicedMunicipalities = municipalitiesGoalSignup.slice(
    paginated.startIndex,
    paginated.endIndex + 1
  );

  return (
    <div>
      <h3 className={s.title}>Leader:innenboard</h3>
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