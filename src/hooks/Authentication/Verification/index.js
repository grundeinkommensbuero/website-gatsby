import { useState } from 'react';
import CONFIG from '../../../../backend-config';

export const useVerification = () => {
  const [verificationState, setVerificationState] = useState('verifying');
  return [
    verificationState,
    (userId, token) => confirmSignUp(userId, token, setVerificationState),
  ];
};

// Amplifys Auth Class is used to send a confirmation code to verify the mail address
const confirmSignUp = async (userId, token, setVerificationState) => {
  try {
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/users/${userId}/confirm`,
      request
    );

    if (response.status === 204) {
      setVerificationState('verified');
    } else if (response.status === 404) {
      setVerificationState('userNotFound');
    } else {
      setVerificationState('error');
    }
  } catch (error) {
    setVerificationState('error');
  }
};
