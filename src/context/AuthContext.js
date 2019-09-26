import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

/**
 * This class serves as a provider (reacts context API) which is used
 * to maintain a global state. The application is wrapped around such a provider.
 * https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/
 * 
 * Another option would be to make use of Amplifys Auth functions, but I think that
 * would be less efficient than keeping an aditional local state
 */

const AuthContext = React.createContext();

class AuthProvider extends Component {

  state = {
    isAuthenticated: false,
    user: null
  }

  setIsAuthenticated = (isAuthenticated) => {
    this.setState = { isAuthenticated: isAuthenticated };
  }

  setUser = (user) => {
    this.setState = { user: user };
  }

  setIban = async (iban) => {
    if (user !== null) {
      try {
        await Auth.updateUserAttributes(this.state.user, { iban });
        //save the changed user in the global state
        const updatedUser = await Auth.currentAuthenticatedUser();
        this.setState({ user: updatedUser });
      } catch (error) {
        console.log('Error while updating iban');
      }
    }
  }

  setIsDonationActive = async (isDonationActive) => {
    if (user !== null) {
      try {
        await Auth.updateUserAttributes(this.state.user, { isDonationActive });
        //save the changed user in the global state
        const updatedUser = await Auth.currentAuthenticatedUser();
        this.setState({ user: updatedUser });
      } catch (error) {
        console.log('Error while updating if donation is active');
      }
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          state: this.state,
          setIsAuthenticated: this.setIsAuthenticated,
          setUser: this.setUser
        }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
export { AuthProvider };