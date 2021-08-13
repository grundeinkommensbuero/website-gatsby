import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { formatDateTime } from '../utils';
import { contentfulJsonToHtml } from '../utils/contentfulJsonToHtml';
import * as s from './style.module.less';
import { SectionInner } from '../Layout/Sections';
import { FinallyMessage } from '../Forms/FinallyMessage';

import { detectWebGLContext } from '../utils';

let mapboxgl;
let MapboxGeocoder;

if (!process.env.STATIC) {
  mapboxgl = require('mapbox-gl');
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW55a2V5IiwiYSI6ImNrM3JkZ2IwMDBhZHAzZHBpemswd3F3MjYifQ.RLinVZ2-Vdp9JwErHAJz6w';
  MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
}

const DEFAULT_BOUNDS = [
  [3, 47.217923],
  [17.030017, 55.437655],
];

/**
 * The `config` JSON field on a Contentful Map takes values that will be directly
 * passed in to the mapboxgl map constructor. This function extends the default mapbox config
 * only adding or overriding any properties that have a value on Contentful.
 *
 * @param {{}} defaultConfig Default mapbox config to add props to
 * @param {{key: string; value: any}[]} props Props that get added to or override default config
 */
const addPropsToMapboxConfig = (defaultConfig, props) => {
  if (!props) return defaultConfig;

  // Loop through each key of each prop
  const configWithoutNulls = Object.keys(props).reduce((acc, key) => {
    // If value, add to accumulator
    if (props[key]) {
      return {
        ...acc,
        [key]: props[key],
      };
    }
    // Otherwise, return accumulator
    return acc;
  }, {});

  // Merge Contentful properties with the default
  return {
    ...defaultConfig,
    ...configWithoutNulls,
  };
};

const lazyMap = ({
  locations,
  mapConfig,
  withSearch = false,
  onLocationChosen,
}) => {
  const [hasWebGl, setHasWebGL] = useState(null);

  const container = useRef(null);
  const map = useRef(null);
  const [highlightedPoint, setHighlightedPoint] = useState([]);

  useEffect(() => {
    setHasWebGL(detectWebGLContext());
  }, []);

  useEffect(() => {
    // If we render the map with search, we don't
    // need to depend on locations
    if (hasWebGl && (withSearch || locations)) {
      // Initialize map only once
      if (!map.current) {
        // Default config for mapboxgl
        const mapboxConfigDefault = {
          container: container.current,
          style: 'mapbox://styles/mapbox/streets-v9',
          maxBounds: DEFAULT_BOUNDS,
        };

        const mapboxConfig = addPropsToMapboxConfig(
          mapboxConfigDefault,
          mapConfig.config
        );

        map.current = new mapboxgl.Map(mapboxConfig).addControl(
          new mapboxgl.NavigationControl(),
          'top-left'
        );

        if (withSearch) {
          // Initialize geo coder
          const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl,
            placeholer: 'Wähle einen Sammelort aus',
          });

          geocoder.on('result', e => {
            if (onLocationChosen) {
              onLocationChosen(e);
            }
          });

          map.current.addControl(geocoder);
        }
      }

      if (locations) {
        locations.forEach(meetup => {
          if (meetup.location) {
            new mapboxgl.Marker()
              .setLngLat([meetup.location.lon, meetup.location.lat])
              .addTo(map.current)
              .setPopup(
                new mapboxgl.Popup()
                  .setHTML(renderToStaticMarkup(<PopupContent {...meetup} />))
                  .on('open', () => {
                    highlightedPoint.push(meetup);
                    setHighlightedPoint([...highlightedPoint]);
                  })
                  .on('close', () => {
                    highlightedPoint.shift();
                    setHighlightedPoint([...highlightedPoint]);
                  })
              );
          }
        });
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [hasWebGl, locations]);

  return (
    <>
      <SectionInner wide={true}>
        {hasWebGl === false && (
          <FinallyMessage>
            Entschuldige bitte, dein Browser unterstützt leider unsere Karte
            nicht, sie benötigt webGL. Bitte mache ein Update deines Browsers
            und/oder deines Betriebssystems oder probiere es in einem anderen
            Browser.
          </FinallyMessage>
        )}
        {(hasWebGl === true || hasWebGl === null) && (
          <div ref={container} className={s.container} />
        )}
      </SectionInner>
      {highlightedPoint.length !== 0 && (
        <SectionInner className={s.popUpOutside}>
          <div>
            <PopupContent {...highlightedPoint[0]} />
          </div>
        </SectionInner>
      )}
    </>
  );
};

const PopupContent = ({
  title,
  description,
  date,
  phone,
  mail,
  isRichText,
}) => (
  <div className={s.tooltip}>
    {date && (
      <div className={s.tooltopDate}>{formatDateTime(new Date(date))}</div>
    )}
    <div className={s.tooltopTitle}>{title}</div>
    {description && (
      <div className={s.tooltipDescription}>
        <hr />
        {isRichText ? contentfulJsonToHtml(description) : description}
      </div>
    )}
    {(phone || mail) && <hr />}
    {phone && (
      <div>
        <span aria-label="phone" role="img">
          📞
        </span>{' '}
        <a href={`tel:${phone}`}>{phone}</a>
      </div>
    )}
    {mail && (
      <div>
        <span aria-label="e-mail" role="img">
          ✉️
        </span>{' '}
        <a href={`mailto:${mail}`}>{mail}</a>
      </div>
    )}
  </div>
);

export default lazyMap;
