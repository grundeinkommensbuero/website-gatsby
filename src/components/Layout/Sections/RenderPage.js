import React from 'react';
import { getRenderedSections, SectionWrapper } from './index';

export const RenderPage = ({
  municipality,
  userData,
  isAuthenticated,
  sections,
  pageContext,
}) => {
  const renderedSections = getRenderedSections({
    municipality,
    userData,
    isAuthenticated,
    sections,
    pageContext,
  }).map((section, index) => (
    <React.Fragment key={index}>{section}</React.Fragment>
  ));

  return <SectionWrapper>{renderedSections}</SectionWrapper>;
};
