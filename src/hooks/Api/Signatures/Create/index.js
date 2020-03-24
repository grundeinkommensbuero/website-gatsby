/**
 *  This file holds a hook which serves as api call to create a signature list
 *  in the backend
 */

import { useState, useContext } from 'react';
import CONFIG from '../../../../../aws-config';
import { createUser } from '../../Users/Create';
import { updateUser } from '../../Users/Update';
import querystring from 'query-string';
import AuthContext from '../../../../context/Authentication';

/*
  States:
  - error
  - creating
  - created
*/

export const useCreateSignatureList = () => {
  const [state, setState] = useState();
  const [pdf, setPdf] = useState({});
  const [anonymous, setAnonymous] = useState(false);

  //get auth token from global context
  const { token, userId } = useContext(AuthContext);

  return [
    state,
    pdf,
    anonymous,
    data => {
      if (userId || data.email) {
        data.token = token;
        data.userId = userId;

        return createSignatureList(data, setState, setPdf);
      }

      setAnonymous(true);
      return createSignatureListAnonymous(data, setState, setPdf);
    },
  ];
};

//Function to create (or get) a signature list for anonymous user
//formData does not have to hold email or userId
const createSignatureListAnonymous = async (
  { campaignCode },
  setState,
  setPdf
) => {
  try {
    setState('creating');
    //handle campaign code
    const data = { campaignCode };

    //call function to make api request, returns signature list if successful (null otherwise)
    const signatureList = await makeApiCall(data);

    setState('created');
    setPdf(signatureList);
  } catch (error) {
    console.log('Error while creating anonymous signature list', error);
    setState('error');
  }
};

// Function to create (or get) a signature list
// userId or email is passed
const createSignatureList = async (
  { userId, email, campaignCode, userExists, token },
  setState,
  setPdf
) => {
  try {
    setState('creating');

    const data = { userId, email, campaignCode };

    // if it is a new user, we want to create the user
    // in the dynamo database
    if (!userExists) {
      // check url params, if current user came from referral (e.g newsletter)
      const urlParams = querystring.parse(window.location.search);
      // the pk_source param was generated in matomo
      const referral = urlParams.pk_source;

      await createUser(userId, email, true, referral);
    } else if (userId) {
      // Otherwise update the user using the token
      // but only if the user id was passed (user has logged in to set newsletter consent)
      await updateUser(userId, true, token);
    }

    //call function to make api request, returns signature list if successful (throws error otherwise)
    const signatureList = await makeApiCall(data);

    setState('created');
    setPdf(signatureList);
  } catch (error) {
    if (error.status === 401) {
      setState('unauthorized');
    } else {
      console.log('Error while creating signature list', error);
      setState('error');
    }
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

  throw {
    status: response.status,
    error: `Api did not respond with list, status is ${response.status}`,
  };
};
