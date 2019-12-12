import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { contentfulJsonToHtml, formatDateTime } from '../utils';
import s from './style.module.less';
import { useStaticQuery } from 'gatsby';
import { SectionInner } from '../Layout/Sections';

let mapboxgl;

if (!process.env.STATIC) {
  mapboxgl = require('mapbox-gl');
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW55a2V5IiwiYSI6ImNrM3JkZ2IwMDBhZHAzZHBpemswd3F3MjYifQ.RLinVZ2-Vdp9JwErHAJz6w';
}

const BOUNDS = { 'schleswig-holstein': [8.226, 53.4095, 11.6428, 54.9823] };

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
          }
        }
      }
    }
  `);

  const container = useRef(null);
  const [highlightedPoint, setHighlightedPoint] = useState([]);
  let map;

  const collectSignaturesLocationsOnlyFuture = collectSignaturesLocations.filter(
    ({ node: location }) => {
      if (!location.date) {
        return true;
      }
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return +new Date(location.date) > +yesterday;
    }
  );

  useEffect(() => {
    map = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      maxBounds: BOUNDS[state],
    }).addControl(new mapboxgl.NavigationControl(), 'top-left');

    collectSignaturesLocationsOnlyFuture.forEach(({ node: location }) => {
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
  }, []);

  return (
    <>
      <SectionInner wide={true}>
        <div ref={container} className={s.container} />
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
