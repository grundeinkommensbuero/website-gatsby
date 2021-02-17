import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/Authentication';
import s from './style.module.less';

import { MunicipalityContext } from '../../context/Municipality';

import { BreadcrumbLinks } from './BreadcrumbLinks';
import { Anmeldung } from './Anmeldung';
import { Mitmachen } from './Mitmachen';
import { EngagementLevel } from './EngagementLevel';
import { Frage } from './Frage';
import { Teilen } from './Teilen';
import { Spenden } from './Spenden';
import { ProfilEinrichten } from './ProfilEinrichten';

import menuElements from './BreadcrumbMenu.json';

export const Onboarding = ({ setOverlayOpen }) => {
  const {
    userId,
    customUserData: userData,
    updateCustomUserData
  } = useContext(AuthContext);

  const { municipality } = useContext(MunicipalityContext);

  const [engagementOption, setEngagementOption] = useState();
  const [currentElement, setCurrentElement] = useState(menuElements[0].name);

  const [isForMunicipalityAuthenticated, setIsForMunicipalityAuthenticated] = useState(false);

  useEffect(() => {
    if (userData?.municipalities?.map(el => el.ags).includes(municipality.ags)) {
      // console.log('Set it true');
      setIsForMunicipalityAuthenticated(true);
    } else if (userData && userId) {
      // console.log('update userData');
      updateCustomUserData();
    }
  }, [userData, municipality]);

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
    EngagementLevel,
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
      engagementOption={engagementOption}
      setEngagementOption={setEngagementOption}
    />
  };

  return (
    <div className={s.onboardingOverlayContainer}>
      {!isForMunicipalityAuthenticated ?
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