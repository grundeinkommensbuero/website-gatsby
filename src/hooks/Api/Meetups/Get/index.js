/**
 * These hooks make use of the app backend (of the DWE enteignen app) to fetch collection meetups
 */

import { useState } from 'react';
import CONFIG from '../../../../../backend-config';

export const useGetMeetups = () => {
  const [meetups, setMeetups] = useState();

  return [meetups, () => getMeetups(setMeetups)];
};

// gets meetups (only for berlin for now) from dwe backend
const getMeetups = async setMeetups => {
  try {
    // Endpoint is POST to optionally receive  a filter as body
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    };

    const response = await fetch(
      `${CONFIG.APP_API.INVOKE_URL}/service/termine`,
      request
    );

    if (response.status === 200) {
      const json = await response.json();
      setMeetups(json.features);
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while getting meetups', error);
  }
};
