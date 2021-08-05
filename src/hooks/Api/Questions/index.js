import { useContext } from 'react';
import { useState } from 'react';
import CONFIG from '../../../../backend-config';
import AuthContext from '../../../context/Authentication';

/*
  States:
  - saving
  - saved
  - error
*/
export const useSaveQuestion = () => {
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our saveQuestion function, so we can set the state from there
  const [state, setState] = useState(null);

  // Get user id and token from global context
  const { userId, token } = useContext(AuthContext);

  return [state, data => saveQuestion(userId, data, token, setState)];
};

// Function which calls the aws api to create a new question
const saveQuestion = async (userId, data, token, setState) => {
  try {
    setState('saving');

    // Make request to api to save question
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/users/${userId}/questions`,
      request
    );

    if (response.status === 201) {
      setState('saved');
    } else {
      setState('error');
    }
  } catch (error) {
    console.log('Error', error);
    setState('error');
  }
};

export const useGetMostRecentQuestions = () => {
  const [state, setState] = useState();
  const [questions, setQuestions] = useState([]);

  return [
    state,
    questions,
    (userId, limit) =>
      getMostRecentQuestions(userId, limit, setState, setQuestions),
  ];
};

const getMostRecentQuestions = async (
  userId,
  limit,
  setState,
  setQuestions
) => {
  try {
    setState('loading');

    // Make request to api to save question
    const request = {
      method: 'GET',
      mode: 'cors',
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/questions?limit=${limit}${
        userId ? `&userId=${userId}` : ''
      }`,
      request
    );

    if (response.status === 200) {
      const { questions } = await response.json();
      // structure: questions: [body, timestamp, user: {profilePictures, username, city }]
      setState('success');
      setQuestions(questions);
    } else {
      console.log('Api response not 200');
      setState('error');
    }
  } catch (error) {
    console.log('Error', error);
    setState('error');
  }
};
