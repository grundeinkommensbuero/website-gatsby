import React, { useState, useEffect } from 'react';

/**
 * This class serves as a provider (reacts context API) which is used
 * to maintain a global state. The application is wrapped around such a provider.
 * https://www.gatsbyjs.org/blog/2019-01-31-using-react-context-api-with-gatsby/
 *
 * Another option would be to make use of Amplifys Auth functions, but I think that
 * would be less efficient than keeping an aditional local state
 */

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tempEmail, setTempEmail] = useState(null);

  //define function to update token upon change of state
  useEffect(() => {
    //only if user is authenticated
    if (user !== null && isAuthenticated) {
      setToken(user.signInUserSession.idToken.jwtToken);
    }
  }, [user, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        token,
        tempEmail,
        setTempEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };
