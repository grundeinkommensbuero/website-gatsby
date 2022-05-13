import React, { useEffect, useContext } from 'react';
import cN from 'classnames';
import * as s from './style.module.less';
import AvatarImage from '../../AvatarImage';
import AuthContext from '../../../context/Authentication';
import {
  useGetMostRecentInteractions,
  useUpdateInteraction,
} from '../../../hooks/Api/Interactions';
import paketSvg from '../paket-v2.svg';
import check from '../check.svg';
import { LoadingAnimation } from '../../LoadingAnimation';
import { SnackbarMessageContext } from '../../../context/Snackbar';
import { Link } from 'gatsby';

export const Package = ({
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
  const { setMessage, setDuration } = useContext(SnackbarMessageContext);

  useEffect(() => {
    if (pledgeUpdateState === 'saved') {
      // We want the snackbar to show longer in this case
      setDuration(12000);
      setMessage(
        <p>
          Super!{' '}
          <Link to="/me/unterschriften-eintragen">
            Trag hier deine Unterschriften ein
          </Link>{' '}
          und lass den Balken steigen.
        </p>
      );
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
        {body && <p className={s.quote}>"{body}"</p>}
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
