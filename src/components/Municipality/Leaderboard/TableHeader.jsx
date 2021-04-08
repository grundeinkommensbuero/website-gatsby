import React from 'react';
import * as s from './style.module.less';

export const TableHeader = () => {
  const header = ['Ort', 'Prozent'];

  return header.map((key, index) => {
    return (
      <th key={index} className={s.tableHead}>
        {key.toUpperCase()}
      </th>
    );
  });
};
