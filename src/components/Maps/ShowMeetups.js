import React, { useContext, useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useGetMeetups } from '../../hooks/Api/Meetups';
import Map from './Map';
import {
  SectionComponent,
  SectionComponentContainer,
} from '../Layout/Sections';
import { Button } from '../Forms/Button';
import { MeetupOverlayContext } from '../../context/Overlay/MeetupOverlay';

export const ShowMeetups = ({ mapConfig }) => {
  const {
    allContentfulSammelort: { edges: collectSignaturesLocations },
  } = useStaticQuery(graphql`
    query CollectSignaturesLocations {
      allContentfulSammelort {
        edges {
          node {
            mail
            title
            phone
            location {
              lat
              lon
            }
            description {
              raw
            }
            date
            state
          }
        }
      }
    }
  `);
  const { setType, setOverlayOpen, setMapConfig } = useContext(
    MeetupOverlayContext
  );
  const [meetups, getMeetups] = useGetMeetups();
  const [locationsFiltered, setLocationsFiltered] = useState();

  const isBerlin = mapConfig.state === 'berlin';

  useEffect(() => {
    // We only need to fetch meetups from secondary API if it's the berlin map
    if (isBerlin) {
      getMeetups();
    }

    setMapConfig(mapConfig);
  }, [mapConfig]);

  useEffect(() => {
    if (!isBerlin || (isBerlin && meetups)) {
      let collectSignaturesLocationsFiltered = [];
      if (isBerlin) {
        // We want to bring the meetups from the backend into the same format as
        // the ones from contentful
        collectSignaturesLocationsFiltered = meetups.map(
          ({ properties, geometry }) => ({
            location: {
              lon: geometry.coordinates[0],
              lat: geometry.coordinates[1],
            },
            description: properties.description,
            title: properties.name,
          })
        );
      } else {
        collectSignaturesLocationsFiltered = collectSignaturesLocations
          .filter(({ node: location }) => {
            if (!location.date) {
              return true;
            }
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            return +new Date(location.date) > +yesterday;
          })
          .filter(({ node: location }) => {
            return location.state === mapConfig.state;
          })
          .map(({ node }) => ({ ...node, isRichText: true }));
      }

      setLocationsFiltered(collectSignaturesLocationsFiltered);
    }
  }, [meetups]);

  return (
    <>
      <Map mapConfig={mapConfig} locations={locationsFiltered} />
      {isBerlin && (
        <SectionComponentContainer>
          <SectionComponent column={'left'}>
            <h2>Plane eine Sammelaktion!</h2>
            <Button onClick={() => setOverlayOpen(true)}>
              Event erstellen
            </Button>
          </SectionComponent>
          <SectionComponent column={'right'}>
            <h2>Lege Listen an einem Sammelort aus</h2>
            <Button
              onClick={() => {
                setType('lists');
                setOverlayOpen(true);
              }}
            >
              Ort eintragen
            </Button>
          </SectionComponent>
        </SectionComponentContainer>
      )}
    </>
  );
};
