import React, { useContext, useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useGetMeetups } from '../../hooks/Api/Meetups/Get';
import Map from './Map';
import {
  SectionComponent,
  SectionComponentContainer,
} from '../Layout/Sections';
import { Button } from '../Forms/Button';
import { MeetupOverlayContext } from '../../context/Overlay/MeetupOverlay';
import { EventsListed } from './EventsListed';

export const ShowMeetups = ({ mapConfig, className }) => {
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
  const {
    setType,
    setOverlayOpen,
    setMapConfig,
    createdMeetup,
    setCreatedMeetup,
  } = useContext(MeetupOverlayContext);
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

  // Reload meetups after new meetup was created
  useEffect(() => {
    if (createdMeetup) {
      getMeetups();
      setCreatedMeetup(false);
    }
  }, [createdMeetup]);

  useEffect(() => {
    if (!isBerlin || (isBerlin && meetups)) {
      let collectSignaturesLocationsFiltered = [];
      if (isBerlin) {
        // We want to bring the meetups from the backend into the same format as
        // the ones from contentful
        collectSignaturesLocationsFiltered = meetups.map(
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

  console.log(locationsFiltered);

  return (
    <>
      <Map
        mapConfig={mapConfig}
        locations={locationsFiltered}
        className={className}
      />
      {isBerlin && (
        <div>
          <SectionComponentContainer>
            <SectionComponent column={'left'}>
              <h3>Plane eine Sammelaktion!</h3>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
              <Button onClick={() => setOverlayOpen(true)}>
                Event erstellen
              </Button>
            </SectionComponent>
            <SectionComponent column={'right'}>
              <h3>Lege Listen an einem Sammelort aus</h3>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
              </p>
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
          {/* <br />
          <br />
          <EventsListed locationsFiltered={locationsFiltered} /> */}
        </div>
      )}
    </>
  );
};
