import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/Authentication';
import { MunicipalityContext } from '../../../context/Municipality';

export const useUserMunicipalityContentfulState = () => {
  const { customUserData, isAuthenticated } = useContext(AuthContext);

  const { municipality, municipalityContentfulState } = useContext(
    MunicipalityContext
  );
  const [userContentfulState, setUserContentfulState] = useState();

  useEffect(() => {
    if (!isAuthenticated) {
      setUserContentfulState('loggedOut');
    } else if (
      !customUserData?.municipalities ||
      customUserData?.municipalities.length === 0
    ) {
      setUserContentfulState('loggedInNoMunicipalitySignup');
    } else if (customUserData?.municipalities.length > 0) {
      const userAgs = customUserData.municipalities.map(m => m.ags);
      if (municipality?.ags && userAgs.includes(municipality.ags)) {
        setUserContentfulState('loggedInThisMunicipalitySignup');
      } else {
        setUserContentfulState('loggedInOtherMunicipalitySignup');
      }
    }
  }, [isAuthenticated, customUserData, municipality]);

  // Debug Contentful showForOptions with this log:
  // console.log(
  //   `*\nContentful state:\nmunicipality: ${municipalityContentfulState}, user: ${userContentfulState}\n\n`
  // );

  return { municipalityContentfulState, userContentfulState };
};
