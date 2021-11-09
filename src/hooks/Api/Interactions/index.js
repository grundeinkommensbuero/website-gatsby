import { useContext } from 'react';
import { useState } from 'react';
import CONFIG from '../../../../backend-config';
import AuthContext from '../../../context/Authentication';

/*
  States:
  - saving
  - saved
  - error
*/
export const useSaveInteraction = () => {
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our saveInteraction function, so we can set the state from there
  const [state, setState] = useState(null);

  // Get user id and token from global context
  const { userId, token } = useContext(AuthContext);

  return [state, data => saveInteraction(userId, data, token, setState)];
};

// Function which calls the aws api to create a new interaction
const saveInteraction = async (userId, data, token, setState) => {
  try {
    setState('saving');

    // Make request to api to save interaction
    const request = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/users/${userId}/interactions`,
      request
    );

    if (response.status === 201) {
      setState('saved');
    } else {
      setState('error');
    }
  } catch (error) {
    console.log('Error', error);
    setState('error');
  }
};

export const useGetMostRecentInteractions = () => {
  const [state, setState] = useState();
  const [interactions, setInteractions] = useState([]);

  return [
    state,
    interactions,
    (userId, limit, type) =>
      getMostRecentInteractions(userId, limit, type, setState, setInteractions),
  ];
};

const getMostRecentInteractions = async (
  userId,
  limit,
  type,
  setState,
  setInteractions
) => {
  try {
    setState('loading');

    // Make request to api to save interaction
    const request = {
      method: 'GET',
      mode: 'cors',
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/interactions?limit=${limit}${
        userId ? `&userId=${userId}` : ''
      }${type ? `&type=${type}` : ''}`,
      request
    );

    if (response.status === 200) {
      const { interactions } = await response.json();
      // structure: interactions: [body, timestamp, user: {profilePictures, username, city }]
      setState('success');
      setInteractions(interactions);
    } else {
      console.log('Api response not 200');
      setState('error');
    }
  } catch (error) {
    console.log('Error', error);
    setState('error');
  }
};

export const useUpdateInteraction = () => {
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our updateInteraction function, so we can set the state from there
  const [state, setState] = useState(null);

  // Get user id and token from global context
  const { userId, token } = useContext(AuthContext);

  return [state, data => updateInteraction(userId, data, token, setState)];
};

// Function which calls the aws api to update an existing interaction
const updateInteraction = async (userId, data, token, setState) => {
  try {
    setState('saving');

    // Make request to api to save interaction
    const request = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}/users/${userId}/interactions/${data.id}/`,
      request
    );

    if (response.status === 201) {
      setState('saved');
    } else {
      setState('error');
    }
  } catch (error) {
    console.log('Error', error);
    setState('error');
  }
};
