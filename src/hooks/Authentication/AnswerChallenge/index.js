import { useContext, useState } from 'react';
import AuthContext from '../../../context/Authentication';
import { updateUser } from '../../Api/Users/Update';

export const useAnswerChallenge = () => {
  const [state, setState] = useState();

  //get global context
  const context = useContext(AuthContext);

  return [
    state,
    answer => answerCustomChallenge(answer, setState, context),
    setState,
  ];
};

// Function to send login code to aws
const answerCustomChallenge = async (
  answer,
  setState,
  { tempEmail, setCognitoUser, userId }
) => {
  // Send the answer to the User Pool
  try {
    setState('loading');
    const { default: Auth } = await import(
      /* webpackChunkName: "Amplify" */ '@aws-amplify/auth'
    );

    // If there is no email we definitely should have a userId
    const param = tempEmail || userId;

    // We call the signIn function of Amplify to then immediately send the challenge answer.
    // The email with the code has already been sent via the /sign-in endpoint, so this function basically
    // just initializes the custom flow without doing much (the backend function just gets the login code from the cognito user
    // and sets it as the expected answer)
    const user = await Auth.signIn(param);

    // sendCustomChallengeAnswer() will throw an error if it’s the 3rd wrong answer
    const tempUser = await Auth.sendCustomChallengeAnswer(user, answer);

    if (answer === 'resendCode') {
      setState('resentCode');
      return;
    }

    // It we get here, the answer was sent successfully,
    // but it might have been wrong (1st or 2nd time)
    // So we should test if the user is authenticated now
    try {
      // This will throw an error if the user is not yet authenticated:
      await Auth.currentSession();
      //User is now signed in
      setState('success');

      //use context to set user in global state
      setCognitoUser(tempUser);

      // We also want to set that the user is confirmed now
      // if e.g. it was the first login (= double opt in)
      // We save this value in dynamo db, because cognito doesn't
      // offer enough flexibility
      confirmSignUp(
        tempUser.attributes.sub,
        tempUser.signInUserSession.idToken.jwtToken,
        answer
      );
    } catch (error) {
      setState('wrongCode');
      console.log('Apparently the user did not enter the right code', error);
    }
  } catch (error) {
    // If we wanted to resend the code after used waited more than 3 minutes
    // this error will be thrown. In this case we should login again and therefore
    // send a new code
    if (answer === 'resendCode') {
      setState('restartSignIn');
    } else {
      setState('wrongCode');
      console.log(
        'User entered wrong code three times or user was never set',
        error
      );
    }
  }
};

// We use updateUser function to confirm user in dynamo db
// Code needs to be saved in the db as well for legal reasons
const confirmSignUp = async (userId, token, code) => {
  try {
    await updateUser({ userId, token, confirmed: true, code });
  } catch (error) {
    console.log('Error while confirming user', error);
  }
};
