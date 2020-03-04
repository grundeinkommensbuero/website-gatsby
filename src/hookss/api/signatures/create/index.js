/**
 *  This file holds a hook which serves as api call to create a signature list
 *  in the backend
 */

import { useState } from 'react';
import CONFIG from '../../../../../aws-config';
import { createUser } from '../../../utils';
import querystring from 'query-string';

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
    (data, token = null) => {
      if (data.userId) {
        return createSignatureList(data, token, setState);
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
    //handle campaign code
    const data = { campaignCode };

    //call function to make api request, returns signature list if successful (null otherwise)
    const signatureList = await makeApiCall(data);

    setState({ state: 'created', pdf: signatureList, anonymous: true });
  } catch (error) {
    console.log('Error while creating anonymous signature list', error);
    setState({ state: 'error' });
  }
};

// Function to create (or get) a signature list for
// userId is passed
const createSignatureList = async (
  { userId, campaignCode },
  token,
  setState
) => {
  try {
    setState({ state: 'creating' });

    // check url params, if current user came from referral (e.g newsletter)
    const urlParams = querystring.parse(window.location.search);
    // the pk_source param was generated in matomo
    const referral = urlParams.pk_source;

    const data = { userId, campaignCode };

    // if it is a new user, we want to create the user
    // in the dynamo database, otherwise we want to update the user
    // If there is no token set we want to create a new user

    //call function to make api request, returns signature list if successful (throws error otherwise)
    const signatureList = await Promise.all([
      makeApiCall(data),
      token
        ? updateUser(userId, true, referral, token)
        : createUser(userId, true, referral),
    ]);

    setState({
      state: 'created',
      pdf: signatureList,
    });
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

  const response = await fetch(CONFIG.API.INVOKE_URL + '/signatures', request);
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
