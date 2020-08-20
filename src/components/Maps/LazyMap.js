import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { formatDateTime } from '../utils';
import { contentfulJsonToHtml } from '../utils/contentfulJsonToHtml';
import s from './style.module.less';
import { useStaticQuery, graphql } from 'gatsby';
import { SectionInner } from '../Layout/Sections';
import { FinallyMessage } from '../Forms/FinallyMessage';

let mapboxgl;

if (!process.env.STATIC) {
  mapboxgl = require('mapbox-gl');
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW55a2V5IiwiYSI6ImNrM3JkZ2IwMDBhZHAzZHBpemswd3F3MjYifQ.RLinVZ2-Vdp9JwErHAJz6w';
}

const DEFAULT_BOUNDS = [
  [3, 47.217923],
  [17.030017, 55.437655],
];

export default ({ mapConfig }) => {
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
              json
            }
            date
            state
          }
        }
      }
    }
  `);

  const [hasWebGl, setHasWebGL] = useState(null);

  const container = useRef(null);
  const [highlightedPoint, setHighlightedPoint] = useState([]);
  let map;

  useEffect(() => {
    setHasWebGL(detectWebGLContext());
  }, []);

  useEffect(() => {
    if (hasWebGl) {
      const collectSignaturesLocationsFiltered = collectSignaturesLocations
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
        });

      map = new mapboxgl.Map({
        container: container.current,
        style: 'mapbox://styles/mapbox/streets-v9',
        maxBounds: mapConfig.config?.bounds || DEFAULT_BOUNDS,
      }).addControl(new mapboxgl.NavigationControl(), 'top-left');

      collectSignaturesLocationsFiltered.forEach(({ node: location }) => {
        if (location.location) {
          new mapboxgl.Marker()
            .setLngLat([location.location.lon, location.location.lat])
            .addTo(map)
            .setPopup(
              new mapboxgl.Popup()
                .setHTML(renderToStaticMarkup(<PopupContent {...location} />))
                .on('open', () => {
                  highlightedPoint.push(location);
                  setHighlightedPoint([...highlightedPoint]);
                })
                .on('close', () => {
                  highlightedPoint.shift();
                  setHighlightedPoint([...highlightedPoint]);
                })
            );
        }
      });

      return () => {
        map.remove();
      };
    }
  }, [hasWebGl]);

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

const PopupContent = ({ title, description, date, phone, mail }) => (
  <div className={s.tooltip}>
    {date && (
      <div className={s.tooltopDate}>{formatDateTime(new Date(date))}</div>
    )}
    <div className={s.tooltopTitle}>{title}</div>
    {description && (
      <div className={s.tooltipDescription}>
        <hr />
        {contentfulJsonToHtml(description.json)}
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

function detectWebGLContext() {
  // Create canvas element. The canvas is not added to the
  // document itself, so it is never displayed in the
  // browser window.
  if (typeof window !== `undefined`) {
    var canvas = document.createElement('canvas');
    // Get WebGLRenderingContext from canvas element.
    var gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    // Report the result.
    if (gl && gl instanceof WebGLRenderingContext) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
