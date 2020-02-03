import { useSignUp } from '../../Authentication';
import { useState } from 'react';
import { updateUser } from '../../utils';
import querystring from 'query-string';

export const useNewsletterApi = () => {
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our subscribe function, so we can set the state from there
  const [state, setState] = useState(null);
  return [state, email => subscribeToNewsletter(email, setState)];
};

//function which takes an email and subscribes to our newsletter
//by creating a new user in cognito and our dynamo db
//returns a promise (because async), which resolves to true on success, false otherwise
const subscribeToNewsletter = async (email, setState) => {
  try {
    setState('saving');

    const [signUpState, signUp] = useSignUp();

    // check url params, if current user came from referral (e.g newsletter)
    const urlParams = querystring.parse(window.location.search);
    // the pk_source param was generated in matomo
    const referral = urlParams.pk_source;

    //register user
    await signUp(email);
    if (signUpState.state !== 'userExists' && signUpState.state !== 'error') {
      try {
        //new user: save referral and newsletterConsent
        await updateUser(signUpState.userId, referral);

        //if successful set state and return true
        setState('saved');
      } catch (error) {
        console.log('Error while updating user in dynamo', error);

        setState('error');
      }
    } else {
      setState(signUpState.state);
    }
  } catch (error) {
    console.log('Error while signing up user (newsletter)', error);

    setState('error');
  }
};
