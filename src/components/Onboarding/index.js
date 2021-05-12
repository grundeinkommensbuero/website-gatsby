import React, { useState, useContext, useEffect } from 'react';

import AuthContext from '../../context/Authentication';
import { MunicipalityContext } from '../../context/Municipality';
import { useUpdateUser } from '../../hooks/Api/Users/Update';

import s from './style.module.less';
import menuElements from './BreadcrumbMenu.json';

import { BreadcrumbLinks } from './BreadcrumbLinks';
import { SignUpFlow } from './SignUpFlow';
import { Engage } from './Engage';
import { EngagementLevel } from './EngagementLevel';
import { QuestionUBI } from './QuestionUBI';
import { SharingFeature } from './Share';
import { Donate } from './Donate';
import { SetupProfile } from './SetupProfile';
import { FinalNote } from './FinalNote';

export const Onboarding = ({ setOverlayOpen }) => {
  const {
    isAuthenticated,
    userId,
    customUserData: userData,
    updateCustomUserData,
  } = useContext(AuthContext);
  const { municipality } = useContext(MunicipalityContext);
  const [engagementOption, setEngagementOption] = useState();
  const [currentElement, setCurrentElement] = useState(menuElements[0].name);
  const [
    isForMunicipalityAuthenticated,
    setIsForMunicipalityAuthenticated,
  ] = useState(false);
  const [, updateUser] = useUpdateUser();

  const closeIcon = require('./close-icon.svg');

  const Components = {
    SignUpFlow,
    Engage,
    EngagementLevel,
    QuestionUBI,
    SharingFeature,
    Donate,
    SetupProfile,
    FinalNote,
  };

  // Fetch new user data in the beginning
  useEffect(() => {
    if (isAuthenticated) {
      updateCustomUserData();
    }
  }, [isAuthenticated]);

  // TODO: use state of updateUser for improvement (Vali: comment still relevant? I removed some stuff)
  useEffect(() => {
    if (municipality) {
      if (
        userData?.municipalities?.map(el => el.ags).includes(municipality.ags)
      ) {
        setIsForMunicipalityAuthenticated(true);
      }
    }
  }, [userData, municipality]);

  const setCurrentElementByIndex = index => {
    if (index === menuElements.length - 1) {
      setOverlayOpen(false);
    } else {
      setCurrentElement(menuElements[index].name);
    }
  };

  const CurrentComponent = () => {
    const Comp = Components[currentElement];
    return (
      <Comp
        compIndex={menuElements.findIndex(el => el.name === currentElement)}
        setCurrentElementByIndex={setCurrentElementByIndex}
        userData={userData}
        userId={userId}
        updateUser={updateUser}
        updateCustomUserData={updateCustomUserData}
        engagementOption={engagementOption}
        setEngagementOption={setEngagementOption}
        municipality={municipality}
      />
    );
  };

  return (
    <div className={s.onboardingOverlayContainer}>
      {!isForMunicipalityAuthenticated ? (
        <>
          <span
            aria-hidden="true"
            className={s.lonelyCloseButton}
            onClick={() => setOverlayOpen(false)}
            onKeyPress={() => setOverlayOpen(false)}
          >
            <img
              aria-hidden="true"
              alt=""
              className={s.closeButton}
              src={closeIcon}
            />
          </span>
          <SignUpFlow />
        </>
      ) : (
        <>
          {/* Show onboarding content */}
          <nav className={s.breadcrumbContainer}>
            <BreadcrumbLinks
              setCurrentElement={setCurrentElement}
              currentElement={currentElement}
              setOverlayOpen={setOverlayOpen}
            />
          </nav>
          <CurrentComponent />
        </>
      )}
    </div>
  );
};
