import React, { useState, useContext } from 'react';
import AuthContext from '../../context/Authentication';
import s from './style.module.less';


import { BreadcrumbLinks } from './BreadcrumbLinks';
import { Mitmachen } from './Mitmachen';
import { Teilen } from './Teilen';
import { Spenden } from './Spenden';
import { ProfilEinrichten } from './ProfilEinrichten';

import menuElements from './BreadcrumbMenu.json';

export const Onboarding = () => {
  const {
    userId,
    customUserData: userData,
  } = useContext(AuthContext);

  const [currentElement, setCurrentElement] = useState(menuElements[0].name);

  const Components = {
    Mitmachen,
    Teilen,
    Spenden,
    ProfilEinrichten,
  }

  const CurrentComponent = () => {
    const Comp = Components[currentElement];
    return <Comp
      userData={userData}
      userId={userId}
    />
  };

  return (
    <div className={s.onboardingOverlayContainer}>
      <div className={s.breadcrumbContainer}>
        <BreadcrumbLinks
          setCurrentElement={setCurrentElement}
          currentElement={currentElement}
        />
      </div>
      <CurrentComponent />
    </div>
  );
};