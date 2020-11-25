import { useContext, useState } from 'react';
import AuthContext from '../../../context/Authentication';
import { updateUser } from '../../Api/Users/Update';

export const useAnswerChallenge = () => {
  const [state, setState] = useState({});

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
  { cognitoUser, setCognitoUser, setIsAuthenticated }
) => {
  // Send the answer to the User Pool
  try {
    setState('loading');
    const { default: Auth } = await import(
      /* webpackChunkName: "Amplify" */ '@aws-amplify/auth'
    );

    // sendCustomChallengeAnswer() will throw an error if it’s the 3rd wrong answer
    const tempUser = await Auth.sendCustomChallengeAnswer(cognitoUser, answer);

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
      setIsAuthenticated(true);

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
    setState('wrongCode');
    console.log(
      'User entered wrong code three times or user was never set',
      error
    );
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
