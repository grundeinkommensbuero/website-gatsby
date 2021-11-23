/**
 * These hooks make use of the app backend (of the DWE enteignen app) to fetch collection meetups
 */

import { useState } from 'react';
import CONFIG from '../../../../../backend-config';

export const useGetMeetups = () => {
  const [meetups, setMeetups] = useState();

  return [meetups, isBerlin => getMeetups(isBerlin, setMeetups)];
};

// gets meetups: berlin meetups are fetched from app backend
// everything else are fetched from our backend
const getMeetups = async (isBerlin, setMeetups) => {
  try {
    let response;
    if (isBerlin) {
      response = await getMeetupsFromAppApi();
    } else {
      response = await getMeetupsFromWebsiteApi();
    }

    if (response.status === 200) {
      const json = await response.json();

      setMeetups(formatMeetups(isBerlin, json));
    } else {
      console.log('Response is not 200', response.status);
    }
  } catch (error) {
    console.log('Error while getting meetups', error);
  }
};

const getMeetupsFromAppApi = () => {
  // Endpoint is POST to optionally receive  a filter as body
  const request = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  };

  return fetch(`${CONFIG.APP_API.INVOKE_URL}/service/termine`, request);
};

const getMeetupsFromWebsiteApi = () => {
  const request = {
    method: 'GET',
    mode: 'cors',
  };

  return fetch(`${CONFIG.API.INVOKE_URL}/meetups`, request);
};

const formatMeetups = (isBerlin, json) => {
  // We want to bring the meetups from the backend into the same format as
  // the ones from contentful
  if (isBerlin) {
    // Using reduce to filter and map ad same time
    return json.reduce(
      (
        filteredArray,
        { beginn, ende, latitude, longitude, ort, details, typ }
      ) => {
        // Filter out collection meetups of the past
        if (
          (typ === 'Sammeln' && new Date(beginn) > new Date()) ||
          typ === 'Listen ausgelegt'
        ) {
          filteredArray.push({
            location: {
              lon: longitude,
              lat: latitude,
            },
            description: details?.beschreibung,
            contact: details?.kontakt,
            title: typ === 'Sammeln' ? 'Sammelaktion' : 'Unterschreiben',
            // Meetup has time saved in db even though it is not really needed,
            // which is why we strip it here
            startTime: typ === 'Sammeln' ? beginn : null,
            endTime: typ === 'Sammeln' ? ende : null,
            locationName: ort,
            address: details?.treffpunkt,
          });
        }
        return filteredArray;
      },
      []
    );
  } else {
    return json.data.map(
      ({ coordinates, description, type, locationName, ...rest }) => ({
        location: {
          lon: coordinates[0],
          lat: coordinates[1],
        },
        description: description,
        title:
          type === 'collect'
            ? 'Sammelaktion'
            : `Unterschreiben: ${locationName}`,
        ...rest,
      })
    );
  }
};
