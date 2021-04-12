import React from 'react';
import * as s from './style.module.less';

export const TableData = ({ slicedMunicipalities }) => {
  return slicedMunicipalities.map(municipality => {
    const { ags, name, signups, goal, percent } = municipality;
    return (
      <tr key={ags}>
        <td>
          <b>{name}</b>
        </td>
        <td>
          <b>{signups}</b>
          <span className={s.smallGoalNumber}> /{goal}</span>
        </td>
        <td className={s.alignRight}>
          <b>{percent} %</b>
        </td>
      </tr>
    );
  });
};
