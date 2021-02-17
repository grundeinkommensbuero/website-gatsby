import React, { useState, useContext } from 'react';
import AuthContext from '../../context/Authentication';
import s from './style.module.less';

import { BreadcrumbLinks } from './BreadcrumbLinks';
import { Anmeldung } from './Anmeldung';
import { Mitmachen } from './Mitmachen';
import { Frage } from './Frage';
import { Teilen } from './Teilen';
import { Spenden } from './Spenden';
import { ProfilEinrichten } from './ProfilEinrichten';

import menuElements from './BreadcrumbMenu.json';

export const Onboarding = ({ setOverlayOpen }) => {
  const {
    userId,
    customUserData: userData,
  } = useContext(AuthContext);

  const [currentElement, setCurrentElement] = useState(menuElements[0].name);

  const setCurrentElementByIndex = index => {
    if (index === (menuElements.length - 1)) {
      setOverlayOpen(false);
    } else {
      setCurrentElement(menuElements[index].name);
    }
  };
  const closeIcon = require('./close-icon.svg');

  const Components = {
    Anmeldung,
    Mitmachen,
    Frage,
    Teilen,
    Spenden,
    ProfilEinrichten,
  };

  const CurrentComponent = () => {
    const Comp = Components[currentElement];
    return <Comp
      compIndex={menuElements.findIndex(el => el.name === currentElement)}
      setCurrentElementByIndex={setCurrentElementByIndex}
      userData={userData}
      userId={userId}
    />
  };

  return (
    <div className={s.onboardingOverlayContainer}>
      {!userId ?
        <>
          <span
            aria-hidden="true"
            className={s.lonelyCloseButton}
            onClick={() => setOverlayOpen(false)}
            onKeyPress={() => setOverlayOpen(false)}>
            <img
              aria-hidden="true"
              alt=""
              className={s.closeButton}
              src={closeIcon}
            />
          </span>
          <Anmeldung />
        </> :
        <>
          <div className={s.breadcrumbContainer}>
            <BreadcrumbLinks
              setCurrentElement={setCurrentElement}
              currentElement={currentElement}
              setOverlayOpen={setOverlayOpen}
            />
          </div>
          <CurrentComponent />
        </>}
    </div>
  );
};