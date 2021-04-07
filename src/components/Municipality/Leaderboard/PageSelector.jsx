import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';

export const PageSelector = ({ currentPage, setCurrentPage, pageControls }) => {
  return pageControls.map(pagenumber => {
    let nextpage = pagenumber;
    if (pagenumber === '>>') {
      nextpage = currentPage + 1;
    } else if (pagenumber === '<<') {
      nextpage = currentPage - 1;
    }
    return (
      <span
        key={pagenumber}
        aria-hidden="true"
        className={cN(s.pageSelectorElement, {
          [s.activePageSelector]: pagenumber === currentPage,
        })}
        onClick={() => setCurrentPage(nextpage)}
      >
        {pagenumber}
      </span>
    );
  });
};
