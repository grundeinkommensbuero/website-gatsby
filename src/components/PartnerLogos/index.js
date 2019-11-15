import React from 'react';

const partners = [
  {
    name: 'Mein Grundeinkommen',
    image: require('./meinbge_red.svg'),
  },
];

export default () => {
  return (
    <ul>
      {partners.map((partner, index) => (
        <li key={index}>
          <img src={partner.image} alt={partner.name} />
        </li>
      ))}
    </ul>
  );
};
