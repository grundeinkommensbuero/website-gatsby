import React from 'react';
import CreatePledgePackage from '../../PledgePackage/CreatePledgePackage';
import * as gS from '../style.module.less';
import * as s from './style.module.less';
import cN from 'classnames';
import { Link } from 'gatsby';
const IS_BERLIN_PROJECT = process.env.GATSBY_PROJECT === 'Berlin';

export const ProfilePledgePackage = ({ userData, updateCustomUserData }) => {
  return (
    <section className={gS.profilePageGrid}>
      <section
        className={cN(
          gS.editPageSection,
          gS.editSettings,
          {
            [gS.rose]: IS_BERLIN_PROJECT,
          },
          s.createPledgePackageSection
        )}
      >
        <div className={gS.backToProfile}>
          <Link to={'/sammelpakete'}>Zurück zu allen Paketen</Link>
        </div>
        <CreatePledgePackage
          userData={userData}
          updateCustomUserData={updateCustomUserData}
        />
      </section>
    </section>
  );
};
