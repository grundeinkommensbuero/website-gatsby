import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  formatDateShort,
  formatDateShortIso,
  formatDateTime,
  formatTime,
  getDayAsString,
} from '../utils';
import { contentfulJsonToHtml } from '../utils/contentfulJsonToHtml';
import * as s from './style.module.less';
import { SectionInner } from '../Layout/Sections';
import { FinallyMessage } from '../Forms/FinallyMessage';

import pinIcon from './icon-pin.svg';
import calenderIcon from './icon-calendar.svg';
import collectIcon from './icon-collect.png';
import signIcon from './icon-sign.png';
import storageIcon from './icon-storage.png';
import collectIconBerlin from './icon-collect-berlin.svg';
import signIconBerlin from './icon-sign-berlin.svg';
import storageIconBerlin from './icon-storage-berlin.svg';

import { detectWebGLContext } from '../utils';
import { InlineLinkButton } from '../Forms/Button';

const IS_BERLIN_PROJECT = process.env.GATSBY_PROJECT === 'Berlin';

let mapboxgl;
let MapboxGeocoder;

if (!process.env.STATIC) {
  mapboxgl = require('mapbox-gl');

  // Workaround for mapbox v2 bug: https://docs.mapbox.com/mapbox-gl-js/guides/install/#transpiling
  // Load worker code separately with worker-loader
  // and wire up loaded worker to be used instead of the default
  mapboxgl.workerClass =
    require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
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
  className,
}) => {
  const [hasWebGl, setHasWebGL] = useState(null);

  const container = useRef(null);
  const map = useRef(null);
  const [highlightedPoint, setHighlightedPoint] = useState([]);
  const [markers, setMarkers] = useState([]);

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

        // console.log([
        //   ...mapboxConfig.maxBounds[0],
        //   ...mapboxConfig.maxBounds[1],
        // ]);

        if (withSearch) {
          // Initialize geo coder
          const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl,
            placeholder: 'Nach Ort suchen',
            bbox: [...mapboxConfig.maxBounds[0], ...mapboxConfig.maxBounds[1]],
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
        // Remove old markers from map
        markers.forEach(marker => marker.remove());

        const markerArray = [];
        locations.forEach(meetup => {
          if (meetup.location) {
            const element = document.createElement('div');

            let markerClass;
            if (IS_BERLIN_PROJECT) {
              if (meetup.type === 'collect') {
                markerClass = s.collectBerlin;
              } else if (meetup.type === 'lists') {
                markerClass = s.signBerlin;
              } else {
                markerClass = s.storageBerlin;
              }
            } else {
              if (meetup.type === 'collect') {
                markerClass = s.collect;
              } else if (meetup.type === 'lists') {
                markerClass = s.sign;
              } else {
                markerClass = s.storage;
              }
            }
            
            element.className = `${s.marker} ${markerClass}`;

            const marker = new mapboxgl.Marker(element)
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

            markerArray.push(marker);
          }
        });

        setMarkers(markerArray);
      }
    }
  }, [hasWebGl, locations]);

  // Cleanup map
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <>
      <SectionInner wide={true} className={className}>
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
      <div className={IS_BERLIN_PROJECT ? s.legendBerlin : s.legend}>
        <div>
          <img src={IS_BERLIN_PROJECT ? storageIconBerlin : storageIcon} alt="Illustration eines Materiallagers" />
          <span>Materiallager</span>
        </div>
        <div>
          <img src={IS_BERLIN_PROJECT ? signIconBerlin : signIcon} 
          alt="Illustration einer UnterschriftenListe" />
          <span>Soli-Ort</span>
        </div>
        <div>
          <img src={IS_BERLIN_PROJECT ? collectIconBerlin : collectIcon} alt="Illustration eines Sammelevents" />
          <span>Sammelevent</span>
        </div>
      </div>
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
  startTime,
  endTime,
  contact,
  address,
  city,
  zipCode,
  locationName,
  type,
  typeOfStorage,
}) => (
  <div className={s.tooltip}>
    {date && <div>{formatDateTime(new Date(date))}</div>}
    <h3 className={s.tooltipTitle}>{title}</h3>
    {((startTime && endTime) || address || locationName) && (
      <div className={s.tooltipTimeAndPlace}>
        {startTime && endTime && (
          <div className={s.tooltipInfoWithIcon}>
            <img
              src={calenderIcon}
              alt="Illustration eines Kalenders"
              className={s.tooltipIcon}
            />
            <div className={s.tooltipDate}>
              <span className={s.tooltipDay}>
                {getDayAsString(new Date(startTime))},{' '}
                {formatDateShort(new Date(startTime))}
              </span>
              <br />
              <span className={s.tooltipTime}>
                {formatTime(new Date(startTime))} -{' '}
                {formatTime(new Date(endTime))} Uhr
              </span>
            </div>
          </div>
        )}
        {(address || locationName) && (
          <div className={s.tooltipInfoWithIcon}>
            <img
              src={pinIcon}
              alt="Illustration einer Markierung"
              className={s.tooltipIcon}
            />
            <div className={s.tooltipLocation}>
              <span className={s.tooltipAddress}>
                {/* If address and location name both exist, show both, otherwise only one */}
                {address && locationName ? (
                  <>
                    {address}
                    <br />
                    {type === 'collect' && 'Kiez: '}
                    {locationName}
                  </>
                ) : (
                  address || locationName
                )}
                {typeOfStorage && (
                  <>
                    <br />
                    {typeOfStorage}
                  </>
                )}
              </span>
              <br />
              {zipCode && city && (
                <span className={s.tooltipZipCode}>
                  {zipCode} {city}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    )}
    {description && (
      <div className={s.tooltipDescription}>
        <h4 className={s.tooltipHeading}>
          {type === 'storage' ? 'Was ist da?' : 'Information'}
        </h4>
        {isRichText ? contentfulJsonToHtml(description) : description}
      </div>
    )}
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
    {contact && (
      <div>
        <h4 className={s.tooltipHeading}>Kontakt</h4>
        {contact}
      </div>
    )}
    {type === 'collect' && (
      <div>
        <h4 className={s.tooltipHeading}>Du bist dabei?</h4>
        <InlineLinkButton
          href={`/sammeln/anmelden?location=${
            address || locationName
          }&date=${formatDateShortIso(new Date(startTime))}`}
          target="_blank"
        >
          Hier
        </InlineLinkButton>{' '}
        kannst du dich für das Sammel-Event anmelden.{' '}
      </div>
    )}
  </div>
);

export default lazyMap;
