import React, { Component } from 'react';
import Auth from 'aws-amplify';
import { getRandomString } from '../../utils'

class Login extends Component {

  // Function to sign up user through AWS Cognito 
  // Tutorial: https://aws.amazon.com/de/blogs/mobile/implementing-passwordless-email-authentication-with-amazon-cognito/
  signUp = async (email) => {
    try {
      // We have to “generate” a password for them, because a password is required by Amazon Cognito when users sign up
      await Auth.signUp({
        username: email,
        password: getRandomString(30)
      });
    } catch (error) {
      //TODO: Error handling in UI?
      console.log('Error while signing up', error);
    }
  }

  // Sign in user through AWS Cognito (passwordless)
  singIn = async (email) => {
    try {
      // This will initiate the custom flow, which will lead to the user receiving a mail.
      // The code will timeout after 3 minutes (enforced server side by AWS Cognito). 
      await Auth.signIn(email);
    } catch (error) {
      //TODO: Error handling in UI?
      console.log('Error while signing in', error);
    }
  }

  answerCustomChallenge = async (answer) => {
    // Send the answer to the User Pool
    try {
      // sendCustomChallengeAnswer() will throw an error if it’s the 3rd wrong answer
      const user = await Auth.sendCustomChallengeAnswer(cognitoUser, answer);

      // It we get here, the answer was sent successfully,
      // but it might have been wrong (1st or 2nd time)
      // So we should test if the user is authenticated now
      try {
        // This will throw an error if the user is not yet authenticated:
        await Auth.currentSession();
        //User is now signed in
        //a function to set the user somewhere else (e.g. global state via context api)
        this.props.setUser(user);
        this.props.setIsAuthenticated(true);
      } catch (error) {
        //TODO: Error handling in UI: wrong code
        console.log('Apparently the user did not enter the right code', error);
      }
    } catch (error) {
      console.log('User entered wrong code three times');
    }
  }

  signOut = async () => {
    try {
      await Auth.signOut();
      //a function to set the user somewhere else (e.g. global state via context api)
      this.props.setUser(null);
      this.props.setIsAuthenticated(false);
    } catch (error) {
      //TODO: Error handling in UI: Sign out error
      console.log('Error while signing out', error);
    }
  }


  render() {
    return (
      <div>

      </div>
    );
  }
}

export default Login;