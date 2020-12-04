/**
 * This file holds the hook(s) needed for the stats of municipalities
 */

import { useState } from 'react';
import CONFIG from '../../../../aws-config';

export const useGetMunicipalityStats = () => {
  const [state, setState] = useState();
  const [stats, setStats] = useState({});

  return [
    state,
    stats,
    (ags = null) => getMunicipalityStats(ags, setState, setStats),
  ];
};

// This function fetches the municipality stats from the backend.
// Depending on whether an ags is passed stats for just one munic. or for all is fetched.
const getMunicipalityStats = async (ags, setState, setStats) => {
  try {
    setState('loading');

    // Make request to api to save question
    const request = {
      method: 'GET',
      mode: 'cors',
    };

    const endpoint = ags
      ? `/analytics/municipalities/${ags}`
      : '/analytics/municipalities';

    const response = await fetch(
      `${CONFIG.API.INVOKE_URL}${endpoint}`,
      request
    );

    if (response.status === 200) {
      const { data } = await response.json();
      setState('success');
      setStats(data);
    } else {
      console.log('Api response not 200');
      setState('error');
    }
  } catch (error) {
    console.log('Error', error);
    setState('error');
  }
};
