import React, { Component } from 'react';

/**
 * This class serves as a provider (reacts context API) which is used
 * to maintain a global state. The application is wrapped around such a provider.
 * https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/
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