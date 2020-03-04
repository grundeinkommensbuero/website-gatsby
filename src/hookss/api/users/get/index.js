import CONFIG from '../../../../aws-config';
import { useState } from 'react';

export const useCreateSignatureList = () => {
  const [state, setState] = useState({});

  return [state, userId => getUser(userId, setState)];
};

const getUser = async (userId, setState) => {
  try {
    setState({ state: 'loading' });

    const request = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/users/${userId}`,
      request
    );

    if (response.status === 200) {
      const json = await response.json();

      setState({ state: 'success', user: json.user });
    } else if (response.status === 404) {
      setState({ state: 'notFound' });
    } else {
      setState({ state: 'error' });
    }
  } catch (error) {
    setState({ state: 'error' });
  }
};
