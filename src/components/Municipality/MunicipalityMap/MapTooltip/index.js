import React from 'react';
import s from './style.module.less';

export const MapTooltip = ({ hoverInfo, getColor }) => {
  // No tootltip if these attributes are not available
  if (
    !hoverInfo ||
    !hoverInfo.object ||
    !hoverInfo.object.name ||
    typeof hoverInfo.object.percentToGoal !== 'number'
  ) {
    return null;
  }

  const {
    x,
    y,
    object: { name, signups, goal, percentToGoal },
  } = hoverInfo;

  return (
    <div
      className={s.tooltipContainer}
      style={{
        background: getColor(percentToGoal, 255, true),
        left: x,
        top: y,
      }}
    >
      <div className={s.tooltipHeader}>
        <span className={s.tooltipMunicipality}>{name}</span>
      </div>
      <div className={s.tooltipInfoContainer}>
        <TooltipInfo
          name={name}
          signups={signups}
          goal={goal}
          percentToGoal={percentToGoal}
        />
      </div>
    </div>
  );
};

const TooltipInfo = ({ name, signups, goal, percentToGoal }) => {
  // Fallback note
  if (
    typeof signups !== 'number' ||
    typeof goal !== 'number' ||
    typeof percentToGoal !== 'number'
  ) {
    return (
      <div className={s.tooltipInfo}>
        Derzeit haben wir leider keine weiteren Infos zu {name}. Versuche es in
        einigen Augenblicken erneut.
      </div>
    );
  }

  // States
  const isBelowThreshold = percentToGoal < 10;
  const isQualifying = percentToGoal >= 10 && percentToGoal < 100;
  const isQualified = percentToGoal >= 100;

  if (isBelowThreshold) {
    return (
      <div className={s.tooltipInfo}>
        Schon {display(signups)} Personen haben sich angemeldet und wollen
        Grundeinkommen nach {name} holen.
      </div>
    );
  }

  if (isQualifying) {
    return (
      <div className={s.tooltipInfo}>
        Schon {display(signups)} Personen haben sich angemeldet und wollen
        Grundeinkommen nach {name} holen. Das sind {display(percentToGoal)}
        &nbsp;% vom Qualifizierungsziel. Es müssen sich noch{' '}
        {display(goal - signups)} Personen anmelden, damit sich {name} zur
        Teilnahme qualifiziert.
      </div>
    );
  }

  if (isQualified) {
    return (
      <div className={s.tooltipInfo}>
        In {name} wurde das erste Ziel erreicht. {display(signups)} Personen
        wollen die Abstimmung zum Modellversuch starten. Jede weitere Person
        erhöht die Chance, dass es in {name} zum Modellversuch kommt!
      </div>
    );
  }
  // Safety: return nothing
  return null;
};

const display = number => {
  return Math.round(number).toLocaleString('de-DE');
};
