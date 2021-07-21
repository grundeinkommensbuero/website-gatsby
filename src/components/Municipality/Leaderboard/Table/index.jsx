import React from 'react';
import { ExpandableRow } from '../../MapAndSearch/ExpandableRow';
import * as s from '../style.module.less';

export const Table = ({ slicedMunicipalities }) => {
  return (
    <table className={s.tableBody}>
      <tbody>
        <TableData slicedMunicipalities={slicedMunicipalities} />
      </tbody>
    </table>
  );
};

const TableData = ({ slicedMunicipalities }) => {
  return slicedMunicipalities.map(municipality => {
    return (
      <tr className={s.tableRow} key={municipality.ags}>
        <td className={s.tableRowContent}>
          <ExpandableRow municipality={municipality} />
        </td>
      </tr>
    );
  });
};
