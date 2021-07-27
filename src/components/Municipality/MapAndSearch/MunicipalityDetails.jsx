import React from 'react';
import * as s from './style.module.less';
import cN from 'classnames';

export const MunicipalityDetails = ({ municipality, statsInDays }) => {
  if (municipality) {
    return (
      <>
        <div className={s.spaceBetween}>
          <h3 className={s.noMargin}>{municipality.name}</h3>
          <h3 className={cN(s.noMargin, s.percentage)}>
            {municipality.percent}%
          </h3>
        </div>
        <p className={s.description}>
          {getDescription(municipality, statsInDays)}
        </p>
      </>
    );
  }
  return null;
};

const getDescription = (municipality, statsInDays) => {
  if (municipality.event) {
    const signupsGathered =
      municipality.event.signups[1] - municipality.event.signups[0];
    return `${signupsGathered.toLocaleString(
      'de-DE'
    )} Anmeldungen in den letzten ${statsInDays} Tagen`;
  }
  const signupsToGoal = municipality.goal - municipality.signups;
  if (signupsToGoal > 0) {
    return `Noch ${signupsToGoal.toLocaleString(
      'de-DE'
    )} Anmeldungen bis zum Ziel`;
  }
  const signupsFromGoal = municipality.signups - municipality.goal;
  return `Schon ${signupsFromGoal.toLocaleString(
    'de-DE'
  )} Anmeldungen über das Ziel hinaus!`;
};
