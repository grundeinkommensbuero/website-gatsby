import React, { useState } from 'react';
import { MunicipalityDetails } from './MunicipalityDetails';
import { MunicipalityMoreDetails } from './MunicipalityMoreDetails';
import * as s from './style.module.less';
import cN from 'classnames';

export const ExpandableRow = ({ municipality, isExpanded = false }) => {
  const [isExpandedState, setIsExpandedState] = useState(isExpanded);
  return (
    <div className={s.extendableRow}>
      <button
        className={s.expandButton}
        type="button"
        aria-labelledby="forScreenReader"
        onClick={() => setIsExpandedState(!isExpandedState)}
      >
        <span class="icon-remove"></span>
        <span id="forScreenReader" className={s.srOnly}>
          Weitere Gemeindeinfo auskappen
        </span>
        <div>
          <div
            id={s.myTriangle}
            className={cN(s.triangle, { [s.animateTriangle]: isExpandedState })}
          ></div>
        </div>
      </button>
      <MunicipalityDetails municipality={municipality} />
      {isExpanded && <MunicipalityMoreDetails municipality={municipality} />}
    </div>
  );
};
