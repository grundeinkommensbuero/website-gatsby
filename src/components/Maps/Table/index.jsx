import React from 'react';
import * as s from '../style.module.less';
import { contentfulJsonToHtml } from '../../utils/contentfulJsonToHtml';

export const Table = ({ collectSignaturesLocationsFiltered }) => {
  return (
    <table className={s.tableBody}>
      <tbody>
        <TableData
          collectSignaturesLocationsFiltered={
            collectSignaturesLocationsFiltered
          }
        />
      </tbody>
    </table>
  );
};

const TableData = ({ collectSignaturesLocationsFiltered }) => {
  return collectSignaturesLocationsFiltered.map(location => {
    return (
      <tr className={s.tableRow} key={location.title}>
        <td>
          <h4>{location.title}</h4>
        </td>
        <td>{contentfulJsonToHtml(location.description)}</td>
      </tr>
    );
  });
};
