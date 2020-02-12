import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { contentfulJsonToHtml, formatDateTime } from '../utils';
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

// [w, s, e, n]
const BOUNDS = {
  'schleswig-holstein': [8.226, 53.4095, 11.6428, 54.9823],
  hamburg: [9.5, 53.35, 10.5, 53.8],
  brandenburg: [11, 51.3, 15, 53.6],
};

export default ({ state }) => {
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

  const container = useRef(null);
  const [highlightedPoint, setHighlightedPoint] = useState([]);
  const hasWebGl = detectWebGLContext();
  let map;

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
          return location.state === state;
        });

      map = new mapboxgl.Map({
        container: container.current,
        style: 'mapbox://styles/mapbox/streets-v9',
        maxBounds: BOUNDS[state],
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
  }, []);

  return (
    <>
      <SectionInner wide={true}>
        {!hasWebGl && (
          <FinallyMessage>
            Entschuldige bitte, dein Browser unterstützt leider unsere Karte
            nicht, sie benötigt webGL. Bitte aktiviere webGL oder probier es in
            einem anderen Browser.
          </FinallyMessage>
        )}
        {hasWebGl && <div ref={container} className={s.container} />}
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
        📞 <a href={`tel:${mail}`}>{phone}</a>
      </div>
    )}
    {mail && (
      <div>
        ✉️ <a href={`mailto:${mail}`}>{mail}</a>
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
