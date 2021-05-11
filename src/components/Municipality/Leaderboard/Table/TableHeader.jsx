import React from 'react';
import * as s from '../style.module.less';
import cN from 'classnames';

export const TableHeader = () => {
  const header = ['Ort', 'Signups', 'Prozent'];

  return header.map((key, index) => {
    return (
      <th key={index} className={s.tableHead}>
        {key.toUpperCase()}
      </th>
    );
  });
};

export const TableHeaderEvent = () => {
  return (
    <>
      <th className={s.tableHead}>
        <b>ORT</b>
      </th>
      <th className={cN(s.alignRight, s.tableHead)}>
        <b>PROZENT</b>
      </th>
      <th className={cN(s.alignRight, s.tableHead)}>
        <b>ZUWACHS</b>
      </th>
    </>
  );
};
