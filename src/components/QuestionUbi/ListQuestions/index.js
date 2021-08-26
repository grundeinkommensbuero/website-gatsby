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
    getQuestions(null, 6);
  }, []);

  return (
    <SectionInner wide={true}>
      <div className={s.container}>
        {questions.map((question, index) => {
          return <Question key={index} {...question} />;
        })}
      </div>

      {userId && (
        <CTALink to={`/mensch/${userId}/paket-nehmen`}>Nimm dein Paket</CTALink>
      )}
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
