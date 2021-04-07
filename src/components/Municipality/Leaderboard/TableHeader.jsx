import React from 'react';
import * as s from './style.module.less';

export const TableHeader = () => {
  let header = ['Ort', 'Benötigte Unterschriften', 'Prozent', 'Bevölkerung'];
  return header.map((key, index) => {
    return (
      <th key={index} className={s.tableHead}>
        {key.toUpperCase()}
      </th>
    );
  });
};
