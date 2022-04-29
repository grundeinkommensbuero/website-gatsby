/**
 * This hook is used to map a given point (lat, long) to a district of Berlin
 */

import { useState } from 'react';
import pointInPolygon from 'point-in-polygon';
import json from './data/districts.json';

export const useMapDistricts = () => {
  const [district, setDistrict] = useState();
  return [district, location => mapLocationToDistrict(location, setDistrict)];
};

const mapLocationToDistrict = async (location, setDistrict) => {
  const districts = json.features;

  const foundDisctrict = districts.find(({ geometry }) =>
    pointInPolygon(location, geometry.coordinates[0])
  );

  setDistrict(foundDisctrict?.properties.BEZIRKSREG);
};
