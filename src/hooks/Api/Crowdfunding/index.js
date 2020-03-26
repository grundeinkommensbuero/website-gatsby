/**
 *  This file holds a hook to get data for the crowdfunding campaign
 */

import { useState } from 'react';
import CONFIG from '../../../../aws-config';

/*
  States:
  - undefined
  - data
*/

export const useCrowdfundingData = projectId => {
  const [data, setData] = useState(() => {
    if (typeof window !== 'undefined') {
      getCrowdfundingData(projectId).then(result => setData(result));
    }
  });

  return data;
};

// gets data of crowdfunding campaign
const getCrowdfundingData = async projectId => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/analytics/crowdfunding?projectId=${projectId}`,
      request
    );

    if (response.status === 200) {
      return await response.json();
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while getting crowdfunding data', error);
  }
};
