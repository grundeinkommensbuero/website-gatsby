/**
 * These hooks make use of the app backend (of the DWE enteignen app) or our own backend to fetch collection meetups
 */

import { useState } from 'react';
import CONFIG from '../../../../../backend-config';

// The whole naming of meetups does not really make that much sense anymore, since
// we are using the new api backend structure, where list locations and events are two
// entirely different api and schemas.
// I am leaving it like this anyway, just beware that meetups are events OR list locations

export const useGetMeetups = () => {
  const [meetups, setMeetups] = useState();

  return [meetups, state => getMeetups(state, setMeetups)];
};

// gets meetups: berlin meetups are fetched from app backend
// everything else are fetched from our backend
const getMeetups = async (state, setMeetups) => {
  try {
    const isBerlin = state === 'berlin';
    const isClimate = state === 'climate';

    if (isBerlin || isClimate) {
      // In comparison to the way we handle events and list locations in our backend
      // those two types are two different api endpoints in the app backend
      const [eventsResponse, listLocationsResponse, storagesResponse] =
        await Promise.all([
          getEventsFromAppApi(isClimate),
          getListLocationsFromAppApi(isClimate),
          getStoragesFromAppApi(),
        ]);

      if (
        eventsResponse.status === 200 &&
        listLocationsResponse.status === 200 &&
        storagesResponse.status === 200
      ) {
        // We don't need to thoroughly format list locations, only event meetups
        const events = formatMeetups(true, await eventsResponse.json());
        const listLocations = formatListLocations(
          await listLocationsResponse.json()
        );
        const storages = formatStorages(
          await storagesResponse.json(),
          isClimate
        );

        setMeetups([...events, ...listLocations, ...storages]);
      } else {
        console.log(
          'Response is not 200',
          eventsResponse.status,
          listLocationsResponse.status
        );
      }
    } else {
      const response = await getMeetupsFromWebsiteApi();

      if (response.status === 200) {
        const json = await response.json();

        // Filter meetups so they are only from democracy campaign
        const filteredMeetups = json.data.filter(
          ({ campaign }) => campaign?.state === state
        );

        // IsListLocation does not matter for non berlin meetups
        setMeetups(formatMeetups(false, filteredMeetups));
      } else {
        console.log('Response is not 200', response.status);
      }
    }
  } catch (error) {
    console.log('Error while getting meetups', error);
  }
};

const getEventsFromAppApi = isClimate => {
  // Endpoint is POST to optionally receive  a filter as body
  const request = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      // Pass auth for a default user to trigger filter on the server
      // to only serve future events, maybe in the future we can handle
      // it differently on the server
      Authorization: `Basic ${process.env.GATSBY_APP_BACKEND_AUTH}`,
    },
    // Pass filter with attribute details to also fetch description
    // and pass filter to only show events for grundeinkommen
    body: JSON.stringify({
      details: true,
      initiativenIds: [isClimate ? 2 : 1],
    }),
  };

  return fetch(`${CONFIG.APP_API.INVOKE_URL}/service/termine`, request);
};

const getListLocationsFromAppApi = isClimate => {
  const request = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ initiativenIds: [isClimate ? 2 : 1] }),
  };

  return fetch(
    `${CONFIG.APP_API.INVOKE_URL}/service/listlocations/actives`,
    request
  );
};

const getMeetupsFromWebsiteApi = () => {
  const request = {
    method: 'GET',
    mode: 'cors',
  };

  return fetch(`${CONFIG.API.INVOKE_URL}/meetups`, request);
};

const getStoragesFromAppApi = () => {
  const request = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${CONFIG.APP_API.INVOKE_URL}/service/storages`, request);
};

const formatMeetups = (isBerlin, meetups) => {
  // We want to bring the meetups from the backend into the same format as
  // the ones from contentful
  if (isBerlin) {
    // We used to filter out past events here, but since this is done on the server
    // now, we don't need to do that anymore
    return meetups.map(
      ({ beginn, ende, latitude, longitude, ort, details, typ }) => ({
        location: {
          lon: longitude,
          lat: latitude,
        },
        description: details?.beschreibung,
        contact: details?.kontakt,
        title: typ === 'Sammeln' ? 'Sammelaktion' : typ,
        startTime: beginn,
        endTime: ende,
        locationName: ort,
        address: details?.treffpunkt,
        // TODO: maybe diversify in the future to account for other events
        type: 'collect',
      })
    );
  } else {
    return meetups.map(
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
        type,
        ...rest,
      })
    );
  }
};

const formatListLocations = listLocations => {
  return listLocations.map(location => ({
    ...location,
    location: { lon: location.longitude, lat: location.latitude },
    locationName: location.name,
    type: 'lists',
    address:
      location.street && location.number
        ? `${location.street} ${location.number}`
        : null,
    title: 'Listen ausgelegt',
  }));
};

const formatStorages = (storages, isClimate = false) => {
  return storages
    .filter(({ initiativeId }) =>
      isClimate ? initiativeId === 2 : initiativeId === 1
    )
    .map(location => ({
      ...location,
      location: { lon: location.longitude, lat: location.latitude },
      locationName: location.name,
      type: 'storage',
      address:
        location.street && location.number
          ? `${location.street} ${location.number}`
          : null,
      title: 'Materiallager',
      description: location.equipment,
      typeOfStorage: location.type,
    }));
};
