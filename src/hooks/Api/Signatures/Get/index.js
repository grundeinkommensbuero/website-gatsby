/**
 *  This file holds hooks (or just one) to make api calls regarding
 *  getting data concerning signatures (e.g. count of signatures for
 *  each campaign)
 */

import { useState } from 'react';
import CONFIG from '../../../../../aws-config';

/*
  States:
  - undefined
  - stats
*/

export const useSignatureCount = () => {
  const [stats, setStats] = useState(() => {
    if (typeof window !== 'undefined') {
      getSignatureCount().then(data => setStats(data));
    }
  });
  return stats;
};

// Hook to get signature count of a user
// Data can have either listId, userId or email
export const useSignatureCountOfUser = () => {
  const [stats, setStats] = useState(null);

  return [
    stats,
    data => {
      getSignatureCountOfUser(data).then(data => setStats(data));
    },
    () => {
      setStats(null);
    },
  ];
};

// gets stats (count of signatures) for each campaign
const getSignatureCount = async () => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/analytics/signatures`,
      request
    );

    if (response.status === 200) {
      // get stats (object) by parsing json { campaign1: {withMixed, withoutMixed}, campaign2: {...}}
      return await response.json();
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while updating signature list', error);
  }
};

// gets stats (count of signatures) for this user
// Either a list id, user id or email can be passed
// For list id it will return the count for all lists of the user
// If no param was passed, return null
const getSignatureCountOfUser = async ({ listId, userId, email }) => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let queryParam = '';

    // Check, which param was passed to function
    if (listId) {
      queryParam = `listId=${listId}`;
    } else if (userId) {
      queryParam = `userId=${userId}`;
    } else if (email) {
      queryParam = `email=${email}`;
    } else {
      // None of the needed params passed
      return null;
    }

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/analytics/signatures?${queryParam}`,
      request
    );

    if (response.status === 200) {
      // get stats (object) by parsing json { received: number, scannedByUser: number }
      return await response.json();
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while updating signature list', error);
  }
};
