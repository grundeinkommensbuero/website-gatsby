/**
 * Component to create a meetup using mapbox to define the location.
 * Including steps from the following tutorial: https://docs.mapbox.com/help/tutorials/local-search-geocoding-api/
 */

import React, { useEffect, useRef, useState } from 'react';
import { SectionInner } from '../../Layout/Sections';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Map from '../../Maps/Map';
import { Field, Form } from 'react-final-form';
import FormWrapper from '../FormWrapper';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import * as s from './style.module.less';
import cN from 'classnames';
import { DateInputWrapped, TimeInputWrapped } from '../DateTimeInput';
import { CTAButton, CTAButtonContainer } from '../../Layout/CTAButton';
import { useCreateMeetup } from '../../../hooks/Api/Meetups/Create';
import { FinallyMessage } from '../FinallyMessage';

// Type can be either collect or lists
export const CreateMeetup = ({
  mapConfig,
  type = 'collect',
  setCreatedMeetup,
  setOverlayOpen,
}) => {
  const [location, setLocation] = useState();
  const [createMeetupState, createMeetup] = useCreateMeetup();

  const [overlayCloseTimer, setOverlayCloseTimer] = useState(0);

  const scrollToRef = useRef(null);

  // Date input element is only available in form of type collect
  const dateInputEl = useRef(null);
  // Name input element is only available in form of type lists
  const nameInputEl = useRef(null);

  const handleLocationChosen = e => {
    setLocation(e.result);
    // Scroll to form
    if (scrollToRef?.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    // Set timeout to first smooth scroll and then focus
    setTimeout(() => {
      // Depending on the form type a different input element will
      // be rendered
      if (dateInputEl?.current) {
        dateInputEl.current.focus();
      } else if (nameInputEl?.current) {
        nameInputEl.current.focus();
      }
    }, 1000);
  };

  useEffect(() => {
    if (createMeetupState === 'saved') {
      // Set flag in context, so we can reload meetups in map
      setCreatedMeetup(true);

      countdown();
    }
  }, [createMeetupState]);

  const countdown = () => {
    let seconds = 5;
    const tick = () => {
      seconds--;
      setOverlayCloseTimer(seconds);
      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else {
        setOverlayOpen(false);
      }
    };
    tick();
  };

  if (
    createMeetupState === 'saving' ||
    createMeetupState === 'saved' ||
    createMeetupState === 'error'
  ) {
    let messageState;

    if (createMeetupState === 'saving') {
      messageState = 'progress';
    } else if (createMeetupState === 'error') {
      messageState = 'error';
    } else {
      messageState = 'success';
    }

    return (
      <FinallyMessage state={messageState} className={s.message}>
        {createMeetupState === 'saving' && 'Wird gespeichert...'}
        {createMeetupState === 'saved' && (
          <>
            <p>
              Dein Eintrag wurde gespeichert. Vielen Dank! Du kannst dieses
              Fenster jetzt schließen. Es schließt sich automatisch in{' '}
              {overlayCloseTimer}
            </p>
          </>
        )}
        {createMeetupState === 'error' && (
          <>
            Da ist was schief gegangen. Melde dich bitte bei{' '}
            <a href="mailto:support@expedition-grundeinkommen.de">
              support@expedition-grundeinkommen.de
            </a>
          </>
        )}
      </FinallyMessage>
    );
  }

  return (
    <SectionInner className={s.section}>
      <h3>Wähle einen Ort aus!</h3>
      <Map
        onLocationChosen={handleLocationChosen}
        withSearch={true}
        mapConfig={mapConfig}
      />
      {location && (
        <>
          <p className={s.chosenLocation}>
            <span className={s.coloredText}>Gewählter Ort:</span>
            <span className={s.placeName}>{location.place_name}</span>
          </p>

          <Form
            onSubmit={e => {
              const data = {
                locationName: e.name,
                description: e.description,
                contact: e.contact,
                coordinates: location.center,
                address: location.address
                  ? `${location.text} ${location.address}`
                  : location.text,
                city: location.context.find(({ id }) => id.startsWith('place'))
                  ?.text,
                zipCode: location.context.find(({ id }) =>
                  id.startsWith('postcode')
                )?.text,
                type,
                // TODO: needs to be passed as variable for other campaigns
                campaignCode: 'berlin-2',
              };

              // Only had dates if type is collect
              if (type === 'collect') {
                data.startTime = new Date(`${e.date}T${e.start}`);
                data.endTime = new Date(`${e.date}T${e.end}`);
              }

              createMeetup(data);
            }}
            validate={values => validate(values, type)}
            render={({ handleSubmit }) => (
              <FormWrapper>
                <form onSubmit={handleSubmit}>
                  {type === 'collect' && (
                    <FormSection
                      className={s.formSection}
                      fieldContainerClassName={s.inlineFieldSection}
                    >
                      <p className={s.eventText}>Du planst ein Event am:</p>
                      <Field
                        name="date"
                        label="Datum"
                        component={DateInputWrapped}
                        customRef={dateInputEl}
                      ></Field>
                      <div className={s.timeInputRow}>
                        <div className={s.timeInput}>
                          <p className={s.eventText}>von:</p>
                          <Field
                            name="start"
                            label="Start"
                            component={TimeInputWrapped}
                          ></Field>
                        </div>
                        <div className={s.timeInput}>
                          <p className={s.eventText}>bis:</p>
                          <Field
                            name="end"
                            label="Ende"
                            component={TimeInputWrapped}
                          ></Field>
                        </div>
                      </div>
                    </FormSection>
                  )}
                  {type === 'lists' && (
                    <FormSection className={s.formSection}>
                      <Field
                        name="name"
                        label="Name"
                        placeholder="Name"
                        type="text"
                        inputClassName={s.textInput}
                        component={TextInputWrapped}
                        customRef={nameInputEl}
                      ></Field>
                    </FormSection>
                  )}
                  <div ref={scrollToRef}></div>

                  <FormSection>
                    <p>
                      Bitte gib ein paar zusätzliche Infos an. Wo willst du
                      sammeln? Sollen die anderen Sammler*innen etwas
                      mitbringen? Wie findet ihr zueinander?
                    </p>
                    <Field
                      name="description"
                      label="Beschreibung"
                      placeholder="Sag ein paar Sätze zum geplanten Event..."
                      type="textarea"
                      inputClassName={s.textarea}
                      component={TextInputWrapped}
                    ></Field>
                    <p>
                      Gib ein paar Infos über dich an: Woran erkennt man dich
                      vor Ort und wie kann man dich kontaktieren? Bitte beachte,
                      dass diese Angaben öffentlich auf der Karte zu sehen sein
                      werden.
                    </p>
                    <Field
                      name="contact"
                      label="Informationen über dich"
                      placeholder="Beschreibung"
                      type="textarea"
                      inputClassName={cN(s.textarea, s.shortTextarea)}
                      component={TextInputWrapped}
                    ></Field>
                  </FormSection>

                  <CTAButtonContainer className={s.buttonContainer}>
                    <CTAButton type="submit" size="MEDIUM">
                      Ort eintragen
                    </CTAButton>
                  </CTAButtonContainer>
                </form>
              </FormWrapper>
            )}
          />
        </>
      )}
    </SectionInner>
  );
};

const validate = (values, type) => {
  const errors = {};

  if (!values.description) {
    errors.description = 'Bitte gib eine kurze Beschreibung an';
  }

  if (type === 'lists' && !values.name) {
    errors.name = 'Bitte gib einen Namen des Sammelortes an';
  }

  if (type === 'collect') {
    if (!values.date) {
      errors.date = 'Bitte gib ein Datum an';
    }

    if (!values.start) {
      errors.start = 'Bitte gib einen Start an';
    }

    if (!values.end) {
      errors.end = 'Bitte gib ein Ende an';
    }
  }

  return errors;
};
