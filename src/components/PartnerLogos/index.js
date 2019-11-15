import React from 'react';
import s from './style.module.less';
import cN from 'classnames';

const partners = [
  {
    name: 'Mein Grundeinkommen',
    image: require('./meinbge_red.svg'),
  },
];

export default ({ className }) => {
  return (
    <ul className={cN(className, s.list)}>
      {partners.map((partner, index) => (
        <li key={index}>
          <div>In Kooperation mit</div>
          <img src={partner.image} alt={partner.name} className={s.image} />
        </li>
      ))}
    </ul>
  );
};
