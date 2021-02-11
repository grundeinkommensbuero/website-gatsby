import { useEffect, useContext } from 'react';
import { MunicipalityContext } from '../../../context/Municipality';

export const useMunicipalityContext = pageContext => {
  const municipalityContext = useContext(MunicipalityContext);

  useEffect(() => {
    const {
      isMunicipality,
      isSpecificMunicipality,
      municipality,
    } = pageContext;
    if (isMunicipality) {
      municipalityContext.setIsMunicipality(true);
    }
    if (isSpecificMunicipality) {
      municipalityContext.setIsSpecific(true);
      municipalityContext.setMunicipality(municipality);
    }
  }, [pageContext]);

  return municipalityContext;
};
