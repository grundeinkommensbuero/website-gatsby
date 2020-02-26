import React, { useState } from 'react';
import CreateQuestion from './CreateQuestion';
import ListQuestions from './ListQuestions';

export default ({ mode }) => {
  const [questionJustSent, setQuestionJustSent] = useState();
  return (
    <>
      <CreateQuestion setQuestionJustSent={setQuestionJustSent} />
      <ListQuestions questionJustSent={questionJustSent} />
    </>
  );
};
