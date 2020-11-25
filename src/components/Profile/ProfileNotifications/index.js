import React from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';

export default ({ userData, userId }) => {
  return (
    <section className={gS.profilePageGrid}>
      <section className={cN(gS.editPageSection, gS.editSettings)}>
        <div className={gS.backToProfile}>
          {/* add a cancel method */}
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>


      </section>
    </section >
  )
};
