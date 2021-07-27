import React, { useState } from 'react';
import { MunicipalityDetails } from './MunicipalityDetails';
import { MunicipalityMoreDetails } from './MunicipalityMoreDetails';
import * as s from './style.module.less';
import cN from 'classnames';

export const ExpandableRow = ({ municipality, isExpanded = false }) => {
  const [isExpandedState, setIsExpandedState] = useState(isExpanded);

  return (
    <div className={s.expandableRow}>
      <button
        className={s.expandButton}
        type="button"
        aria-label={
          isExpandedState
            ? 'Gemeindeinfo einklappen'
            : 'Gemeindeinfo ausklappen'
        }
        onClick={() => setIsExpandedState(!isExpandedState)}
      >
        <div>
          <div
            className={cN(s.triangle, { [s.animateTriangle]: isExpandedState })}
          ></div>
        </div>
      </button>
      <MunicipalityDetails municipality={municipality} />
      {isExpandedState && (
        <MunicipalityMoreDetails municipality={municipality} />
      )}
    </div>
  );
};
