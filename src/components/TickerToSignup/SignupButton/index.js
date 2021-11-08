import React, { useContext } from 'react';
import { OnboardingModalContext } from '../../../context/OnboardingModal';
import * as s from './style.module.less';

import { Button } from '../../Forms/Button';

export const SignUpButton = ({ children, className }) => {
  const { setShowModal } = useContext(OnboardingModalContext);

  return (
    <>
      <div className={s.signUpButton}>
        <Button
          className={className}
          aria-label="Anmelden"
          onClick={() => setShowModal(true)}
        >
          {children}
        </Button>
      </div>
    </>
  );
};
