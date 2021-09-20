/**
 * Component to create a meetup using mapbox to define the location.
 * Including steps from the following tutorial: https://docs.mapbox.com/help/tutorials/local-search-geocoding-api/
 */

import React, { useRef, useState } from 'react';
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
export const CreateMeetup = ({ mapConfig, type = 'collect' }) => {
  const [location, setLocation] = useState();
  const [createMeetupState, createMeetup] = useCreateMeetup();

  const scrollToRef = useRef(null);

  const handleLocationChosen = e => {
    setLocation(e.result);

    // Scroll to form
    if (scrollToRef?.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
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
        {createMeetupState === 'saved' && 'Erfolgreich gespeichert'}
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
            <span className={s.coloredText}>Gewählter Ort: </span>
            {location.place_name_de}
          </p>

          <Form
            onSubmit={e => {
              createMeetup({
                locationName: e.name,
                description: e.description,
                contact: e.contact,
                coordinates: location.center,
                address: location.place_name_de,
                startTime: new Date(`${e.date}T${e.start}`),
                endTime: new Date(`${e.date}T${e.end}`),
                type,
                // TODO: needs to be passed as variable for other campaigns
                campaignCode: 'berlin-2',
              });
            }}
            validate={values => validate(values, type)}
            render={({ handleSubmit }) => (
              <FormWrapper>
                <form onSubmit={handleSubmit}>
                  {type === 'collect' && (
                    <>
                      <FormSection
                        className={s.formSection}
                        fieldContainerClassName={s.inlineFieldSection}
                      >
                        <span className={s.eventText}>
                          Du planst ein Event am
                        </span>
                        <Field
                          name="date"
                          label="Datum"
                          component={DateInputWrapped}
                        ></Field>
                        <span className={s.eventText}>von</span>
                        <Field
                          name="start"
                          label="Start"
                          component={TimeInputWrapped}
                        ></Field>
                        <span className={s.eventText}>bis</span>
                        <Field
                          name="end"
                          label="Ende"
                          component={TimeInputWrapped}
                        ></Field>
                      </FormSection>
                      <div ref={scrollToRef}></div>
                    </>
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
                      ></Field>
                    </FormSection>
                  )}
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
  console.log(values);

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
