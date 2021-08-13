/**
 * Component to create a meetup using mapbox to define the location.
 * Including steps from the following tutorial: https://docs.mapbox.com/help/tutorials/local-search-geocoding-api/
 */

import React, { useState } from 'react';
import { SectionInner } from '../../Layout/Sections';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Map from '../../Maps/Map';
import { Field, Form } from 'react-final-form';
import FormWrapper from '../FormWrapper';
import { TextInputWrapped } from '../TextInput';
import FormSection from '../FormSection';
import * as s from './style.module.less';
import cN from 'classnames';

export const CreateMeetup = ({ mapConfig }) => {
  const [location, setLocation] = useState();
  const [type, setType] = useState('collect');

  const handleLocationChosen = e => {
    setLocation(e.result);
  };

  return (
    <SectionInner wide={true}>
      <h3>Wähle einen Ort aus!</h3>
      <Map
        onLocationChosen={handleLocationChosen}
        withSearch={true}
        mapConfig={mapConfig}
      />
      {location && <p>Ausgewählter Ort: {location.place_name_de}</p>}

      <Form
        onSubmit={e => {}}
        validate={values => {}}
        render={({ handleSubmit }) => (
          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <h3>Was für ein Event willst du erstellen?</h3>
              <div className={s.selectionContainer}>
                <button
                  className={cN(s.selectionElement, {
                    [s.selectionElementActive]: type === 'collect',
                  })}
                  onClick={() => {
                    setType('collect');
                  }}
                >
                  Sammeln
                </button>
                <button
                  className={cN(s.selectionElement, {
                    [s.selectionElementActive]: type === 'sign',
                  })}
                  onClick={() => {
                    setType('sign');
                  }}
                >
                  Listen augelegt
                </button>
              </div>
              <FormSection>
                <Field
                  name="contact"
                  label="Kontakt"
                  placeholder="E-Mail oder Telefonnummer"
                  type="text"
                  component={TextInputWrapped}
                ></Field>
                <Field
                  name="description"
                  label="Beschreibung"
                  placeholder="Beschreibe kurz das Event"
                  type="textarea"
                  component={TextInputWrapped}
                ></Field>
              </FormSection>
            </form>
          </FormWrapper>
        )}
      />
    </SectionInner>
  );
};
