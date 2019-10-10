/**
 * This file holds hooks which serve as api calls regarding pledges
 */

import { config } from '../../../../aws-config';
import { signUp } from '../../Authentication';

export const usePledgeApi = () => {
  return [savePledge];
};

/*
pledge = {
  engagementLevel: number (0,1,2,...),
  groupMeetings: boolean,
  financialAid: boolean,
  customOption: string (can be left out),
  zipCode: number,
  eligible: number (0 = ja, 1 = ab 2020, etc)
}
*/

// Function which calls the aws api to create a new pledge
const savePledge = async pledge => {
  try {
    //register user
    const userId = signUp(pledge.email);
    if (userId !== null) {
      const data = pledge;
      //add userId to data, because we need it in the backend
      data.userId = userId;
      const request = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(config.API.INVOKE_URL + '/pledge', request);
      return await response.json();
    } else {
      console.log('User already exists or other error');
      return null;
    }
  } catch (error) {
    console.log('Error while saving pledge', error);
  }
};
