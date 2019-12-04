import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef } from 'react';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW55a2V5IiwiYSI6ImNrM3JkZ2IwMDBhZHAzZHBpemswd3F3MjYifQ.RLinVZ2-Vdp9JwErHAJz6w';

export default ({ points, bounds }) => {
  const container = useRef(null);
  let map;

  useEffect(() => {
    map = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      maxBounds: bounds,
    }).addControl(new mapboxgl.NavigationControl(), 'top-left');

    points.forEach(point => {
      new mapboxgl.Marker()
        .setLngLat(point.position)
        .addTo(map)
        .setPopup(new mapboxgl.Popup().setHTML(point.label));
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={container} style={{ height: '500px' }}></div>;
};
