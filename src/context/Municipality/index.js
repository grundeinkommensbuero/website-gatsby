import React, { useState, useEffect } from 'react';

export const MunicipalityContext = React.createContext();

export const MunicipalityProvider = ({ children }) => {
  const [isMunicipality, setIsMunicipality] = useState();
  const [municipality, setMunicipality] = useState();
  const [isSpecific, setIsSpecific] = useState();

  return (
    <MunicipalityContext.Provider
      value={{
        isMunicipality,
        setIsMunicipality,
        municipality,
        setMunicipality,
        isSpecific,
        setIsSpecific,
      }}
    >
      {children}
    </MunicipalityContext.Provider>
  );
};
