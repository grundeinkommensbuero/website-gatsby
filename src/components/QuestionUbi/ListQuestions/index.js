import React, { useContext, useEffect, useState } from 'react';
import { SectionInner } from '../../Layout/Sections';
import * as s from './style.module.less';
import AvatarImage from '../../AvatarImage';
import { useGetMostRecentQuestions } from '../../../hooks/Api/Questions';
import { CTALink } from '../../Layout/CTAButton';
import AuthContext from '../../../context/Authentication';

import paketSvg from '../paket-v2.svg';

export default () => {
  const [, questions, getQuestions] = useGetMostRecentQuestions();
  const { userId, customUserData: userData } = useContext(AuthContext);
  const [packagesDone, setPackagesDone] = useState(0);

  useEffect(() => {
    getQuestions(null, 0);
  }, []);

  useEffect(() => {
    let counter = 0;
    questions.forEach(question => {
      if (question.done) {
        counter = counter + 1;
      }
    });
    setPackagesDone(counter);
  }, [questions]);

  return (
    <SectionInner wide={true}>
      <h2 className={s.headingViolet}>Alle Sammelpakete</h2>
      <p>Intro-Text zu Sammelpaketen</p>
      <p>
        <b>
          Schon {questions.length} Pakete verteilt
          {packagesDone > 0 && ` und davon ${packagesDone} erledigt`}!
        </b>
      </p>
      {userData?.questions && userData.questions.length > 0 && (
        <div>
          <h3 className={s.headingViolet}>Deine Pakete</h3>
          <p>
            Du hast dir {userData.questions.length} Pakete geschnappt und somit
            versprochen, {userData.questions.length * 50} Unterschriften zu
            sammeln.
          </p>
          <div className={s.container}>
            {userData.questions.map((question, index) => {
              return (
                <Package
                  key={index}
                  body={question.body}
                  user={userData}
                  timestamp={question.timestamp}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className={s.CTA}>
        {userId && (
          <CTALink to={`/mensch/${userId}/paket-nehmen`}>
            {userData?.questions?.length === 0
              ? 'Nimm dein Paket'
              : 'Weiteres Paket nehmen'}
          </CTALink>
        )}
      </div>

      <h3 className={s.headingViolet}>
        Diese Pakete hat sich schon jemand geschnappt
      </h3>

      <div className={s.container}>
        {questions.map((question, index) => {
          return (
            <Package
              key={index}
              body={question.body}
              user={question.user}
              timestamp={question.timestamp}
            />
          );
        })}
      </div>
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
        <AvatarImage className={s.avatar} user={user} />
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
