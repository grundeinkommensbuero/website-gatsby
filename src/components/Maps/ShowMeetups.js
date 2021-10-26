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
import * as s from './style.module.less';
// import { EventsListed } from './EventsListed';

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
            <SectionComponent column={'left'} className={s.createMeetupContent}>
              <h3>Plane eine Sammelaktion!</h3>
              <p>
                Du hast Lust vor Ort in der Expedition mitzumachen? Hier kannst
                du eine Sammelaktion veröffentlichen um so mehr
                Unterschriftensammler*innen zu mobilisieren.
              </p>
              <Button
                className={s.createMeetupButton}
                onClick={() => {
                  setType('collect');
                  setOverlayOpen(true);
                }}
              >
                Event erstellen
              </Button>
            </SectionComponent>
            <SectionComponent
              column={'right'}
              className={s.createMeetupContent}
            >
              <h3>Lege Listen an einem Sammelort aus</h3>
              <p>
                Markiere einen Ort, an dem du eine neue Unterschriftenliste
                ausgelegt hast, um sie für andere sichtbar zu machen. Melde dich
                gern bei uns, wenn du Material benötigst.
              </p>
              <Button
                className={s.createMeetupButton}
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
