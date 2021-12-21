import React, { useContext, useEffect, useState } from 'react';
import { SectionInner } from '../../Layout/Sections';
import * as s from './style.module.less';
import AvatarImage from '../../AvatarImage';
import {
  useGetMostRecentInteractions,
  useUpdateInteraction,
} from '../../../hooks/Api/Interactions';

import { CTALink } from '../../Layout/CTAButton';
import AuthContext from '../../../context/Authentication';

import paketSvg from '../paket-v2.svg';
import check from '../check.svg';

import { LoadingAnimation } from '../../LoadingAnimation';
import cN from 'classnames';

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
      <h2 className={s.headingViolet}>Alle Sammelpakete</h2>
      <p>Intro-Text zu Sammelpaketen</p>

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
          <h3 className={s.headingViolet}>Deine Pakete</h3>
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
                  createdAt={pledgePackage.createdAt}
                />
              );
            })}
          </div>

          {pledgePackagesDone.length > 0 && (
            <>
              <h3 className={s.headingViolet}>
                Diese Pakete wurden schon erledigt!
              </h3>
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

const Package = ({
  body,
  user,
  createdAt,
  id,
  done,
  belongsToCurrentUser = false,
  showDone = false,
}) => {
  const [pledgeUpdateState, updatePledgePackage] = useUpdateInteraction();
  const { updateCustomUserData } = useContext(AuthContext);
  const [, , getInteractions] = useGetMostRecentInteractions();

  useEffect(() => {
    if (pledgeUpdateState === 'saved') {
      getInteractions(null, 0, 'pledgePackage');
      updateCustomUserData();
    }
  }, [pledgeUpdateState]);

  return (
    <div
      className={cN(s.fullPackage, {
        [s.extraBottomMargin]: belongsToCurrentUser || showDone,
      })}
    >
      <div className={s.packageIconContainer}>
        <img
          src={paketSvg}
          className={s.packageIcon}
          alt="Symbolbild eines Paketes"
        />
        <AvatarImage className={s.avatar} user={user} sizes="120px" />
        {belongsToCurrentUser ? (
          <>
            {pledgeUpdateState === 'saving' ? (
              <div className={s.loadingPackageUpdate}>
                <LoadingAnimation />
              </div>
            ) : (
              <>
                {!done && pledgeUpdateState !== 'saved' ? (
                  <button
                    onClick={() =>
                      updatePledgePackage({
                        id: id,
                        done: true,
                      })
                    }
                    className={cN(
                      s.linkLikeFormattedButton,
                      s.onWhiteBackground,
                      s.setDone
                    )}
                  >
                    <b>Als erledigt markieren</b>
                  </button>
                ) : (
                  <p className={s.isDone}>
                    <img
                      src={check}
                      className={s.checkIcon}
                      alt="Häkchen-Icon"
                    />
                    <b>ERLEDIGT!</b>
                  </p>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {showDone && (
              <p className={s.isDone}>
                <img src={check} className={s.checkIcon} alt="Häkchen-Icon" />
                <b>ERLEDIGT!</b>
              </p>
            )}
          </>
        )}
      </div>
      <div className={s.packageTextContainer}>
        <h4 className={s.name}>{user.username}</h4>
        <p className={s.createdAt}>Vor {getElapsedTime(createdAt)}</p>
        <p className={s.quote}>"{body}"</p>
      </div>
    </div>
  );
};

const getElapsedTime = createdAt => {
  const endTime = new Date();
  const startTime = new Date(createdAt);
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
