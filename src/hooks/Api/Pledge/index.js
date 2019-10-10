/**
 * This file holds hooks which serve as api calls regarding pledges
 */

import { config } from '../../../../aws-config';
import { signUp } from '../../Authentication';

/*
  email
  name
  engagementLevel: number 1-5,
  wouldVisitLocalGroup: boolean,
  wouldDonate: boolean,
  wouldEngageCustom: string (can be left out),
  zipCode: number,
  eligibleToVote: string (2019, 2020, 2021, laterThan2021)
*/

export const usePledgeApi = () => {
  return [savePledge];
};

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
