import React, { useState, useEffect } from 'react';
import { TableHeader } from './TableHeader';
import { TableData } from './TableData';
import { TableHeaderEvent } from './TableHeader';
import { TableDataEvent } from './TableData';
import * as s from '../style.module.less';
import tabs from './tabs.json';

export const Table = ({ slicedMunicipalities, currentTab }) => {
  const [isEventTable, setIsEventTable] = useState();

  useEffect(() => {
    if (currentTab !== 3) {
      setIsEventTable(tabs[currentTab].dataSet === 'hot');
    }
  });

  return (
    <>
      {isEventTable ? (
        <table className={s.tableBody}>
          <tbody>
            {/* <tr>
              <TableHeaderEvent />
            </tr> */}
            <TableDataEvent slicedMunicipalities={slicedMunicipalities} />
          </tbody>
        </table>
      ) : (
        <table className={s.tableBody}>
          <tbody>
            {/* <tr>
              <TableHeader />
            </tr> */}
            <TableData slicedMunicipalities={slicedMunicipalities} />
          </tbody>
        </table>
      )}
    </>
  );
};
