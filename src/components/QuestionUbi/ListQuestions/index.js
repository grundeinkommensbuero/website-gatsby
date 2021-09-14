import React, { useContext, useEffect } from 'react';
import { SectionInner } from '../../Layout/Sections';
import * as s from './style.module.less';
import { Speechbubble } from '../Speechbubble';
import AvatarImage from '../../AvatarImage';
import { useGetMostRecentQuestions } from '../../../hooks/Api/Questions';
import cN from 'classnames';
import { CTALink } from '../../Layout/CTAButton';
import AuthContext from '../../../context/Authentication';

export default () => {
  const [, questions, getQuestions] = useGetMostRecentQuestions();
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    getQuestions(null, 0);
  }, []);

  return (
    <SectionInner wide={true}>
      <h2 className={s.headingViolet}>Alle Sammelpakete</h2>
      <p>Intro-Text zu Sammelpaketen</p>
      <p>
        <b>Schon XX Pakete verteilt und davon XX erledigt!</b>
      </p>
      <h3 className={s.headingViolet}>Deine Pakete</h3>
      <p>
        Du hast dir XX Pakete geschnappt und somit versprochen, XX
        Unterschriften zu sammeln.
      </p>
      <div className={s.container}>
        {questions.map((question, index) => {
          if (question.user.userId === userId) {
            return <Question key={index} {...question} />;
          } else {
            return null;
          }
        })}
      </div>

      <div className={s.CTA}>
        {userId && (
          <CTALink to={`/mensch/${userId}/paket-nehmen`}>
            {questions.some(question => question.user.userId === userId)
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
          return <Question key={index} {...question} />;
        })}
      </div>
    </SectionInner>
  );
};

const Question = ({ user, body, justSent }) => {
  let usernameAndCity = user.username;
  if (user.city) {
    usernameAndCity += ` aus ${user.city}`;
  }
  return (
    <article className={cN(s.question, { [s.justSent]: justSent })}>
      <Speechbubble isSmall={true}>
        <div className={s.questionContent}>{body}</div>
      </Speechbubble>
      <div className={s.belowSpeechBubble}>
        <AvatarImage className={s.avatar} user={user} sizes="40px" />
        <div className={s.name} title={usernameAndCity}>
          {usernameAndCity}{' '}
        </div>
      </div>
    </article>
  );
};
