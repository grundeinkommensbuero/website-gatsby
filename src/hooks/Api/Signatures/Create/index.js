/**
 *  This file holds a hook which serves as api call to create a signature list
 *  in the backend
 */

import { useAuthentication } from '../../../Authentication';
import { useState } from 'react';
import { config } from '../../../../../aws-config';
import { updateUser } from '../../../utils';

/*
  States:
  - error
  - creating
  - created
*/

export const useCreateSignatureList = () => {
  const [state, setState] = useState({});
  return [
    state,
    data => {
      if (data.email) {
        return createSignatureListNewUser(data, setState);
      }
      if (data.userId) {
        return createSignatureListOldUser(data, setState);
      }
      return createSignatureListAnonymous(data, setState);
    },
  ];
};

//Function to create (or get) a signature list for anonymous user
//formData does not have to hold email or userId
const createSignatureListAnonymous = async ({ campaignCode }, setState) => {
  try {
    setState({ state: 'creating' });
    const data = {};
    //handle campaign code
    data.campaignCode = campaignCode;
    //call function to make api request, returns signature list if successful (null otherwise)
    const signatureList = await makeApiCall(data);
    setState({ state: 'created', pdf: signatureList, anonymous: true });
  } catch (error) {
    console.log('Error while creating anonymous signature list', error);
    setState({ state: 'error' });
  }
};

//Function to create (or get) a signature list for (possibly) new user
//formData needs to contain email, user is first registered through cognito
const createSignatureListNewUser = async (
  { email, campaignCode },
  setState
) => {
  try {
    setState({ state: 'creating' });

    const [signUp] = useAuthentication();
    // check url params, if current user came from referral (e.g newsletter)
    const urlParams = new URLSearchParams(window.location.search);
    // the pk_source param was generated in matomo
    const referral = urlParams.get('pk_source');
    //TODO: handle referral and newsletter consent

    const data = {};
    //register user
    const userId = await signUp(email);
    if (userId !== 'userExists' && userId !== 'error') {
      data.userId = userId;
      //new user: save referral and newsletterConsent
      await updateUser(userId, referral);
      data.isNewUser = true;
    } else if (userId === 'userExists') {
      //instead of the user id we pass the email to the api
      data.email = email;
      data.isNewUser = false;
    } else {
      setState({ state: 'error' });
      return;
    }
    //handle campaign code
    data.campaignCode = campaignCode;
    //call function to make api request, returns signature list if successful (throws error otherwise)
    const signatureList = await makeApiCall(data);
    setState({
      state: 'created',
      pdf: signatureList,
      existingUser: userId === 'userExists',
    });
  } catch (error) {
    console.log('Error while creating signature list', error);
    setState({ state: 'error' });
  }
};

//Function to create (or get) a signature list an already registered user
//userId is passed, user is not registeres through cognito
const createSignatureListOldUser = async (
  { userId, campaignCode },
  setState
) => {
  try {
    setState({ state: 'creating' });
    const data = { userId: userId };
    //handle campaign code
    data.campaignCode = campaignCode;
    data.isNewUser = false;
    //call function to make api request, returns signature list if successful (null otherwise)
    const signatureList = await makeApiCall(data);
    setState({ state: 'created', pdf: signatureList });
  } catch (error) {
    console.log('Error while creating signature list', error);
    setState({ state: 'error' });
  }
};

//Function which calls our api to create a (new) signature list
//returns the list {id, url} or null
const makeApiCall = async data => {
  //make api call to create new singature list and get pdf
  const request = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(config.API.INVOKE_URL + '/signatures', request);
  const json = await response.json();
  //status might also be 200 in case there already was an existing pdf
  if (response.status === 201 || response.status === 200) {
    return json.signatureList;
  }
  //throw error, if not successful
  throw new Error(
    `Api did not respond with list, status is ${response.status}`
  );
};
