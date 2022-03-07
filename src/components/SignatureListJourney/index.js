import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../context/Authentication';
import { InlineLinkButton } from '../Forms/Button';
import * as s from './style.module.less';
import { CTAButton, CTAButtonContainer } from '../Layout/CTAButton';
import downloadIcon from './download.svg';
import printIcon from './print.svg';
import signIcon from './sign.svg';
import shareIcon from './share.svg';
import sendIcon from './send.svg';

import printIconDisabled from './print-disabled.svg';
import signIconDisabled from './sign-disabled.svg';
import shareIconDisabled from './share-disabled.svg';
import sendIconDisabled from './send-disabled.svg';

import cN from 'classnames';
import { useUpdateUser } from '../../hooks/Api/Users/Update';
import { LoadingAnimation } from '../LoadingAnimation';
import querystring from 'query-string';

export const SignatureListJourney = () => {
  const { customUserData, isAuthenticated, updateCustomUserData } =
    useContext(AuthContext);
  const [stepParam, setStepParam] = useState();

  const { listFlow } = customUserData;

  // Process url params to update user automatically
  useEffect(() => {
    const { step } = querystring.parse(window.location.search);

    if (step) {
      setStepParam(step);
    }
  }, []);

  if (isAuthenticated === false) {
    return <p>TODO: Ausgeloggter Zustand</p>;
  }

  // We want the loading animation to wait until the user data is fetched
  // Otherwise the ui would show state in the beginning --> not so smooth
  if (
    typeof isAuthenticated === 'undefined' ||
    Object.keys(customUserData).length === 0
  ) {
    return <LoadingAnimation />;
  }

  return (
    <div className={s.container}>
      <Step
        icon={downloadIcon}
        iconAlt="Illustration einer E-Mail"
        headline="Schau in dein Postfach!"
        ctaText="Ich habe die Liste bekommen!"
        attributeToSet="downloadedList"
        secondaryCtaText="Hilfe, die Liste kommt nicht an!"
        // TODO: secondary CTA
        onSecondaryCtaClick={() => {}}
        done={listFlow?.downloadedList?.value}
        updateUserData={updateCustomUserData}
        urlParam={stepParam}
        step={1}
      >
        Wir haben dir eine Unterschriftenliste per Email geschickt. Falls du sie
        direkt downloaden willst, findest du sie auch{' '}
        <InlineLinkButton target="_blank" href={'TODO: url'}>
          HIER
        </InlineLinkButton>
        .
      </Step>

      <Step
        icon={printIcon}
        iconDisabled={printIconDisabled}
        iconAlt="Illustration eines Druckers"
        headline="Druck die Liste aus!"
        ctaText="Ich habe die Liste gedruckt!"
        attributeToSet="printedList"
        secondaryCtaText="Hilfe, ich habe keinen Drucker!"
        // TODO: secondary CTA
        onSecondaryCtaClick={() => {}}
        done={listFlow?.printedList?.value}
        disabled={!hasReachedStep(listFlow, 'printedList')}
        updateUserData={updateCustomUserData}
        urlParam={stepParam}
        step={2}
      >
        Unterschriften für Volksbegehren müssen handschriftlich auf Papier
        erfolgen. Wirf am besten gleich deinen Drucker an und druck die Liste
        aus.
      </Step>

      <Step
        icon={signIcon}
        iconDisabled={signIconDisabled}
        iconAlt="Illustration des Unterschreibens"
        headline="Unterschreibe direkt..."
        ctaText="Ich habe unterschrieben!"
        attributeToSet="signedList"
        done={listFlow?.signedList?.value}
        disabled={!hasReachedStep(listFlow, 'signedList')}
        updateUserData={updateCustomUserData}
        urlParam={stepParam}
        step={3}
      >
        ...auf der ausgedruckten Liste.
      </Step>

      <Step
        icon={shareIcon}
        iconDisabled={shareIconDisabled}
        iconAlt="Illustration von Freund:innen"
        headline="...und frag gleich noch ein paar Bekannte!"
        ctaText="Hab ich gemacht!"
        attributeToSet="sharedList"
        secondaryCtaText="Ich frage sie später!"
        secondaryCtaAddProperty={{ willDoLater: true }}
        done={listFlow?.sharedList?.value}
        disabled={!hasReachedStep(listFlow, 'sharedList')}
        updateUserData={updateCustomUserData}
        urlParam={stepParam}
        step={4}
      >
        Hast du Mitbewohner*innen, Freund*innen oder Kolleg*innen in der Nähe?
        Lass sie gleich mitunterschreiben!
      </Step>

      <Step
        icon={sendIcon}
        iconDisabled={sendIconDisabled}
        iconAlt="Illustration von Freund:innen"
        headline="Schick den Brief auf die Reise!"
        ctaText="Ich habe den Brief abgeschickt!"
        attributeToSet="sentList"
        done={listFlow?.sentList?.value}
        disabled={!hasReachedStep(listFlow, 'sentList')}
        updateUserData={updateCustomUserData}
        urlParam={stepParam}
        step={5}
      >
        Lauf gleich los zum nächsten Briefkasten und wirf den Brief ein. Gute
        Reise!
      </Step>
    </div>
  );
};

