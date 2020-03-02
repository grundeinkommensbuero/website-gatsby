import React, { useEffect } from 'react';
import { SectionInner } from '../../Layout/Sections';
import s from './style.module.less';
import { Speechbubble } from '../Speechbubble';
import AvatarImage from '../../AvatarImage';
import { useGetMostRecentQuestions } from '../../../hooks/Api/Questions';
import cN from 'classnames';

export default ({ questionJustSent, userId }) => {
  const [, questions, getQuestions] = useGetMostRecentQuestions();

  useEffect(() => {
    if (userId !== null) {
      getQuestions(userId, 6);
    }
  }, [userId]);

  if (questionJustSent) {
    questionJustSent.justSent = true;
  }

  let questionsWithJustSent = questionJustSent
    ? [questionJustSent, ...questions].filter(
        ({ belongsToCurrentUser }) => !belongsToCurrentUser
      )
    : questions;

  return (
    <SectionInner wide={true}>
      <div className={s.container}>
        {questionsWithJustSent.map((question, index) => {
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
