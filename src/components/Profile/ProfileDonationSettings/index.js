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
        <h4>
          Die Expedition ist gemeinnützig und finanziert sich ausschließlich aus den{' '}
          Spenden vieler, vieler Expeditionsmitglieder und einiger Stiftungen.{' '}
          Deine Spende macht die Expedition also erst möglich!
        </h4>
        <DonationForm styling="noBackgroundAndPadding" />
      </section>
    </section>
  )
};