import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useGetMeetups } from '../../hooks/Api/Meetups/Get';
import Map from './Map';
import {
  SectionComponent,
  SectionComponentContainer,
} from '../Layout/Sections';
import { Button, DropdownButton } from '../Forms/Button';
import * as s from './style.module.less';
import { Modal } from '../Modal';
import { EventsListed } from './EventsListed';
import { Checkbox } from '../Forms/Checkbox';
import FormWrapper from '../Forms/FormWrapper';
import FormSection from '../Forms/FormSection';
import {
  checkIfDateIsToday,
  checkIfDateIsTomorrow,
} from './utils/dateStringManipulation';
import loadable from '@loadable/component';
import { useLocation } from '@reach/router';
import { CTALink } from '../Layout/CTAButton';
const CreateMeetup = loadable(() => import('../Forms/Meetup'));

export const ShowMeetups = ({ mapConfig, className, isIframe = false }) => {
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

  const location = useLocation();

  // Map filters
  // Type filters, depending on the slug we show different default filters
  const [showLists, setShowLists] = useState(
    location.pathname.includes('soli-orte') ||
      location.pathname.includes('unterschreiben') ||
      isIframe
  );
  const [showCollectionEvents, setShowCollectionEvents] = useState(
    location.pathname.includes('termine') ||
      location.pathname === '/' ||
      isIframe
  );
  const [showStorages, setShowStorages] = useState(
    location.pathname.includes('material') || isIframe
  );

  // Day filters
  // For the start page we only want to show events of today
  const [filterToday, setFilterToday] = useState(location.pathname === '/');
  const [filterTomorrow, setFilterTomorrow] = useState(false);

  // Time filters
  const [filterBefore12, setFilterBefore12] = useState(true);
  const [filterBefore18, setFilterBefore18] = useState(true);
  const [filterAfter18, setFilterAfter18] = useState(true);

  const [showDayFilters, setShowDayFilters] = useState(false);
  const [showTimeFilters, setShowTimeFilters] = useState(false);

  const isBremen = mapConfig.state === 'bremen';
  const isBerlin = mapConfig.state === 'berlin';
  const isHamburg = mapConfig.state === 'hamburg';
  const isDemocracy = mapConfig.state === 'democracy';
  const isClimate = mapConfig.state === 'climate';

  useEffect(() => {
    // We only need to fetch meetups from secondary API if it's the berlin or hamburg map
    if (isBerlin || isHamburg || isDemocracy || isClimate) {
      // We pass state to differentiate between APIs

      // The whole naming of meetups does not really make that much sense anymore, since
      // we are using the new api backend structure, where list locations and events are two
      // entirely different api and schemas.
      // I am leaving it like this anyway, just beware that meetups are events OR list locations
      getMeetups(mapConfig.state);
    }
  }, [mapConfig]);

  const onCreatedMeetup = () => {
    getMeetups(mapConfig.state);
  };

  useEffect(() => {
    if (
      !(isBerlin || isHamburg || isDemocracy || isClimate) ||
      ((isBerlin || isHamburg || isDemocracy || isClimate) && meetups)
    ) {
      let collectSignaturesLocationsFiltered = [];
      if (isBerlin || isHamburg || isDemocracy || isClimate) {
        collectSignaturesLocationsFiltered = meetups;
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
      if (isBremen) {
        setLocationsFiltered(allLocations);
      } else {
        // Filter by type, filter by date (endTime exists = only for collection events)
        // and filter by time (also only for collection events)
        const newLocationsFiltered = allLocations.filter(
          ({ type, startTime, endTime }) => {
            const startInHours = startTime && new Date(startTime).getHours();

            return (
              ((showLists && type === 'lists') ||
                (showCollectionEvents && type === 'collect') ||
                (showStorages && type === 'storage')) &&
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
    }
  }, [
    showLists,
    showCollectionEvents,
    showStorages,
    filterToday,
    filterTomorrow,
    filterBefore12,
    filterBefore18,
    filterAfter18,
    allLocations,
  ]);

  return (
    <>
      {!isBremen && (
        <FormWrapper className={s.filter}>
          <div className={s.flexRow}>
            <Checkbox
              label="Soli-Orte anzeigen"
              type="checkbox"
              checked={showLists}
              onChange={() => setShowLists(!showLists)}
              className={s.inlineCheckbox}
              labelClassName={s.inlineCheckboxLabel}
            />
            <Checkbox
              label="Sammel-Termine anzeigen"
              type="checkbox"
              checked={showCollectionEvents}
              onChange={() => setShowCollectionEvents(!showCollectionEvents)}
              className={s.inlineCheckbox}
              labelClassName={s.inlineCheckboxLabel}
            />
            <Checkbox
              label="Materiallager anzeigen"
              type="checkbox"
              checked={showStorages}
              onChange={() => setShowStorages(!showStorages)}
              className={s.inlineCheckbox}
              labelClassName={s.inlineCheckboxLabel}
            />
          </div>

          <div className={s.flexRow}>
            <div className={s.dropdown}>
              <DropdownButton
                className={s.dropdownButton}
                onClick={() => setShowDayFilters(!showDayFilters)}
                isOpen={showDayFilters}
                isActive={filterTomorrow || filterToday}
              >
                Tag auswählen
              </DropdownButton>

              {showDayFilters && (
                <FormSection className={s.dropdownContent}>
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
              )}
            </div>

            <div className={s.dropdown}>
              <DropdownButton
                className={s.dropdownButton}
                onClick={() => setShowTimeFilters(!showTimeFilters)}
                isOpen={showTimeFilters}
                isActive={!filterBefore12 || !filterBefore18 || !filterAfter18}
              >
                Uhrzeit auswählen
              </DropdownButton>

              {showTimeFilters && (
                <FormSection className={s.dropdownContent}>
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
              )}
            </div>
          </div>
        </FormWrapper>
      )}

      <Map
        mapConfig={mapConfig}
        locations={locationsFiltered}
        className={className}
      />
      {(isBerlin || isHamburg || isDemocracy || isClimate) && (
        <div>
          {!isIframe && location.pathname !== '/' && (
            <>
              {/* Jump to anchor */}
              <div className={s.jumpToAnchorWrapper}>
                <div className={s.jumpToAnchor} id="eintragen" />
              </div>

              <SectionComponentContainer>
                <SectionComponent column={'left'}>
                  <h3>Plane eine Sammelaktion!</h3>
                  <p>
                    Du hast Lust vor Ort in der Expedition mitzumachen? Hier
                    kannst du eine Sammelaktion veröffentlichen um so mehr
                    Unterschriftensammler*innen zu mobilisieren.
                  </p>
                  <Button
                    onClick={() => {
                      setType('collect');
                      setShowModal(true);
                    }}
                  >
                    Event erstellen
                  </Button>
                </SectionComponent>
                <SectionComponent column={'right'}>
                  <h3>Lege Listen an einem Soli-Ort aus</h3>
                  <p>
                    Markiere einen Ort, an dem du eine neue Unterschriftenliste
                    ausgelegt hast, um sie für andere sichtbar zu machen. Melde
                    dich gern bei uns, wenn du Material benötigst.
                  </p>
                  <Button
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
            </>
          )}
          {!isIframe && location.pathname !== '/' && (
            <>
              {/* Jump to anchor */}
              <div className={s.jumpToAnchorWrapper}>
                <div className={s.jumpToAnchor} id="events" />
              </div>

              <EventsListed locationsFiltered={locationsFiltered} />
            </>
          )}
          {location.pathname === '/' && (
            <CTALink to="/termine">Weitere Events</CTALink>
          )}
        </div>
      )}
    </>
  );
};
