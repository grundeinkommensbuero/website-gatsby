/**
 *  This file holds hooks which serve as api calls regarding pledges
 */

import CONFIG from '../../../../aws-config';
import { useState } from 'react';
import querystring from 'query-string';

/*
  email
  TODO: update schema after a/b testing
*/

export const usePledgeApi = () => {
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our savePledge function, so we can set the state from there
  const [state, setState] = useState(null);
  return [state, (userId, pledge) => savePledge(userId, pledge, setState)];
};

// Function which calls the aws api to create a new pledge
const savePledge = async (userId, pledge, setState) => {
  // check url params, if current user came from referral (e.g newsletter)
  const urlParams = querystring.parse(window.location.search);
  // the pk_source param was generated in matomo
  const referral = urlParams.pk_source;
  try {
    setState('saving');

    const data = pledge;
    //add userId to data, because we need it in the backend
    data.userId = userId;

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

    if (response.status === 201) {
      //if the user already existed, we want to set a different state
      if (signUpState.state === 'userExists') {
        setState('updated');
      } else {
        setState('saved');
      }
    } else if (response.status === 401) {
      setState('userExists');
    } else {
      setState('error');
    }
  } catch (error) {
    console.log('Error while saving pledge', error);
    setState('error');
  }
};
