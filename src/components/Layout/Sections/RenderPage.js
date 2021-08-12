import React from 'react';
import { useContext } from 'react';
import AuthContext from '../../../context/Authentication';
import { MunicipalityContext } from '../../../context/Municipality';
import { useUserMunicipalityState } from '../../../hooks/Municipality/UserMunicipalityState';
import { MunicipalityNews } from '../../Municipality/MunicipalityNews';
import { getRenderedSections, SectionWrapper } from './index';

export const RenderPage = ({ sections, pageContext }) => {
  const { customUserData: userData, isAuthenticated } = useContext(AuthContext);
  const { municipality } = useContext(MunicipalityContext);
  const userMunicipalityState = useUserMunicipalityState();

  const renderedSections = getRenderedSections({
    municipality,
    userData,
    isAuthenticated,
    sections,
    pageContext,
    userMunicipalityState,
  })?.map((section, index) => (
    <React.Fragment key={index}>{section}</React.Fragment>
  ));

  if (municipality) {
    // Add news component as second component
    renderedSections.splice(
      1,
      0,

      <MunicipalityNews />
    );
  }

  return <SectionWrapper>{renderedSections}</SectionWrapper>;
};
