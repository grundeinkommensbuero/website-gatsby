import React from 'react';
import s from './style.module.less';

export const MapTooltip = ({ hoverInfo, getColor }) => {
  return (
    <div
      className={s.tooltipContainer}
      style={{
        background: getColor(hoverInfo.object.percentToGoal, 255, true),
        left: hoverInfo.x,
        top: hoverInfo.y,
        color: 'rgba(255,255,255,0.9)',
      }}
    >
      <div className={s.tooltipHeader}>
        <span className={s.tooltipMunicipality}>{hoverInfo.object.name}</span>
      </div>
      <div className={s.tooltipInfoContainer}>
        <div className={s.tooltipInfo}>
          <span className={s.tooltipLabel}>
            In {hoverInfo.object.name} wurden bereits
          </span>
          <span className={s.tooltipNumber}>
            {' '}
            {hoverInfo.object.percentToGoal}&nbsp;%{' '}
          </span>
          <span className={s.tooltipLabel}>
            der nötigen Anmeldungen erreicht, das sind insgesamt
          </span>
          <span className={s.tooltipNumber}> {hoverInfo.object.signups}!</span>
        </div>
      </div>
    </div>
  );
};
