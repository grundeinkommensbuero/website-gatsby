import React from 'react';
import CreatePledgePackage from '../../PledgePackage/CreatePledgePackage';
import * as gS from '../style.module.less';
import * as s from './style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';

export const ProfilePledgePackage = ({
  userId,
  userData,
  updateCustomUserData,
}) => {
  return (
    <section className={gS.profilePageGrid}>
      <section
        className={cN(
          gS.editPageSection,
          gS.editSettings,
          s.createPledgePackageSection
        )}
      >
        <div className={gS.backToProfile}>
          <Link to={`/mensch/${userId}/`}>Zurück zum Profil</Link>
        </div>
        <CreatePledgePackage
          userData={userData}
          updateCustomUserData={updateCustomUserData}
        />
      </section>
    </section>
  );
};
