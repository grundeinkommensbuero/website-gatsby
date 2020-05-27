import { useState } from 'react';

const USER_ID_KEY = 'user-id';

export const useLocalStorageUser = () => {
  // Reactive state for user id
  const [userId, setUserIdState] = useState(() => {
    // Initial value comes from localStorage
    try {
      // console.log('Checking local storage');
      const userId = window.localStorage.getItem(USER_ID_KEY);
      // console.log('localStorage user id', userId);
      return userId ? JSON.parse(userId) : undefined;
    } catch (err) {
      console.warn('Error querying localStorage for user-id');
      return undefined;
    }
  });

  // Setter function updates state and localStorage
  const setUserId = userId => {
    console.log('Update user id', userId);
    setUserIdState(userId);
    window.localStorage.setItem(USER_ID_KEY, JSON.stringify(userId));
  };

  return [userId, setUserId];
};
