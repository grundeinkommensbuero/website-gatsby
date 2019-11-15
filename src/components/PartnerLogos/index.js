import React from 'react';
import s from './style.module.less';
import cN from 'classnames';
import { shouldShowPartners } from '../utils';

const partners = [
  {
    name: 'Mein Grundeinkommen',
    image: require('./meinbge_blue.svg'),
  },
];

export default ({ className, style }) => {
  if (!shouldShowPartners()) {
    return null;
  }
  return (
    <ul style={style} className={cN(className, s.list)}>
      {partners.map((partner, index) => (
        <li key={index}>
          <div>In Kooperation mit</div>
          <img src={partner.image} alt={partner.name} className={s.image} />
        </li>
      ))}
    </ul>
  );
};
