import React from 'react';

export const TableData = ({ slicedMunicipalities }) => {
  return slicedMunicipalities.map(municipality => {
    const { ags, name, percent, signups, goal, population } = municipality;
    return (
      <tr key={ags}>
        <td>{name}</td>
        <td>
          {signups} / {goal}
        </td>
        <td>{percent} %</td>
        <td>{population}</td>
      </tr>
    );
  });
};
