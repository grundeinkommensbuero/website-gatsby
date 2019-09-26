import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { getRandomString } from '../../utils';


class Login extends Component {

  // This functions calls signUp (which creates the user in aws user pool) 
  // and signIn (which starts the custom flow of sending the magic code to the mail address)
  startSignInProcess = async () => {
    const mail = "example@mail.com";
    try {
      await this.signUp(mail);
      await this.signIn(mail);
    } catch (error) {
      //We have to check, if the error happened due to the user already existing
      //If that's the case we call signIn() anyway
      if (error.code === "UsernameExistsException") {
        await this.signIn(mail);
      } else {
        //TODO: Error handling in UI?
        console.log('Error while signing up', error);
      }
    }
  }

  // Function to sign up user through AWS Cognito 
  // Tutorial: https://aws.amazon.com/de/blogs/mobile/implementing-passwordless-email-authentication-with-amazon-cognito/
  signUp = async (email) => {
    // We have to “generate” a password for them, because a password is required by Amazon Cognito when users sign up
    console.log(await Auth.signUp({
      username: email,
      password: getRandomString(30),
      attributes: {
        name: "testperson2"
        //Custom attribute: iban
        //Custom attribute: isDonationActive
      }
    }));

  }

  // Sign in user through AWS Cognito (passwordless)
  signIn = async (email) => {
    try {
      // This will initiate the custom flow, which will lead to the user receiving a mail.
      // The code will timeout after 3 minutes (enforced server side by AWS Cognito). 
      const user = await Auth.signIn(email);
      console.log('called Auth.signIn()');
      //we already set the user here, because we need the object in answerCustomChallenge()
      this.props.setUser(user);
    } catch (error) {
      //TODO: Error handling in UI?
      console.log('Error while signing in', error);
    }
  }

  answerCustomChallenge = async (answer) => {
    // Send the answer to the User Pool
    try {
      // sendCustomChallengeAnswer() will throw an error if it’s the 3rd wrong answer
      const user = await Auth.sendCustomChallengeAnswer(this.props.state.user, answer);
      console.log('user after sending challenge', user);
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
      /*   
         If we do the container-presenter (or controller-view if you will) model, this could look
         something like this...
         <LoginView
           sendCode={() => this.answerCustomChallenge(code)}
           signIn={() => this.startSignInProcess()}
         /> */
      <div></div>
    );
  }
}

export default Login;