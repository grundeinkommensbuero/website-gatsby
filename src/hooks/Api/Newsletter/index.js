import { useState } from 'react';
import querystring from 'query-string';
import { createUser } from '../Users/Create';
import { updateUser } from '../Users/Update';

export const useNewsletterApi = () => {
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our subscribe function, so we can set the state from there
  const [state, setState] = useState(null);
  return [
    state,
    (userId, token = null) => subscribeToNewsletter(userId, token, setState),
  ];
};

//function which takes an email and subscribes to our newsletter
//by creating a new user in cognito and our dynamo db
//returns a promise (because async), sets state depending on result
const subscribeToNewsletter = async (userId, token, setState) => {
  try {
    setState('saving');

    // check url params, if current user came from referral (e.g newsletter)
    const urlParams = querystring.parse(window.location.search);
    // the pk_source param was generated in matomo
    const referral = urlParams.pk_source;

    // save referral and newsletterConsent
    // If there is no token set we want to create a new user
    if (token) {
      await updateUser(userId, true, referral, token);
    } else {
      await createUser(userId, true, referral);
    }

    //if successful set state
    setState('saved');
  } catch (error) {
    console.log('Error while updating user', error);
    setState('error');
  }
};
