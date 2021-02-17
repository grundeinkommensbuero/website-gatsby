import React, { useContext } from 'react';
import { SearchPlaces } from '../../Forms/SearchPlaces';
import { MunicipalityContext } from '../../../context/Municipality';

export const MunicipalitySearch = () => {
  const { municipality, setMunicipality, isMunicipality } = useContext(
    MunicipalityContext
  );
  const handlePlaceSelect = selected => {
    if (selected) {
      setMunicipality(selected);
    }
  };

  if (!isMunicipality) {
    return (
      <SearchPlaces
        placeholder={!!municipality ? municipality.name : 'Gemeinde'}
        label={false}
        onPlaceSelect={handlePlaceSelect}
        showButton={false}
        inputSize="SMALL"
        buttonSize="MEDIUM"
      />
    );
  } else {
    return <></>;
  }
};
