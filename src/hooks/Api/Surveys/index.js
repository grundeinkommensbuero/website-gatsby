import { useState } from 'react';
import CONFIG from '../../../../aws-config';

/*
  States:
  - saving
  - saved
  - missing params
  - error
*/

export const useSaveSurveyAnswer = () => {
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our saveSurveyAnswer function, so we can set the state from there
  const [state, setState] = useState(null);
  return [
    state,
    data => {
      setState('saving');
      saveSurveyAnswer(data).then(result => setState(result.state));
    },
  ];
};

// Function which calls the aws api to save the survey answer
export const saveSurveyAnswer = async ({ userId, surveyCode, answer }) => {
  try {
    if (userId && surveyCode && answer) {
      const data = { surveyCode, answer };

      // Make request to api to save survey answer
      const request = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        `${CONFIG.API.INVOKE_URL}/users/${userId}/surveys`,
        request
      );

      if (response.status === 201) {
        window.location.replace('https://petitionen.12062020.de/polls/2');
        return { state: 'saved' };
      } else {
        return { state: 'error' };
      }
    } else {
      return { state: 'missingParams' };
    }
  } catch (error) {
    console.log('Error', error);
    return { state: 'error' };
  }
};
