import React, { useContext, useEffect, useState } from 'react';
import { SectionInner } from '../../Layout/Sections';
import * as s from './style.module.less';
import { useGetMostRecentInteractions } from '../../../hooks/Api/Interactions';

import { CTALink } from '../../Layout/CTAButton';
import AuthContext from '../../../context/Authentication';

import { LoadingAnimation } from '../../LoadingAnimation';
import { Package } from './Package';

export default () => {
  const [state, pledgePackages, getInteractions] =
    useGetMostRecentInteractions();
  const { userId, customUserData: userData } = useContext(AuthContext);
  const [packagesOfUser, setPackagesOfUser] = useState([]);
  const [pledgePackagesDone, setPledgePackagesDone] = useState([]);

  // Fetch all interactions once
  useEffect(() => {
    getInteractions(null, 0, 'pledgePackage');
  }, []);

  // Get a list of all done packages
  useEffect(() => {
    const done = pledgePackages.filter(pledgePackage => pledgePackage.done);
    setPledgePackagesDone(done);
  }, [pledgePackages]);

  // Get only pledge packages from user interactions
  useEffect(() => {
    if (userData?.interactions) {
      setPackagesOfUser(
        userData.interactions.filter(
          interaction => interaction.type === 'pledgePackage'
        )
      );
    }
  }, [userData]);

  return (
    <SectionInner wide={true}>
      <h2 className={s.violet}>Alle Sammelpakete</h2>
      <p>
        Zeig deinen Einsatz für's Grundeinkommen und setze dir ein Sammelziel!
        Es gibt Pakete mit jeweils einem Ziel von 50 Unterschriften, von denen
        du dir so viele nehmen kannst, wie du möchtest!{' '}
        {userData.interactions &&
          packagesOfUser.length === 0 &&
          'Mach mit und schnapp dir dein erstes Paket!'}
      </p>

      {state && state !== 'loading' && (
        <p>
          {pledgePackages[0] ? (
            <b>
              Schon {pledgePackages.length} Pakete verteilt
              {pledgePackagesDone.length > 0 &&
                ` und davon ${pledgePackagesDone.length} erledigt`}
              !
            </b>
          ) : (
            <b>Noch keine Pakete verteilt!</b>
          )}
        </p>
      )}

      {packagesOfUser.length > 0 && (
        <div>
          <h3 className={s.violet}>Deine Pakete</h3>
          <p>
            Du hast dir {packagesOfUser.length} Pakete geschnappt und somit
            versprochen, {packagesOfUser.length * 50} Unterschriften zu sammeln.
          </p>
          <div className={s.container}>
            {packagesOfUser.map((pledgePackage, index) => {
              return (
                <Package
                  belongsToCurrentUser={true}
                  key={index}
                  body={pledgePackage.body}
                  user={userData}
                  createdAt={pledgePackage.createdAt}
                  id={pledgePackage.id}
                  done={pledgePackage.done}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className={s.CTA}>
        {userId && (
          <CTALink to={`/mensch/${userId}/paket-nehmen`}>
            {userData && packagesOfUser.length === 0
              ? 'Nimm dein Paket'
              : 'Weiteres Paket nehmen'}
          </CTALink>
        )}
      </div>

      {state && state !== 'loading' ? (
        <>
          {pledgePackages.length > 0 ? (
            <h3 className={s.violet}>
              Diese Pakete hat sich schon jemand geschnappt
            </h3>
          ) : (
            <h3 className={s.violet}>Noch keine Pakete verteilt!</h3>
          )}

          <div className={s.container}>
            {pledgePackages.map((pledgePackage, index) => {
              return (
                <Package
                  key={index}
                  body={pledgePackage.body}
                  user={pledgePackage.user}
                  createdAt={pledgePackage.createdAt}
                />
              );
            })}
          </div>

          {pledgePackagesDone.length > 0 && (
            <>
              <h3 className={s.violet}>Diese Pakete wurden schon erledigt!</h3>
              <div className={s.container}>
                {pledgePackagesDone.map((pledgePackage, index) => {
                  return (
                    <Package
                      key={index}
                      body={pledgePackage.body}
                      user={pledgePackage.user}
                      createdAt={pledgePackage.createdAt}
                      showDone={true}
                    />
                  );
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <LoadingAnimation />
      )}
    </SectionInner>
  );
};
