import React from 'react';
import { SectionInner } from '../../Layout/Sections';
import mockQuestions from './mockQuestions';
import s from './style.module.less';
import { Speechbubble } from '../Speechbubble';
import AvatarImage from '../../AvatarImage';

export default () => {
  return (
    <SectionInner wide={true}>
      <div className={s.container}>
        {mockQuestions.map((question, index) => (
          <Question key={index} {...question} />
        ))}
      </div>
    </SectionInner>
  );
};

const Question = ({ user, question }) => {
  let usernameAndCity = user.username;
  if (user.city) {
    usernameAndCity += ` aus ${user.city}`;
  }
  return (
    <article className={s.question}>
      <Speechbubble isSmall={true}>
        <div className={s.questionContent}>{question}</div>
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
