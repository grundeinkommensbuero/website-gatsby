import { useAuthentication } from '../../Authentication';
import { useState } from 'react';
import { updateUser } from '../../utils';

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

    const [signUp] = useAuthentication();

    // check url params, if current user came from referral (e.g newsletter)
    const urlParams = new URLSearchParams(window.location.search);
    // the pk_source param was generated in matomo
    const referral = urlParams.get('pk_source');

    //register user
    const userId = await signUp(email);
    if (userId !== 'userExists' && userId !== 'error') {
      try {
        //new user: save referral and newsletterConsent
        await updateUser(userId, referral);

        //if successful set state and return true
        setState('saved');
        return true;
      } catch (error) {
        console.log('Error while updating user in dynamo', error);

        setState('error');
        return false;
      }
    } else if (userId === 'userExists') {
      setState('userExists');
      return false;
    } else {
      setState('error');
      return false;
    }
  } catch (error) {
    console.log('Error while signing up user (newsletter)', error);

    setState('error');
    return false;
  }
};
