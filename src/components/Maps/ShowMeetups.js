import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useGetMeetups } from '../../hooks/Api/Meetups/Get';
import Map from './Map';
import {
  SectionComponent,
  SectionComponentContainer,
} from '../Layout/Sections';
import { Button } from '../Forms/Button';
import * as s from './style.module.less';
import { Modal } from '../Modal';
import { CreateMeetup } from '../Forms/Meetup';
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
  const [meetups, getMeetups] = useGetMeetups();
  const [locationsFiltered, setLocationsFiltered] = useState();
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('collect');

  const isBerlin = mapConfig.state === 'berlin';

  useEffect(() => {
    // We only need to fetch meetups from secondary API if it's the berlin map
    if (isBerlin) {
      getMeetups();
    }
  }, [mapConfig]);

  const onCreatedMeetup = () => {
    getMeetups();
  };

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
                  setShowModal(true);
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
                  setShowModal(true);
                }}
              >
                Ort eintragen
              </Button>
            </SectionComponent>
            <Modal showModal={showModal} setShowModal={setShowModal}>
              <CreateMeetup
                type={type}
                mapConfig={mapConfig}
                onCreatedMeetup={onCreatedMeetup}
                setShowModal={setShowModal}
              />
            </Modal>
          </SectionComponentContainer>
          <EventsListed locationsFiltered={locationsFiltered} />
        </div>
      )}
    </>
  );
};
