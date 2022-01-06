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
import { Checkbox } from '../Forms/Checkbox';
import FormWrapper from '../Forms/FormWrapper';
import FormSection from '../Forms/FormSection';
import {
  checkIfDateIsToday,
  checkIfDateIsTomorrow,
} from './utils/dateStringManipulation';

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
  const [allLocations, setAllLocations] = useState();
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('collect');

  // Map filters
  // Type filters
  const [showLists, setShowLists] = useState(true);
  const [showCollectionEvents, setShowCollectionEvents] = useState(true);

  // Day filters
  const [filterToday, setFilterToday] = useState(false);
  const [filterTomorrow, setFilterTomorrow] = useState(false);

  // Time filters
  const [filterBefore12, setFilterBefore12] = useState(true);
  const [filterBefore18, setFilterBefore18] = useState(true);
  const [filterAfter18, setFilterAfter18] = useState(true);

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
            type,
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

      setAllLocations(collectSignaturesLocationsFiltered);
    }
  }, [meetups]);

  useEffect(() => {
    if (allLocations) {
      // Filter by type, filter by date (endTime exists = only for collection events)
      // and filter by time (also only for collection events)
      const newLocationsFiltered = allLocations.filter(
        ({ type, startTime, endTime }) => {
          const startInHours = startTime && new Date(startTime).getHours();

          return (
            ((showLists && type === 'lists') ||
              (showCollectionEvents && type === 'collect')) &&
            (!endTime ||
              (!filterToday && !filterTomorrow) ||
              (filterToday && checkIfDateIsToday(new Date(endTime))) ||
              (filterTomorrow && checkIfDateIsTomorrow(new Date(endTime)))) &&
            (!startTime ||
              (filterBefore12 && startInHours < 12) ||
              (filterBefore18 && startInHours >= 12 && startInHours < 18) ||
              (filterAfter18 && startInHours >= 18))
          );
        }
      );

      setLocationsFiltered(newLocationsFiltered);
    }
  }, [
    showLists,
    showCollectionEvents,
    filterToday,
    filterTomorrow,
    filterBefore12,
    filterBefore18,
    filterAfter18,
    allLocations,
  ]);

  return (
    <>
      <FormWrapper className={s.filter}>
        <FormSection heading="Art des Events" className={s.filterSection}>
          <Checkbox
            label="Unterschreiben"
            type="checkbox"
            checked={showLists}
            onChange={() => setShowLists(!showLists)}
          />
          <Checkbox
            label="Mitsammeln"
            type="checkbox"
            checked={showCollectionEvents}
            onChange={() => setShowCollectionEvents(!showCollectionEvents)}
          />
        </FormSection>

        <FormSection heading="An welchem Tag?" className={s.filterSection}>
          <Checkbox
            label="Egal"
            type="checkbox"
            checked={!filterTomorrow && !filterToday}
            onChange={() => {
              setFilterToday(false);
              setFilterTomorrow(false);
            }}
          />
          <Checkbox
            label="Heute"
            type="checkbox"
            checked={filterToday}
            onChange={() => setFilterToday(!filterToday)}
          />
          <Checkbox
            label="Morgen"
            type="checkbox"
            checked={filterTomorrow}
            onChange={() => setFilterTomorrow(!filterTomorrow)}
          />
        </FormSection>

        <FormSection
          heading="Beginn um wieviel Uhr?"
          className={s.filterSection}
        >
          <Checkbox
            label="Vor 12 Uhr"
            type="checkbox"
            checked={filterBefore12}
            onChange={() => setFilterBefore12(!filterBefore12)}
          />
          <Checkbox
            label="Zwischen 12 und 18 Uhr"
            type="checkbox"
            checked={filterBefore18}
            onChange={() => setFilterBefore18(!filterBefore18)}
          />
          <Checkbox
            label="Nach 18 Uhr"
            type="checkbox"
            checked={filterAfter18}
            onChange={() => setFilterAfter18(!filterAfter18)}
          />
        </FormSection>
      </FormWrapper>

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
