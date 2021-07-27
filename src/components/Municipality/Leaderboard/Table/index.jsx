import React from 'react';
import { ExpandableRow } from '../../MapAndSearch/ExpandableRow';
import * as s from '../style.module.less';

export const Table = ({ slicedMunicipalities, statsInDays }) => {
  return (
    <table className={s.tableBody}>
      <tbody>
        <TableData
          statsInDays={statsInDays}
          slicedMunicipalities={slicedMunicipalities}
        />
      </tbody>
    </table>
  );
};

const TableData = ({ slicedMunicipalities, statsInDays }) => {
  return slicedMunicipalities.map(municipality => {
    return (
      <tr className={s.tableRow} key={municipality.ags}>
        <td>
          <ExpandableRow
            statsInDays={statsInDays}
            municipality={municipality}
          />
        </td>
      </tr>
    );
  });
};
