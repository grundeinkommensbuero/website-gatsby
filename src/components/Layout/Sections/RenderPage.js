import React from 'react';
import { getRenderedSections, SectionWrapper } from './index';

export const RenderPage = ({ sections, pageContext }) => {
  const RenderedSections = () => {
    return getRenderedSections({
      sections,
      pageContext,
    }).map((section, index) => (
      <React.Fragment key={index}>{section}</React.Fragment>
    ));
  };

  return (
    <SectionWrapper>
      <RenderedSections />
    </SectionWrapper>
  );
};
