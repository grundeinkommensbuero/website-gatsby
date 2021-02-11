import React, { useContext, useCallback } from 'react';

import { SearchPlaces } from '../../Forms/SearchPlaces';
import { MunicipalityContext } from '../../../context/Municipality';
import { setWindowLocationOriginForIE } from '../../utils';
import { navigate } from 'gatsby';

export const MunicipalitySearch = () => {
  const { isMunicipality, municipality, setMunicipality } = useContext(
    MunicipalityContext
  );
  // console.log(isMunicipality);
  const adjustDocumentTitle = (municipality, replacement) => {
    if (municipality?.name) {
      document.title = document.title = document.title.replace(
        municipality.name,
        replacement
      );
    } else {
      document.title = document.title.replace(
        'in deine Gemeinde',
        `nach ${replacement}`
      );
    }
  };
  const handlePlaceSelect = useCallback(
    selected => {
      if (selected) {
        setMunicipality(selected);

        // Note: IE would need an additional fallback for window.history here:
        if (typeof window !== `undefined`) {
          if (window.history?.pushState) {
            window.history.pushState(
              selected,
              null,
              `${window.location.origin}/gemeinden/${selected.ags}`
            );
            adjustDocumentTitle(municipality, selected.name);
            setWindowLocationOriginForIE();
          } else {
            navigate(municipality.ags);
          }
        }
      }
    },
    [municipality]
  );

  return (
    <>
      {!isMunicipality && (
        <SearchPlaces
          placeholder={!!municipality ? municipality.name : 'Gemeinde'}
          label={false}
          onPlaceSelect={handlePlaceSelect}
          showButton={false}
          inputSize="SMALL"
          buttonSize="MEDIUM"
        />
      )}
    </>
  );
};
