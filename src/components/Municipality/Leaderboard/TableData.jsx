import React from 'react';

export const TableData = ({ slicedMunicipalities }) => {
  return slicedMunicipalities.map(municipality => {
    const { ags, name, percent } = municipality;
    return (
      <tr key={ags}>
        <td>{name}</td>
        <td>{percent} %</td>
      </tr>
    );
  });
};
