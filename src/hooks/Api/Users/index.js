/**
 *  This file holds hooks (or just one) to make api calls regarding
 *  getting data about a specific user
 */

import { useState } from 'react';
import CONFIG from '../../../../aws-config';

/*
  States:
  - { state: 'success', user }
  - { state: 'notFound' }
  - { state: 'error' }
*/

export const useUserData = () => {
  const [data, setData] = useState();

  return [
    data,
    userId => {
      getUser(userId).then(data => setData(data));
    },
  ];
};

// Gets data of user (username, profile pictures etc) in the form of { state, user }
// We want to return state, because user might not have been found
const getUser = async userId => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/users/${userId}`,
      request
    );

    if (response.status === 200) {
      const json = await response.json();
      return { state: 'success', user: json.user };
    } else if (response.status === 404) {
      return { state: 'notFound' };
    }
  } catch (error) {
    return { state: 'error' };
  }
};
