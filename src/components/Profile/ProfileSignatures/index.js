import React from 'react';
import s from './style.module.less';
import gS from '../style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet-async';
import SelfScan from '../../../components/Forms/SelfScan';



export const ProfileSignatures = ({ userId }) => {
  return (
    <section className={gS.profilePageGrid}>
      <section className={cN(gS.editPageSection, gS.editSettings)}>
        <div className={gS.backToProfile}>
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>

        <section className={s.signatureSection}>
          <Helmet>
            <title>Selbsteingabe Unterschriftsliste</title>
          </Helmet>

          <SelfScan
            campaignCode="berlin-1"
            successMessage="Danke! Bitte schicke die Listen möglichst schnell an: Expedition Grundeinkommen, Karl-Marx-Straße 50, 12043 Berlin"
          />
        </section>
      </section>
    </section>
  )
};