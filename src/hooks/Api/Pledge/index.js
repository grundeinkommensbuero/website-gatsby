/**
 * This file holds hooks which serve as api calls regarding pledges
 */

import { config } from '../../../../aws-config';
import { useAuthentication } from '../../Authentication';
import { useState } from 'react';

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
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our savePledge function, so we can set the state from there
  const [state, setState] = useState(null);
  return [state, pledge => savePledge(pledge, setState)];
};

// Function which calls the aws api to create a new pledge
const savePledge = async (pledge, setState) => {
  const [signUp] = useAuthentication();
  // check url params, if current user came from referral (e.g newsletter)
  const urlParams = new URLSearchParams(window.location.search);
  // the pk_source param was generated in matomo
  const referral = urlParams.get('pk_source');
  try {
    setState('saving');
    //register user
    const userId = await signUp(pledge.email);
    if (userId !== 'userExists' && userId !== 'error') {
      const data = pledge;
      //add userId to data, because we need it in the backend
      data.userId = userId;
      //if checkboxes are not set to clicked, we want to manually add the properties
      /* Not needed anymore for test phase with smaller form
      
      if ('wouldDonate' in data === false) {
        data.wouldDonate = false;
      }
      if ('wouldPrintAndSendSignatureLists' in data === false) {
        data.wouldPrintAndSendSignatureLists = false;
      }
      if ('wouldPutAndCollectSignatureLists' in data === false) {
        data.wouldPutAndCollectSignatureLists = false;
      }
      if ('wouldCollectSignaturesInPublicSpaces' in data === false) {
        data.wouldCollectSignaturesInPublicSpaces = false;
      }*/
      if ('newsletterConsent' in data === false) {
        data.newsletterConsent = false;
      }
      if (referral) {
        data.referral = referral;
      }

      data.signatureCount = parseInt(data.signatureCount);

      const request = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(config.API.INVOKE_URL + '/pledge', request);
      console.log('response code', response.status);
      if (response.status === 204) {
        console.log('successful');
        setState('saved');
        return true;
      }
      setState('error');
      return false;
    } else if (userId === 'userExists') {
      console.log('User already exists');
      setState('userExists');
      return false;
    } else {
      setState('error');
      return false;
    }
  } catch (error) {
    console.log('Error while saving pledge', error);
    setState('error');
    return false;
  }
};
