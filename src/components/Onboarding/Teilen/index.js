import React from 'react';
import gS from '../style.module.less';

export const Teilen = ({ userData, userId }) => {
  return (
    <>
      <section className={gS.pageContainer}>
        <h1>Teilen: {userData.username}</h1>
      </section>
    </>
  );
};