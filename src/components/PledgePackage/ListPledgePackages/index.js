import React, { useContext, useEffect, useState } from 'react';
import { SectionInner } from '../../Layout/Sections';
import * as s from './style.module.less';
import AvatarImage from '../../AvatarImage';
import { useGetMostRecentInteractions } from '../../../hooks/Api/Interactions';
import { CTALink } from '../../Layout/CTAButton';
import AuthContext from '../../../context/Authentication';

import paketSvg from '../paket-v2.svg';
import { LoadingAnimation } from '../../LoadingAnimation';

export default () => {
  const [state, pledgePackages, getInteractions] =
    useGetMostRecentInteractions();
  const { userId, customUserData: userData } = useContext(AuthContext);
  const [packagesDone, setPackagesDone] = useState(0);
  const [packagesOfUser, setPackagesOfUser] = useState([]);

  useEffect(() => {
    getInteractions(null, 0, 'pledgePackage');
  }, []);

  useEffect(() => {
    let counter = 0;
    pledgePackages.forEach(pledgePackage => {
      if (pledgePackage.done) {
        counter = counter + 1;
      }
    });
    setPackagesDone(counter);
  }, [pledgePackages]);

  // Filter interactions to only use interactions which were created
  // as pledge package
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
      <h2 className={s.headingViolet}>Alle Sammelpakete</h2>
      <p>Intro-Text zu Sammelpaketen</p>

      {state && state !== 'loading' && (
        <p>
          {pledgePackages[0] ? (
            <b>
              Schon {pledgePackages.length} Pakete verteilt
              {packagesDone > 0 && ` und davon ${packagesDone} erledigt`}!
            </b>
          ) : (
            <b>Noch keine Pakete verteilt!</b>
          )}
        </p>
      )}

      {packagesOfUser.length > 0 && (
        <div>
          <h3 className={s.headingViolet}>Deine Pakete</h3>
          <p>
            Du hast dir {packagesOfUser.length} Pakete geschnappt und somit
            versprochen, {packagesOfUser.length * 50} Unterschriften zu sammeln.
          </p>
          <div className={s.container}>
            {packagesOfUser.map((pledgePackage, index) => {
              return (
                <Package
                  key={index}
                  body={pledgePackage.body}
                  user={userData}
                  timestamp={pledgePackage.timestamp}
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
          {pledgePackages[0] ? (
            <h3 className={s.headingViolet}>
              Diese Pakete hat sich schon jemand geschnappt
            </h3>
          ) : (
            <h3 className={s.headingViolet}>Noch keine Pakete verteilt!</h3>
          )}

          <div className={s.container}>
            {pledgePackages.map((pledgePackage, index) => {
              return (
                <Package
                  key={index}
                  body={pledgePackage.body}
                  user={pledgePackage.user}
                  timestamp={pledgePackage.timestamp}
                />
              );
            })}
          </div>
        </>
      ) : (
        <LoadingAnimation />
      )}
    </SectionInner>
  );
};

const Package = ({ body, user, timestamp }) => {
  return (
    <div className={s.fullPackage}>
      <div className={s.packageIconContainer}>
        <img
          src={paketSvg}
          className={s.packageIcon}
          alt="Symbolbild eines Paketes"
        />
        <AvatarImage className={s.avatar} user={user} sizes="120px" />
      </div>
      <div className={s.packageTextContainer}>
        <h4 className={s.name}>{user.username}</h4>
        <p className={s.timestamp}>Vor {getElapsedTime(timestamp)}</p>
        <p className={s.quote}>"{body}"</p>
      </div>
    </div>
  );
};

const getElapsedTime = timestamp => {
  const endTime = new Date();
  const startTime = new Date(timestamp);
  const timeDiff = endTime.getTime() - startTime.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} ${years === 1 ? 'Jahr' : 'Jahre'}`;
  } else if (months > 0) {
    return `${months} ${months === 1 ? 'Monat' : 'Monate'}`;
  } else if (weeks > 0) {
    return `${weeks} ${weeks === 1 ? 'Woche' : 'Wochen'}`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? 'Tag' : 'Tage'}`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'Minute' : 'Minuten'}`;
  } else if (seconds > 0) {
    return `${seconds} ${seconds === 1 ? 'Sekunde' : 'Sekunden'}`;
  }
};
