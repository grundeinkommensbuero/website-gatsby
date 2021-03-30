import React, { useContext, useState } from 'react';
import { MunicipalityContext } from '../../../context/Municipality/index';
import s from './style.module.less';
import cN from 'classnames';
import { fetchPageNumbers, paginate } from './utils';

export const Leaderboard = () => {

  const { municipalitiesGoalSignup } = useContext(MunicipalityContext);
  const [currentPage, setCurrentPage] = useState(1);

  const paginated = paginate(municipalitiesGoalSignup.length, currentPage);
  console.log(paginated);

  const pageControls = fetchPageNumbers({
    currentPage,
    totalPages: paginated.pages.length,
    pageNeighbours: 2
  })

  const slicedMunicipalities = municipalitiesGoalSignup.slice(paginated.startIndex, paginated.endIndex + 1);
  console.log(slicedMunicipalities);

  const TableHeader = () => {
    if (slicedMunicipalities[0]) {
      let header = ['Ort', 'Benötigte Unterschriften', 'Prozent', 'Bevölkerung'];
      return header.map((key, index) => {
        return <th key={index} className={s.tableHead}>{key.toUpperCase()}</th>
      });
    }
    return null;
  };

  const TableData = () => {
    if (slicedMunicipalities[0]) {
      return slicedMunicipalities.map((municipality) => {
        const { ags, name, percent, signups, goal, population } = municipality;
        return (
          <tr key={ags}>
            <td>{name}</td>
            <td>{signups} / {goal}</td>
            <td>{percent} %</td>
            <td>{population}</td>
          </tr>
        )
      })
    }
    return null;
  }

  const Pageselector = () => {
    if (pageControls[0]) {
      return pageControls.map((pagenumber) => {
        let nextpage = pagenumber;
        if (pagenumber === '>>') {
          nextpage = currentPage + 1;
        } else if (pagenumber === '<<') {
          nextpage = currentPage - 1;
        }
        return (
          <span
            key={pagenumber}
            aria-hidden="true"
            className={cN(s.pageSelectorElement, { [s.activePageSelector]: pagenumber === currentPage })}
            onClick={() => setCurrentPage(nextpage)}>
            {pagenumber}
          </span>
        )
      })
    }
    return null;
  }

  return (
    <div>
      <h3 className={s.title}>Leader:innenboard</h3>
      <table className={s.tableBody}>
        <tbody>
          <tr>
            <TableHeader />
          </tr>
          <TableData />
        </tbody>
      </table>
      <div className={s.pageSelectorContainer}>
        <Pageselector />
      </div>
    </div>
  )
}