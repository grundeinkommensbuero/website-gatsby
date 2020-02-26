import React, { useEffect, useState } from 'react';
import { SectionInner } from '../../Layout/Sections';
import mockQuestions from './mockQuestions';
import s from './style.module.less';
import { Speechbubble } from '../Speechbubble';
import AvatarImage from '../../AvatarImage';

export default ({ questionJustSent }) => {
  const [questions, setQuestions] = useState(mockQuestions);

  useEffect(() => {
    if (questionJustSent) {
      setQuestions([questionJustSent, ...mockQuestions]);
    }
  }, [questionJustSent]);

  return (
    <SectionInner wide={true}>
      <div className={s.container}>
        {questions.map((user, index) => {
          return <Question key={index} user={user} />;
        })}
      </div>
    </SectionInner>
  );
};

const Question = ({ user }) => {
  let usernameAndCity = user.username;
  if (user.city) {
    usernameAndCity += ` aus ${user.city}`;
  }
  return (
    <article className={s.question}>
      <Speechbubble isSmall={true}>
        <div className={s.questionContent}>{user.question}</div>
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
