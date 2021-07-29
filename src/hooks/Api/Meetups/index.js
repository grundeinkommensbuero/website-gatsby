/**
 * These hooks make use of the app backend (of the DWE enteignen app) to fetch collection meetups
 */

import { useState } from 'react';
import CONFIG from '../../../../backend-config';

export const useGetMeetups = () => {
  const [meetups, setMeetups] = useState();

  return [meetups, () => getMeetups(setMeetups)];
};

// gets meetups (only for berlin for now) from dwe backend
const getMeetups = async setMeetups => {
  try {
    const request = {
      method: 'GET',
      mode: 'cors',
    };

    const response = await fetch(
      `${CONFIG.APP_API.INVOKE_URL}/service/action-export`,
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
