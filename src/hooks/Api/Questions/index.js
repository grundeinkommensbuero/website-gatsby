import { useState } from 'react';
import CONFIG from '../../../../aws-config';

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
  return [state, (userId, data) => saveQuestion(userId, data, setState)];
};

// Function which calls the aws api to create a new question
const saveQuestion = async (
  userId,
  { question, zipCode, username },
  setState
) => {
  try {
    setState('saving');

    const data = { question };

    // Check if zip code and username was provided to hook
    if (zipCode && zipCode !== '') {
      data.zipCode = zipCode;
    }

    if (username && username !== '') {
      data.username = username;
    }

    // Make request to api to save question
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
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
