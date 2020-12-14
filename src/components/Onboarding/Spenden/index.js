import React from 'react';
import gS from '../style.module.less';

export const Spenden = ({ userData, userId }) => {
  return (
    <>
      <section className={gS.pageContainer}>
        <h1>Spenden: {userData.username}</h1>
      </section>
    </>
  );
};