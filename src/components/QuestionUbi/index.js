import React from 'react';
import CreateQuestion from './CreateQuestion';
import ListQuestions from './ListQuestions';

export default ({ mode }) => {
  return (
    <>
      <CreateQuestion />
      <ListQuestions />
    </>
  );
};
