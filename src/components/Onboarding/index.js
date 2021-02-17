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
import { Share } from './Share';
import { Donate } from './Donate';
import { SetupProfile } from './SetupProfile';
import { LoadingAnimation } from './LoadingAnimation';

export const Onboarding = ({ setOverlayOpen }) => {
  const {
    isAuthenticated,
    userId,
    customUserData: userData,
    updateCustomUserData
  } = useContext(AuthContext);
  const { municipality } = useContext(MunicipalityContext);
  const [engagementOption, setEngagementOption] = useState();
  const [currentElement, setCurrentElement] = useState(menuElements[0].name);
  const [isForMunicipalityAuthenticated, setIsForMunicipalityAuthenticated] = useState(false);
  const [, updateUser] = useUpdateUser();

  const closeIcon = require('./close-icon.svg');

  const Components = {
    SignUpFlow,
    Engage,
    EngagementLevel,
    QuestionUBI,
    Share,
    Donate,
    SetupProfile,
  };

  // TODO: use state of updateUser for improvement
  useEffect(() => {
    if (userData?.municipalities?.map(el => el.ags).includes(municipality.ags)) {
      setIsForMunicipalityAuthenticated(true);
    } else if (userData && userId && !userData?.municipalities?.map(el => el.ags).includes(municipality.ags)) {
      setTimeout(() => {
        updateCustomUserData();
        if (!userData?.municipalities?.map(el => el.ags).includes(municipality.ags)) {
          updateUser({
            ags: municipality?.ags
          });
        }
      }, 500);
    }
  }, [userData, municipality]);

  const setCurrentElementByIndex = index => {
    if (index === (menuElements.length - 1)) {
      setOverlayOpen(false);
    } else {
      setCurrentElement(menuElements[index].name);
    }
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
      {!isForMunicipalityAuthenticated && !isAuthenticated ?
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
          <SignUpFlow />
        </> :
        <>
          {/* Show onboarding content or currently Signin Up info message */}
          {userData?.municipalities?.map(el => el.ags).includes(municipality.ags) ?
            <>
              <div className={s.breadcrumbContainer}>
                <BreadcrumbLinks
                  setCurrentElement={setCurrentElement}
                  currentElement={currentElement}
                  setOverlayOpen={setOverlayOpen}
                />
              </div>
              <CurrentComponent />
            </> :
            <div className={s.signYouUpMessageContainer}>
              <h2 className={s.signYouUpMessage}>Du wirst für {municipality.name} angemeldet</h2>
              <LoadingAnimation />
            </div>}
        </>}
    </div>
  );
};