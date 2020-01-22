/**
 *  This file holds hooks which serve as api calls regarding pledges
 */

import CONFIG from '../../../../aws-config';
import { useAuthentication } from '../../Authentication';
import { useState } from 'react';

/*
  email
  TODO: update schema after a/b testing
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
    if (userId !== 'error') {
      const data = pledge;
      //add userId or email to data, because we need it in the backend
      //it might need to be email in case the user already exists
      if (userId !== 'userExists') {
        data.userId = userId;
      } else {
        data.email = pledge.email;
      }

      if ('newsletterConsent' in data === false) {
        data.newsletterConsent = false;
      }
      if (referral) {
        data.referral = referral;
      }

      if (data.signatureCount) {
        data.signatureCount = parseInt(data.signatureCount);
      }

      const request = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(CONFIG.API.INVOKE_URL + '/pledges', request);
      console.log('response code', response.status);
      if (response.status === 204) {
        //if the user already existed, we want to set a different state
        if (userId === 'userExists') {
          setState('updated');
        } else {
          setState('saved');
        }
      } else if (response.status === 401) {
        setState('userExists');
      } else {
        setState('error');
      }
    } else {
      setState('error');
    }
  } catch (error) {
    console.log('Error while saving pledge', error);
    setState('error');
  }
};
