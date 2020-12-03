import React from 'react';
import gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import DonationForm from '../../Forms/DonationForm';


export const ProfileDonationSettings = ({ userId }) => {
  return (
    <section className={gS.profilePageGrid}>
      <section className={cN(gS.editPageSection, gS.editSettings)}>
        <div className={gS.backToProfile}>
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>
        <DonationForm />
      </section>
    </section>
  )
};