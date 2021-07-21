import React from 'react';
import { TableData } from './TableData';
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
