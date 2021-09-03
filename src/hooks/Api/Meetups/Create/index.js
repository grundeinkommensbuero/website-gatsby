/**
 *  This file holds a hook to create a meetup
 */

import CONFIG from '../../../../../backend-config';
import { useState, useContext } from 'react';
import AuthContext from '../../../../context/Authentication';

export const useCreateMeetup = () => {
  const [state, setState] = useState(null);

  //get user id  from global context
  const { userId } = useContext(AuthContext);

  return [state, data => createMeetup(userId, data, setState)];
};

const createMeetup = async (userId, data, setState) => {
  try {
    setState('saving');

    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, userId }),
    };

    const response = await fetch(`${CONFIG.API.INVOKE_URL}/meetups`, request);

    if (response.status === 201) {
      setState('saved');
    } else {
      setState('error');
    }
  } catch (error) {
    console.log('Error while saving pledge', error);
    setState('error');
  }
};
