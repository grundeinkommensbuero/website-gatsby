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

//gets stats (count of signatures) for each campaign
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
      //get stats (object) by parsing json { campaign1: {withMixed, withoutMixed}, campaign2: {...}}
      return await response.json();
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while updating signature list', error);
  }
};
