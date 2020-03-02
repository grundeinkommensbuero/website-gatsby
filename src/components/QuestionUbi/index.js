import React, { useState, useEffect } from 'react';
import CreateQuestion from './CreateQuestion';
import ListQuestions from './ListQuestions';
import { useUserData } from '../../hooks/Api/Users';
import querystring from 'query-string';

export default ({ mode }) => {
  const [questionJustSent, setQuestionJustSent] = useState();
  const [userId, setUserId] = useState(null);
  const [userData, requestUserData] = useUserData();

  useEffect(() => {
    const urlParams = querystring.parse(window.location.search);
    // Will be null, if param does not exist
    setUserId(urlParams.userId);
    requestUserData(urlParams.userId);
  }, []);

  return (
    <>
      <CreateQuestion
        setQuestionJustSent={setQuestionJustSent}
        userId={userId}
        userData={userData}
      />
      <ListQuestions questionJustSent={questionJustSent} userId={userId} />
    </>
  );
};
