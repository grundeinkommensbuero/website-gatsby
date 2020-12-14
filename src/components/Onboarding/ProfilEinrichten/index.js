import React from 'react';
import gS from '../style.module.less';

export const ProfilEinrichten = ({ userData, userId }) => {
  return (
    <>
      <section className={gS.pageContainer}>
        <h1>Profil Einrichten: {userData.username}</h1>
      </section>
    </>
  );
};