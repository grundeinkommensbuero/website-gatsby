/**
 *  This file holds a hook to create a pledge
 */

import CONFIG from '../../../../../aws-config';
import { useState, useContext } from 'react';
import querystring from 'query-string';
import AuthContext from '../../../../context/Authentication';

export const useUpdatePledge = () => {
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our savePledge function, so we can set the state from there
  const [state, setState] = useState(null);

  //get auth token from global context
  const { token, userId } = useContext(AuthContext);

  return [state, pledge => updatePledge(userId, pledge, token, setState)];
};

// Function which calls the aws api to create a new pledge
const updatePledge = async (userId, pledge, token, setState) => {
  try {
    setState('saving');

    // check url params, if current user came from referral (e.g newsletter)
    const urlParams = querystring.parse(window.location.search);
    // the pk_source param was generated in matomo
    const referral = urlParams.pk_source;

    const data = pledge;
    //add userId to data, because we need it in the backend
    data.userId = userId;

    if (!('newsletterConsent' in data)) {
      data.newsletterConsent = false;
    }

    if (referral) {
      data.referral = referral;
    }

    if (data.signatureCount) {
      data.signatureCount = parseInt(data.signatureCount);
    }

    const request = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/pledges/${userId}`,
      request
    );

    if (response.status === 204) {
      setState('updated');
    } else if (response.status === 401) {
      setState('unauthorized');
    } else {
      setState('error');
    }
  } catch (error) {
    console.log('Error while saving pledge', error);
    setState('error');
  }
};
