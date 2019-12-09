import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { contentfulJsonToHtml, formatDateTime } from '../utils';
import s from './style.module.less';

let mapboxgl;

if (!process.env.STATIC) {
  mapboxgl = require('mapbox-gl');
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW55a2V5IiwiYSI6ImNrM3JkZ2IwMDBhZHAzZHBpemswd3F3MjYifQ.RLinVZ2-Vdp9JwErHAJz6w';
}

export default ({ locations, bounds }) => {
  const container = useRef(null);
  let map;

  useEffect(() => {
    map = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      maxBounds: bounds,
    }).addControl(new mapboxgl.NavigationControl(), 'top-left');

    locations.forEach(({ node: location }) => {
      if (location.location) {
        new mapboxgl.Marker()
          .setLngLat([location.location.lon, location.location.lat])
          .addTo(map)
          .setPopup(
            new mapboxgl.Popup().setHTML(
              renderToStaticMarkup(<PopupContent {...location} />)
            )
          );
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={container} style={{ height: '500px' }}></div>;
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