const Step = ({
  icon,
  iconDisabled,
  iconAlt,
  headline,
  ctaText,
  attributeToSet,
  secondaryCtaText,
  // If this prop is set, the secondary cta is the same as primary cta,
  // but a flag is added
  secondaryCtaAddProperty,
  onSecondaryCtaClick,
  done,
  disabled,
  children,
  updateUserData,
  urlParam,
  step,
}) => {
  const [updateUserState, updateUser] = useUpdateUser();
  const scrollToRef = useRef(null);
  const scrollToNextRef = useRef(null);

  const timestamp = new Date().toISOString();

  const setAttribute = (propertyToAdd = {}) => {
    updateUser({
      listFlow: {
        [attributeToSet]: { value: true, timestamp, ...propertyToAdd },
      },
    });
  };

  // Process url params to update user automatically
  useEffect(() => {
    if (urlParam === attributeToSet) {
      if (scrollToRef?.current) {
        scrollToRef.current.scrollIntoView({
          block: 'end',
        });
      }

      if (!done) {
        setTimeout(() => {
          setAttribute();
        }, 600);
      }
    }
  }, [urlParam, scrollToRef]);

  useEffect(() => {
    if (updateUserState === 'updated') {
      updateUserData();

      if (scrollToNextRef.current && attributeToSet !== 'sentList') {
        // Scroll to next step after success animation is done
        setTimeout(() => {
          scrollToNextRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 1000);
      }
    }
  }, [updateUserState]);

  return (
    <>
      <div className={cN(s.stepContainer, { [s.disabled]: disabled })}>
        <div className={s.breadcrumbs}>
          <div className={cN({ [s.filled]: step >= 1 })}></div>
          <div className={cN({ [s.filled]: step >= 2 })}></div>
          <div className={cN({ [s.filled]: step >= 3 })}></div>
          <div className={cN({ [s.filled]: step >= 4 })}></div>
          <div className={cN({ [s.filled]: step >= 5 })}></div>
        </div>

        <img
          alt={iconAlt}
          className={s.icon}
          src={disabled ? iconDisabled : icon}
        />
        <h2>{headline}</h2>
        <p>{children}</p>

        <CTAButtonContainer className={s.ctaContainer}>
          <CTAButton
            onClick={() => setAttribute()}
            disabled={disabled}
            // If the step is already done we directly render the the success icon
            success={done || updateUserState === 'updated'}
            loading={updateUserState === 'loading'}
          >
            {ctaText}
          </CTAButton>
        </CTAButtonContainer>

        {secondaryCtaText && !updateUserState && !done && (
          <div className={s.secondaryCta}>
            <InlineLinkButton
              onClick={() => {
                if (secondaryCtaAddProperty) {
                  setAttribute(secondaryCtaAddProperty);
                } else if (onSecondaryCtaClick) {
                  onSecondaryCtaClick();
                }
              }}
            >
              {secondaryCtaText}
            </InlineLinkButton>
          </div>
        )}
      </div>

      {scrollToRef && <div className={s.scrollTo} ref={scrollToRef}></div>}

      {scrollToNextRef && (
        <div className={s.scrollToNext} ref={scrollToNextRef}></div>
      )}
    </>
  );
};

// This function should evaluate, if user has done the step (maybe change it in the future,
// if user should do all steps) before this one
// so that the new step is not disabled anymore
const hasReachedStep = (listFlow, step) => {
  if (step === 'printedList') {
    // We also need to check if this step or a futre step is already done, otherwise it would still be disabled
    // if the step before is not done.
    return (
      listFlow?.downloadedList?.value ||
      listFlow?.printedList?.value ||
      listFlow?.signedList?.value ||
      listFlow?.sharedList?.value ||
      listFlow?.sentList?.value
    );
  }

  if (step === 'signedList') {
    return (
      listFlow?.printedList?.value ||
      listFlow?.signedList?.value ||
      listFlow?.sharedList?.value ||
      listFlow?.sentList?.value
    );
  }

  if (step === 'sharedList') {
    return (
      listFlow?.signedList?.value ||
      listFlow?.sharedList?.value ||
      listFlow?.sentList?.value
    );
  }

  if (step === 'sentList') {
    return listFlow?.sharedList?.value || listFlow?.sentList?.value;
  }

  return false;
};