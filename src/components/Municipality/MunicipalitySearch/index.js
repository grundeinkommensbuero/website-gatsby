import React, { useContext } from 'react';
import { SearchPlaces } from '../../Forms/SearchPlaces';
import { MunicipalityContext } from '../../../context/Municipality';

export const MunicipalitySearch = ({ searchTitle }) => {
  const { municipality, setMunicipality } = useContext(MunicipalityContext);
  const handlePlaceSelect = selected => {
    if (selected) {
      setMunicipality(selected);
    }
  };

  return (
    <SearchPlaces
      placeholder={!!municipality ? municipality.name : 'Gemeinde'}
      label={false}
      onPlaceSelect={handlePlaceSelect}
      showButton={false}
      inputSize="SMALL"
      buttonSize="MEDIUM"
      searchTitle={searchTitle}
      fullWidthInput={true}
    />
  );
};

// Needed for lazy loading
export default MunicipalitySearch;
